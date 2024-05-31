import { Avatar, Button, Grid } from "@mui/material";
import { useState } from "react";

const ImageUpload = () => {

    const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const img = event.target.files[0];
      setSelectedImage(URL.createObjectURL(img));
    }
  };
  return (
    <>
      <Grid container spacing={2}>
        {/* Zone de gauche pour l'image du candidat */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar
            src={selectedImage}
            sx={{ width: 150, height: 150 }}
            variant="square"
          />
        </Grid>
        {/* Zone de droite pour les autres champs de saisie */}
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            {/* ... Autres champs de saisie ... */}
          </Grid>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="raised-button-file"
            type="file"
            onChange={handleImageChange}
          />
          <label htmlFor="raised-button-file">
            <Button variant="contained" component="span" sx={{ mt: 3, mb: 2 }}>
              Télécharger une photo
            </Button>
          </label>
        </Grid>
      </Grid>
      <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
        Enregister
      </Button>
    </>
  );
};

export default ImageUpload;
