import { Home, QrCode } from "lucide-react";

export const mainItems = [
  {
    id: 1,
    linkTo: "/",
    text: "Inicio",
    icon: <Home className="absolute left-2.5 h-5 w-5 text-accent " />,
  },
  {
    id: 2,
    linkTo: "/menu-qr",
    text: "Menu QR",
    icon: <QrCode className="absolute left-2.5 h-5 w-5 text-accent " />,
  },
];
