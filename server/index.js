const express = require("express");
const app = express();
const allRoutes = require("./routes");

app.use(express.json());
app.use("/api", allRoutes);

app.use(express.urlencoded({ extended: false }));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
