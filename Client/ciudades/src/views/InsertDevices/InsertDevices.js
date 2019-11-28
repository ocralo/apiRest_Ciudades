import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../../components/Nav/Nav";

export default function InsertDevices(props) {
  const [Users, setUsers] = useState({});
  const [idUsuario, setIdUsuario] = useState(0);
  const [Zona, setZona] = useState("");
  const [NameDispo, setNameDispo] = useState("");

  useEffect(() => {
    //se crea el protocolo get de la aplicacion axios para que haga una peticion get al servidor local que se ha creado anterior mente
    axios
      .get(`http://LOCALHOST:8080/users/id`,)
      .then(res => {
        const dataServer = res.data;
        setUsers(dataServer);
        console.log(dataServer);
      });
  }, []);

  /* funcion para crear un nuevo usuario */
  function sendDisRegis(event) {
    axios
      .post("http://LOCALHOST:8080/dispo/register", {
        idUser:idUsuario,
        zona:Zona,
        namedispo:NameDispo
      })
      .then(function(response) {
        console.log(response.data);
        if (response.data === true) {
          alert("se a registrado el dispositivo con exito");
          props.history.push("/home");
        } else {
          alert("el Dispositivo no se pudo registrar");
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
            <form className="shadow border p-5 mt-5" onSubmit={sendDisRegis}>
              <h2 className="text-uppercase">Registro de Dispositivo</h2>
              <p className="text-black-50">
                Por favor completar todos los campos, para poder registrar a un
                usuario
              </p>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="InputApellido">
                        Seleccione el paciente
                      </label>
                      <select
                        onChange={e => {
                          setIdUsuario(e.target.value);
                        }}
                        value={idUsuario}
                        className="form-control"
                        required
                      >
                        <option defaultValue>-</option>
                        {Object.keys(Users).map((key, i) => {
                          return (
                            <option key={i + 1} value={Users[key].idUsuario}>
                              {Users[key].name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="InputEdad">Zona</label>
                      <input
                        type="number"
                        className="form-control"
                        id="InputEdad"
                        aria-describedby="emailHelp"
                        placeholder="Ej: 1"
                        value={Zona}
                        onChange={e => setZona(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="InputCedula">Nombre Dispositivo</label>
                      <input
                        type="text"
                        className="form-control"
                        id="InputCedula"
                        aria-describedby="emailHelp"
                        placeholder="112345678..."
                        value={NameDispo}
                        onChange={e => setNameDispo(e.target.value)}
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
