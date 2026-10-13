const { validationResult } = require("express-validator");

function handleValidation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.validationErrors = errors.array();
    return res.status(422).render("errors/400", {
      title: "Please check your information",
      errors: errors.array()
    });
  }
  next();
}

module.exports = { handleValidation };
