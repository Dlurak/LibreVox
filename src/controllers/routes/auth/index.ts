import { userJwt } from "@utils/plugins/jwt";
import { Elysia } from "elysia";
import { verifyRouter } from "./verify";

const authRouter = new Elysia({ name: "authRouter" })
	.use(userJwt)
	.use(verifyRouter)
	.get("/auth", async ({ userJwt }) => {
		const token = await userJwt.sign({ type: "anonymous" });
		return token;
	});

export { authRouter };
