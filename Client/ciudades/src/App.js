import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import Boostrap Library
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";

function App() {
  // Declara una nueva variable de estado, la cual llamaremos “count”
  const [data, setData] = useState({"data":"d"});

  useEffect(()=>{
    //se crea el protocolo get de la aplicacion axios para que haga una peticion get al servidor local que se ha creado anterior mente
    axios.get(`http://localhost:8080`)
      .then(res => {
        const persons = res.data;
        setData(persons)
        console.log(persons)
      })
  },[])

  return (
    <div className="container">
      <div className="row text-center justify-content-center">
       <h2>
         Datos del servidor
         </h2> 
      </div>
      <div className="row mt-4">
        {Object.keys(data).map((key)=>{
          return(<div className="col-6" key={key}>
            <div className="card">
              <div className="card-body">
              <h6 className="card-title">{data[key].sensor}</h6>
            <p className="card-text">{data[key].data}</p>
              </div>
            </div>
          </div>)
        })}
      </div>
    </div>
  );
}

export default App;
