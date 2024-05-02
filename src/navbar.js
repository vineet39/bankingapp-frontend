import React, { useEffect,useState,useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./usercontext";

function NavBar() {
  const { token,setToken } = useContext(UserContext);

  const toggleLogin = () => {
    setToken(null);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          BadBank
        </a>
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
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="#/CreateAccount/">
                Create Account
              </a>
            </li>
            <li className="nav-item">
              <Link to={"/login"} className="nav-link" onClick={toggleLogin}>
                {token ? "Logout" : "Login"}
              </Link>
            </li>
            {token && (
              <li className="nav-item">
                <a className="nav-link" href="#/deposit/">
                  Deposit
                </a>
              </li>
            )}
            {token && (
              <li className="nav-item">
                <a className="nav-link" href="#/withdraw/">
                  Withdraw
                </a>
              </li>
            )}
            {token && (
            <li className="nav-item">
              <a className="nav-link" href="#/alldata/">
                AllData
              </a>
            </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
