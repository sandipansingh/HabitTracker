import { env } from "./config/env.js";
import cors from "cors";
import express from "express";
import connectDB from "./config/db.js";
import habitRoutes from "./routes/habitRoutes.js";
import authRoutes from "./routes/authRoutes.js";

connectDB();

const app = express();

const allowedOrigins = env.ALLOWED_ORIGINS.split(",").map((o) => o.trim());

// CORS
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

// Body parsers – both JSON and URL‑encoded
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Logging middleware (helps debug)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  if (req.body && Object.keys(req.body).length) {
    console.log("  body:", req.body);
  }
  next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/habits", habitRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "API is running . . ." });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Global error:", err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

const PORT = env.PORT;
app.listen(PORT, () => {
  console.log(`Server Running on PORT ${PORT}`);
});
