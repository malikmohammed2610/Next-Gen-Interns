const { getPool } = require("../config/database");

exports.list = async (req, res, next) => {
  try {
    const [plans] = await getPool().execute(
      "SELECT id, name, price, currency, features FROM plans WHERE is_active = 1 ORDER BY sort_order"
    );
    res.render("pages/plans", { title: "Membership plans", plans });
  } catch (err) { next(err); }
};
