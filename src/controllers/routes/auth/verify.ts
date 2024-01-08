import { UNAUTHORIZED } from "@constants/responses";
import { isLoggedIn } from "@utils/plugins/jwt";
import { Elysia } from "elysia";
import { HttpStatusCode } from "elysia-http-status-code";

export const verifyRouter = new Elysia({ name: "verifyRouter" })
  .use(isLoggedIn)
  .use(HttpStatusCode())
  .get("/auth/verify", async ({ set, auth, httpStatus }) => {
    const { isAuthorized } = auth;
    if (!isAuthorized) {
      set.status = httpStatus.HTTP_401_UNAUTHORIZED;
      return UNAUTHORIZED;
    }

    return { type: auth.payload.type } as const;
  });
