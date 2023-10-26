import React from "react";
import {Link} from "react-router-dom";
export default function Navbar() {
  return (
    <div>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-danger bg-gradient">
          <div className="container-fluid">
            <Link className="navbar-brand fs-1 fst-italic" to="/">
              Haste2Taste
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <li>
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
                </li>
                <li>
                <Link className="nav-link" to="/login">
                  Login
                </Link>
                </li>
                <li>
                <Link className="nav-link" to="/api/createuser">
                  SignUp
                </Link>
                </li>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
