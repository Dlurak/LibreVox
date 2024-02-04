import {
	DATABASE_READ_FAILED,
	POLL_NOT_FOUND,
	POLL_NOT_FOUND_OR_ACCESS_DENIED,
	UNAUTHORIZED,
} from "@constants/responses";
import { getAllViewablePageIndexes } from "@controller/conditions/getPage";
import e from "@edgedb";
import { Operations, generateHash } from "@utils/hash/anonymous";
import { isLoggedIn } from "@utils/plugins/jwt";
import { TryError } from "@utils/tryCatch";
import { Elysia, t } from "elysia";
import { HttpStatusCode } from "elysia-http-status-code";
import { client } from "index";

import { pageIdRouter } from "./[id]/[page]";

const pollIdRouter = new Elysia({ name: "pollIdRouter" })
	.use(HttpStatusCode)
	.use(pageIdRouter)
	.use(isLoggedIn)
	.get(
		"/poll/:id",
		async ({ params: { id }, set, httpStatus, auth }) => {
			const viewablePages = auth.isAuthorized
				? await getAllViewablePageIndexes(id, auth.token)
				: [1];

			const poll = await TryError(
				() => {
					return e
						.select(e.Poll, () => ({
							...e.Poll["*"],
							creator: false,
							pages: (page) => ({
								number: true,
								filter: e.op(page.number, "in", e.set(...viewablePages)),
								parts: {
									id: true,
									type: true,

									...e.is(e.Switch, { text: true, default: true }),
									// text is useless as `text` is already defined
								},
							}),
							filter_single: { id: e.cast(e.uuid, id) },
						}))
						.run(client);
				},
				{ async: true },
			);

			if (!poll) {
				set.status = httpStatus.HTTP_404_NOT_FOUND;
				return POLL_NOT_FOUND;
			}
			if (poll instanceof Error) {
				set.status = httpStatus.HTTP_500_INTERNAL_SERVER_ERROR;
				return DATABASE_READ_FAILED;
			}

			return {
				data: {
					...poll,
					creationDate: poll.creationDate.getTime(),
				},
			};
		},
		{
			params: t.Object({
				id: t.String({ format: "uuid" }),
			}),
		},
	)
	.delete(
		"/poll/:id",
		async ({ auth, params: { id }, set, httpStatus }) => {
			if (!auth.isAuthorized) {
				set.status = httpStatus.HTTP_401_UNAUTHORIZED;
				return UNAUTHORIZED;
			}

			const result = await e
				.delete(e.Poll, () => ({
					filter_single: {
						id,
						creator: generateHash(auth.token, id, Operations.CREATE),
					},
				}))
				.run(client);

			if (!result) {
				set.status = httpStatus.HTTP_404_NOT_FOUND;
				return POLL_NOT_FOUND_OR_ACCESS_DENIED;
			}

			set.status = httpStatus.HTTP_200_OK;
			return { data: result };
		},
		{ params: t.Object({ id: t.String({ format: "uuid" }) }) },
	);

export { pollIdRouter };
