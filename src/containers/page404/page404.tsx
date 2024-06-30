import { Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Page404 = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center' }}>
      <Typography variant="h1" style={{ marginBottom: 16 }}>
        404
      </Typography>
      <Typography variant="h4" style={{ marginBottom: 16 }}>
        Oops! Page not found.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/"
        style={{ marginTop: 16 }}
      >
        Go to Home
      </Button>
    </div>
  );
};

export default Page404;
