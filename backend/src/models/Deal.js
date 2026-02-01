const mongoose = require("mongoose");

const dealSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    partnerName: {
      type: String,
      required: true,
    },
    isLocked: {
      type: Boolean,
      default: false,
    },
    eligibilityCriteria: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Deal", dealSchema);
