import { pageConditionScheme } from "@schemes/conditions/pageCondition";
import { Static, t } from "elysia";
import { uiElementScheme } from "./uiElement";

export const pageScheme = t.Object({
	parts: t.Array(uiElementScheme, { minItems: 1 }),
	nextPage: t.Array(pageConditionScheme),
});

export type Page = Static<typeof pageScheme>;
