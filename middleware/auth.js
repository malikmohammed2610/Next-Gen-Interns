function requireAuth(req, res, next) {
  if (!req.session || !req.session.user) {
    req.flash("error", "Please register or log in to continue.");
    return res.redirect("/login");
  }
  next();
}

module.exports = { requireAuth };
