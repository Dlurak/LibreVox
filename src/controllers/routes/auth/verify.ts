import { userJwt } from "@utils/plugins/jwt";
import { Elysia, t } from "elysia";

export const verifyRouter = new Elysia({ name: "verifyRouter" })
	.use(userJwt)
	.get(
		"/auth/verify",
		async ({ cookie, userJwt }) => {
			const token = JSON.parse(JSON.stringify(cookie.auth));
			const payload = await userJwt.verify(token);
			console.log(token);

			return !!payload
				? { valid: true, type: payload.type }
				: { valid: false, type: "invalid" };
		},
		{
			cookie: t.Cookie({
				// for a reason idk this doesn't work
				// I asked in the discord for help maybe I will optimize this in the near future
				auth: t.Any(),
			}),
		},
	);
