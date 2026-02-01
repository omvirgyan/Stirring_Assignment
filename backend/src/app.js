const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();


app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://stirring-assignment.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());


app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/deals", require("./routes/deal.routes"));
app.use("/api/claims", require("./routes/claim.routes"));


app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

module.exports = app;
