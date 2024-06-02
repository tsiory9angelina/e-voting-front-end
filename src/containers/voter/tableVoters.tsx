import React from "react";
import { useNavigate } from "react-router-dom";

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
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

import { VoterApplicatif } from "../../service/applicatif/voter/voter.applicatif";
import VoterDTO from "../../data/dto/voter.dto";
import QRCode from "qrcode.react";
import { jsPDF } from "jspdf";
import { FilterMatchMode } from "primereact/api";

import ReactDOMServer from 'react-dom/server';


// ** Types Imports
//import { ThemeColor } from 'src/@core/layouts/types'
interface ExtendedVoterDTO extends VoterDTO {
  _id: string;
}
const TableVoters = () => {
  const [token, setToken] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [rowDataSelected, setRowDataSelected] = useState<any | null>();
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [voters, setVoters] = useState<VoterDTO[]>([]);
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
        <h4 className="m-0">Liste des élécteurs</h4>

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
          style={{ marginLeft: "20px", backgroundColor: "#167845" }}
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
          className="p-button-rounded p-button-success mr-2 ms-2"
          onClick={() => updateVoter(rowData, "view")}
        />
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2 ms-2"
          onClick={() => {
            updateVoter(rowData, "update");
          }}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning ms-2"
          // onClick={() => onClickDeleteProduct("center", rowData)}
          onClick={() => onClickDeleteDialog(rowData)}
        />
        <Button
          icon="pi pi-print"
          className="p-button-rounded p-button-primary ms-2"
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


  // const saveCardPDF = (voter : ExtendedVoterDTO) => {
  //   const { _id, name, firstname, address } = voter;

  //   const pdf = new jsPDF({
  //     orientation: "portrait",
  //     unit: "mm",
  //     format: "A7",
  //   });

  //   // Calculer le centre de la page
  //   const pageWidth = pdf.internal.pageSize.getWidth();
  //   const pageHeight = pdf.internal.pageSize.getHeight();

  //   // Titre en haut de la carte
  //   pdf.setFontSize(14); // Taille de la police pour le titre
  //   pdf.setFont("helvetica", "bold"); // Mettre le titre en gras
  //   pdf.text("CARTE D'ELECTEUR", pageWidth / 2, 10, { align: "center" });

  //   // Sous-titre en bas de la carte
  //   pdf.setFontSize(8); // Taille de la police plus petite pour le sous-titre
  //   pdf.setFont("helvetica", "normal"); // Enlever le gras
  //   pdf.text("Republique de Madagascar", pageWidth / 2, pageHeight - 10, {
  //     align: "center",
  //   });

  //   // QR code au milieu
  //   const qrcodeId = "qrcode" + _id;
  //   const base64Image =
  //     !!document &&
  //     (document.getElementById(qrcodeId) as HTMLCanvasElement).toDataURL();
  //   const qrSize = 30; // Taille du QR code
  //   pdf.addImage(
  //     base64Image,
  //     "PNG",
  //     (pageWidth - qrSize) / 2,
  //     (pageHeight - qrSize) / 2 - 15,
  //     qrSize,
  //     qrSize
  //   );

  //   // Informations en bas du QR code
  //   pdf.setFontSize(10); // Taille de la police pour les informations
  //   pdf.setFont("helvetica", "normal"); // Enlever le gras pour les informations
  //   const infoStartY = (pageHeight + qrSize) / 2 - 5; // Commencer en dessous du QR code
  //   pdf.text(`Nom: ${name}`, 10, infoStartY);
  //   pdf.text(`Prénom: ${firstname}`, 10, infoStartY + 5);
  //   pdf.text(`Adresse: ${address}`, 10, infoStartY + 10);

  //   // Sauvegarder le PDF
  //   const pdfName = `Carte-${name}-${firstname}.pdf`;
  //   pdf.save(pdfName);
  // };

  const saveCardPDF = (voter : ExtendedVoterDTO) => {
    const { _id, name, firstname, address } = voter;
  
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "A7",
    });
  
    // Calculer le centre de la page
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
  
    // Titre en haut de la carte
    pdf.setFontSize(14); // Taille de la police pour le titre
    pdf.setFont("helvetica", "bold"); // Mettre le titre en gras
    pdf.text("CARTE D'ELECTEUR", pageWidth / 2, 10, { align: "center" });
  
    // Sous-titre en bas de la carte
    pdf.setFontSize(8); // Taille de la police plus petite pour le sous-titre
    pdf.setFont("helvetica", "normal"); // Enlever le gras
    pdf.text("Republique de Madagascar", pageWidth / 2, pageHeight - 10, {
      align: "center",
    });
  
    // Générer le QR code coloré
    const QRCodeComponent = (
      <QRCode
        value={`https://example.com/${_id}`}
        size={128}
        bgColor={"#ffffff"}
        fgColor={"#bc2a8d"}
        level={"H"}
        includeMargin={false}
      />
    );
  
    const svgString = ReactDOMServer.renderToStaticMarkup(QRCodeComponent);
    const svgDataUri = `data:image/svg+xml;base64,${btoa(svgString)}`;
  
    // Ajouter le QR code au milieu de la page
    const qrSize = 30; // Taille du QR code
    pdf.addImage(
      svgDataUri,
      "SVG",
      (pageWidth - qrSize) / 2,
      (pageHeight - qrSize) / 2 - 15,
      qrSize,
      qrSize
    );
  
    // Informations en bas du QR code
    pdf.setFontSize(10); // Taille de la police pour les informations
    pdf.setFont("helvetica", "normal"); // Enlever le gras pour les informations
    const infoStartY = (pageHeight + qrSize) / 2 - 5; // Commencer en dessous du QR code
    pdf.text(`Nom: ${name}`, 10, infoStartY);
    pdf.text(`Prénom: ${firstname}`, 10, infoStartY + 5);
    pdf.text(`Adresse: ${address}`, 10, infoStartY + 10);
  
    // Sauvegarder le PDF
    const pdfName = `Carte-${name}-${firstname}.pdf`;
    pdf.save(pdfName);
  }
 
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
  const imageBodyTemplate = (rowData: ExtendedVoterDTO) => {
    const values = rowData._id;
    return (
      <div>
        <QRCode id={"qrcode" + rowData._id} value={values} />
        <Button
          label="Télécharger"
          icon="pi pi-times"
          onClick={() => SavePdf(rowData._id)}
          //onClick={() => saveCardPDF(rowData)}
          className="p-button-text"
        />
      </div>
    );
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
            rows={10}
            header={header}
            filters={filters}
            filterDisplay="menu"
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
            tableStyle={{ maxWidth: "500px" }}
          >
            <Column
              key="ID"
              field="_id"
              header="ID"
              sortable
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
            {/* <Column
              key="birthLocation"
              field="birthLocation"
              header="Lieu de naissance"
              sortable
              filterPlaceholder="Search by name"
            ></Column> */}
            <Column
              key="gender"
              field="gender"
              header="Sexe"
              sortable
              filterPlaceholder="Search by name"
            ></Column>
            <Column
              key="cin"
              field="cin"
              header="CIN"
              sortable
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
              filterPlaceholder="Search by name"
            ></Column>
            <Column
              key="email"
              field="email"
              header="Email"
              sortable
              filterPlaceholder="Search by name"
            ></Column>
            <Column
              key="action"
              header="Action"
              body={actionTemplateVoter}
              exportable={false}
              style={{ minWidth: "8rem" }}
            ></Column>
          </DataTable>
        </TableContainer>
      </Card>
    </>
  );
};

export default TableVoters;
