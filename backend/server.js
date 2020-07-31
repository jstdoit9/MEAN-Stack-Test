let express = require("express"),
  path = require("path"),
  mongoose = require("mongoose"),
  cors = require("cors"),
  bodyParser = require("body-parser");

const AppConfig = require("./config/app.config");
// Setting up port with express js
const dbconnection = require("./middleware/mongodb");

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cors());
app.use(express.static(path.join(__dirname, "app")));
app.use("/api", require("./routes/api"));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/app/index.html"));
});

// Create port
const port = process.env.PORT || AppConfig.Port;
const server = app.listen(port, () => {
  console.log("Connected to port " + port);
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message); // Log error message in our server's console
  if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
  res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
});
