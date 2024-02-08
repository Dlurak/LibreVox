import { MAX_I16 } from "@constants/ints";
import { DATABASE_WRITE_FAILED, UNAUTHORIZED } from "@constants/responses";
import e from "@edgedb";
import { Page, pageScheme } from "@schemes/request/poll/page";
import { insertPages } from "@utils/database/insertPages";
import { Operations, generateHash } from "@utils/hash/anonymous";
import { isLoggedIn } from "@utils/plugins/jwt";
import { TryError } from "@utils/tryCatch";
import { Elysia, t } from "elysia";
import { HttpStatusCode } from "elysia-http-status-code";
import { client } from "index";
import { pollIdRouter } from "./[id]";

const pollRouter = new Elysia({ name: "pollRouter" })
	.use(HttpStatusCode())
	.use(isLoggedIn)
	.use(pollIdRouter)
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

			const bodyPages = body.pages.map((p) => p.nextPage.map((p) => p.page));
			const smallestBodyPages = bodyPages.map((p) => Math.min(...p));

			if (!smallestBodyPages.every((n, i) => n > i + 1)) {
				set.status = httpStatus.HTTP_400_BAD_REQUEST;
				return {
					message: "invalid numbering",
					error: {
						code: "INVALID_NUMBERING",
						message:
							"Numbers may only go up (from 1 --> 2...) not down (3-->2-->2)",
					},
				};
			}

			const biggestNextPage = Math.max(
				...body.pages.flatMap((p) => p.nextPage).map((p) => p.page),
			);
			const bodyPagesAmount = body.pages.length;

			if (biggestNextPage > bodyPagesAmount) {
				set.status = httpStatus.HTTP_400_BAD_REQUEST;
				return {
					message: "A page cannot point to a page that does not exist",
					error: {
						code: "PAGE_DOES_NOT_EXIST",
						message: `You are only creating ${bodyPagesAmount} pages but referenced a page ${biggestNextPage}`,
					},
				};
			}

			const writeQuery = async (pages: Page[]) => {
				const pageIds = await insertPages(pages);
				return e.insert(e.Poll, {
					...body,
					creator: "temp",
					pages: e.select(e.Page, (page) => ({
						filter: e.op(e.cast(e.str, page.id), "in", e.set(...pageIds)),
					})),
				});
			};

			const updateQuery = (id: string) =>
				e.update(e.Poll, () => ({
					filter_single: { id },
					set: { creator: generateHash(auth.token, id, Operations.CREATE) },
				}));

			const writeResult = await TryError(
				async () =>
					await client
						.transaction(async (tx) => {
							const { id } = await writeQuery(body.pages)
								.then((q) => q.run(tx))
								.catch((e) => {
									console.log(e);
									return { id: new Error() };
								});

							if (id instanceof Error) return new Error();

							return await updateQuery(id)
								.run(tx)
								.catch(() => new Error());
						})
						.catch((e) => {
							throw e;
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
				pages: t.Array(pageScheme, { minItems: 1, maxItems: MAX_I16 }),
			}),
		},
	);

export { pollRouter };
