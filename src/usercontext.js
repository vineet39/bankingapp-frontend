// import React from 'react';

// const UserContext = React.createContext();

// export default UserContext;

import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // const [users, setUsers] = useState([
  //   // Initial users
  //   { name: 'Jane Doe', email: 'jane@example.com', password: 'a', balance: 100 },
  //   { name: 'John Doe', email: 'john@example.com', password: 'b', balance: 200 },
  // ]);
  const [token, setToken] = useState(null); 

  return (
    <UserContext.Provider value={{token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};
