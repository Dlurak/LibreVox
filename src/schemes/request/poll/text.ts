import { type Static, t } from "elysia";

export const textScheme = t.Object({
	type: t.Literal("text"),
	body: t.Object({ text: t.String({ minLength: 1 }) }),
});

export type Text = Static<typeof textScheme>;
