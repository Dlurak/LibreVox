import { type Static, t } from "elysia";

export const switchSCheme = t.Object({
	type: t.Literal("switch"),
	body: t.Object({ default: t.Boolean() }),
});

export type Switch = Static<typeof switchSCheme>;
