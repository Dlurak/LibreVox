import { Elysia } from "elysia";
import { authRouter } from "./auth";

/**
 * The plugin with all routes defined.
 * To define a new route create a new Elysia plugin in `src/controllers`
 * and put it in this router located at `src/controllers/routes.ts`
 */
const router = new Elysia()
	.use(authRouter)
	.get("/", () => ({ isLibrePoll: true, instanceName: "LibrePollOfficial" }));

export { router };
