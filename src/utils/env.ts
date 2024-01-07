import { Static, Type } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";

const enviroments = ["production", "test", "development"] as const;
const literalEnviroments = enviroments.map((s) => Type.Literal(s));

const envVariables = Type.Object({
	JWT_SECRET: Type.String({ minLength: 8 }),
	PORT: Type.RegExp(
		/^(?:[1-9]\d{0,4}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/,
	),
	ENV: Type.Union(literalEnviroments),
});

type EnvVariablesType = Static<typeof envVariables>;

declare module "bun" {
	// biome-ignore lint: It is needed to have it like this as an interface
	interface Env extends EnvVariablesType {}
}

export const validateEnvVariables = () =>
	Value.Check(envVariables, process.env);
