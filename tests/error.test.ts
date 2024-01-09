import { describe, expect, mock, test } from "bun:test";
import { Try } from "@utils/tryCatch";

const errorThrowingFunction = () => {
	throw new Error("Test Error");
};
const successfulFunction = () => "Test Value" as const;

describe("TryClass", () => {
	test("catch should handle error and return undefined", () => {
		const catchFunction = mock(() => "Oh no");
		const result = Try(errorThrowingFunction).catch(catchFunction);

		expect(result).toBe("Oh no");
		expect(catchFunction).toHaveBeenCalledWith(expect.any(Error));
	});

	test("catch should not be called for successful try", () => {
		const catchFunction = mock(() => {});

		const result = Try(successfulFunction).catch(catchFunction);

		expect(result).toBe("Test Value");
		expect(catchFunction).not.toHaveBeenCalled();
	});
});
