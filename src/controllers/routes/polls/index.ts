import { DATABASE_WRITE_FAILED, UNAUTHORIZED } from "@constants/responses";
import e from "@edgedb";
import { switchSCheme } from "@schemes/request/poll/switch";
import { insertUiElementsQuery } from "@utils/database/insertUiElements";
import { Operations, generateHash } from "@utils/hash/anonymous";
import { isLoggedIn } from "@utils/plugins/jwt";
import { TryError } from "@utils/tryCatch";
import { Elysia, t } from "elysia";
import { HttpStatusCode } from "elysia-http-status-code";
import { client } from "index";

const pollRouter = new Elysia({ name: "pollRouter" })
	.use(HttpStatusCode())
	.use(isLoggedIn)
	.get("/poll", ({ set, httpStatus }) => {
		set.status = httpStatus.HTTP_501_NOT_IMPLEMENTED;
		return { error: "not implemented yet" };
	})
	.post(
		"/poll",
		async ({ set, auth, httpStatus, body }) => {
			const { isAuthorized } = auth;
			if (!isAuthorized) {
				set.status = httpStatus.HTTP_401_UNAUTHORIZED;
				return UNAUTHORIZED;
			}

			const writeQuery = (ids: string[]) =>
				e.insert(e.Poll, {
					...body,
					creator: "temp",
					pages: e.insert(e.Page, {
						parts: e.select(e.Part, (part) => ({
							filter: e.op(e.cast(e.str, part.id), "in", e.set(...ids)),
						})),
					}),
				});

			const updateQuery = (id: string) =>
				e.update(e.Poll, () => ({
					filter_single: { id },
					set: { creator: generateHash(auth.token, id, Operations.CREATE) },
				}));

			const writeResult = await TryError(
				async () =>
					await client.transaction(async (tx) => {
						const uiElementIds = await insertUiElementsQuery([
							{
								type: "switch",
								body: { default: true },
							},
							{
								type: "switch",
								body: { default: false },
							},
							{
								type: "switch",
								body: { default: true },
							},
						]);

						const { id } = await writeQuery(uiElementIds).run(tx);

						return await updateQuery(id)
							.run(tx)
							.catch(() => new Error());
					}),
				{ async: true },
			);

			if (writeResult instanceof Error || !writeResult) {
				set.status = httpStatus.HTTP_500_INTERNAL_SERVER_ERROR;
				return DATABASE_WRITE_FAILED;
			}

			const { id } = writeResult;

			set.status = httpStatus.HTTP_201_CREATED;
			return {
				message: "Poll successfully created",
				data: { id },
			};
		},
		{
			body: t.Object({
				title: t.String({ minLength: 1 }),
				description: t.Optional(t.String({ minLength: 1 })),
				visibility: t.Union([t.Literal("PUBLIC"), t.Literal("PRIVATE")]),
				pages: t.Array(
					t.Object({
						parts: t.Array(t.Union([switchSCheme]), { minItems: 1 }),
					}),
					{ minItems: 1 },
				),
			}),
		},
	);

export { pollRouter };
