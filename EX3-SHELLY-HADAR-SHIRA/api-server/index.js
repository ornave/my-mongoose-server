const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const allRoutes = require("./routes");

dotenv.config();

const database = "mongodb://" + process.env.LOCALHOST + ":27017";
mongoose
  .connect(database, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use("/api", allRoutes);

app.use(express.urlencoded({ extended: false }));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
