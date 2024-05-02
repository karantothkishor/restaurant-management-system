import GlobalContext from "../providers/GlobalContext";
import React, { Fragment, useState, useEffect, useContext } from "react";
import { useNavigate, Link } from 'react-router-dom';
const axios = require('axios');

const Home = () => {
  const globalContext = useContext(GlobalContext);
  const user = globalContext.user;

  // const callerFunction = () => {
  //   axios
  //     .get(`http://localhost:5000/dummy`, {
  //       withCredentials: true,
  //       headers: {
  //         'Access-Control-Allow-Origin': '*',
  //       },
  //     })
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });

  // }

  // useEffect(() => {
  //   callerFunction();
  // }, []);
  return (
    <Fragment>
      <div>
      </div>
    </Fragment >
  );
};

export default Home;