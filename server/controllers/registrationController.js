const Registration = require("../models/Registration");

const createRegistration = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const registrations = JSON.parse(req.body.registrations);

    const totalAmount = Number(req.body.totalAmount);

    if (!Array.isArray(registrations) || registrations.length === 0) {
      return res.status(400).json({
        message: "No registrations found.",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Payment screenshot is required.",
      });
    }

    const createdRegistrations = [];

    for (const registration of registrations) {
      const newRegistration = await Registration.create({
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

        playerDetails: registration.playerDetails,

        totalAmount,

        paymentScreenshot: req.file.filename,
      });

      createdRegistrations.push(newRegistration);
    }

    res.status(201).json({
      success: true,
      message: "Registration submitted successfully.",
      registrations: createdRegistrations,
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
