import VoterDTO from "../../data/dto/voter.dto";
import QRCode from "qrcode.react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { createRoot } from "react-dom/client";
import headerImgCardVoter from "../candidate/image";

interface ExtendedVoterDTO extends VoterDTO {
    _id: string;
  }
  type QRCodeProps = {
    id: string;
    value: string;
  };

  
  const QRCodeComponent = ({ id, value }: QRCodeProps) => (
    <QRCode
      id={id}
      value={value}
      size={128}
      bgColor="#FFFFFF"
      fgColor="#1DA1F2"
      level="Q"
    />
  );

const saveCardVoterPDF = async (voter: ExtendedVoterDTO) => {
    const { _id, name, firstname, address } = voter;

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

    // Ajouter une couleur de fond
  pdf.setFillColor(230, 230, 250); // Exemple de couleur de fond (lavender)
  pdf.rect(0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight(), 'F');


  
  pdf.addImage(headerImgCardVoter, 'JPEG', 10, 10, pdf.internal.pageSize.getWidth() - 20, 20);

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

    //   // Calculer le centre de la page
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

    const infoStartY = (pdf.internal.pageSize.getHeight() + qrSize) / 2 - 5;
    pdf.text(`Nom: ${name}`, 10, infoStartY);
    pdf.text(`Prénom: ${firstname}`, 10, infoStartY + 5);
    pdf.text(`Adresse: ${address}`, 10, infoStartY + 10);

    // Sauvegardez le PDF
    const pdfName = `Carte-${name}-${firstname}.pdf`;
    pdf.save(pdfName);
  };

  export default saveCardVoterPDF ;