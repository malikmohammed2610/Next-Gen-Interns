const router = require("express").Router();
const { requireAuth } = require("../middleware/auth");
const controller = require("../controllers/applicationController");
router.post("/:id", requireAuth, controller.apply);
module.exports = router;
