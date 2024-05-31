import {
  Grid,
} from "@mui/material";
import TableStation from "./tableStation";


const Station = () => {
  
  return (
    <>
      <Grid container spacing={6} style={{ paddingTop: "80px;" }}>
        <Grid item xs={12}>
          <TableStation/>
        </Grid>
      </Grid>
    </>
  );
};

export default Station;
