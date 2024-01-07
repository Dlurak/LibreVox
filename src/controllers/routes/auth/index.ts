import { userJwt } from "@utils/plugins/jwt";
import { Elysia } from "elysia";

const authRouter = new Elysia({ name: "authRouter" })
	.use(userJwt)
	.get("/auth", ({ userJwt }) =>
		userJwt.sign({
			type: "anonymous",
		}),
	);

export { authRouter };
