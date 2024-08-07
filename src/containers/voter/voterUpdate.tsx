import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

//SERVICE
import { VoterApplicatif } from "../../service/applicatif/voter/voter.applicatif";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import VoterDTO from "../../data/dto/voter.dto";
import { sharedFormControlStyles } from "../../config/sharedFormControlStyles";

const VoterUpdate = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const params: any = useParams();

  const [token, setToken] = useState("");
  const [typeEvent, setTypeEvent] = useState("");
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

  const getVoterFromParameter = async () => {
    let tokenUser = localStorage.getItem("token");
    if (tokenUser) {
      if (tokenUser.startsWith('"') && tokenUser.endsWith('"')) {
        // Enlever les guillemets doubles en utilisant replace avec une expression régulière
        tokenUser = tokenUser.replace(/^"(.*)"$/, "$1");
        setToken(tokenUser.replace(/^"(.*)"$/, "$1"));
      } else {
        setToken(tokenUser);
      }
      await VoterApplicatif.getVoterById(params.id, tokenUser)
        .then((response) => {
          console.log(response);
          setName(response.name);
          setFirstName(response.firstname);
          setGender(response.gender);
          setAddress(response.address);
          setBirthDate(dayjs(response.birthDate));
          setBirthLocation(response.birthLocation);
          setEmail(response.email);
          setDateCin(dayjs(response.dateCin));
          setLocationCin(response.locationCin);
          setCin(response.cin);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  };
  const updateVoter = () => {
    const voter: VoterDTO = {
      cin: cin,
      name: name,
      firstname: firstname,
      gender: gender,
      //birthDate: birthDate ? dayjs(birthDate).toDate() : null,
      birthDate: birthDate
        ? new Date(dayjs(birthDate).format("YYYY-MM-DD"))
            .toISOString()
            .split("T")[0]
        : null,
      birthLocation: birthLocation,
      //dateCin: dateCin ? dayjs(dateCin).toDate() : null,
      dateCin: dateCin
        ? new Date(dayjs(dateCin).format("YYYY-MM-DD"))
            .toISOString()
            .split("T")[0]
        : null,
      locationCin: locationCin,
      address: address,
      email: email,
      //password:password // pas requis
    };
    console.log(voter);
    console.log(params.id + " ========================" + token);
    if (token) {
      VoterApplicatif.updateVoterById(params.id, voter, token)
        .then((res) => {
          console.log("Modification de l'electeur effectue avec succes");
          console.log(res);
          // navigate("/dashboard/voter")
          toast.success("Modification de l'electeur effectue avec succes", {
            position: "top-right",
          });
          setTimeout(() => {
            navigate("/dashboard/voter");
          }, 2000);
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
    getVoterFromParameter();
  }, []);

  return (
    <>
      {typeEvent === "view" ? (
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
            <Typography component="h1" variant="h5"
            sx={{ color: "green !important", mb: 4 }}>
              Electeur  - Consultation
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
                    variant="standard"
                    value={name}
                    disabled
                    sx={sharedFormControlStyles}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="prenom"
                    fullWidth
                    label="Prénom(s)"
                    variant="standard"
                    value={firstname}
                    disabled
                    sx={sharedFormControlStyles}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="gender"
                    fullWidth
                    label="Sexe"
                    name="gender"
                    variant="standard"
                    value={gender}
                    disabled
                    sx={sharedFormControlStyles}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="email"
                    fullWidth
                    label="Email"
                    name="email"
                    variant="standard"
                    value={email}
                    disabled
                    sx={sharedFormControlStyles}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Date de naissance"
                      value={birthDate}
                      sx={sharedFormControlStyles}
                      slotProps={{
                        textField: {
                          variant: "standard",
                          required: true,
                          fullWidth: true,
                          disabled: true,
                          // Ajoutez d'autres props ici si nécessaire
                        },
                      }}
                    />
                  </LocalizationProvider>

                  {/* <TextField
                    id="birthDate"
                    fullWidth
                    label="birthDate"
                    name="birthDate"
                    variant="filled"
                    value={birthDate}
                    disabled
                  /> */}
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="fbirthLocation"
                    fullWidth
                    label="Lieu de naissance"
                    variant="standard"
                    value={birthLocation}
                    disabled
                    sx={sharedFormControlStyles}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="cin"
                    fullWidth
                    label="CIN"
                    name="Cin"
                    variant="standard"
                    value={cin}
                    disabled
                    sx={sharedFormControlStyles}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Date de délivrance CIN"
                      value={dateCin}
                      sx={sharedFormControlStyles}
                      slotProps={{
                        textField: {
                          variant: "standard",
                          required: true,
                          fullWidth: true,
                          disabled: true,
                          // Ajoutez d'autres props ici si nécessaire
                        },
                      }}
                    />
                  </LocalizationProvider>
                  {/* <TextField
                    id="dateCin"
                    fullWidth
                    label="dateCin"
                    name="dateCin"
                    variant="filled"
                    value={dateCin}
                    disabled
                  
                  /> */}
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="locationCin"
                    fullWidth
                    label="Lieu de délivrance CIN"
                    variant="standard"
                    value={locationCin}
                    disabled
                    sx={sharedFormControlStyles}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="address"
                    fullWidth
                    label="Adresse"
                    name="address"
                    value={address}
                    disabled
                    variant="standard"
                    sx={sharedFormControlStyles}
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
                  // sx={{ mt: 3, mb: 2 }}
                  sx={{
                    background: "linear-gradient(98deg, #57B77C, #0a713f 94%)",
                  }}
                  onClick={() => {
                    navigate("/dashboard/voter");
                  }}
                >
                  Retour
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      ) : (
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
            <Typography component="h1" variant="h5"
            sx={{ color: "green !important", mb: 4 }}>
              Electeur - Modification
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
                    id="prenom"
                    fullWidth
                    required
                    label="Prénom(s)"
                    variant="standard"
                    sx={sharedFormControlStyles}
                    value={firstname}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  {/* <TextField
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
                  /> */}
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
                    sx={sharedFormControlStyles}
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
                      sx={sharedFormControlStyles}
                      slotProps={{
                        textField: {
                          variant: "standard",
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
                    sx={sharedFormControlStyles}
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
                      sx={sharedFormControlStyles}
                      slotProps={{
                        textField: {
                          variant: "standard",
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
                    variant="standard"
                    sx={sharedFormControlStyles}
                    value={locationCin}
                    onChange={(e) => {
                      setLocationCin(e.target.value);
                    }}
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
              {/* <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end", // This will align the button to the right
                  mt: 3, // Adjust margin top as needed
                  mb: 2, // Adjust margin bottom as needed
                }}
              > */}
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
                      mt: 3,
                      mb: 2,
                      background:
                        "linear-gradient(98deg, #57B77C, #0a713f 94%)",
                    }}
                    onClick={() => {
                      updateVoter();
                    }}
                  >
                    Enregister
                  </Button>
                </Grid>
              </Grid>

              {/* </Box> */}
            </Box>
          </Box>
          <ToastContainer />
        </Container>
      )}
    </>
  );
};

export default VoterUpdate;
