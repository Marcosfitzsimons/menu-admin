import {
  AlignCenter,
  BarChart3,
  LayoutGrid,
  LineChart,
  LogOut,
  Map,
  Newspaper,
  QrCode,
  User,
  Users,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";
import useAuth from "@/hooks/useAuth";
import useLogout from "@/hooks/useLogOut";

const Header = () => {
  const { auth } = useAuth();
  const user = auth?.user;

  const logout = useLogout();

  const handleLogOut = async () => {
    try {
      await logout();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <header className="bg-transparent">
      <div
        className={`${
          !user ? "lg:justify-start lg:gap-3" : "justify-between"
        } py-2 flex items-center justify-between z-50 lg:py-[12.5px]`}
      >
        <div className="flex items-center gap-2 lg:absolute lg:left-10 lg:top-5">
          <Link to="/" className="rounded-full">
            <img
              src="/logo.webp"
              alt="logo golfo nuevo"
              className="w-12 h-12 rounded-full"
            />
          </Link>
          <Separator orientation="vertical" className="h-2 ml-2" />
          <ThemeToggle />
        </div>
        {!user ? (
          ""
        ) : (
          <div className="flex items-center gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger className="lg:hidden" asChild>
                <Button
                  variant="ghost"
                  className="relative top-[1px] w-8 h-8 rounded-md p-0 dark:hover:text-white dark:hover:bg-blue-lagoon-900/70"
                >
                  <AlignCenter />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="border-border-color dark:border-zinc-600"
              >
                <DropdownMenuLabel className="uppercase text-black/80 font-bold text-sm dark:text-white">
                  Inicio
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="dark:bg-zinc-600" />
                <DropdownMenuItem className="cursor-pointer p-0">
                  <LayoutGrid className="absolute left-2 h-4 w-4 text-blue-lagoon-900/60 dark:text-blue-lagoon-300" />
                  <Link
                    to="/"
                    className="rounded-lg py-1.5 z-20 pl-7 px-2 flex items-center gap-1 w-full text-start bg-transparent text-blue-lagoon-900 hover:bg-blue-lagoon-100/20 dark:text-blue-lagoon-50 dark:hover:text-white dark:hover:bg-zinc-700/20"
                  >
                    Panel de Control
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer p-0">
                  <QrCode className="absolute left-2 h-4 w-4 text-blue-lagoon-900/60 dark:text-blue-lagoon-300" />
                  <Link
                    to="/menu-qr"
                    className="rounded-lg py-1.5 z-20 pl-7 px-2 flex items-center gap-1 w-full text-start bg-transparent text-blue-lagoon-900 hover:bg-blue-lagoon-100/20 dark:text-blue-lagoon-50 dark:hover:text-white dark:hover:bg-zinc-700/20"
                  >
                    Menu QR
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuLabel className="uppercase text-black/80 font-bold text-sm dark:text-white">
                  Admin
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="dark:bg-zinc-600" />
                <DropdownMenuItem className="cursor-pointer p-0">
                  <LogOut className="absolute left-2 h-4 w-4 text-blue-lagoon-900/60 dark:text-blue-lagoon-300" />
                  <button
                    onClick={handleLogOut}
                    className="rounded-lg py-1.5 z-20 pl-7 px-2 flex items-center gap-1 w-full text-start bg-transparent text-blue-lagoon-900 hover:bg-blue-lagoon-100/20 dark:text-blue-lagoon-50 dark:hover:text-white dark:hover:bg-zinc-700/20"
                  >
                    Salir
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
