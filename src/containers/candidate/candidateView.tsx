
import { Grid } from "@mui/material";
import TableCandidate from "./tableCandidate";
const CandidateView = () => {
  return (
    <>
      {/* <Container
        style={{
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          background: "#ffffff",
          borderRadius: "10px",
          padding: "20px", // Ajout de padding au besoin
          // position: "relative", // Ajout de position relative
          maxWidth : "95%"
          
        }}
      > */}

      {/* </Container> */}
      <Grid container spacing={6} style={{ paddingTop: "80px;" }}>
        <Grid item xs={12}>
          <TableCandidate />
        </Grid>
      </Grid>
    </>
  );
};

export default CandidateView;
