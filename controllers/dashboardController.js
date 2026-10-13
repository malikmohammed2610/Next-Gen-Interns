const { getPool } = require("../config/database");

exports.index = async (req, res, next) => {
  try {
    const [applications] = await getPool().execute(
      `SELECT a.id, a.status, a.created_at, i.title, i.company_name
       FROM applications a JOIN internships i ON i.id = a.internship_id
       WHERE a.user_id = ? ORDER BY a.created_at DESC`,
      [req.session.user.id]
    );
    const [subscriptions] = await getPool().execute(
      `SELECT s.status, s.starts_at, s.ends_at, p.name AS plan_name
       FROM subscriptions s JOIN plans p ON p.id = s.plan_id
       WHERE s.user_id = ? ORDER BY s.created_at DESC LIMIT 5`,
      [req.session.user.id]
    );
    res.render("dashboard/index", { title: "Your dashboard", applications, subscriptions });
  } catch (err) { next(err); }
};
