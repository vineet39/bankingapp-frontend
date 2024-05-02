// import React from 'react'; // For React functionality and createContext.
// import Card from './card';
// import {UserContext} from './usercontext';

// function CreateAccount(){
//   const [show, setShow]         = React.useState(true);
//   const [status, setStatus]     = React.useState('');
//   const [name, setName]         = React.useState('');
//   const [email, setEmail]       = React.useState('');
//   const [password, setPassword] = React.useState('');

//   const ctx = React.useContext(UserContext);

//   function validate(field, label){
//       if (!field) {
//         setStatus('Error: ' + label);
//         setTimeout(() => setStatus(''),3000);
//         return false;
//       }
//       return true;
//   }

//   function handleCreate(){
//     console.log(name,email,password);
//     if (!validate(name,     'name'))     return;
//     if (!validate(email,    'email'))    return;
//     if (!validate(password, 'password')) return;
//     ctx.users.push({name,email,password,balance:100});
//     setShow(false);
//   }

//   function clearForm(){
//     setName('');
//     setEmail('');
//     setPassword('');
//     setShow(true);
//   }

//   return (
//     <Card
//       bgcolor="primary"
//       header="Create Account"
//       status={status}
//       body={show ? (
//               <>
//               Name<br/>
//               <input type="input" className="form-control" id="name" placeholder="Enter name" value={name} onChange={e => setName(e.currentTarget.value)} /><br/>
//               Email address<br/>
//               <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
//               Password<br/>
//               <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
//               <button type="submit" className="btn btn-light" onClick={handleCreate}>Create Account</button>
//               </>
//             ):(
//               <>
//               <h5>Success</h5>
//               <button type="submit" className="btn btn-light" onClick={clearForm}>Add another account</button>
//               </>
//             )}
//     />
//   )
// }

// export default CreateAccount;

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Card from "./card";
import { UserContext } from "./usercontext";
import "./styles.css";
import useAxios from "./axios";

function CreateAccount() {
  const ctx = React.useContext(UserContext);
  const axios = useAxios();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const onSubmit = async (values, { setSubmitting, resetForm, setStatus }) => {
    const { name, password, email } = values;
    try {
      const response = await axios.post("/createUser", {
        name,
        password,
        email,
      });
      const {
        data: { message },
      } = response;
      setStatus(message);
    } catch (err) {
      setStatus("Failed to create user: " + err.message);
    }
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, isValid, status }) => (
        <Card
          bgcolor="primary"
          header="Create Account"
          status={status}
          body={
            <Form>
              <div>
                Name<br/>
                <Field type="text" name="name" className="form-control" />
                <ErrorMessage name="name" component="div" className="custom-error" />
              </div>
              <br/>

              <div>
                Email address<br/>
                <Field type="email" name="email" className="form-control" />
                <ErrorMessage name="email" component="div" className="custom-error" />
              </div>
              <br/>

              <div>
                Password<br/>
                <Field type="password" name="password" className="form-control" />
                <ErrorMessage name="password" component="div" className="custom-error" />
              </div>
              <br/>

              <button type="submit" className="btn btn-light" disabled={isSubmitting || !isValid}>
                Create Account
              </button>
            </Form>
          }
        />
      )}
    </Formik>
  );
}

export default CreateAccount;
