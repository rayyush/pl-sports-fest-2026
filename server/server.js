const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const registrationRoutes = require("./routes/registrationRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

const PORT = process.env.PORT || 5050;

const path = require("path");

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.json({
    message: "PL Sports Fest 2026 API is running!",
  });
});

app.use("/api/registrations", registrationRoutes);
app.use("/api/admin", adminRoutes);

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();
