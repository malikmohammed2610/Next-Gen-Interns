const { getPool } = require("../config/database");

exports.list = async (req, res, next) => {
  try {
    const [internships] = await getPool().execute(
      `SELECT id, title, company_name, location, work_mode, stipend_min, stipend_max,
              currency, duration, category, description, verification_status
       FROM internships
       WHERE publication_status = 'published' AND verification_status = 'verified'
       ORDER BY created_at DESC`
    );
    res.render("internships/index", { title: "Explore internships", internships });
  } catch (err) { next(err); }
};

exports.detail = async (req, res, next) => {
  try {
    const [rows] = await getPool().execute(
      `SELECT id, title, company_name, location, work_mode, stipend_min, stipend_max,
              currency, duration, category, description, requirements, application_deadline
       FROM internships
       WHERE id = ? AND publication_status = 'published' AND verification_status = 'verified'
       LIMIT 1`,
      [req.params.id]
    );
    if (!rows.length) return res.status(404).render("errors/404", { title: "Internship not found" });
    res.render("internships/show", { title: rows[0].title, internship: rows[0] });
  } catch (err) { next(err); }
};
