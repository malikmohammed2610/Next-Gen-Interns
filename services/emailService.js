async function sendEmail({ to, subject, text }) {
  // Configure a trusted SMTP/email provider before production.
  console.info("Email service is not configured; message not sent:", { to, subject });
  return { sent: false, reason: "not_configured", preview: String(text || "").slice(0, 120) };
}
module.exports = { sendEmail };
