const express = require("express");
const multer = require("multer");

const { createRegistration } = require("../controllers/registrationController");

const router = express.Router();

const upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

router.post("/", upload.single("paymentScreenshot"), createRegistration);

module.exports = router;
