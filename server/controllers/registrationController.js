const Registration = require("../models/Registration");

const createRegistration = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const registrations = JSON.parse(req.body.registrations);
    const totalAmount = Number(req.body.totalAmount);

    if (!Array.isArray(registrations) || registrations.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No registrations found.",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Payment screenshot is required.",
      });
    }

    if (!totalAmount || totalAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid total amount.",
      });
    }

    // Create ONE MongoDB document for the complete submission
    const newRegistration = await Registration.create({
      registrations: registrations.map((registration) => ({
        type: registration.type,
        sportId: registration.sportId,
        sportName: registration.sportName,

        categoryId: registration.categoryId,
        categoryName: registration.categoryName,

        ageGroup: registration.ageGroup,
        format: registration.format,

        players: Number(registration.players),
        feePerPlayer: Number(registration.feePerPlayer),
        fee: Number(registration.fee),

        playerDetails: registration.playerDetails || [],
      })),

      totalAmount,

      paymentScreenshot: req.file.filename,

      status: "pending",
    });

    res.status(201).json({
      success: true,
      message: "Registration submitted successfully.",
      registration: newRegistration,
    });
  } catch (error) {
    console.error("Create registration error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to create registration.",
    });
  }
};

module.exports = {
  createRegistration,
};
