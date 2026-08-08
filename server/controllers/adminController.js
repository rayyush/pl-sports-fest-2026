const jwt = require("jsonwebtoken");
const Registration = require("../models/Registration");

const path = require("path");
const fs = require("fs");

const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required.",
      });
    }

    if (
      username !== process.env.ADMIN_USERNAME ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({
        message: "Invalid username or password.",
      });
    }

    const token = jwt.sign(
      {
        role: "admin",
        username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "8h",
      },
    );

    res.json({
      success: true,
      message: "Admin login successful.",
      token,
    });
  } catch (error) {
    console.error("Admin login error:", error);

    res.status(500).json({
      success: false,
      message: "Login failed.",
    });
  }
};

const getRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      registrations,
    });
  } catch (error) {
    console.error("Get registrations error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch registrations.",
    });
  }
};

const updateRegistrationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ["pending", "verified", "rejected"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid registration status.",
      });
    }

    const registration = await Registration.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );

    if (!registration) {
      return res.status(404).json({
        message: "Registration not found.",
      });
    }

    res.json({
      success: true,
      message: "Registration status updated.",
      registration,
    });
  } catch (error) {
    console.error("Update status error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update registration status.",
    });
  }
};

const deleteRegistration = async (req, res) => {
  try {
    const { id } = req.params;

    const registration = await Registration.findById(id);

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "Registration not found.",
      });
    }

    // Delete payment screenshot from uploads folder
    if (registration.paymentScreenshot) {
      const filePath = path.join(
        __dirname,
        "..",
        "uploads",
        registration.paymentScreenshot,
      );

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await Registration.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Registration deleted successfully.",
    });
  } catch (error) {
    console.error("Delete registration error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete registration.",
    });
  }
};

module.exports = {
  adminLogin,
  getRegistrations,
  updateRegistrationStatus,
  deleteRegistration,
};
