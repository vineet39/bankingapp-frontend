import React, { useEffect, useState,useContext } from "react";
import Card from "./card";
import { useNavigate } from "react-router-dom";
import useAxios from './axios';
import { UserContext } from "./usercontext";

function AllData() {
  const [users, setUsers] = useState([]);
  const { token } = useContext(UserContext);
  const navigate = useNavigate();
  const axios = useAxios();

  useEffect(() => {
    if (token == null) {
      navigate("/login");
    }
  }, [navigate, token]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/users");
        const {
          data: { data, error },
        } = response;

        console.log(response);

        if (error == null) setUsers(data);
      } catch (err) {}
    }
    fetchData();
  }, [setUsers]);

  return (
    <>
      <h5>All Data in Store</h5>
      <Card
        bgcolor="primary"
        header="All data"
        status=""
        body={
          users &&
          users.length > 0 &&
          users.map((user) => (
            <p key={user.name}>
              Name: {user.name}, Email: {user.email}, Balance: {user.balance}
            </p>
          ))
        }
      />
    </>
  );
}

export default AllData;
