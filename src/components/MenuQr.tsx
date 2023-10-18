import { Download } from "lucide-react";
import SectionTitle from "./SectionTitle";
import { Button } from "./ui/button";
import { saveAs } from "file-saver";

const MenuQr = () => {
  const image = "/golfo-nuevo-qr.webp";
  const downloadImage = () => {
    saveAs(image, "qr-menu-golfo-nuevo.webp");
  };
  return (
    <section className="relative flex flex-col items-center gap-10 pt-5">
      <SectionTitle>Menú QR</SectionTitle>
      <div className="relative flex flex-col gap-1 rounded-[18px] p-3 border">
        <img src="/golfo-nuevo-qr.webp" alt="menu qr" className="rounded-md" />
        <Button
          onClick={downloadImage}
          className="self-end h-8 py-2 px-3 outline-none inline-flex items-center gap-1 justify-center text-sm font-medium transition-colors rounded-lg shadow-input"
        >
          Descargar
          <Download className="w-[14px] h-[14px] cursor-pointer" />
        </Button>
      </div>
    </section>
  );
};

export default MenuQr;
