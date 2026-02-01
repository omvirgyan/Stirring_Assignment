const Claim = require("../models/Claim");
const Deal = require("../models/Deal");
const User = require("../models/User");

exports.createClaim = async (req, res) => {
  const user = await User.findById(req.userId);
  const deal = await Deal.findById(req.params.dealId);

  if (!deal) {
    return res.status(404).json({ message: "Deal not found" });
  }

  if (deal.isLocked && !user.isVerified) {
    return res.status(403).json({ message: "Verification required" });
  }

  const existingClaim = await Claim.findOne({
    userId: user._id,
    dealId: deal._id,
  });

  if (existingClaim) {
    return res.status(400).json({ message: "Deal already claimed" });
  }

  const claim = await Claim.create({
    userId: user._id,
    dealId: deal._id,
  });

  res.status(201).json(claim);
};

exports.getMyClaims = async (req, res) => {
  const claims = await Claim.find({ userId: req.userId })
    .populate("dealId");

  res.json(claims);
};
