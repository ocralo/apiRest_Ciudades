import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Login.css";

export default function Login(props) {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    /* //se crea el protocolo get de la aplicacion axios para que haga una peticion get al servidor local que se ha creado anterior mente
    axios.get("http://LOCALHOST:8080/").then(res => {
      const dataServer = res.data;
      console.log(dataServer);
    }); */
  });
  /* Metodo para enviar datos al servidor mediante el metodo post */
  function sendServer(e) {
    //se crea el protocolo post de la aplicacion axios para que haga una peticion get al servidor local que se ha creado anterior mente
    axios
      .post("http://LOCALHOST:8080/login", {
        user: mail,
        password: password
      })
      .then(function(response) {
        console.log(response.data);
        if (response.data === true) {
          props.history.push("/home");
        } else {
          alert("el usuario o contraseña son incoreectas");
        }
      })
      .catch(function(error) {
        console.log(error);
      });
    console.log(password, mail);
    e.preventDefault();
  }

  return (
    <section className="container-fluid rel-container">
      <div className="row h-100">
        <div className="col-md-6 rel-imagen-iniciar-sesion rounded-left p-0">
          <div
            className="container d-flex justify-content-center align-items-center flex-column w-100 h-100 rel-image-login"
            style={{
              backgroundImage: `url(${process.env.PUBLIC_URL}/assets/bright-cardiac-cardiology-care-433267.jpg)`
            }}
          ></div>
        </div>
        <div className="col-md-6 border rounded-right d-flex align-items-center justify-content-center">
          <div className="container ">
            <div className="card p-4 w-100 border-0">
              <div className="card-body">
                <div className="mb-5">
                  <h1 className="card-title rel-text-center">Iniciar Sesión</h1>
                  <h6 className="card-subtitle mb-2 text-muted d-none d-md-block rel-text-center">
                    Para usar nuestra aplicacion por favor iniciar sesion
                  </h6>
                </div>
                <form onSubmit={sendServer}>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">
                      Correo Electronico
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="prueba@gmail.com"
                      value={mail}
                      onChange={e => {
                        setMail(e.target.value);
                      }}
                    />
                    <small id="emailHelp" className="form-text text-muted">
                      Nunca compartiremos su correo electrónico con nadie más.
                    </small>
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Contraseña</label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Contraseña"
                      value={password}
                      onChange={e => {
                        setPassword(e.target.value);
                      }}
                    />
                  </div>
                  <input
                    type="submit"
                    className="btn btn-primary btn-lg btn-block"
                    value="Ingresar"
                  ></input>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
