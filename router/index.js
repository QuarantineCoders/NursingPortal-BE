const express = require("express");
const user = require("./userRoutes");
const service = require("./serviceRoutes");
const address = require("./addressRoutes");
const tool = require("./toolRoutes");
const appointment = require("./appointmentRoutes");

const app = express();

app.use("/user", user);
app.use("/service", service);
app.use("/address", address);
app.use("/tool", tool);
app.use("/appointment", appointment);

module.exports = app;
