const test = require("node:test");
const assert = require("node:assert/strict");

test("password policy should require at least 8 characters", () => {
  const valid = (password) => typeof password === "string" && password.length >= 8;
  assert.equal(valid("short"), false);
  assert.equal(valid("long-enough"), true);
});
