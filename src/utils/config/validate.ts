import { MAX_INSTANCE_NAME_LEN } from "@constants/instances";
import { Static, Type } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";

export const schema = Type.Object({
	instances: Type.Array(Type.String(), { uniqueItems: true }),
	name: Type.String({
		minLength: 1,
		maxLength: MAX_INSTANCE_NAME_LEN,
	}),
});

export type Config = Static<typeof schema>;

/**
 * Returns true if the config is valid and false if it is invalid
 * @param config The config to check
 */
export const isValidConfig = (config: unknown) => Value.Check(schema, config);
