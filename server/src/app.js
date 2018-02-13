const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const config = require("./config")

const app = express()

mongoose.connect(config.connectionString)

const User = require("./models/admin/user")

const indexRoute = require("./routes/index-route")
const userRoute = require("./routes/admin/user-route")

app.use(bodyParser.json({
  limit: '5mb'
}));
app.use(bodyParser.urlencoded({
  extended: false
}));

// Habilita o CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use("/", indexRoute)
app.use("/user", userRoute)

module.exports = app