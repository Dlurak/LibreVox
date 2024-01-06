import { Type, Static } from '@sinclair/typebox'
import { Value } from '@sinclair/typebox/value'

const envVariables = Type.Object({
	JWT_SECRET: Type.String({ minLength: 8 })
});

declare module "bun" {
	// biome-ignore lint: It is needed to have it like this as an interface
	interface Env extends Static<typeof envVariables> {}
}

export const validateEnvVariables = () => Value.Check(envVariables, process.env)
