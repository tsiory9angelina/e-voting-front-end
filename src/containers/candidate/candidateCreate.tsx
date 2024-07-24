import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Avatar,
} from "@mui/material";
// import dayjs, { Dayjs } from "dayjs";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { CandidateApplicatif } from "../../service/applicatif/candidate/candidate.applicatif";
import { ToastContainer, toast } from "react-toastify";
import { sharedFormControlStyles } from "../../config/sharedFormControlStyles";

const CandidateCreate = () => {
  const navigate = useNavigate();

  //Image du candidat
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [firstname, setFirstame] = useState("");
  const [compaingLocation, setCompaingLocation] = useState("");
  const [partyEntity, setPartyEntity] = useState("");
  const [cin, setCin] = useState("");
  const [dateBirth, setDatebirth] = useState<Dayjs | null>();
  const [birthLocation, setBirthLocation] = useState("");
  const [dateCin, setDateCin] = useState<Dayjs | null>();
  const [locationCin, setLocationCin] = useState("");
  const [description, setDescription] = useState("");

  // const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files && event.target.files[0]) {
  //     const img = event.target.files[0];
  //     setSelectedImage(URL.createObjectURL(img));
  //   }
  // };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const imgFile = event.target.files[0];
      console.log(selectedImage);
      // const formData = new FormData();
      // formData.append("fichierREsult", event.target.files[0], event.target.files[0].name);
      // console.log(formData)
      setSelectedImage(imgFile); // Stockez le fichier image directement

      setImagePreviewUrl(URL.createObjectURL(imgFile)); // Stockez l'URL de l'aperçu de l'image
    }
  };
  // const aff =()=>{
  //   let tokenUser = localStorage.getItem("token");

  //       if (tokenUser) {
  //         //Vérifier si le token commence et se termine par des guillemets doubles
  //         if (tokenUser.startsWith('"') && tokenUser.endsWith('"')) {
  //           // Enlever les guillemets doubles en utilisant replace avec une expression régulière
  //           tokenUser = tokenUser.replace(/^"(.*)"$/, "$1");
  //         }
  //         console.log("mitsofoka ato")
  //         axios.get(`http://34.16.147.168:5005/api/admin/candidate/get/661ed5f9199339d28c666541`,{
  //             headers: {Authorization: `Bearer ${tokenUser}`,
  //             "Content-Type": "multipart/form-data",
  //         }
  //         })

  //           .then((response) => {

  //             setImageUrl(response.data.imageUrl); // Mettez à jour l'URL de l'image dans le state
  //           })
  //           .catch((error) => {
  //             console.error("Error fetching image:", error);
  //           });
  //       }
  // }

  const createCandidate = () => {
    console.log("ici , image ");
    console.log(selectedImage);
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
    if (selectedImage) {
      formData.append("imageUrl", selectedImage, selectedImage.name);
    }

    // const candidate: CandidateDTO = {
    //   name: name,
    //   partyEntity: partyEntity,
    //   compaingLocation: compaingLocation,
    //   dateBirth: dateBirth ? dayjs(dateBirth).toDate() : null,
    //   birthLocation: birthLocation,
    //   cin: cin,
    //   dateCin: dateCin ? dayjs(dateCin).toDate() : null,
    //   locationCin: locationCin,
    //   imageUrl: selectedImage,
    //   description: description,
    // };

    console.log("--------------------candidat ------------------------");
    console.log(formData);
    console.log("-----------------fin---candidate ------------------------");
    console.log("token :" + localStorage.getItem("token"));
    let tokenUser = localStorage.getItem("token");

    if (tokenUser) {
      //Vérifier si le token commence et se termine par des guillemets doubles
      if (tokenUser.startsWith('"') && tokenUser.endsWith('"')) {
        // Enlever les guillemets doubles en utilisant replace avec une expression régulière
        tokenUser = tokenUser.replace(/^"(.*)"$/, "$1");
      }
      CandidateApplicatif.createCandidate(formData, tokenUser)
        .then(() => {
          toast.success("Candidat ajouté avec succès", {
            position: "top-right",
          });
          setTimeout(() => {
            console.log("Candidat ajouté avec succès");
            navigate("/dashboard/candidate");
          }, 2000); // Attendre 2000 millisecondes (2 secondes)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

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
            sx={{ color: "green !important" }}
          >
            Créer candidat
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
                    //borderColor: "primary.main",
                    borderColor: "gray",
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
                  color="info"
                  sx={{ mt: 2, mb: 2, marginLeft: { md: "29%", xs: 0 } }}
                >
                  <label htmlFor="raised-button-file" style={{ width: "100%" }}>
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
                <Box sx={{ my: 4, ml: 4 }}>
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
                        // sx={{sharedFormControlStyles, width: "100%", maxWidth: "600px" }}
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
                        //sx={{sharedFormControlStyles, width: "100%", maxWidth: "600px" }}
                        value={firstname}
                        onChange={(e) => {
                          setFirstame(e.target.value);
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
                              //sx: { width: "100%", maxWidth: "600px" },
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
                        //sx={{sharedFormControlStyles, width: "100%", maxWidth: "600px" }}
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
                        //sx={{sharedFormControlStyles, width: "100%", maxWidth: "600px" }}
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
                              //sx: {width: "100%", maxWidth: "600px" },
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
                        //sx={{sharedFormControlStyles, width: "100%", maxWidth: "600px" }}
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
                        //sx={{sharedFormControlStyles, width: "100%", maxWidth: "600px" }}
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
                        //sx={{sharedFormControlStyles, width: "100%", maxWidth: "600px" }}
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
                        //sx={{sharedFormControlStyles, width: "100%", maxWidth: "600px" }}
                        value={description}
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12}></Grid>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end", // This will align the button to the right
                    mt: 3, // Adjust margin top as needed
                    mb: 2, // Adjust margin bottom as needed
                  }}
                >
                  <Grid container spacing={2} justifyContent="flex-end">
                    <Grid item>
                      <Button
                        variant="contained"
                        sx={{ background: "#808080" }}
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
                          background:
                            "linear-gradient(98deg, #57B77C, #0a713f 94%)",
                        }}
                        onClick={() => {
                          createCandidate();
                        }}
                      >
                        Enregister
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <ToastContainer />
      </Container>
    </>
  );
};

export default CandidateCreate;
