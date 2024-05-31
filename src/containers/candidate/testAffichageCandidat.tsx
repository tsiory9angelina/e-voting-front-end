import { Box, Container, Typography, Avatar } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const AffCandidat = () => {
    //const imageUrl = "https://chemin-vers-votre-image.com/monimage.jpg";
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        console.log("-----------------fin---candidate ------------------------");
        console.log("token :" + localStorage.getItem("token"));
        let tokenUser = localStorage.getItem("token");
    
        if (tokenUser) {
          //Vérifier si le token commence et se termine par des guillemets doubles
          if (tokenUser.startsWith('"') && tokenUser.endsWith('"')) {
            // Enlever les guillemets doubles en utilisant replace avec une expression régulière
            tokenUser = tokenUser.replace(/^"(.*)"$/, "$1");
          }
          console.log("mitsofoka ato")
          axios.get(`http://34.16.147.168:5005/api/admin/candidate/get/661ed5f9199339d28c666541`,{
              headers: {Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDA1NDZlOTk0N2M3ZmQ3N2RiZjBiZSIsImlhdCI6MTcxMzI5MTY1MywiZXhwIjoxNzE1ODgzNjUzfQ.guylsqoa_qPZqzXhDrDW27BVQ0V2B8UzszNzR3vv7nk`,
              "Content-Type": "multipart/form-data",
          }
          })
            
            .then((response) => {
  
              setImageUrl(response.data.imageUrl); // Mettez à jour l'URL de l'image dans le state
            })
            .catch((error) => {
              console.error("Error fetching image:", error);
            });
        }
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
            Créer candidat
          </Typography>
          <Box>
            <Avatar
              src={imageUrl || undefined} 
              sx={{
                minWidth: 300,
                maxWidth: 300,
                height: 400,
                border: "3px solid",
                borderColor: "primary.main",
                marginLeft: { md: "30%", xs: 0 },
              }}
              variant="rounded"
            />
          </Box>
        </Box>
      </Container>
    </>
  );
};
export default AffCandidat;
