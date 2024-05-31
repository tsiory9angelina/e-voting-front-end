import { Typography, useTheme, Box } from "@mui/material";
import { Menu, MenuItem, Sidebar, useProSidebar } from "react-pro-sidebar";

import HowToVoteTwoToneIcon from "@mui/icons-material/HowToVoteTwoTone";
import RoofingTwoToneIcon from "@mui/icons-material/RoofingTwoTone";
//import PortraitTwoToneIcon from "@mui/icons-material/PortraitTwoTone";
import HowToRegTwoToneIcon from "@mui/icons-material/HowToRegTwoTone";
import NoteAddTwoToneIcon from "@mui/icons-material/NoteAddTwoTone";
//import RateReviewTwoToneIcon from '@mui/icons-material/RateReviewTwoTone';

import { Link, useLocation } from "react-router-dom";
function SideNav() {
  const theme = useTheme();
  const { collapsed } = useProSidebar();
  // Verifier si on se trouve bel et bien dans l'url
  const location = useLocation();

  //================================================================
  /** @type {import("@mui/material").SxProps} */
  const styles = {
    // appLogo: {
    //   borderRadius: 2,
    //   width: 170,
    //   ml: 2,
    //   cursor: "pointer",
    // },
    appLogo: {
      borderRadius: 2,
      width: collapsed ? 50 : 170, // Largeur ajustée en fonction de l'état collapsed
      ml: 2,
      cursor: "pointer",
      transition: "width 0.3s ease-in-out", 
      },
    }

  //================================================================

  return (
    <Sidebar
      //style={{ height: "100%", top: "auto", borderColor: "#c1c1c6" }}
      style={{
        height: "100%",
        top: "auto",
        boxShadow: "1px 1px 0px 1px rgba(0, 0, 0, 0.25)",
        background: "green",
        color: "#1e4620",
      }}
      breakPoint="md"

      //backgroundColor={theme.palette.secondary.light}
    >
      <Menu
        menuItemStyles={{
          button: ({ active }) => {
            return {
              //marginBottom: "10px",
              margin: collapsed ? "0px" : "10px",
              borderRadius: "6px",
              boxShadow: active
                ? "0px 4px 8px -4px rgba(58, 53, 65, 0.42)"
                : undefined,
              backgroundImage: active
                ? "linear-gradient(98deg, #89B77C, #0a713f 94%)"
                : undefined,
              backgroundColor: active
                ? theme.palette.secondary.dark
                : undefined,
              //borderRadius: "0px 50px 50px 0px", // Coins arrondis à droite
              color: active ? "white" : undefined,
              transition:
                "background-color 0.3s, color 0.3s, box-shadow 0.3s, background-image 0.3s",
            };
          },
          icon: ({ active }) => {
            return {
              color: active ? "white" : undefined, // Icônes en blanc lorsque actif
            };
          },
        }}
      >
        
          <Box
            component="img"
            sx={styles.appLogo}
            src="/src/assets/logo-removebg2.png"
          />
      
        <MenuItem
          active={location.pathname === "/dashboard"}
          component={<Link to="/dashboard" />}
          icon={<HowToVoteTwoToneIcon />}
        >
          <Typography variant="body2">Dashboard</Typography>
        </MenuItem>
        {/* =====================Candidats================ */}
        {/* <SubMenu label="Candidats" icon={<PortraitTwoToneIcon />}> */}
        {/* <MenuItem
            active={location.pathname === "/candidate/view"}
            component={<Link to="/candidate/view" />}
            icon={<RateReviewTwoToneIcon />}
          >
            <Typography variant="body2">Voir</Typography>
          </MenuItem> */}
        <MenuItem
          active={
            location.pathname === "/dashboard/candidate" ||
            location.pathname === "/dashboard/candidate/create"
          }
          component={<Link to="/dashboard/candidate" />}
          icon={<NoteAddTwoToneIcon />}
        >
          <Typography variant="body2">Candidats</Typography>
        </MenuItem>
        {/* </SubMenu> */}
        <MenuItem
          active={
            location.pathname === "/dashboard/station" ||
            location.pathname === "/dashboard/station/create"
          }
          component={<Link to="/dashboard/station" />}
          icon={<RoofingTwoToneIcon />}
        >
          <Typography variant="body2">Bureau de vote</Typography>
        </MenuItem>
        <MenuItem
          active={
            location.pathname === "/dashboard/voter" ||
            location.pathname === "/dashboard/voter/create"
          }
          component={<Link to="/dashboard/voter" />}
          icon={<HowToRegTwoToneIcon />}
        >
          <Typography variant="body2">Electeur</Typography>
        </MenuItem>
      </Menu>
    </Sidebar>
  );
  
}


export default SideNav;
