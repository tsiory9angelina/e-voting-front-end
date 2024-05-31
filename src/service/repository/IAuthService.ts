/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserDTO } from "../../data/dto/user.dto";


export interface IAuthService{
    login(user:UserDTO):any;
    isAuth():any;
    logout():any;
}