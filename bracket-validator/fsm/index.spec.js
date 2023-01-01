import assert from "node:assert";
import it, { describe } from "node:test";
import { validate } from "./index.js";

describe("validate sting", () => {
  it("---(++++)-----", () => {
    assert.strictEqual(validate("---(++++)-----"), true);
  });

  it("", () => {
    assert.strictEqual(validate(""), true);
  });

  it("before ( middle []) after ", () => {
    assert.strictEqual(validate("before ( middle []) after "), true);
  });

  it(") (", () => {
    assert.strictEqual(validate(") ("), false);
  });

  it("<( >)", () => {
    assert.strictEqual(validate("<( >)"), false);
  });

  it("( [ <> () ] <> )", () => {
    assert.strictEqual(validate("( [ <> () ] <> )"), false);
  });

  it("  (   [)", () => {
    assert.strictEqual(validate("  (   [)"), false);
  });
});
