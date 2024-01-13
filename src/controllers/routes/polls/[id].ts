import { DATABASE_READ_FAILED, POLL_NOT_FOUND } from "@constants/responses";
import e from "@edgedb";
import { TryError } from "@utils/tryCatch";
import { Elysia, t } from "elysia";
import { HttpStatusCode } from "elysia-http-status-code";
import { client } from "index";

const pollIdRouter = new Elysia({ name: "pollIdRouter" })
	.use(HttpStatusCode)
	.get(
		"/poll/:id",
		async ({ params: { id }, set, httpStatus }) => {
			const poll = await TryError(
				() => {
					return e
						.select(e.Poll, () => ({
							...e.Poll["*"],
							creator: false,
							pages: {
								number: true,
								parts: {
									id: true,

									...e.is(e.Switch, { text: true, default: true }),
									// todo: the actual db entry gets an field type so i can return the type
									// text is useless as `text` is already defined
								},
							},
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

			return { data: poll };
		},
		{
			params: t.Object({
				id: t.String({ format: "uuid" }),
			}),
		},
	);

export { pollIdRouter };
