import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StationApplicatif } from "../../service/applicatif/station/station.applicatif";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import StationDTO from "../../data/dto/station.dto";
import { sharedFormControlStyles } from "../../config/sharedFormControlStyles";

const StationUpdate = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const params: any = useParams();

  const [token, setToken] = useState("");
  const [typeEvent, setTypeEvent] = useState("");
  const [name, setName] = useState("");
  const [region, setRegion] = useState("");
  const [district, setDistrict] = useState("");
  const [commune, setCommune] = useState("");
  const [fokontany, setFokontany] = useState("");
  const [centre, setCentre] = useState("");
  const [code, setCode] = useState("");
  const [nbVoters, setNbVoters] = useState("");

  const getStationFromParameter = async () => {
    let tokenUser = localStorage.getItem("token");
    if (tokenUser) {
      if (tokenUser.startsWith('"') && tokenUser.endsWith('"')) {
        // Enlever les guillemets doubles en utilisant replace avec une expression régulière
        tokenUser = tokenUser.replace(/^"(.*)"$/, "$1");
        setToken(tokenUser.replace(/^"(.*)"$/, "$1"));
      } else {
        setToken(tokenUser);
      }
      await StationApplicatif.getStationById(params.id, tokenUser)
        .then((response) => {
          console.log(response);
          setName(response.name);
          setRegion(response.region);
          setDistrict(response.district);
          setCommune(response.commune);
          setFokontany(response.fokontany);
          setCentre(response.centre);
          setCode(response.code);
          setNbVoters(response.nbVoters);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  };

  const updateStation = () => {
    const stationValue: StationDTO = {
      name: name,
      region: region,
      district: district,
      commune: commune,
      fokontany: fokontany,
      centre: centre,
      code: code,
      nbVoters: nbVoters,
    };
    if (token) {
      StationApplicatif.updateStation(params.id, stationValue, token)
        .then((res) => {
          console.log("Modification effectué avec succes");
          console.log(res);
          toast.success("Modification effectué avec succes", {
            position: "top-right",
          });
          setTimeout(() => {
            navigate("/dashboard/station");
          }, 2000); // Attendre 2000 millisecondes (2 secondes)
        })
        .catch((err) => {
          toast.success(err, { position: "top-right" });
          console.log(err);
        });
    }
  };

  useEffect(() => {
    setTypeEvent(params.type);
  }, []);
  useEffect(() => {
    getStationFromParameter();
  }, []);

  return (
    <>
      {typeEvent === "view" ? (
        <>
          <Container
            style={{
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              background: "#ffffff",
              borderRadius: "10px",
              padding: "20px", // Ajout de padding au besoin
              // position: "relative", // Ajout de position relative
              maxWidth: "95%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography component="h1" variant="h5">
                Bureau de vote - Consultation
              </Typography>
              <Box
                component="form"
                onSubmit={() => {}}
                noValidate
                sx={{ mt: 1 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      id="nom"
                      fullWidth
                      label="Nom du bureau de vote"
                      name="nom"
                      variant="standard"
                      sx={sharedFormControlStyles}
                      value={name}
                      disabled
                      //   onChange={(e) => {
                      //     setNameStation(e.target.value);
                      //   }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      id="region"
                      fullWidth
                      disabled
                      label="Region"
                      variant="standard"
                      sx={sharedFormControlStyles}
                      value={region}
                      onChange={(e) => {
                        setRegion(e.target.value);
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      id="district"
                      fullWidth
                      disabled
                      label="District"
                      name="district"
                      variant="standard"
                      sx={sharedFormControlStyles}
                      value={district}
                      onChange={(e) => {
                        setDistrict(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      id="commune"
                      fullWidth
                      disabled
                      label="Commune"
                      variant="standard"
                      sx={sharedFormControlStyles}
                      value={commune}
                      onChange={(e) => {
                        setCommune(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      id="fokontany"
                      fullWidth
                      disabled
                      label="Fokontany"
                      name="nom"
                      variant="standard"
                      sx={sharedFormControlStyles}
                      value={fokontany}
                      onChange={(e) => {
                        setFokontany(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      id="centre"
                      fullWidth
                      disabled
                      label="Centre"
                      variant="standard"
                      sx={sharedFormControlStyles}
                      value={centre}
                      onChange={(e) => {
                        setCentre(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      id="code"
                      fullWidth
                      disabled
                      label="Code"
                      name="nom"
                      variant="standard"
                      sx={sharedFormControlStyles}
                      value={code}
                      onChange={(e) => {
                        setCode(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      id="nbVoters"
                      fullWidth
                      disabled
                      label="Nombre d'élécteur"
                      variant="standard"
                      sx={sharedFormControlStyles}
                      value={nbVoters}
                      onChange={(e) => {
                        setNbVoters(e.target.value);
                      }}
                    />
                  </Grid>
                </Grid>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end", // This will align the button to the right
                    mt: 3, // Adjust margin top as needed
                    mb: 2, // Adjust margin bottom as needed
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      background:
                        "linear-gradient(98deg, #57B77C, #0a713f 94%)",
                    }}
                    onClick={() => {
                      navigate("/dashboard/station");
                    }}
                  >
                    Retour
                  </Button>
                </Box>
              </Box>
            </Box>
          </Container>
        </>
      ) : (
        <>
          <Container
            style={{
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              background: "#ffffff",
              borderRadius: "10px",
              padding: "20px", // Ajout de padding au besoin
              // position: "relative", // Ajout de position relative
              maxWidth: "95%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography component="h1" variant="h5">
                Bureau de vote - Modification
              </Typography>
              <Box
                component="form"
                onSubmit={() => {}}
                noValidate
                sx={{ mt: 1 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      id="nom"
                      fullWidth
                      required
                      label="Nom du bureau de vote"
                      name="nom"
                      variant="standard"
                      sx={sharedFormControlStyles}
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      id="region"
                      fullWidth
                      required
                      label="Region"
                      variant="standard"
                      sx={sharedFormControlStyles}
                      value={region}
                      onChange={(e) => {
                        setRegion(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      id="district"
                      fullWidth
                      required
                      label="District"
                      name="district"
                      variant="standard"
                      sx={sharedFormControlStyles}
                      value={district}
                      onChange={(e) => {
                        setDistrict(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      id="commune"
                      fullWidth
                      required
                      label="Commune"
                      variant="standard"
                      sx={sharedFormControlStyles}
                      value={commune}
                      onChange={(e) => {
                        setCommune(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      id="fokontany"
                      fullWidth
                      required
                      label="Fokontany"
                      name="nom"
                      variant="standard"
                      sx={sharedFormControlStyles}
                      value={fokontany}
                      onChange={(e) => {
                        setFokontany(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      id="centre"
                      fullWidth
                      required
                      label="Centre"
                      variant="standard"
                      sx={sharedFormControlStyles}
                      value={centre}
                      onChange={(e) => {
                        setCentre(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      id="code"
                      fullWidth
                      required
                      label="Code"
                      name="nom"
                      variant="standard"
                      sx={sharedFormControlStyles}
                      value={code}
                      onChange={(e) => {
                        setCode(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      id="nbVoters"
                      fullWidth
                      required
                      label="Nombre d'élécteur"
                      variant="standard"
                      sx={sharedFormControlStyles}
                      value={nbVoters}
                      onChange={(e) => {
                        setNbVoters(e.target.value);
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} justifyContent="flex-end">
                  <Grid item>
                    <Button
                      variant="contained"
                      //color="info"
                      sx={{ mt: 3, mb: 2, 
                        background:
                        "#808080", }}
                      onClick={() => {
                        navigate("/dashboard/station");
                      }}
                    >
                      Retour
                    </Button>
                  </Grid>

                  <Grid item>
                    <Button
                      variant="contained"
                      sx={{ mt: 3, mb: 2 , 
                        background:
                        "linear-gradient(98deg, #57B77C, #0a713f 94%)",}}
                      onClick={() => {
                        updateStation();
                      }}
                    >
                      Enregistrer
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <ToastContainer />
          </Container>
        </>
      )}
    </>
  );
};

export default StationUpdate;
