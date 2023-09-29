const express = require("express");
const { config } = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const configureDB = require("./config/database");
const app = express();
const router = require("./routes/route");

config({
  path: "./config/config.env",
});

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);

configureDB();

app.use("/api", router);
app.get("/", (req, res) => {
  res.send(
    `<h1>Site is Working. click <a href=${process.env.FRONTEND_URL}>here</a> to visit frontend.</h1>`
  );
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port: ${process.env.PORT}`);
});
