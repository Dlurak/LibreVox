import { userJwt } from "@utils/plugins/jwt";
import { randomString } from "@utils/random";
import { Elysia } from "elysia";
import { verifyRouter } from "./verify";

const authRouter = new Elysia({ name: "authRouter" })
	.use(userJwt)
	.use(verifyRouter)
	.get("/auth", async ({ userJwt }) => {
		const token = await userJwt.sign({
			type: "anonymous",
			seed: `${Date.now()}${randomString(16)}`,
		});
		return token;
	});

export { authRouter };
