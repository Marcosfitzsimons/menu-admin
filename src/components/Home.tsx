import { productColumns } from "./products/data-table-source";
import { DataTable } from "./products/data-table";
import SectionTitle from "./SectionTitle";
import { Product } from "@/context/AuthContext";
import TotalCountCard from "./TotalCount";
import { Check, LayoutList, Loader2, X } from "lucide-react";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import { useToast } from "./ui/use-toast";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const axiosPrivate = useAxiosPrivate();
  const { toast } = useToast();
  const navigate = useNavigate();

  const { setAuth } = useAuth();

  const handleDeleteProduct = async (id: string) => {
    toast({
      variant: "loading",
      description: (
        <div className="flex gap-1">
          <Loader2 className="h-5 w-5 animate-spin text-purple-900 shrink-0" />
          Eliminando producto...
        </div>
      ),
    });
    try {
      await axiosPrivate.delete(`/products/${id}`);
      setProducts(products.filter((item) => item._id !== id));
      toast({
        description: (
          <div className="flex gap-1">
            {<Check className="h-5 w-5 text-green-600 shrink-0" />} Producto ha
            sido eliminado con éxito
          </div>
        ),
      });
    } catch (err: any) {
      if (err.response?.status === 403) {
        setAuth({ user: null });
        setTimeout(() => {
          navigate("/login");
        }, 100);
      }
      const errorMsg = err.response?.data?.msg;
      toast({
        variant: "destructive",
        title: (
          <div className="flex gap-1">
            {<X className="h-5 w-5 text-destructive shrink-0" />} Error al
            eliminar producto
          </div>
        ) as any,
        description: errorMsg
          ? errorMsg
          : "Ha ocurrido un error al eliminar producto. Por favor, intentar más tarde",
      });
    }
  };

  const getProducts = async () => {
    setLoading(true);
    try {
      const res = await axiosPrivate.get("/products");
      setProducts(res.data);
      setLoading(false);
    } catch (err: any) {
      if (err.response?.status === 403) {
        setAuth({ user: null });
        setTimeout(() => {
          navigate("/login");
        }, 100);
      }
      setLoading(false);
      setError(true);
      const errorMsg = err.response?.data?.msg;
      toast({
        variant: "destructive",
        title: (
          <div className="flex gap-1">
            {<X className="h-5 w-5 text-destructive shrink-0" />} Error al
            cargar productos
          </div>
        ) as any,
        description: errorMsg
          ? errorMsg
          : "Ha ocurrido un error al cargar productos. Por favor, intentar más tarde",
      });
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <section className="relative flex flex-col gap-10 pt-5 lg:pt-0">
      <SectionTitle>Golfo Nuevo - Panel de Control</SectionTitle>
      <div className="lg:absolute lg:right-0 lg:top-0">
        <TotalCountCard
          icon={<LayoutList className="text-accent h-8 w-8" />}
          title="Productos disponibles"
          value={products.length}
        />
      </div>
      <div className="w-full">
        {error ? (
          <p className="">Ha ocurrido un error al cargar productos</p>
        ) : (
          <DataTable
            loading={loading}
            data={products}
            handleDeleteProduct={handleDeleteProduct}
            setProducts={setProducts}
            columns={productColumns}
          />
        )}
      </div>
    </section>
  );
};

export default Home;
