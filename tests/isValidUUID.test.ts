import { describe, expect, test } from "bun:test";
import { isValidUUID } from "@utils/database/isValidUUID";

describe("isValidUUID", () => {
	test("valid uuid", () => {
		expect(isValidUUID("123e4567-e89b-12d3-a456-426614174000")).toBeTrue();
		expect(isValidUUID("6ba7b810-9dad-11d1-80b4-00c04fd430c8")).toBeTrue();
		expect(isValidUUID("f47ac10b-58cc-4372-a567-0e02b2c3d479")).toBeTrue();
	});

	test("invalid uuid", () => {
		expect(isValidUUID("invalid-uuid")).toBeFalse();
		expect(isValidUUID("123e4567-e89b-12d3-a456-42661417400")).toBeFalse();
		expect(isValidUUID("g47ac10b-58cc-4372-a567-0e02b2c3d479")).toBeFalse();
		expect(isValidUUID("6ba7b810-9dad-11d1-80b4-00c04fd430c8-")).toBeFalse();
	});
});
