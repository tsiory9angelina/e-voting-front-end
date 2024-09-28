import {
  Box,
  Button,
  Checkbox,
  Container,
  //FormControl,
  FormControlLabel,
  Grid,
  // IconButton,
  // InputAdornment,
  // InputLabel,
  // OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthApplicatif } from "../../service/applicatif/authentification/authentfication.applicatif";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
//import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [showPassword, setShowPassword] = useState(false);

  // const handleClickShowPassword = () => setShowPassword((show) => !show);

  // const handleMouseDownPassword = (
  //   event: React.MouseEvent<HTMLButtonElement>
  // ) => {
  //   event.preventDefault();
  // };

  const loginTest = () => {
    if (!email || email === "" || !password || password === "") {
      toast.error("Veuillez saisir tous les champs", {
        position: "top-right",
      });
    } else if ((email && email !== "" && password) || password !== "") {
      const user = {
        email: email,
        password: password,
      };
      console.log(user);
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
    }
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
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
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
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {/* <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl> */}
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
        <ToastContainer />
      </Container>
    </>
  );
};

export default Login;
