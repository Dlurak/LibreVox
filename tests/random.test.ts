import { describe, expect, test } from "bun:test";
import { randomString } from "@utils/random";

describe("randomString", () => {
	test("it has the length that is specified", () => {
		for (let i = 0; i < 50; i++) {
			expect(randomString(i).length).toBe(i);
		}
	});

	test("it is random", () => {
		const randomStrings: string[] = [];
		for (let i = 0; i < 50; i++) {
			const string = randomString(16);
			expect(randomStrings.indexOf(string)).toBe(-1);
			randomStrings.push(string);
		}
	});
});
