const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    mobile: {
      type: String,
      required: true,
    },

    flatNo: {
      type: String,
      required: true,
    },

    age: {
      type: Number,
      required: true,
    },
  },
  { _id: false },
);

const registrationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },

    sportId: {
      type: String,
      required: true,
    },

    sportName: {
      type: String,
      required: true,
    },

    categoryId: {
      type: String,
      required: true,
    },

    categoryName: {
      type: String,
      required: true,
    },

    ageGroup: {
      type: String,
      required: true,
    },

    format: {
      type: String,
      required: true,
    },

    players: {
      type: Number,
      required: true,
    },

    feePerPlayer: {
      type: Number,
      required: true,
    },

    fee: {
      type: Number,
      required: true,
    },

    playerDetails: {
      type: [playerSchema],
      default: [],
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    paymentScreenshot: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Registration", registrationSchema);
