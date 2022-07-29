import axios from "axios";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { auth, ContextAppType, Props } from "../data";
import { getCookie } from "../utils/utils";

const AppContextDefaultValues: ContextAppType = {
  accessToken: "",
  setAccessToken: (token: string) => {},
  isLogedIn: () => {
    return Boolean;
  },
  requestLogin: () => {},
  createProduct: (body: any) => {},
};

const AppContext = createContext<ContextAppType>(AppContextDefaultValues);

const useAppContext = () => {
  return useContext(AppContext);
};

const AppProvider = ({ children }: Props) => {
  const [appGlobalState, setGlobalAppState] = useState({ accessToken: "" });

  const isLogedIn = () => {
    if (appGlobalState.accessToken === undefined || appGlobalState.accessToken.length === 0)
      return false;
    else true;
  };

  const requestLogin = async (body: auth) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/auth/login/${body.entity}`,
        { email: body.email, password: body.password },
        {
          headers: { authorization: `Bearer ${appGlobalState.accessToken}` },
        }
      );
      console.log(response);
      setAccessToken(response.data.token);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:8000/refreshToken", {
        withCredentials: true,
      });
      console.log(response);
      if (response.status === 200) setAccessToken(response.data.token);
    } catch (error) {}
  };

  const setAccessToken = (token: string) => {
    setGlobalAppState((prevstate) => {
      return { ...prevstate, accessToken: token };
    });
  };

  const createProduct = async (body) => {
    try {
      const product = await axios.post("http://localhost:8000/collection/create", body);
      console.log(product);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   // refreshToken().then((data) => console.log(data));
  //   axios
  //     .get("http://localhost:8000/refreshToken", {
  //       withCredentials: true,
  //     })
  //     .then((data) => console.log(data));
  // }, []);

  return (
    <>
      <AppContext.Provider
        value={{
          accessToken: appGlobalState.accessToken,
          setAccessToken,
          isLogedIn,
          requestLogin,
          createProduct,
        }}
      >
        {children}
      </AppContext.Provider>
    </>
  );
};

export { useAppContext, AppProvider };

//create product func()
//sign/login (user)
//nft productid
