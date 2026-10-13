const { getPool } = require("../config/database");

exports.dashboard = async (req, res, next) => {
  try {
    const pool = getPool();
    const [[users]] = await pool.query("SELECT COUNT(*) AS total FROM users WHERE role = 'user'");
    const [[pending]] = await pool.query("SELECT COUNT(*) AS total FROM internships WHERE publication_status = 'pending'");
    const [[published]] = await pool.query("SELECT COUNT(*) AS total FROM internships WHERE publication_status = 'published'");
    const [[payments]] = await pool.query("SELECT COUNT(*) AS total FROM payments WHERE status = 'captured'");
    res.render("admin/index", { title: "Admin control center", stats: { users: users.total, pending: pending.total, published: published.total, payments: payments.total } });
  } catch (err) { next(err); }
};

exports.internships = async (req, res, next) => {
  try {
    const [internships] = await getPool().query(
      "SELECT id, title, company_name, publication_status, verification_status, created_at FROM internships ORDER BY created_at DESC"
    );
    res.render("admin/internships", { title: "Manage internships", internships });
  } catch (err) { next(err); }
};

exports.updateInternship = async (req, res, next) => {
  try {
    const allowed = ["published", "rejected", "pending"];
    const status = String(req.body.publicationStatus || "");
    if (!allowed.includes(status)) return res.status(400).send("Invalid status.");
    await getPool().execute(
      "UPDATE internships SET publication_status = ?, approved_by = ?, approved_at = IF(? = 'published', CURRENT_TIMESTAMP, NULL) WHERE id = ?",
      [status, req.session.user.id, status, req.params.id]
    );
    req.flash("success", "Internship status updated. Verify employer details before publishing.");
    res.redirect("/admin/internships");
  } catch (err) { next(err); }
};

exports.payments = async (req, res, next) => {
  try {
    const [payments] = await getPool().query(
      `SELECT p.id, p.amount, p.currency, p.status, p.provider, p.provider_payment_id, p.created_at,
              u.full_name, u.email
       FROM payments p JOIN users u ON u.id = p.user_id
       ORDER BY p.created_at DESC LIMIT 200`
    );
    res.render("admin/payments", { title: "Payment records", payments });
  } catch (err) { next(err); }
};
