const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const journalRoutes = require("./routes/journalRoutes");

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "https://rainbow-cajeta-99bb26.netlify.app",
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => res.send("API is running..."));
app.use("/api/auth", authRoutes);
app.use("/api/journals", journalRoutes);

// Start Server
const PORT = process.env.PORT;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error(" MongoDB connection error:", err));

