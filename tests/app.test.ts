import { CONFIG } from "@constants/config";
import { describe, expect, it } from "bun:test";
import { app } from "index";
import { getBaseUrl } from "./utils/url";

describe("tests are setup", () => {
  it("sets the enviroment to test", () => {
    expect(process.env.ENV).toBe("test");
  });

  it("starts the server", async () => {
    const response = await app
      .handle(new Request(getBaseUrl()))
      .then((res) => res.json());

    expect(response).toEqual({
      instanceName: CONFIG.name,
      isLibrePoll: true,
    });
  });
});
