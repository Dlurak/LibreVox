import { Value } from "@sinclair/typebox/value";
import { isValidConfig, schema } from "./validate";

export const readConfig = async (path: string) => {
	const file = await Bun.file(path)
		.text()
		.then((f) => JSON.parse(f))
		.catch((e) => {
			console.log(e);
			console.error(`Config (${path}) isn't parsable to JSON`);
			console.error("Please read the docs about configuering your instance");
			throw new Error(`Config (${path}) isn't parsable to JSON`);
		});

	if (!isValidConfig(file)) {
		console.error(`Config (${path}) isn't a valid config`);
		console.error("Please read the docs about configuering your instance");
		throw new Error(`Config (${path}) isn't a valid config.`);
	}

	return Value.Decode(schema, file);
};
