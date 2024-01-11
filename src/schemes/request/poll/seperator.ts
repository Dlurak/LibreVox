import { type Static, t } from "elysia";

export const seperatorScheme = t.Object({
	type: t.Literal("seperator"),
	body: t.Object({}),
});

export type Seperator = Static<typeof seperatorScheme>;
