import { describe, expect, test } from "bun:test";
import { parseLogicalCondition } from "@controller/conditions/logical";

describe("logical operators", () => {
	test("simple (without recursion)", () => {
		// AND
		expect(
			parseLogicalCondition({
				operation: "AND",
				values: [true, true],
			}),
		).toBeTrue();
		expect(
			parseLogicalCondition({
				operation: "AND",
				values: [false, true],
			}),
		).toBeFalse();

		// OR

		expect(
			parseLogicalCondition({
				operation: "OR",
				values: [false, true],
			}),
		).toBeTrue();
		expect(
			parseLogicalCondition({
				operation: "OR",
				values: [true, true],
			}),
		).toBeTrue();
		expect(
			parseLogicalCondition({
				operation: "OR",
				values: [false, false],
			}),
		).toBeFalse();

		// XOR
		expect(
			parseLogicalCondition({
				operation: "XOR",
				values: [false, true],
			}),
		).toBeTrue();
		expect(
			parseLogicalCondition({
				operation: "XOR",
				values: [true, true],
			}),
		).toBeFalse();
		expect(
			parseLogicalCondition({
				operation: "XOR",
				values: [false, false],
			}),
		).toBeFalse;

		// NOT
		expect(
			parseLogicalCondition({
				operation: "NOT",
				values: [true],
			}),
		).toBeFalse();
		expect(
			parseLogicalCondition({
				operation: "NOT",
				values: [false],
			}),
		).toBeTrue();
	});

	test("it with recursion", () => {
		expect(
			parseLogicalCondition({
				operation: "NOT",
				values: [
					{
						operation: "NOT",
						values: [true],
					},
				],
			}),
		).toBeTrue();

		expect(
			parseLogicalCondition({
				operation: "AND",
				values: [
					{
						operation: "NOT",
						values: [false],
					},
					{
						operation: "XOR",
						values: [
							{
								operation: "OR",
								values: [
									{
										operation: "NOT",
										values: [true],
									},
									false,
								],
							},
							{
								operation: "NOT",
								values: [
									{
										operation: "NOT",
										values: [true],
									},
								],
							},
						],
					},
				],
			}),
		).toBeTrue();
	});
});
