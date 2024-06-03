const express = require("express");
const routes = require("./router/index.js");
const dbConnection = require("./config/database.js");
const errorHandler = require("./middleware/errorHandler.js");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/", routes);

app.use(errorHandler);

app.listen(5000, () => {
  console.log("Server is running on port 3000");
  dbConnection();
});
