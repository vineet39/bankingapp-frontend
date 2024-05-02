// import React,{useContext, useEffect} from "react"; // For React functionality and createContext.
// import Card from "./card";
// import {UserContext} from "./usercontext";
// import { useNavigate } from 'react-router-dom';

// function Deposit() {
//   const [status, setStatus] = React.useState("");
//   const [amount, setAmount] = React.useState(0);
//   const [loggedInUser, setLoggedInUser] = React.useState(null);

//   const { users, user,setUsers } = useContext(UserContext);

//   const navigate = useNavigate();

//   function validate(field, label) {
//     if (!field || field <= 0) {
//       setStatus("Error: Invalid amount");
//       setTimeout(() => setStatus(""), 3000);
//       return false;
//     }
//     return true;
//   }

//   useEffect(() => {
//     if(!user){
//       navigate('/login');
//     }

//     const loggedInUser = users.find(u => u.name === user);
//     setLoggedInUser(loggedInUser);
//   }, [user, users]);

//   function deposit() {
//     console.log(amount);
//     if (!validate(amount, "amount")) return;
//     setUsers(users =>
//       users.map(u =>
//         u.name === user ? { ...u, balance: +u.balance+ +amount } : u
//       )
//     );
//     alert("Deposit is successful");
//   }

//   return (
//     <Card
//       bgcolor="primary"
//       header="Deposit"
//       status={status}
//       body={
//         <>
//         Balance: {loggedInUser ? loggedInUser.balance : 0}
//         <br /><br />
//           Amount
//           <br />
//           <input
//             type="number"
//             className="form-control"
//             id="amount"
//             placeholder="Enter amount"
//             value={amount}
//             onChange={(e) => setAmount(e.currentTarget.value)}
//           />
//           <br/>
//           <button
//             type="submit"
//             className="btn btn-light"
//             onClick={deposit}
//             disabled={amount === ''}
//           >
//             Deposit
//           </button>
//         </>
//       }
//     />
//   );
// }

// export default Deposit;

import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Card from "./card";
import { UserContext } from "./usercontext";
import "./styles.css";
import useAxios from "./axios";

function Deposit() {
  const [balance, setBalance] = useState(0);
  const { token } = useContext(UserContext);
  const navigate = useNavigate();
  const axios = useAxios();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);

  const initialValues = {
    amount: 0,
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/user");
        const {
          data: { user, error },
        } = response;

        if (error == null) setBalance(user[0].balance);
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchData();
  }, []);

  const validationSchema = Yup.object().shape({
    amount: Yup.number()
      .required("Amount is required")
      .positive("Amount must be positive")
      .integer("Amount must be an integer"),
  });

  const onSubmit = async (values, { setSubmitting, resetForm, setStatus }) => {
    const { amount } = values;
    try {
      const response = await axios.post("/deposit", {
        amount,
      });
      const {
        data: {
          message,
          data: { balance },
        },
      } = response;
      setStatus(message);
      setBalance(balance);
    } catch (err) {
      setStatus("Failed to deposit: " + err.message);
    }
    resetForm({ values: { amount: "" } });
    setSubmitting(false);
  };

  return (
    <Card
      bgcolor="primary"
      header="Deposit"
      status=""
      body={
        <>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                Balance: {balance}
                <br />
                <br />
                <label htmlFor="amount">Amount</label>
                <Field
                  type="number"
                  name="amount"
                  className="form-control"
                  placeholder="Enter amount"
                />
                <ErrorMessage
                  name="amount"
                  component="div"
                  className="custom-error"
                />
                <br />
                <button
                  type="submit"
                  className="btn btn-light"
                  disabled={isSubmitting}
                >
                  Deposit
                </button>
              </Form>
            )}
          </Formik>
        </>
      }
    />
  );
}

export default Deposit;
