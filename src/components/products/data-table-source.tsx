import { Product } from "../../context/AuthContext";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

const productColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "title",
    header: "Título",
  },
  {
    accessorKey: "englishTitle",
    header: "Título (Inglés)",
  },

  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Categoría
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const product = row.original as Product;
      return (
        <div className="">
          {product.category
            .replace(/-/g, " ") // Replace hyphens with spaces
            .split(/(?=[A-Z])/)
            .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
            .join(" ")}
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Precio",
  },
  {
    accessorKey: "description",
    header: "Descripción",
  },
];

export { productColumns };
