const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load environment variables first
dotenv.config();

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: "*", // Change to your Netlify domain when frontend is live
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/user", require("./routes/userRoutes"));

// Test route
app.get("/test", (req, res) => {
  res.json({ message: "Backend is live!" });
});

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to Clavora Backend");
});

// 404 handler (optional)
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

