const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://stirring-assignment.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow Postman / server-side requests
      if (!origin) return callback(null, true);

      if (
        allowedOrigins.includes(origin) ||
        origin.includes(".vercel.app")
      ) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/deals", require("./routes/deal.routes"));
app.use("/api/claims", require("./routes/claim.routes"));

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

module.exports = app;
