import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthApplicatif } from "../../service/applicatif/authentification/authentfication.applicatif";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();

  const loginTest = () => {
    const user = {
      email: "tsiory9angelina@gmail.com",
      password: "QWerty123@",
    };

    AuthApplicatif.login(user)
      .then(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (response: any) => {
          console.log("-----Login _success-------");
          console.log(response);
          navigate("/dashboard");
        }
      )
      .catch((err: Error) => {
        console.log(err);
      });
  };

  //On Load
  useEffect(() => {
    if (localStorage.getItem("user") !== null)
      //navigate("")
      console.log("User localstorage change");
  }, []);

  return (
    <>
      <Container maxWidth="sm" style={{ boxShadow: "20px" }}>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Connexion
          </Typography>
          <Box component="form" onSubmit={() => {}} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => {
                loginTest();
              }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="#">Forgot password?</Link>
              </Grid>
              <Grid item>
                <Link to="#">{"Don't have an account? Sign Up"}</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login;
