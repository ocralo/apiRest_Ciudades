const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const mysql = require("mysql");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const con = mysql.createPool({
  connectionLimit: 500,
  host: "localhost",
  port: "3306",
  user: "root",
  password: "",
  database: "proyecto1"
});

app.get("/", function(req, res) {
  const sqlSelect = "SELECT * FROM Usuarios";
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

/* Metodo para verificar el login */
app.post("/login", function(req, res) {
  console.log(req.body.user, req.body.password);
  const sqlSelect = `SELECT email,password FROM Usuarios WHERE email='${req.body.user}' AND password='${req.body.password}'`;
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
            res.send(entre);
          } else {
            res.send(entre);
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

app.listen(8080, function() {
  console.log("Example app listening on port 8080!");
});
