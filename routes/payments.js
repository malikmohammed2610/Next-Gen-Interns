const router = require("express").Router();
const { requireAuth } = require("../middleware/auth");
const controller = require("../controllers/paymentController");
router.get("/checkout/:planId", requireAuth, controller.checkout);
router.post("/webhook", expressRawBodyPlaceholder, controller.webhook);
function expressRawBodyPlaceholder(req, res, next) { next(); }
module.exports = router;
