import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

export type Product = {
  _id: string;
  title: string;
  englishTitle?: string;
  description?: string;
  price: number;
  category:
    | "promos"
    | "cafeteria"
    | "dulces"
    | "bebidas"
    | "bebidas-alcohol"
    | "hamburguesas"
    | "pizzas"
    | "sandwiches-tostados"
    | "sandwiches-especiales"
    | "ensaladas"
    | "empanadas"
    | "panchos";
};

export interface AuthContextType {
  products: Product[];
  auth: AuthObject;
  setAuth: Dispatch<SetStateAction<AuthObject>>;
  persist: boolean;
  setPersist: Dispatch<SetStateAction<boolean>>;
  setProducts: Dispatch<SetStateAction<Product[]>>;
}

type UserData = {
  _id: string | undefined;
  isAdmin: boolean | undefined;
};

interface AuthObject {
  user: UserData | null;
  token?: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

const defaultAuthObject: AuthObject = {
  user: null,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<AuthObject>(defaultAuthObject);

  const persistedValue = localStorage.getItem("persist");
  const initialPersist = persistedValue ? persistedValue === "true" : false;

  const [persist, setPersist] = useState<boolean>(initialPersist);
  const [products, setProducts] = useState<Product[]>([]);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        persist,
        setPersist,
        products,
        setProducts,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
