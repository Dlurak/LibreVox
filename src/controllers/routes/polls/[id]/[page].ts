import { MAX_I16 } from "@constants/ints";
import {
	DATABASE_READ_FAILED,
	INTERNAL_ERROR,
	POLL_NOT_FOUND,
	UNAUTHORIZED,
} from "@constants/responses";
import { CUSTOM_TO_NORMAL_OBJ } from "@constants/types";
import { getHighestValdiPage } from "@controller/conditions/getPage";
import { createVarsObject } from "@controller/variables/readVariables";
import e from "@edgedb";
import { sameContent } from "@utils/arrays/sameContent";
import { Operations, generateHash } from "@utils/hash/anonymous";
import { isLoggedIn } from "@utils/plugins/jwt";
import { Elysia, t } from "elysia";
import { HttpStatusCode } from "elysia-http-status-code";
import { client } from "index";
import { $expr_Update } from "../../../../../dbschema/edgeql-js/update";

const pageIdRouter = new Elysia()
	.use(isLoggedIn)
	.use(HttpStatusCode)
	.put(
		"/poll/:pageId/:pageNumber",
		async ({ auth, set, httpStatus, params: { pageId, pageNumber }, body }) => {
			if (!auth.isAuthorized) {
				set.status = httpStatus.HTTP_401_UNAUTHORIZED;
				return UNAUTHORIZED;
			}

			const highestValdiPage = await getHighestValdiPage(pageId, auth.token);

			if (pageNumber !== highestValdiPage) {
				set.status = httpStatus.HTTP_409_CONFLICT;
				return {
					message: "Wrong page",
					error: {
						code: "WRONG_PAGE",
						message: `You are currently trying to answer ${pageNumber} but are${
							highestValdiPage === undefined
								? "'nt suppossed to answer anything"
								: ` suppossed to update page ${highestValdiPage}`
						}`,
					},
				};
			}

			const data = await e
				.select(e.Poll, () => ({
					pages: (page) => ({
						id: true,
						parts: (part) => ({
							id: true,
							type: true,
							masterType: true,

							...e.is(e.Switch, { text: true, default: true, varName: true }),
							...e.is(e.AnswerablePart, { answerType: true }),
							filter: e.op(
								part.masterType,
								"=",
								e.cast(e.GeneralType, "ANSWERABLE"),
							),
						}),
						filter: e.op(page.number, "=", pageNumber),
					}),
					filter_single: { id: e.cast(e.uuid, pageId) },
				}))
				.run(client)
				.then((res) => res?.pages[0])
				.catch(() => new Error());

			if (data instanceof Error) {
				set.status = httpStatus.HTTP_500_INTERNAL_SERVER_ERROR;
				return DATABASE_READ_FAILED;
			}
			if (!data) {
				set.status = httpStatus.HTTP_404_NOT_FOUND;
				return POLL_NOT_FOUND;
			}
			const parts = data.parts;

			const realIds = parts.map((p) => p.id);
			const bodyIds = Object.keys(body);
			if (!sameContent(realIds, bodyIds)) {
				set.status = httpStatus.HTTP_400_BAD_REQUEST;
				return {
					message: "additional or missing id",
					error: {
						code: "ADDITIONAL_OR_MISSING_ID",
						message:
							"Please specify all required ids but not any additional ones",
					},
				};
			}

			for (const part of parts) {
				if (part.answerType === null) {
					set.status = httpStatus.HTTP_500_INTERNAL_SERVER_ERROR;
					return INTERNAL_ERROR;
				}

				const expected = CUSTOM_TO_NORMAL_OBJ[part.answerType];
				const reality = typeof body[part.id];
				if (reality !== expected) {
					set.status = httpStatus.HTTP_400_BAD_REQUEST;
					return {
						message: `${part.id} is suppossed to be a ${part.answerType}(${expected}) not a ${reality}`,
						error: {
							code: "TYPE_ERROR",
							message: "Please use the right type at all times",
						},
					};
				}
			}

			// VALIDATION COMPLETED // WRITING VARIABLES //

			const variableParts = data.parts
				.filter(({ id }) => Object.keys(body).includes(id))
				.map((pa) => ({ ...pa, value: body[pa.id] }));

			// Yet it isn't used as it will be used in future for conditional branching
			const vars = createVarsObject(
				//@ts-expect-error These types aren't perfect so it is fine
				variableParts.map(({ answerType, varName, value }) => ({
					answerType,
					varName,
					value,
				})),
			);

			// WRITING VARIABLES COMPLETED // INSERT DATA //

			const respondent = generateHash(auth.token, data.id, Operations.ANSWER);
			const updates: $expr_Update[] = [];
			for (const key of Object.keys(body)) {
				const u = e.update(e.Part, (part) => ({
					set: {
						answers: {
							"+=": e.insert(e.Answer, { value: body[key], respondent }),
						},
					},
					filter_single: e.op(part.id, "=", e.cast(e.uuid, key)),
				}));
				updates.push(u);
			}

			const updateRes = await client.transaction(async (tx) => {
				const responseData: { id: string }[] = [];
				for (const update of updates) {
					const updateRes = (await update.run(tx)) as { id: string };
					responseData.push(updateRes);
				}
				return responseData;
			});

			// TODO: send the next page
			return { data: updateRes.map((d) => d.id) };
		},
		{
			params: t.Object({
				pageId: t.String({ format: "uuid" }),
				pageNumber: t.Numeric({
					minimum: 1,
					maximum: MAX_I16,
				}),
			}),
			body: t.Record(t.String({ format: "uuid" }), t.Union([t.Boolean()])),
		},
	);

export { pageIdRouter };
