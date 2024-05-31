import { Outlet } from "react-router-dom";

import theme from "../config/theme";
import SideNav from "../components/SideNav";
import AppHeader from "../components/AppHeader";
import { ProSidebarProvider } from "react-pro-sidebar";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";

const Body = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <ProSidebarProvider>
          <CssBaseline />
          <Box sx={{ display: "flex", height: "100vh" }}>
            <SideNav />

            <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
              <AppHeader />
              <Box component={"main"} sx={styles.mainSection}>
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
    bgcolor :"neutral.grey"
  },
};

export default Body;
