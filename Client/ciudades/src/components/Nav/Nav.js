import React from 'react'
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link to={"/home"} className="navbar-brand">
        <img
          src="/docs/4.3/assets/brand/bootstrap-solid.svg"
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt=""
        />
        HMA DEVICE
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse justify-content-md-end justify-content-sm-center"
        id="navbarNav"
      >
        <ul className="navbar-nav text-right">
          <li className="nav-item">
            <Link to={"/registerP"} className="nav-link text-bolder" href="#">
              Registar Paciente
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/registerD"} className="nav-link text-bolder" href="#">
              Registar Dispositivo
            </Link>
          </li>
        </ul>
      </div>
      {/* <nav className="navbar navbar-dark bg-dark">
        <Link to={"/home"} className="navbar-brand">
          <img
            src="/docs/4.3/assets/brand/bootstrap-solid.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt=""
          />
          HMA DEVICE
        </Link>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <ul className="navbar-nav">
            <li className="nav-item active">
            <Link to={"/home"} className="nav-item nav-link active" href="#">
              Home <span className="sr-only">(current)</span>
            </Link>
            </li>
            <li className="nav-item active">
            <Link to={"/home"} className="nav-item nav-link" href="#">
              Features
            </Link>
            </li>
            <li className="nav-item active">
            <Link to={"/home"} className="nav-item nav-link" href="#">
              Pricing
            </Link>
            </li>
          </ul>
        </div>
      </nav> */}
    </nav>
  );
}
