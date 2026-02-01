const express = require("express");
const router = express.Router();
const dealController = require("../controllers/deal.controller");

router.get("/", dealController.getAllDeals);
router.get("/:id", dealController.getDealById);

module.exports = router;
