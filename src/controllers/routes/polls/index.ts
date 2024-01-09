import { DATABASE_WRITE_FAILED, UNAUTHORIZED } from "@constants/responses";
import e from "@edgedb";
import { isLoggedIn } from "@utils/plugins/jwt";
import { Try } from "@utils/tryCatch";
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

			const query = e.insert(e.Poll, { ...body });
			const result = Try(
				async () =>
					await client.transaction(async (tx) => {
						return await query.run(tx);
					}),
			).catch(() => new Error());

			if (result instanceof Error) {
				set.status = httpStatus.HTTP_500_INTERNAL_SERVER_ERROR;
				return DATABASE_WRITE_FAILED;
			}

			const { id } = await result;

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
			}),
		},
	);

export { pollRouter };
