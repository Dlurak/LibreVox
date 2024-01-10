import { Static, t } from "elysia";
import { uiElementScheme } from "./uiElement";

export const pageScheme = t.Object({
	parts: t.Array(uiElementScheme, { minItems: 1 }),
});
export type Page = Static<typeof pageScheme>;
