const express = require("express");

const {
  adminLogin,
  getRegistrations,
  updateRegistrationStatus,
  deleteRegistration,
} = require("../controllers/adminController");

const adminAuth = require("../middleware/adminAuth");

const router = express.Router();

router.post("/login", adminLogin);

router.get("/verify", adminAuth, (req, res) => {
  res.json({
    success: true,
    admin: req.admin,
  });
});

router.get("/registrations", adminAuth, getRegistrations);

router.patch("/registrations/:id/status", adminAuth, updateRegistrationStatus);

router.delete("/registrations/:id", adminAuth, deleteRegistration);

module.exports = router;
