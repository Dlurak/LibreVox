import { describe, expect, test } from "bun:test";
import { Operations, generateHash } from "@utils/hash/anonymous";

describe("generate hash", () => {
	test("running it multiple times doesn't change the output", () => {
		const hashes = [generateHash("a", "a", Operations.CREATE)];

		for (let i = 0; i < 15; i++) {
			hashes.push(generateHash("a", "a", Operations.CREATE));
		}

		const baseHash = hashes[0];
		expect(hashes.every((h) => h === baseHash)).toBeTrue();
	});

	test("giving different inputs generates different outputs", () => {
		const hashes: string[] = [];

		for (let i = 0; i < 15; i++) {
			const newHash = generateHash(`${i}`, `${i}`, Operations.CREATE);
			expect(hashes.indexOf(newHash)).toBe(-1);
			hashes.push(newHash);
		}
	});
});
