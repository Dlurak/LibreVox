import { describe, expect, it } from "bun:test";
import { createVarsObject } from "@controller/variables/readVariables";

describe("variables", () => {
	it("maps a list into an object", async () => {
		expect(
			createVarsObject([
				{
					answerType: "BOOL",
					varName: "variable",
					value: true,
				},
				{
					answerType: "BOOL",
					varName: "variable",
					value: false,
				},
				{
					answerType: "BOOL",
					varName: "_",
					value: false,
				},
				{
					answerType: "BOOL",
					varName: "var42",
					value: false,
				},
			]),
		).toEqual({
			variable: {
				value: false,
				type: "BOOL",
			},
			var42: {
				value: false,
				type: "BOOL",
			},
		});
	});
});
