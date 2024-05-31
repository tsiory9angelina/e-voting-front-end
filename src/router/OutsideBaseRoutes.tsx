import { Route } from "react-router-dom";
import Login from "../containers/login/login";

function OutsideBaseRoutes(){
    return(
        
            <>
                 <Route path="" element={<Login />} />
                 {/* <Route path="forgotpassword" element={<ForgetPassword />} />
                <Route path="/register" element={<Register />}></Route> */}
            </>
            
       
    )
}

export default OutsideBaseRoutes;