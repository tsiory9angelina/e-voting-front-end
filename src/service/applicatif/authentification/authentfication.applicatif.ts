import { UserDTO } from "../../../data/dto/user.dto";
import { AuthMetier } from "../../metier/authentification/authentification.metier";
import { IAuthService } from "../../repository/IAuthService";


const login=(user: UserDTO) =>{
    const response=AuthMetier.login(user);

    return response;
}

const isAuth=()=>{
    const response=AuthMetier.isAuth();
    return response
}

const logout=()=>{
    const response=AuthMetier.logout();
    return response;
}

export const AuthApplicatif:IAuthService={ login,isAuth,logout }