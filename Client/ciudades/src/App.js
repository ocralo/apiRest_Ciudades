import React from 'react';
import Loadable from "react-loadable";
import { HashRouter, Route, Switch } from "react-router-dom";
//import Boostrap Library
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";

const loading = () => (
  <div className="spinner-border text-danger" role="status">
    <span className="sr-only">Loading...</span>
  </div>
);

const Login = Loadable({
  loader: () => import("./views/Login/Login"),
  loading
});
const Home = Loadable({
  loader: () => import("./views/Home/Home"),
  loading
});
const Data = Loadable({
  loader: () => import("./views/DataUser/DataUser"),
  loading
});

function App() {

  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" name="Login" component={Login} />
        <Route exact path="/home" name="Home" component={Home} />
        <Route exact path="/home/data/:user" name="Datos de usuario" component={Data} />
      </Switch>
    </HashRouter>
  );
}

export default App;
