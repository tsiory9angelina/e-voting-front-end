//import { Route, Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import DashboardEVote from "../containers/dashboard/dashboardEvote";
import Station from "../containers/station/station";
import Voter from "../containers/voter/voterView";
import CandidateView from "../containers/candidate/candidateView";
import CandidateCreate from "../containers/candidate/candidateCreate";
import VoterCreate from "../containers/voter/voterCreate";

function AppRoutes(){
    return(
        
            // <Routes>
            <>
                 <Route path="/dashboard" element={<DashboardEVote/>} />
                 <Route path="/dashboard/candidate" element={<CandidateView/>} />
                 <Route path="/dashboard/candidate/create" element={<CandidateCreate/>} />
                 <Route path="/dashboard/station" element={<Station/>} />
                 <Route path="/dashboard/voter" element={<Voter/>} />
                 <Route path="/dashboard/voter/create" element={<VoterCreate/>} />
            </>
            // </Routes>
       
    )
}

export default AppRoutes;