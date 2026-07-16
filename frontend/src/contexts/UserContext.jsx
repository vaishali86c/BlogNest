import React, { createContext, useState } from 'react';

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [userAuth, setUserAuth] = useState(() => {
    try {
      const storedUser = sessionStorage.getItem('user');
      const storedToken = sessionStorage.getItem('token');

      if (storedUser && storedToken) {
        return { ...JSON.parse(storedUser), token: storedToken };
      }
    } catch {
      // Corrupted sessionStorage data — fall through to default
    }

    return { token: null };
  });

  return (
    <UserContext.Provider value={{ userAuth, setUserAuth }}>
      {children}
    </UserContext.Provider>
  );
};
