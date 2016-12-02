var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var path = require("path");
var mongoose = require("mongoose");
var morgan = require("morgan");
var config = require("./config");
var expressJwt = require("express-jwt");

var port = process.env.PORT || 7000;

app.use(morgan("dev"));
app.use(bodyParser.json());

// let express serve up the static files for us
app.use(express.static(path.join(__dirname, "public")));

// allow configuration of the database
mongoose.connect(config.database, function (err) {
    if (err) throw (err);
    console.log("Successfully connected to the database");
});

// Make the app use the express-jwt authentication middleware on anything starting with "/api"
app.use("/api", expressJwt({secret: config.secret}));

// The "/api" at the beggining of these routes makes it so incoming requests
// must go through the express-jwt middleware before accessing any tasks soldiers or tasks.
app.use("/api/soldiers", require("./routes/soldierRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));
//app.use("api/opord", require("./routes/opordRoutes"));

// make these routes go through authRoutes
app.use("/auth", require("./routes/authRoutes"));

app.listen(port, function () {
    console.log("Server is listening on port " + port);
});
