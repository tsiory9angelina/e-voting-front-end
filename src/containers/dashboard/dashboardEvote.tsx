import { Box} from "@mui/material";
import { useEffect } from "react";

const DashboardEVote = () => {
  useEffect(() => {
    console.log("useEffect initial");
    console.log(localStorage.getItem("token"));
    console.log(localStorage.getItem("user"));
    console.log("-------------------localStorage");
  }, []);

  return (
    <>
      <Box sx={styles.container}>
        {/* <Typography sx={styles.pageTitle} variant="h5">
          EVote Dashboard
        </Typography> */}
        <Box sx={styles.iframeContainer}>
          <iframe
            src="https://dashboard-evoting.web.app/"
            style={styles.iframe}
            title="EVote Dashboard"
          />
        </Box>
      </Box>
    </>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column"
  },
  pageTitle: {
    mb: 2,
  },
  iframeContainer: {
    flex: 1,
    display: "flex",
  },
  iframe: {
    flex: 1,
    border: "none",
  },
};

export default DashboardEVote;
