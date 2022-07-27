import React, { createContext, ReactNode, useContext, useState } from "react";

const AppContextDefaultValues: ContextAppType = {
  accessToken: "",
  setAccessToken: (token: string) => {},
};

const AppContext = createContext<ContextAppType>(AppContextDefaultValues);

const useAppContext = () => {
  return useContext(AppContext);
};

const AppProvider = ({ children }: Props) => {
  const [appGlobalState, setGlobalAppState] = useState({ accessToken: "" });

  const setAccessToken = (token: string) => {
    setGlobalAppState((prevstate) => {
      return { ...prevstate, accessToken: token };
    });
  };

  return (
    <>
      <AppContext.Provider value={{ accessToken: appGlobalState.accessToken, setAccessToken }}>
        {children}
      </AppContext.Provider>
    </>
  );
};

export { useAppContext, AppProvider };
