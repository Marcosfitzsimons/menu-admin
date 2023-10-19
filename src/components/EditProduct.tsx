import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { Product } from "@/context/AuthContext";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import useAuth from "@/hooks/useAuth";
import { useToast } from "./ui/use-toast";
import { Label } from "./ui/label";
import {
  Check,
  ClipboardSignature,
  DollarSign,
  Loader2,
  PencilLine,
  Shapes,
  X,
} from "lucide-react";
import { Input } from "./ui/input";
import { categoryOptions } from "@/lib/utils/categories";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";

type EditProductProps = {
  product: Product;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  products: any[];
};

interface ProductFormData {
  title: string;
  englishTitle: string;
  description: string;
  price: number;
}

const EditProduct = ({ product, setProducts, products }: EditProductProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectValue, setSelectValue] = useState("");
  const [selectError, setSelectError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const { setAuth } = useAuth();

  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      englishTitle: "",
      description: "",
      price: 0,
    },
  });

  const handleOnSubmitEdit = async (data: ProductFormData) => {
    if (!isDirty && product.category === selectValue) {
      return toast({
        variant: "destructive",
        description: (
          <div className="flex gap-1">
            {<X className="h-5 w-5 text-destructive shrink-0" />} Es necesario
            realizar cambios antes de enviar
          </div>
        ),
      });
    }
    setDescriptionError(false);
    setSelectError(false);

    if (selectValue === "") {
      setSelectError(true);
      return toast({
        variant: "destructive",
        description: (
          <div className="flex gap-1">
            <X className="h-5 w-5 text-destructive shrink-0" />
            Debes seleccionar una categoría
          </div>
        ),
      });
    }

    if (
      data.description.length > 180 ||
      (data.description.length > 0 && data.description.length < 6)
    ) {
      setDescriptionError(true);
      return toast({
        variant: "destructive",
        description: (
          <div className="flex gap-1">
            <X className="h-5 w-5 text-destructive shrink-0" />
            Descripción debe tener entre 6 y 180 carácteres
          </div>
        ),
      });
    }

    setIsSubmitted(true);
    toast({
      variant: "loading",
      description: (
        <div className="flex gap-1">
          <Loader2 className="h-5 w-5 animate-spin text-purple-900 shrink-0" />
          Editando producto...
        </div>
      ),
    });
    const payload = {
      category: selectValue,
      title: data.title,
      englishTitle: data.englishTitle,
      price: data.price,
      description: data.description,
    };
    try {
      const res = await axiosPrivate.put(`/products/${product._id}`, {
        ...payload,
      });
      const updatedProducts = [...products];
      const index = updatedProducts.findIndex((p) => p._id === product._id);
      updatedProducts[index] = res.data;
      setProducts(updatedProducts);
      setIsSubmitted(false);
      setIsEditDialogOpen(false);
      toast({
        description: (
          <div className="flex gap-1">
            {<Check className="h-5 w-5 text-green-600 shrink-0" />} Producto ha
            sido editado con éxito
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
      setIsSubmitted(false);
      toast({
        variant: "destructive",
        title: "Error al editar producto",
        description: errorMsg
          ? errorMsg
          : "Ha ocurrido un error al editar producto. Por favor, intentar más tarde",
      });
    }
  };

  useEffect(() => {
    reset({
      title: product.title,
      price: product.price,
      englishTitle: product.englishTitle ? product.englishTitle : "",
      description: product.description ? product.description : "",
    });
    setSelectValue(product.category);
  }, []);

  return (
    <Dialog
      open={isEditDialogOpen}
      onOpenChange={() => setIsEditDialogOpen(!isEditDialogOpen)}
    >
      <DialogTrigger asChild>
        <Button variant="secondary">Editar</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar producto</DialogTitle>
          <DialogDescription>Editá un producto existente</DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(handleOnSubmitEdit)}
          className="w-full flex flex-col gap-2"
        >
          <div className="w-full flex flex-col gap-2">
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="title">
                Nombre{" "}
                <span className="text-xs font-light text-card-foreground">
                  * Requerido
                </span>
              </Label>
              <div className="relative flex items-center">
                <ClipboardSignature className="z-30 h-5 w-5 text-accent absolute left-[10px] shrink-0" />
                <Input
                  type="text"
                  className="pl-9"
                  placeholder="Café con leche"
                  {...register("title", {
                    required: {
                      value: true,
                      message: "Por favor, ingresar nombre del producto",
                    },
                    minLength: {
                      value: 3,
                      message: "Nombre del producto no puede ser tan corto",
                    },
                    maxLength: {
                      value: 60,
                      message: "Nombre del producto no puede ser tan largo",
                    },
                  })}
                />
              </div>
              {errors.title && (
                <p className="text-red-600 text-sm">{errors.title.message}</p>
              )}
            </div>
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="englishTitle">Nombre en Inglés</Label>
              <div className="relative flex items-center">
                <ClipboardSignature className="z-30 h-5 w-5 text-accent absolute left-[10px] shrink-0" />
                <Input
                  className="pl-9"
                  type="text"
                  placeholder="Coffee with milk"
                  {...register("englishTitle", {
                    minLength: {
                      value: 3,
                      message: "Nombre del producto no puede ser tan corto",
                    },
                    maxLength: {
                      value: 60,
                      message: "Nombre del producto no puede ser tan largo",
                    },
                  })}
                />
              </div>
              {errors.englishTitle && (
                <p className="text-red-600 text-sm">
                  {errors.englishTitle.message}
                </p>
              )}
            </div>
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="price">
                Precio{" "}
                <span className="text-xs font-light text-card-foreground">
                  * Requerido
                </span>
              </Label>
              <div className="relative flex items-center">
                <DollarSign className="z-30 h-5 w-5 text-accent absolute left-[10px] shrink-0" />
                <Input
                  className="pl-9"
                  type="text"
                  {...register("price", {
                    required: {
                      value: true,
                      message: "Por favor, ingresar precio del producto",
                    },
                    min: {
                      value: 1,
                      message: "Precio del producto no puede ser tan bajo",
                    },
                    max: {
                      value: 100000,
                      message: "Precio del producto no puede ser tan alto",
                    },
                  })}
                />
              </div>
              {errors.price && (
                <p className="text-red-600 text-sm">{errors.price.message}</p>
              )}
            </div>
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="category">
                Categoría{" "}
                <span className="text-xs font-light text-card-foreground">
                  * Requerido
                </span>
              </Label>
              <Select
                value={selectValue}
                onValueChange={(v) => setSelectValue(v)}
              >
                <SelectTrigger className="relative flex items-center pl-9 w-[180px]">
                  <Shapes className="absolute w-5 h-5 left-[10px] text-accent shrink-0" />
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map((category, index) => (
                    <SelectItem key={index} value={category}>
                      {category
                        .replace(/-/g, " ") // Replace hyphens with spaces
                        .split(/(?=[A-Z])/)
                        .map(
                          (part) => part.charAt(0).toUpperCase() + part.slice(1)
                        )
                        .join(" ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectError && (
                <p className="text-red-600 text-sm">
                  Debes seleccionar una categoría
                </p>
              )}
            </div>
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="description">Descripción</Label>
              <div className="relative">
                <PencilLine className="z-30 h-5 w-5 text-accent absolute left-[10px] top-2 shrink-0" />
                <Textarea {...register("description")} className="pl-9" />
                {descriptionError && (
                  <p className="text-red-600 text-sm">
                    Descripción debe tener entre 6 y 180 carácteres
                  </p>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button disabled={isSubmitted}>Guardar cambios</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProduct;
