import { MAX_I16 } from "@constants/ints";
import { logicalOperatorsScheme } from "@schemes/conditions/logical";
import { Static, t } from "elysia";
import { uiElementScheme } from "./uiElement";

export const pageScheme = t.Object({
	parts: t.Array(uiElementScheme, { minItems: 1 }),
	nextPage: t.Array(
		t.Object({
			page: t.Number({ minimum: 1, maximum: MAX_I16 }),
			condition: t.Union([logicalOperatorsScheme, t.Boolean()]),
		}),
	),
});
export type Page = Static<typeof pageScheme>;
