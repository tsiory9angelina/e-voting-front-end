
import axios from "axios";

import { IAuthService } from "../IAuthService";
import Config from "../../../config/configs/config";
import { UserDTO } from "../../../data/dto/user.dto";

const baseUrl: string = Config.BASE_URL;

const login = (user: UserDTO) => {
  //send request
  const loginData = axios.post(baseUrl + "/api/auth/login", user);
  return loginData;
};

const isAuth = () => {
  const isAuthData = axios.get(baseUrl + "/api/auth/isauth");
  return isAuthData;
};

const logout = () => {
  const logoutData = axios.post(baseUrl + "/api/auth/logout",{} );
  return logoutData;
};

export const AuthRepository: IAuthService = { login, isAuth, logout };