const router = require("express").Router();
router.get("/", (req, res) => res.render("pages/home", { title: "Find your next opportunity" }));
module.exports = router;
