const test = require("node:test");
const assert = require("node:assert/strict");
const { createCheckoutSession } = require("../services/paymentService");

test("payment collection remains disabled until provider integration is configured", async () => {
  await assert.rejects(createCheckoutSession(), /Payment provider is not configured/);
});
