import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../../components/Nav/Nav";

export default function Register(props) {
  const [Nombre, setNombre] = useState("");
  const [Apellido, setApellido] = useState("");
  const [Correo, setCorreo] = useState("");
  const [Cedula, setCedula] = useState("");
  const [Contraseña, setContraseña] = useState("");
  const [Edad, setEdad] = useState("");
    /* funcion para crear un nuevo usuario */
  function sendUserRegis(event) {
    axios
      .post("http://LOCALHOST:8080/users/register", {
        nombre: Nombre,
        apellido: Apellido,
        cedula: Cedula,
        edad: Edad,
        correo: Correo,
        contra: Contraseña
      })
      .then(function(response) {
        console.log(response.data);
        if (response.data === true) {
            alert("se a registrado el usuario con exito");
          props.history.push("/home");
        } else {
          alert("el usuario no se pudo registrar");
        }
      })
      .catch(function(error) {
        console.log(error);
      });
      event.preventDefault();
  }

  return (
    <div>
      <Nav />
      <div className="container-fluid">
        <div className="row justify-content-center mt-2">
          <div className="col-md-8">
            <form className="shadow border p-5 mt-5" onSubmit={sendUserRegis}>
              <h2 className="text-uppercase">Registro de Paciente</h2>
              <p className="text-black-50">
                Por favor completar todos los campos, para poder registrar a un
                usuario
              </p>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="InputNombre">Nombre</label>
                      <input
                        type="text"
                        className="form-control"
                        id="InputNombre"
                        aria-describedby="emailHelp"
                        placeholder="Ej: Zeida..."
                        value={Nombre}
                        onChange={e => setNombre(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="InputApellido">Apellido</label>
                      <input
                        type="text"
                        className="form-control"
                        id="InputApellido"
                        aria-describedby="emailHelp"
                        placeholder="Ej: Dito..."
                        value={Apellido}
                        onChange={e => setApellido(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="InputEdad">Edad</label>
                      <input
                        type="number"
                        className="form-control"
                        id="InputEdad"
                        aria-describedby="emailHelp"
                        placeholder="Ej: 18"
                        value={Edad}
                        onChange={e => setEdad(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="InputCedula">Cedula</label>
                      <input
                        type="text"
                        className="form-control"
                        id="InputCedula"
                        aria-describedby="emailHelp"
                        placeholder="Ej: 112345678..."
                        value={Cedula}
                        onChange={e => setCedula(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="InputEmail1">Correo electronico</label>
                      <input
                        type="email"
                        className="form-control"
                        id="InputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Ej: a@correo.com"
                        value={Correo}
                        onChange={e => setCorreo(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="InputPassword1">Contraseña</label>
                      <input
                        type="password"
                        className="form-control"
                        id="InputPassword1"
                        placeholder="ººº"
                        value={Contraseña}
                        onChange={e => setContraseña(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <button
                      type="submit"
                      className="btn btn-dark btn-lg btn-block"
                    >
                      Registrar
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
