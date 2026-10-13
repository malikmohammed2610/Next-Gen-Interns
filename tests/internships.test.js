const test = require("node:test");
const assert = require("node:assert/strict");
const { reviewComplete, REQUIRED_REVIEW_ITEMS } = require("../services/internshipVerification");

test("verification is incomplete when checklist items are missing", () => {
  assert.equal(reviewComplete({}), false);
});

test("verification requires every review item", () => {
  const checklist = Object.fromEntries(REQUIRED_REVIEW_ITEMS.map((item) => [item, true]));
  assert.equal(reviewComplete(checklist), true);
});
