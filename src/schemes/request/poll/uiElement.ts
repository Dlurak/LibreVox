import { Static, t } from "elysia";
import { switchSCheme } from "./switch";

export const uiElementScheme = t.Union([switchSCheme]);

export type UiElement = Static<typeof uiElementScheme>;
