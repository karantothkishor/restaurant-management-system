import React, { useState, useEffect } from 'react';
import GlobalContext from './GlobalContext';
// const GlobalContext = React.createContext({ user: {} });
const axios = require('axios');

const GlobalContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [fetchingUser, setFetchingUser] = useState(true);

  useEffect(() => {
    axios
      .post(`http://localhost:5000/fetch-user`, null, {
        withCredentials: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then((response) => {
        console.log(`Fetched session for user: ${response.data.user}`);
        setUser(response.data.user);
      })
      .catch((error) => {
        console.log(`No user exists with the current session... ${error}`);
      })
      .finally(() => {
        setFetchingUser(false);
      });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        user: user,
        setUser: setUser,
        fetchingUser: fetchingUser
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalContextProvider;