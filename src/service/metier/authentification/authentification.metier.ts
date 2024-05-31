/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserDTO } from "../../../data/dto/user.dto";
import { IAuthService } from "../../repository/IAuthService";
import { AuthRepository } from "../../repository/authentification/login.repository";

const login = (user: UserDTO) => {
  return AuthRepository.login(user)
    .then((response:any) => {
      if (response.data.email) {
        // console.log("---------------ici")
        // console.log(JSON.stringify(response.data));
        // console.log("-----------fin----ici")
        localStorage.setItem('user', JSON.stringify(response.data));
        localStorage.setItem('token', JSON.stringify(response.data.token));
      }
      console.log(response.data)
      return response.data;
    })
};

const isAuth=()=>{
  return AuthRepository.isAuth()
  .then((response:any)=>{
    if(response.data.session){
      // console.log(JSON.stringify(response.data))
    }
    return response.data
  }).catch((err:any)=>console.log(err))
}

const logout=()=>{
  localStorage.removeItem('user');
  return AuthRepository.logout()
  .then((response:any)=>{
    console.log(response)
    localStorage.removeItem('user');    
    return (response.data)
  })
}

export const AuthMetier: IAuthService = { login,isAuth,logout };
