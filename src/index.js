import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Routes } from "react-router-dom";
import NavBar from "./navbar";
import Home from "./home";
import CreateAccount from "./createaccount";
import Login from "./login";
import Deposit from "./deposit";
import Withdraw from "./withdraw";
import AllData from "./alldata";
// import UserContext from "./usercontext";
import { UserProvider } from './usercontext';
import "bootstrap/dist/css/bootstrap.min.css";

function Spa() {
  return (
    <HashRouter>
      {/* <UserContext.Provider
        value={{
          users: [
            {
              name: "abel",
              email: "abel@mit.edu",
              password: "secret",
              balance: 100,
            },
          ],
          user: null,
        }}
      > */}
        <UserProvider>
        <NavBar />
        <div className="container" style={{ padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/CreateAccount/" element={<CreateAccount />} />
            <Route path="/login/" element={<Login />} />
            <Route path="/deposit/" element={<Deposit />} />
            <Route path="/withdraw/" element={<Withdraw />} />
            <Route path="/alldata/" element={<AllData />} />
          </Routes>
        </div>
      {/* </UserContext.Provider> */}
      </UserProvider>
    </HashRouter>
  );
}

ReactDOM.render(<Spa />, document.getElementById("root"));
