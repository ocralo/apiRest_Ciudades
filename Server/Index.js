const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
var mysql = require("mysql");
const MongoClient = require("mongodb").MongoClient;
const Server = require("mongodb").Server;
const assert = require("assert");
var url = "mongodb://localhost:27017/";
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const con = mysql.createPool({
  connectionLimit: 500,
  host: "192.168.137.117",
  port: "3306",
  user: "pablito",
  password: "pablito",
  database: "proyecto1"
});

function getMongo() {}

function getMysql(res) {}

app.get("/", function(req, res) {
  const sqlSelect = "SELECT * FROM tablita";

  con.getConnection(function(error, tempCont) {
    if (error) {
      console.log("error coneccion DB");
    } else {
      console.log("Connected DB!");
      tempCont.query(sqlSelect, function(error, rows, field) {
        if (!!error) {
          console.log("error en el query");
        } else {
          tempCont.release();
          var entre = false;
          if (rows.length > 0) {
            entre = true;
            res.send(rows);
          } else {
            return null;
          }
        }
      });
    }
  });
});

app.post("/", function(req, res) {
  console.log(req.body.temp);
  res.send(req.body);
  const sqlSelect = `INSERT INTO tablita (variable,valor) VALUES ('${req.body.sen}','${req.body.val}')`;
  con.getConnection(function(error, tempCont) {
    if (error) {
      console.log("error coneccion DB");
    } else {
      console.log("Connected DB!");
      tempCont.query(sqlSelect, function(error, rows, field) {
        if (!!error) {
          console.log("error en el query");
        } else {
          tempCont.release();
        }
      });
    }
  });
});

app.get("/mongo", function(req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("tablon");
    dbo
      .collection("customers")
      .find({})
      .toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
      });
  });
  
});
app.post("/mongo", function(req, res) {});

app.listen(8080, function() {
  console.log("Example app listening on port 8080!");
});
