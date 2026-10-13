function requireAdmin(req, res, next) {
  const user = req.session && req.session.user;
  if (!user || user.role !== "admin") {
    req.flash("error", "Admin access is required.");
    return res.redirect("/admin/login");
  }
  next();
}

module.exports = { requireAdmin };
