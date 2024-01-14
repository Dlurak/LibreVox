import { sameContent } from "@utils/arrays/sameContent";
import { describe, expect, test } from "bun:test";

describe("two arrays have the same content", () => {
  test("returns true with sorted arrays", () => {
    expect(sameContent([1, 2, 3], [1, 2, 3])).toBeTrue();
    expect(sameContent(["1", "2", "3"], ["1", "2", "3"])).toBeTrue();
  });

  test("returns true with unsorted arrays", () => {
    expect(sameContent([3, 2, 1], [1, 2, 3])).toBeTrue();
    expect(sameContent(["3", "2", "1"], ["1", "2", "3"])).toBeTrue();
  });

  test("returns false", () => {
    expect(sameContent([1, 2, 3], [1, 2, 3, 4]));
  });
});
