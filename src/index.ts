import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { router } from "@controller/routes"
import { validateEnvVariables } from "@utils/env";

try {
  validateEnvVariables();
} catch (e) {
  console.error("Please specify all needed enviroment variables.");
  console.error("Refer to src/utils/env.ts to see which you need to set.")
  console.error("This will be exported to the docs in the future")
  process.exit(1);
}

new Elysia()
  .use(swagger({ path: "docs", autoDarkMode: true }))
  .use(router)
  .onError(({ code }) => {
    switch (code) {
      case "NOT_FOUND":
        return { error: "not found" };
    }
  })
  .listen(3000);
