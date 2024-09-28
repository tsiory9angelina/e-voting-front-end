import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthApplicatif } from "../../service/applicatif/authentification/authentfication.applicatif";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import { styled } from "@mui/material/styles";
import MuiCard from "@mui/material/Card";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// Custom styles for the gradient background
const BackgroundContainer = styled(Box) ({
  minHeight: "100vh",
  width: "100%", // Prend toute la largeur de l'écran
  height: "100%", // Prend toute la hauteur de l'écran
  margin: 0, // Pas de marge
  padding: 0, // Pas de padding
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  //background: "linear-gradient(135deg, #ffffff 50%, #9c27b0 50%)", // Diagonal gradient
  
  //background: "linear-gradient(135deg, #ffffff 50%, rgba(95, 230, 164, 1) 50%, rgba(158, 158, 158, 1) 100%)"
  background: "linear-gradient(135deg, #ffffff 50%, rgba(95, 230, 164, 1) 50%, rgba(28, 168, 100) 100%)"
});

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)", // Enhanced shadow effect
  backgroundColor: "white",
}));

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 

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
      {/* <Container maxWidth="sm" style={{ boxShadow: "20px" }}> */}
      <BackgroundContainer>
        <Container maxWidth="sm">
          <Card>
            <Box
              sx={{
                marginTop: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* Logo and title */}
              {/* <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  component="img"
                  sx={{
                    width: "50px", // Adjust size
                    height: "auto",
                    display: "block",
                  }}
                  src="https://storage.googleapis.com/evote-bucket-blockchain2/assets/Logo4-removebg.png"
                  alt="Evoting Logo"
                />
                <Typography
                  variant="h6"
                  sx={{
                    marginLeft: 2,
                    fontSize: "30px",
                    fontWeight: "bold",
                  }}
                >
                  Evoting
                </Typography>
              </Box> */}

               {/* Connexion title */}
              <Typography component="h1" variant="h5">
                Connexion
              </Typography>
              <Box
                component="form"
                onSubmit={() => {}}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
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
                  label="Mot de passe"
                  type={showPassword ? "text" : "password"} // Change le type en fonction de l'état
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword((prev) => !prev)} // Inverse l'état de visibilité
                          edge="end"
                        >
                          {showPassword ?  <Visibility />: <VisibilityOff /> } 
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Se souvenir de moi"
                />
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    background: "rgba(28, 196, 111)", // Couleur de base
                    color: "white",
                    "&:hover": {
                      //backgroundImage: "linear-gradient(98deg, #57B77C, #0a713f 94%)", // Couleur au survol
                      background: "rgba(28, 168, 100)", 
                    },
                  }}
                  onClick={() => {
                    loginTest();
                  }}
                >
                  CONNEXION
                </Button>
                {/* <Grid container>
                  <Grid item xs>
                    <Link to="#">Forgot password?</Link>
                  </Grid>
                  <Grid item>
                    <Link to="#">{"Don't have an account? Sign Up"}</Link>
                  </Grid>
                </Grid> */}
              </Box>
            </Box>
            <ToastContainer />
          </Card>
        </Container>
      </BackgroundContainer>
    </>
  );
};

export default Login;
