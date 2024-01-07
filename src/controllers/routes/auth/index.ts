import cookie from "@elysiajs/cookie";
import { userJwt } from "@utils/plugins/jwt";
import { Elysia } from "elysia";
import { verifyRouter } from "./verify";

const authRouter = new Elysia({ name: "authRouter" })
	.use(userJwt)
	.use(verifyRouter)
	.use(cookie())
	.get("/auth", async ({ userJwt, setCookie }) => {
		const token = await userJwt.sign({ type: "anonymous" });
		setCookie("auth", token, { path: "/" });
		return token;
	});

export { authRouter };
