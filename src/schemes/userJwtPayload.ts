import { t } from "elysia";

export const userJwtPayloadScheme = t.Object({
	type: t.Union([
		t.Literal("anonymous"),
		// Registered users will be supported in the future
		// t.Literal('registered')
	]),
	seed: t.String(),
});
