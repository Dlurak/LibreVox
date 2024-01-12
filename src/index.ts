import { createConnectedClient } from "@controller/database";
import { Instances } from "@controller/instances/class";
import { router } from "@controller/routes/routes";
import { swagger } from "@elysiajs/swagger";
import { validateEnvVariables } from "@utils/env";
import { Elysia } from "elysia";

if (!validateEnvVariables()) {
	console.error("Please specify all needed enviroment variables.");
	console.error("Refer to src/utils/env.ts to see which you need to set.");
	console.error("This will be exported to the docs in the future");
	process.exit(1);
}

const client = await createConnectedClient();
console.log("Connected to the database!");

const app = new Elysia()
	.use(swagger({ path: "docs", autoDarkMode: true }))
	.use(router)
	.onError(({ code }) => {
		switch (code) {
			case "NOT_FOUND":
				return { error: "not found" };
		}
	});

if (process.env.ENV !== "test") {
	app.listen(process.env.PORT, (app) => {
		console.log(
			`App listens on ${app.url} in the ${process.env.ENV} enviroment`,
		);

		Instances.init().then(() => {
			const inLen = Instances.instances.length;
			const multipleInstances = inLen > 1;

			console.log(`Fetched ${inLen} instance${multipleInstances ? "s" : ""}`);
		});
	});
}

export { app, client };
