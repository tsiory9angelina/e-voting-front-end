import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// ** MUI Imports
import Card from "@mui/material/Card";
import TableContainer from "@mui/material/TableContainer";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// ** PRIMEREACT Imports
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";

import { VoterApplicatif } from "../../service/applicatif/voter/voter.applicatif";
import VoterDTO from "../../data/dto/voter.dto";

import QRCode from "qrcode.react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { createRoot } from "react-dom/client";

import "./tableVoters.css";
import headerImgCardVoter from "../candidate/image";
import backgroundImgCardVoter from "../candidate/imagebackground";
import { Typography } from "@mui/material";

// ** Types Imports
//import { ThemeColor } from 'src/@core/layouts/types'
interface ExtendedVoterDTO extends VoterDTO {
  _id: string;
}
// ** Types of the properties of the QR Code Parameters
type QRCodeProps = {
  id: string;
  value: string;
};

const TableVoters = () => {
  const [token, setToken] = useState("");

  const [rowDataSelected, setRowDataSelected] =
    useState<ExtendedVoterDTO | null>();
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [voters, setVoters] = useState<VoterDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [filters, setFilters] = useState<any>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  //Boite de dialogue DELETE ELEMENT
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  //AlertDeleteDialog=> on open
  const handleClickOpen = () => {
    setOpen(true);
  };
  //AlertDeleteDialog => on close
  const handleClose = () => {
    setOpen(false);
  };

  const onGlobalFilterChangeVoter = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    const _filters1 = { ...filters };
    _filters1["global"].value = value;
    console.log(filters);
    setFilters(_filters1);
    setGlobalFilterValue(value);
  };

  const renderVoterHeader = () => {
    return (
      <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
        {/* <h4 className="m-0">Liste des élécteurs</h4> */}
        <Typography component="h4" variant="h6" sx={{ color: "green !important",  paddingTop: "30px" , paddingBottom: "30px"}}>
        Liste des élécteurs
</Typography>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChangeVoter}
            placeholder="Keyword Search"
          />
        </span>

        <Button
          label="Electeur"
          style={{
            marginLeft: "20px",
            backgroundColor: "#167845",
            borderColor: "#167845",
          }}
          icon="pi pi-plus"
          onClick={() => navigate("/dashboard/voter/create")}
        />
      </div>
    );
  };

  const header = renderVoterHeader();
  const getVoters = () => {
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

      VoterApplicatif.getVoters(tokenUser)
        .then(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (response: any) => {
            console.log("-----Voters list-------");
            console.log(response);
            if (response) {
              setVoters(response);
              setLoading(false);
            }
          }
        )
        .catch((err: Error) => {
          console.log(err);
        });
    }
  };

  const updateVoter = (rowData: ExtendedVoterDTO, type: string) => {
    navigate("/dashboard/voter/update/" + rowData._id + "/" + type);
  };

  const actionTemplateVoter = (rowData: ExtendedVoterDTO) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-file"
          className="p-button-rounded p-button-success"
          style={{ marginRight: "0.2em", marginTop: "0.2em" }}
          onClick={() => updateVoter(rowData, "view")}
        />
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-info"
          style={{ marginRight: "0.2em", marginTop: "0.2em" }}
          onClick={() => {
            updateVoter(rowData, "update");
          }}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded"
          severity="danger"
          style={{ marginRight: "0.2em", marginTop: "0.2em" }}
          onClick={() => onClickDeleteDialog(rowData)}
        />
        <Button
          icon="pi pi-print"
          className="p-button-rounded p-button"
          severity="secondary"
          style={{ marginRight: "0.2em", marginTop: "0.2em" }}
          // onClick={() => onClickDeleteProduct("center", rowData)}
          onClick={() => saveCardPDF(rowData)}
        />
      </React.Fragment>
    );
  };

  const onClickDeleteDialog = (rowData: ExtendedVoterDTO) => {
    handleClickOpen();
    setRowDataSelected(rowData);
  };

  const DeleteDialog = () => {
    return (
      <>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Suppression"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Voulez-vous confirmer la suppression ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              label="Annuler"
              icon="pi pi-times"
              onClick={handleClose}
              className="p-button-text"
            />
            <Button
              label="Supprimer"
              icon="pi pi-check"
              onClick={() => {
                deleteVoter(rowDataSelected);
              }}
              autoFocus
            />
          </DialogActions>
        </Dialog>
      </>
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const deleteVoter = (rowData: any) => {
    console.log("==========on click Delete Voter ==============");
    console.log(rowData);
    if (token || token !== "") {
      VoterApplicatif.deleteVoterById(rowData._id, token)
        .then(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (response: any) => {
            console.log("----Voter deleted successfully-------");
            console.log(response);
            handleClose();
            setRowDataSelected(null);
            getVoters();
          }
        )
        .catch((err: Error) => {
          console.log(err);
        });
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

  const QRCodeComponent = ({ id, value }: QRCodeProps) => (
    <QRCode
      id={id}
      value={value}
      size={128}
      // bgColor="#FFFFFF"
      // fgColor="#1DA1F2"
      level="Q"
    />
  );

  const saveCardPDF = async (voter: ExtendedVoterDTO) => {
    const { _id, name, firstname, address, cin, email } = voter;

    // Créez un élément temporaire pour le rendu du QR code
    const tempElement = document.createElement("div");
    tempElement.setAttribute("id", `qrcode-${_id}`);
    document.body.appendChild(tempElement);

    // Rendez le composant QRCode dans l'élément temporaire
    const root = createRoot(tempElement);
    root.render(
      <QRCodeComponent id={`qrcode-${_id}`} value={_id.toString()} />
    );

    // Attendez que le composant soit rendu
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Vérifiez que le premier enfant de l'élément temporaire est bien un HTMLElement
    const qrCodeElement = tempElement.firstChild;
    if (!(qrCodeElement instanceof HTMLElement)) {
      console.error("Le QR code n'a pas été rendu correctement.");
      return;
    }

    // Utilisez html2canvas pour capturer l'image du QR code
    const canvas = await html2canvas(qrCodeElement);
    const qrCodeDataUri = canvas.toDataURL("image/png");

    // Supprimez l'élément temporaire après la capture
    document.body.removeChild(tempElement);

    // Créez le PDF
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "A7",
    });

    // Ajoutez l'image base64 comme arrière-plan
    pdf.addImage(
      backgroundImgCardVoter,
      "JPEG",
      0,
      0,
      pdf.internal.pageSize.getWidth(),
      pdf.internal.pageSize.getHeight()
    );

    // Ajouter une couleur de fond
    // pdf.setFillColor(200, 240, 250); // Exemple de couleur de fond (vert)
    // pdf.rect(
    //   0,
    //   0,
    //   pdf.internal.pageSize.getWidth(),
    //   pdf.internal.pageSize.getHeight(),
    //   "F"
    // );

    // Ajoutez les textes et le logo
    const logoWidth = 5; // Taille du logo
    const logoHeight = 5; // Taille du logo
    const logoX = 10;
    const logoY = 15;

    // Titre en haut de la carte
    pdf.setFontSize(8); // Taille de la police pour le titre principal
    pdf.setFont("helvetica", "bold");
    pdf.text("REPOBLIKAN'I MADAGASIKARA", logoX + logoWidth + 2, logoY);

    // Slogan
    pdf.setFontSize(6); // Taille de la police pour le slogan
    pdf.text(
      "Fitiavana - Tanindrazana - Fandrosoana",
      logoX + logoWidth + 4,
      logoY + 4
    );

    // Ajoutez le logo entre les deux textes
    const logoYOffset = 1.5; // Ajustement vertical du logo pour le centrer entre les deux textes
    pdf.addImage(
      headerImgCardVoter, // Changez l'URL de l'image si nécessaire
      "JPEG",
      logoX,
      logoY - logoYOffset, // Ajustez la position verticale du logo
      logoWidth,
      logoHeight
    );

    // Ajoutez l'image du QR code au PDF
    const qrSize = 30; // Taille du QR code
    pdf.addImage(
      qrCodeDataUri,
      "PNG",
      (pdf.internal.pageSize.getWidth() - qrSize) / 2,
      (pdf.internal.pageSize.getHeight() - qrSize) / 2 - 15,
      qrSize,
      qrSize
    );

    // Ajoutez les informations en dessous du QR code
    pdf.setFontSize(10);
    pdf.setFont("helvetica", "normal");

    // Calculer le centre de la page
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // Sous-titre en bas de la carte
    pdf.setFontSize(8); // Taille de la police plus petite pour le sous-titre
    pdf.setFont("helvetica", "bold"); // Enlever le gras
    pdf.text("KARATRY NY MPIFIDY", pageWidth / 2, pageHeight - 10, {
      align: "center",
    });

    const infoStartY = (pdf.internal.pageSize.getHeight() + qrSize) / 2 - 5;
    pdf.setFont("helvetica", "bold");
    pdf.text(`${name}`, pageWidth / 2, infoStartY, {
      align: "center",
    });

    pdf.text(`${firstname}`, pageWidth / 2, infoStartY + 5, {
      align: "center",
    });

    // Ajouter un trait horizontal
    const lineY = infoStartY + 10; // Position Y du trait horizontal
    pdf.setDrawColor(0); // Couleur du trait: noir
    pdf.setLineWidth(0.2); // Épaisseur du trait
    pdf.line(10, lineY, pageWidth - 10, lineY); // Dessiner le trait

    pdf.setFont("helvetica", "normal");
    pdf.text(`Adresse: ${address}`, 10, infoStartY + 18);
    pdf.text(`Cin: ${cin}`, 10, infoStartY + 21);
    pdf.text(`Email: ${email}`, 10, infoStartY + 24);


    // Sauvegardez le PDF
    const pdfName = `Carte-${name}-${firstname}.pdf`;
    pdf.save(pdfName);
  };

  const SavePdf = (id: string) => {
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: [40, 40],
    });
    const qrcode = "qrcode" + id;

    const base64Image =
      !!document &&
      (document.getElementById(qrcode) as HTMLCanvasElement).toDataURL();

    pdf.addImage(base64Image, "png", 0, 0, 40, 40);
    const name = qrcode + "pdf";

    pdf.save(name);
    pdf.autoPrint();
  };
  // const imageBodyTemplate = (rowData: ExtendedVoterDTO) => {
  //   const values = rowData._id;
  //   return (
  //     <div>
  //       <QRCode id={"qrcode" + rowData._id} value={values} />
  //       <Button
  //         label="Télécharger"
  //         icon="pi pi-upload"
  //         onClick={() => SavePdf(rowData._id)}
  //         //onClick={() => saveCardPDF(rowData)}
  //         className="p-button-text"
  //       />
  //     </div>
  //   );
  // };
  const imageBodyTemplate = (rowData: ExtendedVoterDTO) => {
    const values = rowData._id;
    return (
      <div style={{ position: "relative" }}>
        <QRCode id={"qrcode" + rowData._id} value={values} />
        <Button
          // label="Télécharger"
          icon="pi pi-upload"
          onClick={() => SavePdf(rowData._id)}
          className="p-button-rounded p-button-success custom-button"
        />
      </div>
    );
  };

  // Style CSS pour les cellules avec ellipsis
  const cellStyle = {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "120px", // Largeur maximale pour toutes les cellules
    height: "50px", // Hauteur fixe pour toutes les cellules
  };

  // Fonction de modèle pour les cellules avec ellipsis
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cellTemplate = (rowData: any, field: keyof ExtendedVoterDTO) => {
    return <div style={cellStyle}>{rowData[field]}</div>;
  };

  useEffect(() => {
    checkToken();
  }, []);
  useEffect(() => {
    getVoters();
  }, []);

  return (
    <>
      <DeleteDialog />

      <Card>
        <TableContainer>
          <DataTable
            value={voters}
            paginator
            stripedRows
            rows={10}
            header={header}
            loading={loading}
            filters={filters}
            scrollable
            filterDisplay="row"
            globalFilterFields={[
              "ID",
              "name",
              "firstname",
              "gender",
              "birthDate",
              "birthLocation",
              "cin",
              "dateCin",
              "locationCin",
              "address",
              "email",
              "createdAt",
            ]}
            dataKey="id"
            stateStorage="session"
            stateKey="dt-state-demo-session"
            emptyMessage="Aucun  élécteur trouvé."
            //tableStyle={{ maxWidth: "500px" }}
          >
            <Column
              key="ID"
              field="_id"
              header="ID"
              sortable
              body={(rowData) => cellTemplate(rowData, "_id")}
              filterPlaceholder="Search by name"
            ></Column>
            <Column
              key="imageQRCode"
              //field="imageUrl"
              body={imageBodyTemplate}
              header="QR Code"
              sortable
              filterPlaceholder="Search by QRCode"
            ></Column>
            <Column
              key="name"
              field="name"
              header="Nom"
              sortable
              filterPlaceholder="Search by name"
              body={(rowData) => cellTemplate(rowData, "name")}
            ></Column>
            <Column
              key="firstname"
              field="firstname"
              header="Prenom"
              filterPlaceholder="Search by name"
            ></Column>
            <Column
              key="birthDate"
              field="birthDate"
              header="Date de naissance"
              sortable
              filterPlaceholder="Search by name"
            ></Column>
            <Column
              key="birthLocation"
              field="birthLocation"
              header="Lieu de naissance"
              sortable
              body={(rowData) => cellTemplate(rowData, "birthLocation")}
              filterPlaceholder="Search by name"
            ></Column>
            <Column
              key="gender"
              field="gender"
              header="Sexe"
              sortable
              body={(rowData) => cellTemplate(rowData, "gender")}
              filterPlaceholder="Search by name"
            ></Column>
            <Column
              key="cin"
              field="cin"
              header="CIN"
              sortable
              body={(rowData) => cellTemplate(rowData, "cin")}
              filterPlaceholder="Search by name"
            ></Column>
            {/* <Column
              key="dateCin"
              field="dateCin"
              header="dateCin"
              sortable
              filterPlaceholder="Search by name"
            ></Column>
            <Column
              key="locationCin"
              field="locationCin"
              header="locationCin"
              sortable
              filterPlaceholder="Search by name"
            ></Column> */}
            <Column
              key="address"
              field="address"
              header="address"
              sortable
              body={(rowData) => cellTemplate(rowData, "address")}
              filterPlaceholder="Search by name"
            ></Column>
            <Column
              key="email"
              field="email"
              header="Email"
              sortable
              body={(rowData) => cellTemplate(rowData, "email")}
              filterPlaceholder="Search by name"
            ></Column>
            <Column
              key="action"
              header="Action"
              body={actionTemplateVoter}
              exportable={false}
              style={{ minWidth: "8rem", maxWidth: "9rem" }}
            ></Column>
          </DataTable>
        </TableContainer>
      </Card>
    </>
  );
};

export default TableVoters;
