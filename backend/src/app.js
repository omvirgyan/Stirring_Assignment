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
      "https://stirring-assignment-kc691k3v8-omvir-gyans-projects.vercel.app/" 
    ],
    credentials: true,
  })
);


app.use(express.json());
app.use(cors());

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/deals", require("./routes/deal.routes"));
app.use("/api/claims", require("./routes/claim.routes"));

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

module.exports = app;
