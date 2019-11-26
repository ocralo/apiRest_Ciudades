import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../../components/Nav/Nav";
import { Bar } from "react-chartjs-2";

export default function DataUser(props) {
  const optionsBar = {
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 10,
        bottom: 0
      }
    },
    legend: {
      display: false
    },
    scales: {
      gridLines: {
        showBorder: false
      },
      xAxes: [
        {
          ticks: {
            display: false, //this will remove only the label
            beginAtZero: true
          },
          gridLines: {
            zeroLineColor: "transparent",
            color: "rgba(0, 0, 0, 0)"
          }
        }
      ],
      yAxes: [
        {
          stacked: true,
          gridLines: {
          },
          ticks: {
          }
        }
      ]
    },
    responsive: true
  };
  const [dataUsers, setDataUsers] = useState({});
  const [data, setData] = useState({
    labels: [0],
    datasets: [
      {
        label: "data",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: [0]
      }
    ]
  });

  

  useEffect(() => {
    //se crea el protocolo get de la aplicacion axios para que haga una peticion get al servidor local que se ha creado anterior mente
    axios
      .post(`http://LOCALHOST:8080/users/data`, {
        name: props.match.params.user
      })
      .then(res => {
        const dataServer = res.data;
        setDataUsers(dataServer);
        console.log(dataServer);
      });
  }, []);

  useEffect(() => {
   setData({
     labels: Object.keys(dataUsers).map((key, i) => {
       return i + 1;
     }),
     datasets: [
       {
         label: "data",
         backgroundColor: "rgba(255,99,132,0.2)",
         borderColor: "rgba(255,99,132,1)",
         borderWidth: 1,
         hoverBackgroundColor: "rgba(255,99,132,0.4)",
         hoverBorderColor: "rgba(255,99,132,1)",
         data: Object.values(dataUsers).map(value => {
           return value.data;
         })
       }
     ]
   });
  }, [dataUsers]);

  return (
    <div>
      <Nav />
      <div className="container mt-4">
        <div className="row">
          <div className="col-12">
            <h2 className="text-uppercase">{props.match.params.user}</h2>
          </div>
        </div>
        <div className="row justify-content-around">
          <div className="col-md-8">
            <table className="table table-hover table-dark">
              <thead>
                <tr>
                  <th scope="col">Edad</th>
                  <th scope="col">Sensado</th>
                  <th scope="col">Tipo de sensor</th>
                  <th scope="col">Fecha del sensando</th>
                  <th scope="col">Dispositivo</th>
                  <th scope="col">Zona</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(dataUsers).map((key, i) => {
                  let usr = dataUsers[key];
                  return (
                    <tr key={i}>
                      <td>{usr.edad}</td>
                      <td>{usr.data}</td>
                      <td>{usr.nameSensor}</td>
                      <td>{usr.dateSensing.split("T")[0]}</td>
                      <td>{usr.nameDispositivo}</td>
                      <td>{usr.zone}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="col-md-3">
            <Bar
              data={data}
              style={{
                position: "relative",
                height: "100px",
                width:"200px"
              }}
              options={optionsBar}
            />
            <Bar
              data={data}
              style={{
                position: "relative",
                height: "100px",
                width:"200px"
              }}
              options={optionsBar}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
