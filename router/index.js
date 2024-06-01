const express = require("express");
const user = require("./userRoutes");

const app = express();

app.use("/user", user);

module.exports = app;
