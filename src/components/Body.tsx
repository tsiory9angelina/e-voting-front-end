import { Outlet, useLocation } from "react-router-dom";

import theme from "../config/theme";
import SideNav from "../components/SideNav";
import AppHeader from "../components/AppHeader";
import { ProSidebarProvider } from "react-pro-sidebar";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";

const Body = () => {
  const location = useLocation();

  // Vérifiez si l'URL actuelle correspond au chemin du Dashboard
  const isDashboard = location.pathname === "/dashboard";

  return (
    <>
      <ThemeProvider theme={theme}>
        <ProSidebarProvider>
          <CssBaseline />
          <Box sx={{ display: "flex", height: "100vh" }}>
            <SideNav />

            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                background: isDashboard
                ? "linear-gradient(to right, #8cf3c1, #69F0AE)" // Dégradé de gauche à droite
                : "neutral.grey",
              }}
            >
              <AppHeader />
              <Box
                component={"main"}
                sx={{
                  ...styles.mainSection,
                  background: isDashboard
                    ? "linear-gradient(to right, #8cf3c1, #69F0AE)" // Dégradé de gauche à droite
                    : "neutral.grey",
                }}
              >
                <Outlet />
              </Box>
            </Box>
          </Box>
        </ProSidebarProvider>
      </ThemeProvider>
    </>
  );
};

/** @type {import("@mui/material").SxProps} */
const styles = {
  container: {
    display: "flex",
    bgcolor: "neutral.grey",
    height: "calc(100% - 64px)",
  },
  mainSection: {
    p: 4,
    width: "100%",
    height: "100%",
    overflow: "auto",
    bgcolor: "neutral.grey",
  },
};

export default Body;
