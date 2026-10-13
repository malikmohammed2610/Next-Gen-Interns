const { getPool } = require("../config/database");

exports.apply = async (req, res, next) => {
  try {
    const internshipId = Number(req.params.id);
    if (!Number.isInteger(internshipId) || internshipId < 1) return res.status(400).send("Invalid internship.");
    const pool = getPool();
    const [internships] = await pool.execute(
      "SELECT id FROM internships WHERE id = ? AND publication_status = 'published' AND verification_status = 'verified'",
      [internshipId]
    );
    if (!internships.length) {
      req.flash("error", "This internship is unavailable.");
      return res.redirect("/internships");
    }
    await pool.execute(
      "INSERT INTO applications (user_id, internship_id, status) VALUES (?, ?, 'submitted')",
      [req.session.user.id, internshipId]
    );
    req.flash("success", "Your application has been submitted.");
    res.redirect("/dashboard");
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      req.flash("error", "You have already applied to this internship.");
      return res.redirect("/internships");
    }
    next(err);
  }
};
