import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { VoterApplicatif } from "../../service/applicatif/voter/voter.applicatif";
import { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import VoterDTO from "../../data/dto/voter.dto";
//import { MenuItem } from "react-pro-sidebar";
import { StationApplicatif } from "../../service/applicatif/station/station.applicatif";
import StationDTO from "../../data/dto/station.dto";
import MenuItem from "@mui/material/MenuItem";
import Autocomplete from "@mui/material/Autocomplete";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createFilterOptions } from "@mui/material/Autocomplete";
//import { borderBottomStyle } from "html2canvas/dist/types/css/property-descriptors/border-style";
import CustomTextField from "../../config/customTextField";
import { sharedFormControlStyles } from "../../config/sharedFormControlStyles";

const VoterCreate = () => {
  const navigate = useNavigate();

  const [cin, setCin] = useState("");
  const [name, setName] = useState("");
  const [firstname, setFirstName] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [birthDate, setBirthDate] = useState<Dayjs | null>();
  const [birthLocation, setBirthLocation] = useState("");
  const [email, setEmail] = useState("");
  const [dateCin, setDateCin] = useState<Dayjs | null>();
  const [locationCin, setLocationCin] = useState("");
  const [station, setStation] = useState("");
  const [stations, setStations] = useState<StationDTO[]>([]);

  const createVoter = () => {
    const voter: VoterDTO = {
      cin: cin,
      name: name,
      firstname: firstname,
      gender: gender,
      birthDate: birthDate
        ? new Date(dayjs(birthDate).format("YYYY-MM-DD"))
            .toISOString()
            .split("T")[0]
        : null,
      birthLocation: birthLocation,
      dateCin: dateCin
        ? new Date(dayjs(dateCin).format("YYYY-MM-DD"))
            .toISOString()
            .split("T")[0]
        : null,
      locationCin: locationCin,
      address: address,
      email: email,
      station: station,
    };

    let tokenUser = localStorage.getItem("token");

    if (tokenUser) {
      // Vérifier si le token commence et se termine par des guillemets doubles
      // Enlever les guillemets doubles en utilisant replace avec une expression régulière
      if (tokenUser.startsWith('"') && tokenUser.endsWith('"')) {
        tokenUser = tokenUser.replace(/^"(.*)"$/, "$1");
      }

      VoterApplicatif.createVoter(voter, tokenUser)
        .then(() => {
          toast.success("Electeur ajouté avec succès", {
            position: "top-right",
          });
          setTimeout(() => {
            console.log("Electeur ajouté avec succès");
            navigate("/dashboard/voter");
          }, 2000); // Attendre 2000 millisecondes (2 secondes)
        })
        .catch((err) => {
          if(err.response.data){
            toast.error("Erreur :"+ err.response.data, {
              position: "top-right",
            });
            console.log(err.response.data);
          }
          else {
            toast.error("Erreur :"+ err, {
              position: "top-right",
            });
          }
        });
    }
  };

  const STATIONS_CACHE_KEY = "stationsData";

  const getStationsList = () => {
    // Tenter de récupérer les données du cache
    const cachedStations = localStorage.getItem(STATIONS_CACHE_KEY);
    if (cachedStations) {
      setStations(JSON.parse(cachedStations));
      return;
    }

    let tokenUser = localStorage.getItem("token");

    if (tokenUser) {
      // Vérifier si le token commence et se termine par des guillemets doubles
      // Enlever les guillemets doubles en utilisant replace avec une expression régulière
      if (tokenUser.startsWith('"') && tokenUser.endsWith('"')) {
        tokenUser = tokenUser.replace(/^"(.*)"$/, "$1");
      }

      StationApplicatif.getStations(tokenUser)
        .then((response) => {
          // Stocker les données dans le cache après la récupération
          localStorage.setItem(STATIONS_CACHE_KEY, JSON.stringify(response));
          setStations(response || []);
        })
        .catch((err: Error) => {
          console.log(err);
        });
    }
  };

  const filterOptions = createFilterOptions({
    matchFrom: "any",
    stringify: (option: StationDTO) => option.name,
  });

  useEffect(() => {
    getStationsList();
  }, []);

  return (
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
          <Typography
            component="h1"
            variant="h5"
            sx={{ color: "green !important", mb: 4 }}
          >
            Créer un électeur
          </Typography>
          <Box component="form" onSubmit={() => {}} noValidate sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <CustomTextField
                  label="Nom"
                  name="nom"
                  required
                  value={name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setName(e.target.value);
                  }}
                />
                {/* <TextField
                  // id="nom"
                  id="standard-basic"
                  fullWidth
                  required
                  label="Nom"
                  name="nom"
                  variant="standard"
                    sx={{
                      '& label': { // Couleur du label par défaut
                        color: 'black',
                        },
                        '& label.Mui-focused': { // Couleur du label lorsqu'il est focalisé
                        color: 'grey',
                        },
                      '& .MuiInput-underline:before': { // Bordure inférieure par défaut
                      borderBottomColor: '#17b359',
                      },
                      '& .MuiInput-underline:hover:not(.Mui-disabled):before': { // Bordure inférieure au survol
                      borderBottomColor: '#17b359',
                      },
                      '& .MuiInput-underline:after': { // Bordure inférieure lorsqu'elle est active
                      borderBottomColor: '#17b359',
                      },
                      '& .MuiInputBase-input': { // Couleur du texte
                      color: 'rgba(0, 0, 0, 0.87)', // Appliquez la couleur de texte que vous souhaitez
                      },
                      '& .MuiInput-underline.Mui-error:after': { // Bordure inférieure en cas d'erreur
                      borderBottomColor: 'red',
                      },
                      '& .MuiInput-underline.Mui-disabled:before': { // Bordure inférieure si désactivé
                      borderBottomStyle: 'dotted',
                      }
                      }}
                  //variant="filled"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                /> */}
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextField
                  label="Prénom(s)"
                  name="prenom"
                  value={firstname}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFirstName(e.target.value);
                  }}
                />
                {/* <TextField
                id="standard-basic"
                  fullWidth
                  required
                  label="Prénom(s)"
                  name="prenom"
                  variant="standard"
                  value={firstname}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                /> */}
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl
                  variant="standard"
                  fullWidth
                  required
                  sx={sharedFormControlStyles}
                >
                  <InputLabel id="gender-label">Sexe</InputLabel>
                  <Select
                    labelId="gender-label"
                    id="gender"
                    value={gender}
                    onChange={(e) => {
                      setGender(e.target.value);
                    }}
                    label="Sexe"
                  >
                    <MenuItem value="Masculin">Masculin</MenuItem>
                    <MenuItem value="Féminin">Féminin</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="email"
                  fullWidth
                  required
                  label="Email"
                  name="email"
                  variant="standard"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  sx={sharedFormControlStyles}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date de naissance"
                    value={birthDate}
                    onChange={(newValue) => setBirthDate(newValue)}
                    slotProps={{
                      textField: {
                        variant: "standard",
                        required: true,
                        fullWidth: true,
                        sx: sharedFormControlStyles,
                        // Ajoutez d'autres props ici si nécessaire
                      },
                    }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="fbirthLocation"
                  fullWidth
                  required
                  label="Lieu de naissance"
                  variant="standard"
                  sx={sharedFormControlStyles}
                  value={birthLocation}
                  onChange={(e) => {
                    setBirthLocation(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="cin"
                  fullWidth
                  required
                  label="CIN"
                  name="Cin"
                  variant="standard"
                  value={cin}
                  sx={sharedFormControlStyles}
                  onChange={(e) => {
                    setCin(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date de délivrance CIN"
                    value={dateCin}
                    onChange={(newValue) => setDateCin(newValue)}
                    slotProps={{
                      textField: {
                        variant: "standard",
                        required: true,
                        fullWidth: true,
                        sx: sharedFormControlStyles,
                        // Ajoutez d'autres props ici si nécessaire
                      },
                    }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="locationCin"
                  fullWidth
                  required
                  label="Lieu de délivrance CIN"
                  variant="standard"
                  sx={sharedFormControlStyles}
                  value={locationCin}
                  onChange={(e) => {
                    setLocationCin(e.target.value);
                  }}
                />
              </Grid>
              {/* <Grid item xs={12} md={6}>
                <FormControl variant="filled" fullWidth required>
                  <InputLabel id="station-label">Bureau de vote</InputLabel>
                  <Select
                    labelId="station-label"
                    id="station"
                    value={station}
                    onChange={(e) => setStation(e.target.value)}
                  >
                    {stations.map((station: StationDTO) => (
                      <MenuItem key={station._id} value={station._id}>
                        {station.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid> */}
              <Grid item xs={12} md={6}>
                <Autocomplete
                  id="station-autocomplete"
                  options={stations}
                  getOptionLabel={(option) => option.name}
                  value={stations.find((opt) => opt._id === station) || null}
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-expect-error
                  onChange={(event, newValue: StationDTO | null) => {
                    setStation(newValue?._id ?? "");
                  }}
                  filterOptions={filterOptions}
                  renderOption={(props, option) => (
                    <li {...props} key={option._id}>
                      {option.name}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Bureau de vote"
                      variant="standard"
                      required
                      sx={sharedFormControlStyles}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="address"
                  fullWidth
                  required
                  label="Adresse"
                  name="address"
                  variant="standard"
                  sx={sharedFormControlStyles}
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} justifyContent="flex-end">
              <Grid item>
                <Button
                  variant="contained"
                  //color="info"
                  sx={{ mt: 3, mb: 2, background: "#808080" }}
                  onClick={() => {
                    navigate("/dashboard/voter");
                  }}
                >
                  Retour
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  sx={{
                    mt: 3, mb: 2,
                    background: "linear-gradient(98deg, #57B77C, #0a713f 94%)",
                  }}
                  onClick={() => {
                    createVoter();
                  }}
                >
                  Enregister
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <ToastContainer />
      </Container>
    </>
  );
};

export default VoterCreate;
