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
      width: "100%",
      maxWidth: collapsed ? 50 : 250,
      height: "auto",
      //width: collapsed ? 50 : 170, // Largeur ajustée en fonction de l'état collapsed
      //ml: 2,
      cursor: "pointer",
      transition: "width 0.3s ease-in-out",
      marginLeft: collapsed ? "20px" : 0, // Ajoute une marge à gauche si collapsed
      marginRight: collapsed ? "auto" : 0, // Centre l'icône si collapsed
    },
  };

  //================================================================

  return (
    <Sidebar
      //style={{ height: "100%", top: "auto", borderColor: "#c1c1c6" }}
      style={{
        height: "100%",
        top: "auto",
        boxShadow: "1px 1px 0px 1px rgba(0, 0, 0, 0.25)",
        //background: "green",
        background:
          "linear-gradient(98deg, rgba(95, 230, 164, 1) , rgba(158, 158, 158, 1) 94%)",
        //background: "linear-gradient(98deg, rgba(158, 158, 158, 1) 50%, rgba(95, 230, 164, 1) 100%)",
        //background: "linear-gradient(98deg, rgba(112, 192, 119, 1) 20%, rgba(101, 176, 105, 1) 50%, rgba(147, 198, 147, 1) 100%)",
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
                ? "linear-gradient(98deg, #57B77C, #0a713f 94%)"
                : //? "linear-gradient(98deg, #89B77C, #0a713f 94%)"
                  undefined,
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
        {/* <Box
            component="img"
          sx={styles.appLogo}
//             sx={{
//               ...styles.appLogo,
//               width: '100px', // Ajustez cette valeur selon vos besoins
//               height: 'auto' , // Maintient le ratio d'aspect
//               display: 'block',
// //margin: '0 auto'
// margin: '20px auto 0'
//               }}
            //src="/src/assets/Logo_vote-svg.png"
            //src="/src/assets/logo-removebg2.png"
             //src="/src/assets/testlogo.png" logo3-removebg
             //src="/src/assets/logo3-removebg.png" 
             src="https://storage.googleapis.com/evote-bucket-blockchain2/assets/logo3-removebg.png"
            //src="https://storage.cloud.google.com/evote-bucket-blockchain/assets/logo-removebg2.png"
          /> */}

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            component="img"
            sx={{
              ...styles.appLogo,
              width: "50px", // Ajustez cette valeur selon vos besoins
              height: "auto", // Maintient le ratio d'aspect
              display: "block",
              //margin: '20px auto 0',
              marginLeft: 3,
            }}
            src="https://storage.googleapis.com/evote-bucket-blockchain2/assets/Logo4-removebg.png"
          />
          <Typography
            variant="h6"
            sx={{
              marginLeft: 2,
              fontSize: "30px",
              fontWeight: "bold",
              //fontFamily: "Times New Roman, serif",
              
            }}
          >
            Evoting
          </Typography>
        </Box>

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
            location.pathname === "/dashboard/candidate/create" ||
            location.pathname.startsWith("/dashboard/candidate/update/")
          }
          component={<Link to="/dashboard/candidate" />}
          icon={<NoteAddTwoToneIcon />}
        >
          <Typography variant="body2">Candidat</Typography>
        </MenuItem>
        {/* </SubMenu> */}
        <MenuItem
          active={
            location.pathname === "/dashboard/station" ||
            location.pathname === "/dashboard/station/create" ||
            location.pathname.startsWith("/dashboard/station/update/")
          }
          component={<Link to="/dashboard/station" />}
          icon={<RoofingTwoToneIcon />}
        >
          <Typography variant="body2">Bureau de vote</Typography>
        </MenuItem>
        <MenuItem
          active={
            location.pathname === "/dashboard/voter" ||
            location.pathname === "/dashboard/voter/create" ||
            location.pathname.startsWith("/dashboard/voter/update/")
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
