import React from "react";

import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./service/provider/AuthProvider";
import Body from "./components/Body";
import Login from "./containers/login/login";
import DashboardEVote from "./containers/dashboard/dashboardEvote";
import CandidateView from "./containers/candidate/candidateView";
import CandidateCreate from "./containers/candidate/candidateCreate";
import Station from "./containers/station/station";
import Voter from "./containers/voter/voterView";
import VoterCreate from "./containers/voter/voterCreate";
import StationCreate from "./containers/station/stationCreate";
import AffCandidat from "./containers/candidate/testAffichageCandidat";
import StationUpdate from "./containers/station/stationUpdate";
import CandidateUpdate from "./containers/candidate/candidateUpdate";
import VoterUpdate from "./containers/voter/voterUpdate";

function App() {
  return (
    <>
      <React.Fragment>
        <Router>
          <AuthProvider>
            <Routes>
              <Route
                path="/"
                // element={
                //   <ProtectedRouteLogged>
                //     <Authentification />
                //   </ProtectedRouteLogged>
                // }
              >
                <Route path="" element={<Login />} />
              </Route>
              <Route
                path="/dashboard"
                element={
                  // <ProtectedRoute>
                  <Body />
                  // </ProtectedRoute>
                }
              >
                <Route path="" element={<DashboardEVote />} />
                <Route path="candidate" element={<CandidateView />} />
                <Route path="candidate/create" element={<CandidateCreate />} />
                <Route
                  path="candidate/update/:id/:type"
                  element={<CandidateUpdate />}
                />
                <Route path="station" element={<Station />} />
                <Route path="station/create" element={<StationCreate />} />
                <Route
                  path="station/update/:id/:type"
                  element={<StationUpdate />}
                />
                <Route path="voter" element={<Voter />} />
                <Route path="voter/create" element={<VoterCreate />} />
                <Route
                  path="voter/update/:id/:type"
                  element={<VoterUpdate />}
                />
                <Route path="affichage" element={<AffCandidat />} />
              </Route>
            </Routes>
          </AuthProvider>
        </Router>
      </React.Fragment>

      
    </>
  );
}


export default App;
