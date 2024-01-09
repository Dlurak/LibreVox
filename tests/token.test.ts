import { describe, expect, it } from "bun:test";
import { app } from "index";
import { getBaseUrl } from "./utils/url";

describe("auth works", () => {
	it("the cookie and the response body are equal", async () => {
		const response = await app
			.handle(new Request(`${getBaseUrl()}/auth`))
			.then(async (res) => await res.text());

		expect(response).not.toBe("");
	});
	// TODO: Write a test to verify that verification works
});
