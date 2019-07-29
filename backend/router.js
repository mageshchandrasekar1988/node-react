var mysql = require("./node_modules/mysql");
var express = require("./node_modules/express");

const app = express();
var routs = express.Router();
var cors = require("cors");

const connection = mysql.createConnection({
  host: "10.13.44.202",
  user: "dbadmin",
  password: "P@ssw0rd",
  database: "new_spark"
});
routs.use(cors());

connection.connect(function(error) {
  if (!!error) {
    console.log("Error");
  } else {
    console.log("connected..!");
  }
});

function Validation(data) {
  let errors = {};
  if (data.title === "") errors.title = "can't be empty";
  if (data.cover === "") errors.cover = "can't be empty";

  const isValid = Object.keys(errors).length === 0;
  return { errors, isValid };
}
routs.get("/api/games", function(req, resp) {
  connection.query("select id,title,url from test ", function(
    error,
    rows,
    fields
  ) {
    if (!!error) {
      console.log("Select SQL Error" + error);
    } else {
      var record = JSON.stringify(rows);
      var rows1 = '{ "total": ' + rows.length + ',"games": ' + record + "}";
      resp.json(JSON.parse(rows1));
    }
  });
});

routs.get("/api/games/:id", function(req, resp) {
  connection.query(
    "select id,title,url from test where id=" + req.params.id,
    function(error, rows) {
      if (!!error) {
        console.log("Select SQL Error" + error);
      } else {
        var record = JSON.stringify(rows[0]);
        var rows1 = '{ "total": ' + rows.length + ',"games": ' + record + "}";
        resp.json(JSON.parse(rows1));
      }
    }
  );
});

routs.post("/api/gamesUpdate/:id", function(req, resp) {
  const { errors, isValid } = Validation(req.body);
  if (isValid === true) {
    var sql =
      "update test set title='" +
      req.body.title +
      "',url='" +
      req.body.cover +
      "' where id='" +
      req.body.id +
      "'";
    connection.query(sql, function(error, result) {
      if (!!error) {
        resp.status(500).json({ errors: { global: "Insert Fail" } });
      } else {
        console.log(result);
        resp.json({ errors: { global: "Updated Successfully" } });
        //resp.json({ game: result.ops[0] });
      }
    });
  } else {
    resp.status(400).json({ errors });
  }
});

routs.delete("/api/gamesDelete/:id", function(req, resp) {
  var sql = "delete from  test where id='" + req.params.id + "'";
  connection.query(sql, function(error, result) {
    if (!!error) {
      resp.status(500).json({ errors: { global: "Insert Fail" } });
    } else {
      resp.json({ errors: { global: "Deleted Successfully" } });
    }
  });
});

routs.post("/api/games", function(req, resp) {
  const { errors, isValid } = Validation(req.body);
  if (isValid === true) {
    var sql =
      "insert into test (title,url) values ('" +
      req.body.title +
      "','" +
      req.body.cover +
      "')";
    connection.query(sql, function(error, result) {
      if (!!error) {
        resp.status(500).json({ errors: { global: "Insert Fail" } });
      } else {
        console.log(result);
        resp.json({ errors: { global: "Insert Successfully" } });
        //resp.json({ game: result.ops[0] });
      }
    });
  } else {
    resp.status(400).json({ errors });
  }
});
module.exports = routs;
