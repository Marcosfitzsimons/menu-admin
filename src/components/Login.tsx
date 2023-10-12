import { useForm } from "react-hook-form";
import axios from "../api/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import useAuth from "@/hooks/useAuth";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "./ui/button";

type User = {
  email: string;
  password: string;
};

const Login = () => {
  const [err, setErr] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { auth, setAuth, persist, setPersist } = useAuth();
  const user = auth?.user;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const handleOnSubmit = async (data: User) => {
    setIsLoading(true);
    setErr("");
    try {
      const {
        data: { token, details },
      } = await axios.post(`/auth/login`, data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      setIsLoading(false);
      if (details.isAdmin) {
        setAuth({ user: details, token });
        navigate("/");
      } else {
        const errorMsg = "No estás autorizado";
        setErr(errorMsg);
      }
    } catch (err: any) {
      if (!err?.response) {
        setErr(
          "Ha ocurrido un error en el servidor. Intentar de nuevo más tarde"
        );
        setIsLoading(false);
      } else {
        const errorMsg = err.response?.data?.msg;
        setErr(errorMsg);
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("persist", persist.toString());
  }, [persist]);

  return (
    <section className="section lg:mt-28">
      <div className="flex flex-col items-center lg:items-start">
        <div className="w-full max-w-md">
          <h2 className="text-3xl uppercase py-2 font-medium text-center lg:text-start dark:text-white">
            Panel de Administrador
          </h2>
          <p className="text-center lg:text-start dark:text-white">
            Entrá para administrar tu aplicación
          </p>
          <form
            onSubmit={handleSubmit(handleOnSubmit)}
            className="relative w-full py-6 flex flex-col gap-3 items-center lg:max-w-sm"
          >
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Por favor, ingresa tu email",
                  },
                  minLength: {
                    value: 3,
                    message: "Email demasiado corto",
                  },
                  maxLength: {
                    value: 40,
                    message: "Email demasiado largo",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-600">{errors.email.message}</p>
              )}
            </div>
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                type="password"
                id="password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Por favor, ingresa tu contraseña",
                  },
                  minLength: {
                    value: 3,
                    message: "Contraseña no puede ser tan corta",
                  },
                  maxLength: {
                    value: 25,
                    message: "Contraseña no puede ser tan larga",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-600">{errors.password.message}</p>
              )}
            </div>
            <div className="w-full relative flex items-center space-x-1">
              <Checkbox
                id="confirmAddress"
                checked={persist}
                onCheckedChange={() => setPersist((prev) => !prev)}
              />
              <label
                htmlFor="confirmAddress"
                className="text-sm font-medium flex items-center gap-[2px] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Permanecer conectado
              </label>
            </div>
            {err && <p className="text-red-600 self-start">{err}</p>}
            <Button disabled={isLoading}>
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
