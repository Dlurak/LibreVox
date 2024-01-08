import { CONFIG } from "constants/config";
import { Elysia } from "elysia";
import { authRouter } from "./auth";
import { pollRouter } from "./polls";

/**
 * The plugin with all routes defined.
 * To define a new route create a new Elysia plugin in `src/controllers/routes`
 * and put it in this router located at `src/controllers/routes/routes.ts`
 */
const router = new Elysia()
	.use(authRouter)
	.use(pollRouter)
	.get("/", () => ({ isLibrePoll: true, instanceName: CONFIG.name }));

export { router };
