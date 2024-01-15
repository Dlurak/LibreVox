import { MAX_I16 } from "@constants/ints";
import { type Static, t } from "elysia";
import { logicalOperatorsScheme } from "./logical";

export const pageConditionScheme = t.Object({
	page: t.Number({ minimum: 1, maximum: MAX_I16 }),
	condition: t.Union([logicalOperatorsScheme, t.Boolean()]),
});

export type PageCondition = Static<typeof pageConditionScheme>;
