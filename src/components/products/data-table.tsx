import {
  ColumnDef,
  flexRender,
  ColumnFiltersState,
  SortingState,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import NewProduct from "../NewProduct";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import React from "react";
import { Product } from "@/context/AuthContext";
import { ChevronsRight, Search, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

import EditProduct from "../EditProduct";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  loading: boolean;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  handleDeleteProduct: any;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  setProducts,
  loading,
  handleDeleteProduct,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);

  const actionColumn: ColumnDef<TData, TValue>[] = [
    {
      id: "actions",
      accessorKey: "Acción",
      cell: ({ row }) => {
        const product = row.original as Product;
        return (
          <div className="w-auto flex items-center gap-2">
            <EditProduct
              product={product}
              products={data}
              setProducts={setProducts}
            />
            <AlertDialog>
              <div className="relative flex items-center">
                <AlertDialogTrigger asChild>
                  <Button variant="trash" className="px-0">
                    <Trash2 className="w-4 h-4 relative right-0.5" />
                    Borrar
                  </Button>
                </AlertDialogTrigger>
              </div>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta acción no podrá deshacerse. Esto eliminará
                    permanentemente este producto
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="">
                    No, volver al listado de productos
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      handleDeleteProduct(product._id);
                    }}
                    className=""
                  >
                    Si, borrar producto
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns: actionColumn.concat(columns),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="">
      <div className="w-full flex flex-col gap-4 py-4 lg:flex-row lg:justify-between ">
        <div className="relative w-full max-w-xs flex items-center">
          <Search className="absolute right-3 w-4 h-4 text-accent" />
          <Input
            placeholder="Busca por nombre de producto..."
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
            className="w-full max-w-xs"
          />
        </div>
        <Sheet
          open={isSheetOpen}
          onOpenChange={() => setIsSheetOpen(!isSheetOpen)}
        >
          <SheetTrigger asChild>
            <Button className="flex items-center gap-1 shrink-0 self-end">
              Crear producto{" "}
              <ChevronsRight className="shrink-0 w-5 h-5 relative top-[1px]" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Agregar nuevo producto</SheetTitle>
              <SheetDescription>
                Completá el formulario con la información acerca del producto
                que queres agregar
              </SheetDescription>
            </SheetHeader>
            <NewProduct
              setIsSheetOpen={setIsSheetOpen}
              setProducts={setProducts}
              products={data}
            />
          </SheetContent>
        </Sheet>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {loading
                    ? "Cargando productos..."
                    : "No se encontraron productos"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 pt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}
