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

const VoterCreate = () => {
  // //const [birthDate, setBirthDate] = useState<Date | undefined>(undefined);
  // const [birthDate, setBirthDate] = useState<Dayjs | null>();
  // const [birthLocation, setBirthLocation] = useState("");
  // const [cin, setCin] = useState("");
  // const [address, setAddress] = useState("");
  // // const [login, setLogin] = useState("");
  // // const [password, setPassword] = useState("");
  // // const [statusVote, setStatusVote] = useState("");

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
      birthDate: birthDate ? dayjs(birthDate).toDate() : null,
      birthLocation: birthLocation,
      dateCin: dateCin ? dayjs(dateCin).toDate() : null,
      locationCin: locationCin,
      address: address,
      email: email,
      station : station,
      //password:password // pas requis
    };
    console.log("--------------------voter ------------------------");
    console.log(voter);
    console.log("-----------------fin---voter ------------------------");
    let tokenUser = localStorage.getItem("token");

    if (tokenUser) {
      // Vérifier si le token commence et se termine par des guillemets doubles
      if (tokenUser.startsWith('"') && tokenUser.endsWith('"')) {
        // Enlever les guillemets doubles en utilisant replace avec une expression régulière
        tokenUser = tokenUser.replace(/^"(.*)"$/, "$1");
      }

      VoterApplicatif.createVoter(voter, tokenUser)
        .then(() => {
          console.log("Electeur ajouté avec succès");
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }
  };

  const getStationsList = () => {
    console.log("-----------token new");
    console.log(localStorage.getItem("token"));
    console.log("-----------fin token new");
    let tokenUser = localStorage.getItem("token");

    if (tokenUser) {
      // Vérifier si le token commence et se termine par des guillemets doubles
      if (tokenUser.startsWith('"') && tokenUser.endsWith('"')) {
        // Enlever les guillemets doubles en utilisant replace avec une expression régulière
        tokenUser = tokenUser.replace(/^"(.*)"$/, "$1");
      }

      StationApplicatif.getStations(tokenUser)
        .then((response) => {
          console.log("-----Stations list-------");
          console.log(response);
          setStations(response || []);
        })
        .catch((err: Error) => {
          console.log(err);
        });
    }
  };

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
          <Typography component="h1" variant="h5">
            Electeur
          </Typography>
          <Box component="form" onSubmit={() => {}} noValidate sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  id="nom"
                  fullWidth
                  required
                  label="Nom"
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
                  id="prenom"
                  fullWidth
                  required
                  label="Prénom(s)"
                  variant="filled"
                  value={firstname}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="gender"
                  fullWidth
                  required
                  label="Sexe"
                  name="gender"
                  variant="filled"
                  value={gender}
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="email"
                  fullWidth
                  required
                  label="Email"
                  name="email"
                  variant="filled"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
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
                        variant: "filled",
                        required: true,
                        fullWidth: true,
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
                  variant="filled"
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
                  variant="filled"
                  value={cin}
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
                        variant: "filled",
                        required: true,
                        fullWidth: true,
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
                  variant="filled"
                  value={locationCin}
                  onChange={(e) => {
                    setLocationCin(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
              <FormControl variant="filled" fullWidth required>
                  <InputLabel id="station-label">Bureau de vote</InputLabel>
                  <Select
                    labelId="station-label"
                    id="station"
                    value={station}
                    onChange={(e) => setStation(e.target.value)}
                  >
                    {stations.map((station : StationDTO) => (
                      <MenuItem key={station.name} value={station._id}>
                        {station.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="address"
                  fullWidth
                  required
                  label="Adresse"
                  name="address"
                  variant="filled"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
              </Grid>
              
            </Grid>
            <Button
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => {
                createVoter();
              }}
            >
              Enregister
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default VoterCreate;
