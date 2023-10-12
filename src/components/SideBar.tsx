import { User, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useLogout from "@/hooks/useLogOut";
import { useEffect, useState } from "react";
import { mainItems } from "@/navbarsource";

const SideBar = () => {
  const [active, setIsActive] = useState(1);
  const { auth } = useAuth();
  const user = auth?.user;

  const logout = useLogout();

  const location = useLocation();
  const path = location.pathname.split("/")[1];

  const handleLogOut = async () => {
    try {
      await logout();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (path === "menu-qr") {
      setIsActive(2);
    } else {
      setIsActive(1);
    }
  }, [path]);

  // Inicio > Panel de Control

  return !user ? (
    <div className=""></div>
  ) : (
    <div className="hidden flex-[1] h-screen lg:flex pl-8">
      <div className="rounded-md flex flex-col w-[14rem] gap-5 pt-24 pb-10">
        <nav className="h-screen flex flex-col justify-between py-4 gap-5">
          <ul className="flex flex-col gap-1">
            {mainItems.map((item) => (
              <li className="relative flex items-center gap-2" key={item.id}>
                {item.icon}
                <Link
                  to={item.linkTo}
                  className={`w-full pl-8 z-20 rounded-lg p-2 flex border-l-4 items-center gap-1 text-start hover:bg-hover/40 dark:hover:text-white ${
                    active === item.id
                      ? "border-l-accent font-medium bg-accent/20 dark:bg-accent/30 dark:text-white"
                      : "border-l-transparent bg-transparent"
                  }`}
                >
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="flex flex-col gap-1">
            <li className={`relative flex items-center gap-2`}>
              <User className="absolute left-1.5 h-6 w-6 text-accent shrink-0" />
              <div className="w-full pl-[2.2rem] z-20 rounded-lg p-2 flex flex-col bg-transparent hover:bg-hover/40 dark:hover:text-white">
                <p className="text-sm font-medium">Tomas Fitzsimons</p>
                <p className="text-xs text-muted-foreground">
                  tomyfitzsimons@gmail.com
                </p>
              </div>
            </li>
            <li className="relative flex items-center gap-2">
              <LogOut className="absolute left-2.5 h-5 w-5 text-accent " />
              <button
                onClick={handleLogOut}
                className="w-full pl-8 z-20 rounded-lg p-2 flex items-center border-l-4 border-l-transparent gap-1 text-start bg-transparent hover:bg-hover/40  dark:hover:text-white "
              >
                Salir
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SideBar;
