import {
  Grid,
} from "@mui/material";

import TableVoters from "./tableVoters";

const VoterView = () => {
  
  return (
    <>
      <Grid container spacing={6} style={{ paddingTop: "80px;" }}>
        <Grid item xs={12}>
          <TableVoters />
        </Grid>
      </Grid>
    </>
  );
};

export default VoterView;
