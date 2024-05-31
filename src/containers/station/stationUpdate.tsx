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
  const [nbVoters, setNbVoters] = useState(0);

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
          console.log("Modification effectue avec succes");
          console.log(res);
          toast.success("Modification effectue avec succes", {
            position: "top-right",
          });
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
                      variant="filled"
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
                      required
                      label="Region"
                      variant="filled"
                      value={region}
                      onChange={(e) => {
                        setRegion(e.target.value);
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="district"
                    fullWidth
                    required
                    label="District"
                    name="district"
                    variant="filled"
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
                    variant="filled"
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
                    variant="filled"
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
                    variant="filled"
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
                    variant="filled"
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
                    variant="filled"
                    value={nbVoters}
                    onChange={(e) => {
                      setNbVoters(Number(e.target.value));
                    }}
                  />
                </Grid>
                <Button
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={() => {
                    navigate("/dashboard/station");
                  }}
                >
                  Retour
                </Button>
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
                      variant="filled"
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
                      variant="filled"
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
                      variant="filled"
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
                      variant="filled"
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
                      variant="filled"
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
                      variant="filled"
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
                      variant="filled"
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
                      variant="filled"
                      value={nbVoters}
                      onChange={(e) => {
                        setNbVoters(Number(e.target.value));
                      }}
                    />
                  </Grid>
                </Grid>
                <Button
                  variant="contained"
                  color="warning"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={() => {
                    navigate("/dashboard/station");
                  }}
                >
                  Retour
                </Button>
                <Button
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={() => {
                    updateStation();
                  }}
                >
                  Enregistrer
                </Button>
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
