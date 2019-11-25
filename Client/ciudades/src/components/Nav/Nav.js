import React from 'react'
import { Link} from "react-router-dom";

export default function Nav() {
    return (
      <nav className="navbar navbar-dark bg-dark">
        <Link className="navbar-brand" to={'/home'}>
          <img
            src="/docs/4.3/assets/brand/bootstrap-solid.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt=""
          />
          HMA DEVICE
        </Link>
      </nav>
    );
}
