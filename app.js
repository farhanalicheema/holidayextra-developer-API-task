const express = require("express");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const app = express();
const swig = require("swig");
const config = require("./configs/config");
require("./configs/db");
const port = process.env.PORT || config.port;

app.engine("html", swig.renderFile);
app.set("view engine", "html");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Load all routes
fs.readdirSync(__dirname + "/controllers").forEach(function(controllerName) {
  if (controllerName.substr(-3) == ".js") {
    let controller = require("./controllers/" + controllerName);
    controller(app);
  }
});

app.listen(port);
console.log("Application Started on http://localhost:" + port);