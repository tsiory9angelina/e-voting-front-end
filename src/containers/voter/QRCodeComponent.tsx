import QRCode from "qrcode.react";

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

export default QRCodeComponent;