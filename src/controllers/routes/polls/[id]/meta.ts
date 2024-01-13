import { DATABASE_READ_FAILED, POLL_NOT_FOUND } from "@constants/responses";
import e from "@edgedb";
import { TryError } from "@utils/tryCatch";
import { Elysia, t } from "elysia";
import { HttpStatusCode } from "elysia-http-status-code";
import { client } from "index";

const metaPollIdRouter = new Elysia({ name: "metaPollIdRouter" })
	.use(HttpStatusCode)
	.get(
		"/poll/:id/meta",
		async ({ params: { id }, set, httpStatus }) => {
			const poll = await TryError(
				() => {
					return e
						.select(e.Poll, () => ({
							...e.Poll["*"],
							creator: false,

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

export { metaPollIdRouter };
