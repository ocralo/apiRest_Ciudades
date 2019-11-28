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
          stacked: true
        }
      ]
    },
    responsive: true
  };
  const [dataUsers, setDataUsers] = useState({});
  const [dataUsersTemperaturaA, setDataUsersTemperaturaA] = useState({});
  const [dataUsersTemperaturaC, setDataUsersTemperaturaC] = useState({});
  const [dataUsersFrecuenciaC, setDataUsersFrecuenciaC] = useState({});
  const [
    dataUserssetDataFrecuenciaR,
    setDataUserssetDataFrecuenciaR
  ] = useState({});
  const [dataUsersHumedad, setDataUsersHumedad] = useState({});
  const [dataUsersNn, setDataUsersNn] = useState({});
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
  const [dataTemperaturaA, setDataTemperaturaA] = useState({
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
  const [dataTemperaturaC, setDataTemperaturaC] = useState({
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
  const [dataFrecuenciaC, setDataFrecuenciaC] = useState({
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
  const [dataFrecuenciaR, setDataFrecuenciaR] = useState({
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
  const [dataHumedad, setDataHumedad] = useState({
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
    /* trae el dato de la Temperatura Ambiente */
    axios
      .get(
        `http://LOCALHOST:8080/users/data/sensor?name=${props.match.params.user}&sensor=TemperaturaA`
      )
      .then(res => {
        const dataServer = res.data;
        setDataUsersTemperaturaA(dataServer);
        console.log(dataServer);
      });
    /* trae el dato de la Temperatuca Corporal */
    axios
      .get(
        `http://LOCALHOST:8080/users/data/sensor?name=${props.match.params.user}&sensor=TemperatucaC`
      )
      .then(res => {
        const dataServer = res.data;
        setDataUsersTemperaturaC(dataServer);
        console.log(dataServer);
      });
    /* trae el dato de la frecuencia Respiratoria */
    axios
      .get(
        `http://LOCALHOST:8080/users/data/sensor?name=${props.match.params.user}&sensor=FrecuenciaR`
      )
      .then(res => {
        const dataServer = res.data;
        setDataUserssetDataFrecuenciaR(dataServer);
        console.log(dataServer);
      });
    /* trae el dato de la Frecuencia Cardiaca */
    axios
      .get(
        `http://LOCALHOST:8080/users/data/sensor?name=${props.match.params.user}&sensor=FrecuenciaC`
      )
      .then(res => {
        const dataServer = res.data;
        setDataUsersFrecuenciaC(dataServer);
        console.log(dataServer);
      });
    /* trae el dato de la Humedad */
    axios
      .get(
        `http://LOCALHOST:8080/users/data/sensor?name=${props.match.params.user}&sensor=Humedad`
      )
      .then(res => {
        const dataServer = res.data;
        setDataUsersHumedad(dataServer);
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
    setDataTemperaturaA({
      labels: Object.keys(dataUsersTemperaturaA).map((key, i) => {
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
          data: Object.values(dataUsersTemperaturaA).map(value => {
            return value.data;
          })
        }
      ]
    });
    setDataTemperaturaC({
      labels: Object.keys(dataUsersTemperaturaC).map((key, i) => {
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
          data: Object.values(dataUsersTemperaturaC).map(value => {
            return value.data;
          })
        }
      ]
    });
    setDataFrecuenciaC({
      labels: Object.keys(dataUsersFrecuenciaC).map((key, i) => {
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
          data: Object.values(dataUsersFrecuenciaC).map(value => {
            return value.data;
          })
        }
      ]
    });
    setDataFrecuenciaR({
      labels: Object.keys(dataUserssetDataFrecuenciaR).map((key, i) => {
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
          data: Object.values(dataUserssetDataFrecuenciaR).map(value => {
            return value.data;
          })
        }
      ]
    });
    setDataHumedad({
      labels: Object.keys(dataUsersHumedad).map((key, i) => {
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
          data: Object.values(dataUsersHumedad).map(value => {
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
            <h2 className="text-uppercase">Paciente {props.match.params.user}</h2>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-12">
            <h3>Graficas de datos Sensados</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 ">
            <div className="container-fluid">
              <div className="row justify-content-around">
                <div className="col-md-4 mt-4">
                  <div className="card shadow">
                    <div className="card-body">
                      <h4 className="card-title">Temperatura Corporal</h4>
                      <Bar
                        data={dataTemperaturaC}
                        style={{
                          position: "relative",
                          height: "100px",
                          width: "200px"
                        }}
                        options={optionsBar}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mt-4">
                  <div className="card shadow">
                    <div className="card-body">
                      <h4 className="card-title">Frecuencia Respiratoria</h4>
                      <Bar
                        data={dataFrecuenciaR}
                        style={{
                          position: "relative",
                          height: "100px",
                          width: "200px"
                        }}
                        options={optionsBar}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mt-4">
                  <div className="card shadow">
                    <div className="card-body">
                      <h4 className="card-title">Frecuencia Cardiaca</h4>
                      <Bar
                        data={dataFrecuenciaC}
                        style={{
                          position: "relative",
                          height: "100px",
                          width: "200px"
                        }}
                        options={optionsBar}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mt-4">
                  <div className="card shadow">
                    <div className="card-body">
                      <h4 className="card-title">Humedad Ambiente</h4>
                      <Bar
                        data={dataHumedad}
                        style={{
                          position: "relative",
                          height: "100px",
                          width: "200px"
                        }}
                        options={optionsBar}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mt-4">
                  <div className="card shadow">
                    <div className="card-body">
                      <h4 className="card-title">Temperatura Ambiente</h4>
                      <Bar
                        data={dataTemperaturaA}
                        style={{
                          position: "relative",
                          height: "100px",
                          width: "200px"
                        }}
                        options={optionsBar}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-12">
            <h3>Tabla de datos sensados</h3>
          </div>
        </div>
        <div className="row justify-content-around mt-3">
          <div className="col-md-10">
            <table className="table table-hover table-dark shadow">
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
        </div>
      </div>
    </div>
  );
}
