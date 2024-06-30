import Login from "./containers/login/login";
import Body from "./components/Body";
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
import DashboardEVote from "./containers/dashboard/dashboardEvote";

const routeComponents = [
  { path: "/", component: Login, protected: false },
  
  {
    path: "/dashboard",
    component: Body,
    protected: true,
    routes: [
      { path: "/dashboard", component: DashboardEVote, protected: true },
      
      {
        path: "/dashboard/candidate",
        component: CandidateView,
        protected: true,
      },
      {
        path: "/dashboard/candidate/create",
        component: CandidateCreate,
        protected: true,
      },
      { path: "/dashboard/station", component: Station, protected: true },
      { path: "/dashboard/voter", component: Voter, protected: true },
      {
        path: "/dashboard/voter/create",
        component: VoterCreate,
        protected: true,
      },
      {
        path: "/dashboard/station/create",
        component: StationCreate,
        protected: true,
      },
      { path: "/dashboard/affichage", component: AffCandidat, protected: true },
      {
        path: "/dashboard/candidate/update/:id/:type",
        component: CandidateUpdate,
        protected: true,
      },
      {
        path: "/dashboard/station/update/:id/:type",
        component: StationUpdate,
        protected: true,
      },
      {
        path: "/dashboard/voter/update/:id/:type",
        component: VoterUpdate,
        protected: true,
      },
    ],
  },
];

export default routeComponents;
