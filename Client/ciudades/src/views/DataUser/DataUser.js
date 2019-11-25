import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../../components/Nav/Nav";

export default function DataUser(props) {
  const [dataUsers, setDataUsers] = useState({});

   useEffect(() => {
     //se crea el protocolo get de la aplicacion axios para que haga una peticion get al servidor local que se ha creado anterior mente
     axios.get("http://LOCALHOST:8080/users").then(res => {
       const dataServer = res.data;
     });
   }, []);
    
    return (
      <div>
        <Nav />
        {console.log(props.match.params)}
      </div>
    );
}
