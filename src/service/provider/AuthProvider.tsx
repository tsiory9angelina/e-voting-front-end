/* eslint-disable @typescript-eslint/no-explicit-any */
import {  useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { AuthApplicatif } from "../applicatif/authentification/authentfication.applicatif";

export const AuthProvider = ({ children }: any) => {
  const [isLog, setLog] = useState(false);
  const isAuth = () => {
    AuthApplicatif.isAuth().then(
      async (data: any) => {
        console.log("Test of AUTH");
        console.log(data);
      },
      (err: any) => {
        console.log(err);
      }
    );
  };

  useEffect(() => {
    isAuth();
  }, [isLog]);

  return (
    <AuthContext.Provider value={[isLog, setLog]}>
      {children}
    </AuthContext.Provider>
  );
};
