/* eslint-disable @typescript-eslint/no-explicit-any */
//import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import { useEffect, useState } from "react";
import StationDTO from "../../data/dto/station.dto";
import * as XLSX from "xlsx";
import React from "react";
import { StationApplicatif } from "../../service/applicatif/station/station.applicatif";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const StationCreate = () => {
  const navigate = useNavigate();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const [token, setToken] = useState("");
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [nameStation, setNameStation] = useState("");
  const [region, setRegion] = useState("");
  const [district, setDistrict] = useState("");
  const [commune, setCommune] = useState("");
  const [fokontany, setFokontany] = useState("");
  const [centre, setCentre] = useState("");
  const [code, setCode] = useState("");
  const [nbVoters, setNbVoters] = useState("");

  //const [token, setToken] = useState("");
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");

  const handleFileButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const formatDataByRemovingEmptyRecords = (data: StationDTO[]) => {
    // Filtrer les enregistrements où la propriété 'name' est vide
    //return data.filter((item) => item.name !== "");
    return data.filter((item: StationDTO) => item.name !== "" && item.region !== "" && item.district !== "" && item.commune !== "");
    };

  const createStation = () => {
    if (excelFile) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
          header: 1,
        }) as any[][];

        jsonData.shift(); // Supprimer la première ligne si elle contient les titres des colonnes

        let formattedData = jsonData.map((row: any[]) => ({
          name: row[7] || "",
          region: row[1] || "",
          district: row[2] || "",
          commune: row[3] || "",
          fokontany: row[4] || "",
          centre: row[5] || "",
          code: row[6] || "",
          nbVoters: row[8] || 0,
        }));
        console.log("Avant ====> ")
        console.log(formattedData);

        // Transformer en format payload voulu
        
        
        if (token !== "") {
          
          
          formattedData = formatDataByRemovingEmptyRecords(formattedData)
          console.log("Apres ====> "+token)
          console.log(formattedData);
          const stationsDataListFormatted = {
            stations: formattedData
            };
        StationApplicatif.createStationByImportData(stationsDataListFormatted, token)
          .then((res) => {
            console.log(res);
            console.log("Bureau de vote ajouté avec succès");
            
            toast.success("Bureau de vote ajouté avec succès", {
              position: "top-right",
            });
            setTimeout(() => {
              navigate("/dashboard/station");
            }, 2000); // Attendre 2000 millisecondes (2 secondes)
          })
          .catch((err) => {
            console.log(err.response.data);
          });
      }
      };
      reader.readAsBinaryString(excelFile);
    } else {
      //console.error("Aucun fichier Excel sélectionné");
      // Après avoir traité le fichier Excel, créez la station
      const station: StationDTO = {
        name: nameStation,
        region: region,
        district: district,
        commune: commune,
        fokontany: fokontany,
        centre: centre,
        code: code,
        nbVoters: nbVoters,
      };
      console.log(station);
      
      if (token !== "" && token) {
        StationApplicatif.createStation(station, token)
          .then((res) => {
            console.log(res);
            console.log("Bureau de vote ajouté avec succès");
            
            toast.success("Bureau de vote ajouté avec succès", {
              position: "top-right",
            });
            setTimeout(() => {
              navigate("/dashboard/station");
            }, 2000); // Attendre 2000 millisecondes (2 secondes)
          })
          .catch((err) => {
            console.log(err.response.data);
          });
      }
    }
  };
  const checkToken = () => {
    let tokenUser = localStorage.getItem("token");
    if (tokenUser) {
      if (tokenUser.startsWith('"') && tokenUser.endsWith('"')) {
        // Enlever les guillemets doubles en utilisant replace avec une expression régulière
        tokenUser = tokenUser.replace(/^"(.*)"$/, "$1");
        setToken(tokenUser.replace(/^"(.*)"$/, "$1"));
      } else {
        setToken(tokenUser);
      }
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // if (event.target.files && event.target.files.length > 0) {
    //   setExcelFile(event.target.files[0]);
    //   setIsFileSelected(true);
    //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //   // @ts-expect-error
    //   setFileName(file.name); // Mettre à jour le nom du fichier
    // }
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0]; // Déclaration de la variable file
      setExcelFile(selectedFile);
      setIsFileSelected(true);
      setFileName(selectedFile.name); // Utilisation de la variable file
      }
  };

  // const importDocument = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files && event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       const data = e.target.result;
  //       const workbook = XLSX.read(data, { type: "binary" });
  //       const sheetName = workbook.SheetNames[0];
  //       const worksheet = workbook.Sheets[sheetName];
  //       const jsonData = XLSX.utils.sheet_to_json(worksheet, {
  //         header: 1,
  //       }) as any[][];

  //       // Supprimer la première ligne si elle contient les titres des colonnes
  //       jsonData.shift();

  //       // Transformer les données en utilisant des clés définies
  //       const formattedData = jsonData.map((row: any[]) => ({
  //         region: row[1] || "",
  //         district: row[2] || "",
  //         commune: row[3] || "",
  //         fokontany: row[4] || "",
  //         centreDeVote: row[5] || "",
  //         codeBV: row[6] || "",
  //         bureauDeVote: row[7] || "",
  //         nombreDElecteurs: row[8] || 0,
  //       }));

  //       console.log(formattedData);
  //       formattedData.forEach((data) => {
  //         console.log(data.region + " - " + data.fokontany);
  //       });

  //       // Envoyer formattedData à votre serveur via Axios...
  //     };
  //     reader.readAsBinaryString(file);
  //   } else {
  //     console.error("Aucun fichier sélectionné");
  //   }
  // };

  useEffect(() => {
    checkToken();
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
            Bureau de vote
          </Typography>
          <Box component="form" onSubmit={() => {}} noValidate sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  id="nom"
                  fullWidth
                  required
                  label="Nom du bureau de vote"
                  name="nom"
                  variant="filled"
                  disabled={isFileSelected}
                  value={nameStation}
                  onChange={(e) => {
                    setNameStation(e.target.value);
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
                  disabled={isFileSelected}
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
                  disabled={isFileSelected}
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
                  disabled={isFileSelected}
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
                  disabled={isFileSelected}
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
                  disabled={isFileSelected}
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
                  disabled={isFileSelected}
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
                  disabled={isFileSelected}
                  value={nbVoters}
                  onChange={(e) => {
                    setNbVoters(e.target.value);
                  }}
                />
              </Grid>

              <Grid item>
                <Button
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={() => {
                    createStation();
                  }}
                >
                  Enregister
                </Button>
              </Grid>
              {/* <Button
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => {
                importDocument();
              }}
            >
              Importer
            </Button> */}
              {/*<input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileChange}
          />*/}
              <Grid item>
                <Button
                  variant="contained"
                  component="label"
                  color="warning"
                  onClick={handleFileButtonClick}
                  sx={{ mt: 3, mb: 2 }}
                >
                  Importer un fichier
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={handleFileChange}
                    hidden
                  />
                </Button>
              </Grid>
              {isFileSelected && (
                <Grid item>
                  <Typography variant="subtitle1">
                    Fichier sélectionné : {fileName}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Box>
        </Box>
        <ToastContainer />
      </Container>
    </>
  );
};

export default StationCreate;
