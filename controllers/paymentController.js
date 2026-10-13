exports.checkout = (req, res) => {
  res.status(501).render("pages/payment-pending", {
    title: "Secure checkout",
    message: "Real payment collection will be enabled after the payment provider is configured and verified in Step 4."
  });
};

exports.webhook = (req, res) => {
  // Implement provider signature verification before accepting payment events.
  res.status(501).json({ error: "Payment webhook is not configured yet." });
};
