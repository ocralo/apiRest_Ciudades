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

function App() {

  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" name="Login - IMUAO" component={Login} />
      </Switch>
    </HashRouter>
  );
}

export default App;
