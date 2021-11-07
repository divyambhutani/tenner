const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const mongoose = require("mongoose");
const userRouter = require("./routes/userRouter");
const propertyRouter = require("./routes/propertyRouter");

const app = express();

//* MIDDLEWARE
app.use(express.json());

//* ROUTES
app.use("/api/v1/users", userRouter);
app.use("/api/v1/property", propertyRouter);

const dbUrl = process.env.MONGODB_URL.replace(
  "<password>",
  process.env.MONGODB_PASSWORD
);

mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started : http://127.0.0.1:${port}`);
});
