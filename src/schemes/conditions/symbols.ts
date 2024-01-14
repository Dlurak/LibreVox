import { type TThis, Type } from "@sinclair/typebox";

export const BooleanSymbol = (other: TThis) =>
	Type.Union([Type.Boolean(), other]);
