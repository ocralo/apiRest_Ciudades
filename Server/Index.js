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

/* app.get("/", function(req, res) {
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
 */
/* Metodo para obtener los Pacientes existentes */
app.get("/users", function(req, res) {
  const sqlSelect = "SELECT name,apellido,edad,cedula,email FROM Usuarios";
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
          if (rows.length > 0) {
            res.send(rows);
          } else {
            res.send(null);
          }
        }
      });
    }
  });
});
/* Metodo para obtener el id del paciente los Pacientes existentes */
app.get("/users/id", function(req, res) {
  const sqlSelect = "SELECT idUsuario,name FROM Usuarios";
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
          if (rows.length > 0) {
            res.send(rows);
          } else {
            res.send(null);
          }
        }
      });
    }
  });
});

/* Metodo para enviar los datos del usuario seleccionado */
app.post("/users/register", function(req, res) {
  const sqlInsert = `INSERT INTO Usuarios ( name, apellido, edad, cedula, email, password) VALUES ('${req.body.nombre}', '${req.body.apellido}', '${req.body.edad}', '${req.body.cedula}', '${req.body.correo}', '${req.body.contra}')`;
  console.log(sqlInsert);
  con.getConnection(function(error, tempCont) {
    if (error) {
      console.log("error coneccion DB");
    } else {
      console.log("Connected DB!");
      tempCont.query(sqlInsert, function(error) {
        if (!!error) {
          console.log("error en el query");
          res.send(false)
        } else {
          res.send(true)
          tempCont.release();
        }
      });
    }
  });
});

/* Metodo para craear un dispositivo */
app.post("/dispo/register", function(req, res) {
  const sqlInsert = `INSERT INTO Dispositivos ( nameDispositivo, zone, fkUser) VALUES ( '${req.body.namedispo}', '${req.body.zona}', '${req.body.idUser}')`;
  console.log(sqlInsert);
  con.getConnection(function(error, tempCont) {
    if (error) {
      console.log("error coneccion DB");
    } else {
      console.log("Connected DB!");
      tempCont.query(sqlInsert, function(error) {
        if (!!error) {
          console.log("error en el query");
          res.send(false);
        } else {
          res.send(true);
          tempCont.release();
        }
      });
    }
  });
});

/* Metodo para enviar los datos del usuario seleccionado */
app.post("/users/data", function(req, res) {
  const sqlSelect = `SELECT Sensores.data, 
  Sensores.dateSensing, Sensores.nameSensor, 
  Dispositivos.nameDispositivo, Dispositivos.zone, 
  Usuarios.name, Usuarios.apellido, Usuarios.edad 
  FROM Sensores, Dis_Sensor, Dispositivos, 
  Usuarios WHERE Sensores.idSensor=Dis_Sensor.fkSensor 
  AND Dis_Sensor.fkDispositivo=Dispositivos.idDispositivo 
  AND Dispositivos.fkUser=Usuarios.idUsuario 
  AND Usuarios.name='${req.body.name}'`;
  console.log(req.body.name);
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
          if (rows.length > 0) {
            res.send(rows);
          } else {
            res.send(null);
          }
        }
      });
    }
  });
});

/* Metodo para enviar los datos del usuario seleccionado y sensor seleccionado*/
app.get("/users/data/sensor", function(req, res) {
  const sqlSelect = `SELECT Sensores.data, 
  Sensores.dateSensing, Sensores.nameSensor, 
  Dispositivos.nameDispositivo, Dispositivos.zone, 
  Usuarios.name, Usuarios.apellido, Usuarios.edad 
  FROM Sensores, Dis_Sensor, Dispositivos, Usuarios 
  WHERE Sensores.idSensor=Dis_Sensor.fkSensor 
  AND Sensores.nameSensor='${req.query.sensor}'
  AND Dis_Sensor.fkDispositivo=Dispositivos.idDispositivo 
  AND Dispositivos.fkUser=Usuarios.idUsuario 
  AND Usuarios.name='${req.query.name}'`;
  console.log(req.query.name);
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
          console.log(rows);
          if (rows.length > 0) {
            res.send(rows);
          } else {
            res.send(null);
          }
        }
      });
    }
  });
});

/* Metodo para verificar el login de los medicos */
app.post("/login", function(req, res) {
  console.log(req.body.user, req.body.password);
  const sqlSelect = `SELECT email,password FROM Medicos WHERE email='${req.body.user}' AND password='${req.body.password}'`;
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

/* Metodo para recibir datos del hardware */
app.post("/insert/data", function(req, res) {
  const fechaActual = new Date();
  const fecha = `${fechaActual.getFullYear()}-${fechaActual.getMonth()}-${fechaActual.getDate()}`;
  console.log(req.body);
  Object.keys(req.body.Sensores).map(key => {
    let sensor = req.body.Sensores[key];
    const sqlInsert = `INSERT INTO Sensores ( nameSensor, data, dateSensing) VALUES ( '${key}', '${sensor}', '${fecha}')`;
    insertDbSensores(sqlInsert, req.body.IdDispositivo);
  });
});

/* funcion para hacer envio de datos a la base de datos */
function insertDbSensores(sqlInsert, idDispositivo) {
  con.getConnection(function(error, tempCont) {
    if (error) {
      console.log("error coneccion DB");
    } else {
      console.log("Connected DB!");
      tempCont.query(sqlInsert, function(error, result) {
        if (!!error) {
          console.log("error en el query");
        } else {
          tempCont.release();
          console.log(result.insertId);
          insertDbBreakSensores(result.insertId, idDispositivo);
        }
      });
    }
  });
}
/* funcion para hacer la relacion de los sensores a la base de datos de la tabla de rompimiento*/
function insertDbBreakSensores(idSensor, idDispositivo) {
  con.getConnection(function(error, tempCont) {
    let sqlInsert = `INSERT INTO Dis_Sensor (fkDispositivo, fkSensor) VALUES ('${idDispositivo}', '${idSensor}')`;
    if (error) {
      console.log("error coneccion DB");
    } else {
      console.log("Connected DB!");
      tempCont.query(sqlInsert, function(error) {
        if (!!error) {
          console.log("error en el query");
        } else {
          tempCont.release();
        }
      });
    }
  });
}
/* funcion para hacer envio de datos a la base de datos */
function insertDb(sqlInsert) {
  con.getConnection(function(error, tempCont) {
    if (error) {
      console.log("error coneccion DB");
    } else {
      console.log("Connected DB!");
      tempCont.query(sqlInsert, function(error) {
        if (!!error) {
          console.log("error en el query");
        } else {
          tempCont.release();
        }
      });
    }
  });
}

/* app.post("/", function(req, res) {
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
}); */

app.listen(8080, function() {
  console.log("Example app listening on port 8080!");
});
