const router = require("express").Router();
const { requireAuth } = require("../middleware/auth");
const controller = require("../controllers/dashboardController");
router.get("/", requireAuth, controller.index);
module.exports = router;
