/*
 * Real payment integration is intentionally not enabled in this scaffold.
 * Step 4 will add provider order creation, signature verification, webhook
 * verification, idempotency, and verified transaction persistence.
 */
async function createCheckoutSession() {
  throw new Error("Payment provider is not configured. Complete Step 4 before accepting money.");
}

module.exports = { createCheckoutSession };
