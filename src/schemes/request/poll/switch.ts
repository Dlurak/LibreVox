import { type Static, t } from "elysia";

export const switchSCheme = t.Object({
	type: t.Literal("switch"),
	body: t.Object({ default: t.Boolean() }),
	varName: t.String(),
});

export type Switch = Static<typeof switchSCheme>;
