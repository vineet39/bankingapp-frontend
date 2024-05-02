// import React,{useContext} from "react"; // For React functionality and createContext.
// import Card from "./card";
// import {UserContext} from "./usercontext";

// function Login() {
//   const [status, setStatus] = React.useState("");
//   const [email, setEmail] = React.useState("jane@example.com");
//   const [password, setPassword] = React.useState("a");

//   // const ctx = React.useContext(UserContext);

//   const { users, setUser } = useContext(UserContext);

//   function validate(field, label) {
//     if (!field) {
//       setStatus("Error: " + label);
//       setTimeout(() => setStatus(""), 3000);
//       return false;
//     }
//     return true;
//   }

//   function login() {
//     console.log(email, password);
//     if (!validate(email, "email")) return;
//     if (!validate(password, "password")) return;
//     const foundUser = users.find(user => user.email === email && user.password === password);
//     if(foundUser){
//       setUser(foundUser.name);
//       alert("success")
//     } else{
//       setStatus("Invalid login details");
//       setTimeout(() => setStatus(""), 3000);
//     }
//   }

//   return (
//     <Card
//       bgcolor="primary"
//       header="Login"
//       status={status}
//       body={
//         <>
//           Email address
//           <br />
//           <input
//             type="input"
//             className="form-control"
//             id="email"
//             placeholder="Enter email"
//             value={email}
//             onChange={(e) => setEmail(e.currentTarget.value)}
//           />
//           <br />
//           Password
//           <br />
//           <input
//             type="password"
//             className="form-control"
//             id="password"
//             placeholder="Enter password"
//             value={password}
//             onChange={(e) => setPassword(e.currentTarget.value)}
//           />
//           <br />
//           <button
//             type="submit"
//             className="btn btn-light"
//             onClick={login}
//           >
//             Login
//           </button>
//         </>
//       }
//     />
//   );
// }

// export default Login;

import React, { useContext, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Card from "./card";
import { UserContext } from "./usercontext";
import useAxios from './axios';
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const axios = useAxios();
  const { setToken } = useContext(UserContext);
  
  const initialValues = {
    email: "jane.doe@example.com",
    password: "password456",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
  });

  const onSubmit = async (values, { setSubmitting, setStatus }) => {
    const { email, password } = values;
    try {
      const response = await axios.post("/login", {
        email: email,
        password: password,
      });
      const { data:{message, data, error} } = response;

      if(error == null && data){
        setToken(data);
        // navigate("/alldata");
      }

      setStatus(message);
      setTimeout(() => setStatus(''), 3000);
    } catch (err) {
      setStatus("Failed to login: " + err.message);
      setTimeout(() => setStatus(''), 3000);
    }
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, status }) => (
        <Card
          bgcolor="primary"
          header="Login"
          status={status}
          body={
            <Form>
              <div>
                Email address
                <Field type="email" name="email" className="form-control" />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-danger"
                />
              </div>
              <br />
              <div>
                Password
                <Field
                  type="password"
                  name="password"
                  className="form-control"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-danger"
                />
              </div>
              <br />
              <button
                type="submit"
                className="btn btn-light"
                disabled={isSubmitting}
              >
                Login
              </button>
            </Form>
          }
        />
      )}
    </Formik>
  );
}

export default Login;
