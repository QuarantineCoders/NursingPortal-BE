const express = require("express");
const user = require("./userRoutes");
const address = require("./addressRoutes");

const app = express();

app.use("/user", user);
app.use("/address", address);

module.exports = app;
