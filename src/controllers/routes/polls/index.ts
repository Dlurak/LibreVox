import { UNAUTHORIZED } from "@constants/responses";
import { isLoggedIn } from "@utils/plugins/jwt";
import { Elysia } from "elysia";
import { HttpStatusCode } from "elysia-http-status-code";

const pollRouter = new Elysia({ name: "pollRouter" })
	.use(HttpStatusCode())
	.use(isLoggedIn)
	.get("/poll", ({ set, httpStatus }) => {
		set.status = httpStatus.HTTP_501_NOT_IMPLEMENTED;
		return { error: "not implemented yet" };
	})
	.post("/poll", ({ set, auth, httpStatus }) => {
		const { isAuthorized } = auth;
		if (!isAuthorized) {
			set.status = httpStatus.HTTP_401_UNAUTHORIZED;
			return UNAUTHORIZED;
		}

		// TODO actually crate it
		return "hi";
	});

export { pollRouter };
