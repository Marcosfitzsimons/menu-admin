import { ReactElement } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import Login from "./components/Login";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import NotFound from "./components/NotFound";
import useAuth from "./hooks/useAuth";
import PersistLogin from "./components/PersistLogin";
import Home from "./components/Home";
import MenuQr from "./components/MenuQr";

type Props = {
  children: ReactElement;
};

function App() {
  const { auth } = useAuth();
  const user = auth?.user;

  const ProtectedRoute = ({ children }: Props) => {
    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <div className="w-full flex text-foreground">
      <SideBar />
      <div
        className={`flex-[6] min-w-[330px] px-2 lg:px-10 lg:pr-20 ${
          user ? "lg:border-l" : ""
        }`}
      >
        <Header />
        <main className="pb-2">
          <Routes>
            <Route path="/">
              <Route path="login" element={<Login />} />
              <Route element={<PersistLogin />}>
                <Route path="*" element={<NotFound />} />
                <Route
                  index
                  element={
                    <ProtectedRoute>
                      <Home />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/menu-qr"
                  element={
                    <ProtectedRoute>
                      <MenuQr />
                    </ProtectedRoute>
                  }
                />
              </Route>
            </Route>
          </Routes>
        </main>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
