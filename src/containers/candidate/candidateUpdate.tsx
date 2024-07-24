import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { CandidateApplicatif } from "../../service/applicatif/candidate/candidate.applicatif";
import CandidateDTO from "../../data/dto/candidate.dto";
import { sharedFormControlStyles } from "../../config/sharedFormControlStyles";

const CandidateUpdate = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const params: any = useParams();

  const [token, setToken] = useState("");
  const [typeEvent, setTypeEvent] = useState("");
  const [modiffiedStatus, setModiffiedStatus] = useState(false);

  const [candidate, setCandidate] = useState<CandidateDTO>();
  //Image du candidat
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [compaingLocation, setCompaingLocation] = useState("");
  const [partyEntity, setPartyEntity] = useState("");
  const [cin, setCin] = useState("");
  const [dateBirth, setDatebirth] = useState<Dayjs | null>();
  const [birthLocation, setBirthLocation] = useState("");
  const [dateCin, setDateCin] = useState<Dayjs | null>();
  const [locationCin, setLocationCin] = useState("");
  const [description, setDescription] = useState("");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const imgFile = event.target.files[0];
      console.log(selectedImage);

      setSelectedImage(imgFile); // Stockez le fichier image directement

      setImagePreviewUrl(URL.createObjectURL(imgFile)); // Stockez l'URL de l'aperçu de l'image
      setModiffiedStatus(true);
    }
  };

  const getCandidateFromParameter = async () => {
    let tokenUser = localStorage.getItem("token");
    if (tokenUser) {
      if (tokenUser.startsWith('"') && tokenUser.endsWith('"')) {
        // Enlever les guillemets doubles en utilisant replace avec une expression régulière
        tokenUser = tokenUser.replace(/^"(.*)"$/, "$1");
        setToken(tokenUser.replace(/^"(.*)"$/, "$1"));
      } else {
        setToken(tokenUser);
      }
      await CandidateApplicatif.getCandidateById(params.id, tokenUser)
        .then((response: CandidateDTO) => {
          if (response) {
            console.log(response);
            setCandidate(response);
          }
          setName(response.name);
          setFirstname(response.firstname);
          console.log("========================== image : ");
          console.log(response.imageUrl);
          if (response.imageUrl) {
            if (typeof response.imageUrl === "string") {
              setImagePreviewUrl(response.imageUrl);
              setSelectedImage(response.imageUrl);
            } else {
              // Gérer le cas où imageUrl est un File
              // Créer une URL blob à partir du fichier pour l'aperçu
              //const imageUrl = URL.createObjectURL(response.imageUrl);
              setImagePreviewUrl(URL.createObjectURL(response.imageUrl));
              setSelectedImage(response.imageUrl);
            }
          }

          setPartyEntity(response.partyEntity);
          setCompaingLocation(response.compaingLocation);
          setDatebirth(dayjs(response.dateBirth));
          setBirthLocation(response.birthLocation);
          setCin(response.cin);
          setDateCin(dayjs(response.dateCin));
          setLocationCin(response.locationCin);
          setDescription(response.description);
          //Here
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  };

  const updateCandidate = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("firstname", firstname);
    formData.append("partyEntity", partyEntity);
    formData.append("compaingLocation", compaingLocation);
    formData.append(
      "dateBirth",
      dateBirth ? dateBirth.format("YYYY-MM-DD") : ""
    );
    formData.append("birthLocation", birthLocation);
    formData.append("cin", cin);
    formData.append("dateCin", dateCin ? dateCin.format("YYYY-MM-DD") : "");
    formData.append("locationCin", locationCin);
    formData.append("description", description);

    // Ajoutez l'image au FormData si elle est sélectionnée
    if (selectedImage && modiffiedStatus) {
      //const imageBlob = new Blob([selectedImage]);
      console.log(selectedImage);
      formData.append("imageUrl", selectedImage, selectedImage.name);
    }
    if (token) {
      console.log("=================DATA to send ");
      console.log(formData);
      CandidateApplicatif.updateCandidateById(params.id, formData, token)
        .then((res) => {
          console.log("Modification du candidat effectue avec succes");
          console.log(res);
          toast.success("Modification du candidat effectue avec succes", {
            position: "top-right",
          });
          setTimeout(() => {
            navigate("/dashboard/candidate");
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
    getCandidateFromParameter();
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
            <Typography component="h1" variant="h5" sx={{ color: "green !important" }}>
              Candidat - Vue en détail
            </Typography>
            {/* <Box component="form" onSubmit={() => {}} noValidate sx={{ mt: 1 }}> */}
            <Box component="form" onSubmit={() => {}} noValidate sx={{ mt: 1 }}>
              <Grid container spacing={2}>
                {/* Partie gauche pour la photo du candidat et le téléchargement de fichier */}
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={3}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center", // Centre verticalement
                    gap: 2,
                    //minHeight: "400px", // Assurez-vous que le Grid a une hauteur pour le centrage vertical
                  }}
                >
                  <Avatar
                    src={imagePreviewUrl || undefined}
                    sx={{
                      minWidth: 300,
                      maxWidth: 300,
                      height: 400,
                      border: "3px solid",
                      borderColor: "primary.main",
                      marginLeft: { md: "30%", xs: 0 },
                      //margin: "auto"
                    }}
                    variant="rounded"
                  />
                  <input
                    accept="image/*"
                    style={{ display: "none" }}
                    id="raised-button-file"
                    type="file"
                    onChange={handleImageChange}
                  />
                </Grid>
                {/* Trait vertical de séparation */}
                <Grid
                  item
                  xs={false}
                  sm={false}
                  md={1}
                  sx={{ display: { xs: "none", md: "block" } }}
                >
                  <Box
                    sx={{
                      height: "100%",
                      borderRight: 1,
                      borderColor: "divider",
                    }}
                  />
                </Grid>
                {/* Partie droite pour les autres champs de saisie */}
                <Grid item xs={12} sm={12} md={7}>
                  {/* Espace ajouté ici */}
                  <Grid container spacing={2} direction="column">
                    <Grid item xs={12}>
                      <TextField
                        id="nom"
                        fullWidth
                        disabled
                        label="Nom"
                        name="nom"
                        variant="standard"
                        sx={sharedFormControlStyles}
                        value={candidate?.name}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="prenom"
                        fullWidth
                        disabled
                        label="Prénom(s)"
                        variant="standard"
                        sx={sharedFormControlStyles}
                        value={firstname}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Date de naissance"
                          disabled
                          value={dayjs(candidate?.dateBirth || null)}
                          sx={sharedFormControlStyles}
                          slotProps={{
                            textField: {
                              variant: "standard",
                              fullWidth: true,

                              // Ajoutez d'autres props ici si nécessaire
                            },
                          }}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="fbirthLocation"
                        fullWidth
                        disabled
                        label="Lieu de naissance"
                        variant="standard"
                        sx={sharedFormControlStyles}
                        value={candidate?.birthLocation}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="cin"
                        fullWidth
                        disabled
                        label="CIN"
                        variant="standard"
                        sx={sharedFormControlStyles}
                        value={candidate?.cin}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      {/* <TextField
                          id="dateCin"
                          fullWidth
                          disabled
                          label="Date de délivrance CIN"
                          name="dateCin"
                          variant="filled"
                          value={candidate?.dateCin}
                          sx={{ width: "100%", maxWidth: "600px" }}
                        />*/}
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Date de délivrance CIN"
                          value={dayjs(candidate?.dateCin || null)}
                          disabled
                          sx={sharedFormControlStyles}
                          slotProps={{
                            textField: {
                              variant: "standard",
                              fullWidth: true,

                              // Ajoutez d'autres props ici si nécessaire
                            },
                          }}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="locationCin"
                        fullWidth
                        disabled
                        label="Lieu de délivrance CIN"
                        variant="standard"
                        sx={sharedFormControlStyles}
                        value={candidate?.locationCin}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="partyEntity"
                        fullWidth
                        disabled
                        label="Partie Politique"
                        variant="standard"
                        sx={sharedFormControlStyles}
                        value={candidate?.partyEntity}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="compaignStation"
                        fullWidth
                        disabled
                        label="Siège"
                        variant="standard"
                        sx={sharedFormControlStyles}
                        value={candidate?.compaingLocation}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="description"
                        fullWidth
                        disabled
                        label="Description"
                        variant="standard"
                        sx={sharedFormControlStyles}
                        value={candidate?.description}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} justifyContent="flex-end">
                    <Grid item>
                      <Button
                        variant="contained"
                        sx={{ mt: 3, mb: 2, background: "#808080" }}
                        onClick={() => {
                          navigate("/dashboard/candidate");
                        }}
                      >
                        Retour
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
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
            <Typography component="h1" variant="h5" sx={{ color: "green !important" }}>
              Candidat - Modification
            </Typography>
            {/* <Box component="form" onSubmit={() => {}} noValidate sx={{ mt: 1 }}> */}
            <Box component="form" onSubmit={() => {}} noValidate sx={{ mt: 1 }}>
              <Grid container spacing={2}>
                {/* Partie gauche pour la photo du candidat et le téléchargement de fichier */}
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={3}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center", // Centre verticalement
                    gap: 2,
                    //minHeight: "400px", // Assurez-vous que le Grid a une hauteur pour le centrage vertical
                  }}
                >
                  <Avatar
                    src={imagePreviewUrl || undefined}
                    sx={{
                      minWidth: 300,
                      maxWidth: 300,
                      height: 400,
                      border: "3px solid",
                      borderColor: "primary.main",
                      marginLeft: { md: "30%", xs: 0 },
                      //margin: "auto"
                    }}
                    variant="rounded"
                  />
                  <input
                    accept="image/*"
                    style={{ display: "none" }}
                    id="raised-button-file"
                    type="file"
                    onChange={handleImageChange}
                  />

                  <Button
                    variant="contained"
                    component="span"
                    sx={{ mt: 2, mb: 2, marginLeft: { md: "29%", xs: 0 } }}
                  >
                    <label
                      htmlFor="raised-button-file"
                      style={{ width: "100%" }}
                    >
                      Télécharger une photo
                    </label>
                  </Button>
                </Grid>
                {/* Trait vertical de séparation */}
                <Grid
                  item
                  xs={false}
                  sm={false}
                  md={1}
                  sx={{ display: { xs: "none", md: "block" } }}
                >
                  <Box
                    sx={{
                      height: "100%",
                      borderRight: 1,
                      borderColor: "divider",
                    }}
                  />
                </Grid>
                {/* Partie droite pour les autres champs de saisie */}
                <Grid item xs={12} sm={12} md={7}>
                  {/* Espace ajouté ici */}
                  <Grid container spacing={2} direction="column">
                    <Grid item xs={12}>
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
                    <Grid item xs={12}>
                      <TextField
                        id="prenom"
                        fullWidth
                        required
                        label="Prénom(s)"
                        variant="standard"
                        sx={sharedFormControlStyles}
                        value={firstname}
                        onChange={(e) => {
                          setFirstname(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Date de naissance"
                          value={dateBirth}
                          onChange={(newValue) => setDatebirth(newValue)}
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
                    <Grid item xs={12}>
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
                    <Grid item xs={12}>
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
                    <Grid item xs={12}>
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
                            },
                          }}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12}>
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
                    <Grid item xs={12}>
                      <TextField
                        id="partyEntity"
                        fullWidth
                        required
                        label="Partie Politique"
                        variant="standard"
                        sx={sharedFormControlStyles}
                        value={partyEntity}
                        onChange={(e) => {
                          setPartyEntity(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="compaignStation"
                        fullWidth
                        required
                        label="Siège"
                        variant="standard"
                        sx={sharedFormControlStyles}
                        value={compaingLocation}
                        onChange={(e) => {
                          setCompaingLocation(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="description"
                        fullWidth
                        required
                        label="Description"
                        variant="standard"
                        sx={sharedFormControlStyles}
                        value={description}
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} justifyContent="flex-end">
                    <Grid item>
                      <Button
                        variant="contained"
                        sx={{ mt: 3, mb: 2, background: "#808080" }}
                        onClick={() => {
                          navigate("/dashboard/candidate");
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
                          updateCandidate();
                        }}
                      >
                        Modifier
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <ToastContainer />
        </Container>
      )}
    </>
  );
};
export default CandidateUpdate;
