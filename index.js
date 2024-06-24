const express = require("express");
const routes = require("./router/index.js");
const dbConnection = require("./config/database.js");
const errorHandler = require("./middleware/errorHandler.js");
const cors = require("cors");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/api/", routes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  dbConnection();
});
