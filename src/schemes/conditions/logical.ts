import { type Static, Type } from "@sinclair/typebox";
import { BooleanSymbol } from "./symbols";

export const logicalOperatorsScheme = Type.Recursive((This) =>
	Type.Union([
		Type.Object({
			operation: Type.Union([
				Type.Literal("OR"),
				Type.Literal("AND"),
				Type.Literal("XOR"),
			]),
			values: Type.Tuple([BooleanSymbol(This), BooleanSymbol(This)]),
		}),
		Type.Object({
			operation: Type.Literal("NOT"),
			values: Type.Tuple([BooleanSymbol(This)]),
		}),
	]),
);

export type LogicalOperator = Static<typeof logicalOperatorsScheme>;
