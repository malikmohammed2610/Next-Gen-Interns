const router = require("express").Router();
const { requireAdmin } = require("../middleware/adminAuth");
const controller = require("../controllers/adminController");
router.get("/", requireAdmin, controller.dashboard);
router.get("/internships", requireAdmin, controller.internships);
router.post("/internships/:id/status", requireAdmin, controller.updateInternship);
router.get("/payments", requireAdmin, controller.payments);
module.exports = router;
