var express = require("express");
var bodyParser = require("./node_modules/body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var routs = require("./router");
app.use("/", routs);

/*app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-type");
  next();
});*/

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use((req, res) => {
  res.status(404).json({
    errors: {
      global: "Opps Somethis went wrong..!"
    }
  });
});
app.listen(3002, () => {
  console.log("server is running");
});
