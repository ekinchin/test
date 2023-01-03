import assert from "node:assert";
import it, { describe } from "node:test";
import { string_compare } from "./index.js";

describe("string comparation", () => {
  it('"apple", "apricot"', () => {
    const result = string_compare("apple", "apricot");
    assert.strictEqual(result < 0, true);
  });

  it('"pear", "avocado"', () => {
    const result = string_compare("pear", "avocado");
    assert.strictEqual(result > 0, true);
  });

  it('"zz", "zzzz"', () => {
    const result = string_compare("zz", "zzzz");
    assert.strictEqual(result < 0, true);
  });
});
