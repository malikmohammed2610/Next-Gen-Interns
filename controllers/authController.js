const bcrypt = require("bcryptjs");
const { getPool } = require("../config/database");

exports.showRegister = (req, res) => res.render("auth/register", { title: "Create your account" });
exports.showLogin = (req, res) => res.render("auth/login", { title: "Log in" });
exports.showAdminLogin = (req, res) => res.render("admin/login", { title: "Admin login" });

exports.register = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password || password.length < 8) {
      req.flash("error", "Enter your name, a valid email, and a password with at least 8 characters.");
      return res.redirect("/register");
    }
    const pool = getPool();
    const [existing] = await pool.execute("SELECT id FROM users WHERE email = ?", [email.trim().toLowerCase()]);
    if (existing.length) {
      req.flash("error", "An account with that email already exists.");
      return res.redirect("/register");
    }
    const hash = await bcrypt.hash(password, 12);
    const [result] = await pool.execute(
      "INSERT INTO users (full_name, email, password_hash, role, status) VALUES (?, ?, ?, 'user', 'active')",
      [fullName.trim(), email.trim().toLowerCase(), hash]
    );
    req.session.user = { id: result.insertId, fullName: fullName.trim(), email: email.trim().toLowerCase(), role: "user" };
    res.redirect("/dashboard");
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "");
    const [rows] = await getPool().execute(
      "SELECT id, full_name, email, password_hash, role, status FROM users WHERE email = ? LIMIT 1",
      [email]
    );
    const user = rows[0];
    if (!user || user.status !== "active" || !(await bcrypt.compare(password, user.password_hash))) {
      req.flash("error", "Invalid email or password.");
      return res.redirect("/login");
    }
    req.session.regenerate((err) => {
      if (err) return next(err);
      req.session.user = { id: user.id, fullName: user.full_name, email: user.email, role: user.role };
      res.redirect(user.role === "admin" ? "/admin" : "/dashboard");
    });
  } catch (err) {
    next(err);
  }
};

exports.logout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    res.clearCookie("ngi.sid");
    res.redirect("/");
  });
};
