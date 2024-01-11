import { Static, t } from "elysia";
import { switchSCheme } from "./switch";
import { textScheme } from "./text";

export const uiElementScheme = t.Union([switchSCheme, textScheme]);

export type UiElement = Static<typeof uiElementScheme>;
