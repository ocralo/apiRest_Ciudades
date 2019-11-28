import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../../components/Nav/Nav";

export default function Home(props) {
  const [users, setUsers] = useState("");

  useEffect(() => {
    //se crea el protocolo get de la aplicacion axios para que haga una peticion get al servidor local que se ha creado anterior mente
    axios.get("http://LOCALHOST:8080/users").then(res => {
      const dataServer = res.data;
      setUsers(dataServer);
    });
    
  }, []);

  function viewdataUser(user) {
    props.history.push(`/home/data/${user}`);
  }

  return (
    <div className="">
      <Nav />
      <div className="container mt-4">
        <div className="row">
          <div className="col-12">
            <h2>Pacientes</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <table className="table table-hover table-dark">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Apellido</th>
                  <th scope="col">Edad</th>
                  <th scope="col">Cedula</th>
                  <th scope="col">Correo</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(users).map((key, i) => {
                  let usr = users[key];
                  return (
                    <tr
                      key={i}
                      onClick={() => {
                        viewdataUser(usr.name);
                      }}
                    >
                      <th scope="row">{i + 1}</th>
                      <td>{usr.name}</td>
                      <td>{usr.apellido}</td>
                      <td>{usr.edad}</td>
                      <td>{usr.cedula}</td>
                      <td>{usr.email}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
