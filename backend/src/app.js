const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

/**
 * ✅ CORS CONFIG (Local + Vercel prod + Vercel previews)
 */
const allowedOrigins = [
  "http://localhost:3000",
  "https://stirring-assignment.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow server-to-server / Postman
      if (!origin) return callback(null, true);

      // Allow localhost, prod, and preview deployments
      if (
        allowedOrigins.includes(origin) ||
        origin.endsWith(".vercel.app")
      ) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

/**
 * ✅ Body parser
 */
app.use(express.json());

/**
 * ✅ Routes
 */
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/deals", require("./routes/deal.routes"));
app.use("/api/claims", require("./routes/claim.routes"));

/**
 * ✅ 404 fallback
 */
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

module.exports = app;
