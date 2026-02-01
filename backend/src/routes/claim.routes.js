const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const claimController = require("../controllers/claim.controller");

router.post("/:dealId", authMiddleware, claimController.createClaim);
router.get("/me", authMiddleware, claimController.getMyClaims);

module.exports = router;
