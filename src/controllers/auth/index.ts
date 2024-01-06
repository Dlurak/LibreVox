import { Elysia } from "elysia";
import { userJwt } from "@utils/plugins/jwt";

const authRouter = new Elysia({ name: "authRouter" })
  .use(userJwt)
  .get("/auth", ({ userJwt }) =>
    userJwt.sign({
      type: "anonymous",
    }),
  );

export { authRouter };
