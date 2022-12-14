const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5002;
const mongoose = require("mongoose");

const transactions = require("./routes/transaction");

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("mongodb connected !"))
  .catch((err) => console.log(err));

app.use("/", transactions);

app.listen(port, () => console.log(`server at ${port}`));

module.exports = app;
