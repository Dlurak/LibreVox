import { describe, expect, it } from "bun:test";
import { app } from "index";
import { getBaseUrl } from "./utils/url";

const parseCookie = (cookie: string) => cookie.split("; ")[0].split("=");

describe("auth works", () => {
  it("the cookie and the response body are equal", async () => {
    const response = await app
      .handle(new Request(`${getBaseUrl()}/auth`))
      .then(async (res) => ({
        cookies: res.headers.getSetCookie().map((c) => parseCookie(c)),
        text: await res.text(),
      }));

    expect(response.text).not.toBe("");
    expect(response.cookies.some(
      (i) => JSON.stringify(i) === JSON.stringify(["auth", response.text]),
    )).toBe(true);
  });
  // TODO: Write a test to verify that verification works
});
