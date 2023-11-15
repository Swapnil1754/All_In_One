import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function useAppContext() {
  return useContext(AppContext);
}

export function AppWrapper({ children }) {
  const [token, setToken] = useState(null);

  const updateToken = (newToken) => {
    setToken(newToken);
  };

  return (
    <AppContext.Provider value={{ token, updateToken }}>
      {children}
    </AppContext.Provider>
  );
}
