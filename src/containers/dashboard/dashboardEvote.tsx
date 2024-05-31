import { Box, Typography } from "@mui/material";
import { useEffect } from "react";


const DashboardEVote = () => {
  

    useEffect(()=>{
      console.log("useEffect initial")
      console.log(localStorage.getItem('token'))
      console.log(localStorage.getItem('user'))
      console.log("-------------------localStorage")
    })


  return (
    <>
      <Box>
        <Typography sx={styles.pageTitle} variant='h5'>
          EVote Dashboard
        </Typography>
        <Box sx={styles.columnContainer}>
     
        </Box>
      </Box>
    </>
  );
};


/** @type {import("@mui/material").SxProps} */
const styles = {
  pageTitle: {
    mb: 2,
  },
  columnContainer :{
    columns : '280px 3',
    maxWidth : 1400
  }
};

export default DashboardEVote;
