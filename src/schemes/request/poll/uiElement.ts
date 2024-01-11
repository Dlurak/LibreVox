import { Static, t } from "elysia";
import { seperatorScheme } from "./seperator";
import { switchSCheme } from "./switch";
import { textScheme } from "./text";

export const uiElementScheme = t.Union([
	switchSCheme,
	textScheme,
	seperatorScheme,
]);

export type UiElement = Static<typeof uiElementScheme>;
