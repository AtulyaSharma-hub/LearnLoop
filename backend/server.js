const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helpRoutes =
  require("./routes/helpRoutes");

const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(cors({

  origin: "http://localhost:5173",

  credentials: true

}));
app.use(express.json());


app.get("/", (req, res) => {
  res.send("LearnLoop Backend Running");
});
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/doubts",
  require("./routes/doubtRoutes")
);
// app.use("/api/ai",
//   require("./routes/aiRoutes")
// );
app.use("/api/help", helpRoutes);
app.use(
  "/uploads",
  express.static("uploads")
);

app.use((err, req, res, next) => {

  console.log(err.stack);

  res.status(500).json({

    message: "Server Error"

  });
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});