import { TextField } from "@mui/material";

// Créez un composant TextField personnalisé avec les styles appliqués
const CustomTextField= ({ label , name, value, onChange, ...otherProps }: any) => {
  return (
    <TextField
      label={label}
      name={name}
      variant="standard"
      value={value}
      fullWidth
      required
      onChange={onChange}
      sx={{
        "& label": {
          color: "black",
        },
        "& label.Mui-focused": {
          color: "grey",
        },
        "& .MuiInput-underline:before": {
          borderBottomColor: "#17b359",
        },
        "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
          borderBottomColor: "#17b359",
        },
        "& .MuiInput-underline:after": {
          borderBottomColor: "#17b359",
        },
        "& .MuiInputBase-input": {
          color: "rgba(0, 0, 0, 0.87)",
        },
        "& .MuiInput-underline.Mui-error:after": {
          borderBottomColor: "red",
        },
        "& .MuiInput-underline.Mui-disabled:before": {
          borderBottomStyle: "dotted",
        },
      }}
      {...otherProps} // Permet de passer d'autres props au TextField
    />
  );
};

export default CustomTextField;
