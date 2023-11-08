import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart, useDispatchCart } from "../components/ContextReducer"
import Model from "../Model";
import Cart from "../screens/Cart";
import Badge from 'react-bootstrap/Badge';
export default function Navbar() {
  const [cartView, setCartView] = useState(false);
  const [items, setItems] = useState(0);
  const navigate = useNavigate();

  const data = useCart();
  console.log(data);
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/api/loginuser");
  }
 
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
              <ul className="navbar-nav me-auto mb-2">
                <li>
                  <Link
                    className="nav-link active fs-5"
                    aria-current="page"
                    to="/"
                  >
                    Home
                  </Link>
                </li>
                {localStorage.getItem("authToken") ? (
                  <li>
                    <Link
                      className="nav-link active fs-5"
                      aria-current="page"
                      to="/"
                    >
                      My Orders
                    </Link>
                  </li>
                ) : (
                  ""
                )}
              </ul>

              <div className="d-flex">
                {!localStorage.getItem("authToken") ? (
                  <div>
                    <Link
                      className="btn bg-white text-success mx-1"
                      to="/api/loginuser"
                    >
                      Login
                    </Link>
                    <Link
                      className="btn bg-white text-success mx-1"
                      to="/api/createuser"
                    >
                      SignUp
                    </Link>
                  </div>
                ) : (
                  <div>
                    <div className="btn bg-white text-success mx-2" onClick={() => setCartView(true)}>
                        My Cart {" "}
                        <Badge pill bg = "danger"> {data.length} </Badge>
                    </div>
                    {cartView ? <Model onClose={() => setCartView(false)}><Cart /></Model>:null}
                    <div className="btn bg-white text-success mx-2" onClick={handleLogout}>
                        Logout
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
