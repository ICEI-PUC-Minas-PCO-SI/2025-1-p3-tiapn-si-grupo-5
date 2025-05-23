"use client";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type Column,
  type Row,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { User, ActionButton } from "./InterfacesDataTableUsers";

export function DataTableUsers({
  data,
  actions,
  visibleColumns,
}: {
  data: User[];
  actions: ActionButton[];
  visibleColumns: Record<keyof User, boolean>;
}) {
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: ({ column }: { column: Column<User, unknown> }) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Usuário
          <ArrowUpDown
            className={`ml-2 ${
              column.getIsSorted() === "asc"
                ? "rotate-0"
                : column.getIsSorted() === "desc"
                ? "rotate-180"
                : ""
            }`}
          />
        </Button>
      ),
      cell: ({ row }: { row: Row<User> }) => <span>{row.original.name}</span>,
      enableHiding: true,
    },
    {
      accessorKey: "accessType",
      header: ({ column }: { column: Column<User, unknown> }) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tipo de Acesso
          <ArrowUpDown
            className={`ml-2 ${
              column.getIsSorted() === "asc"
                ? "rotate-0"
                : column.getIsSorted() === "desc"
                ? "rotate-180"
                : ""
            }`}
          />
        </Button>
      ),
      cell: ({ row }: { row: Row<User> }) => (
        <span>{row.original.accessType}</span>
      ),
      enableHiding: true,
    },
    {
      accessorKey: "management",
      header: ({ column }: { column: Column<User, unknown> }) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Gerência
          <ArrowUpDown
            className={`ml-2 ${
              column.getIsSorted() === "asc"
                ? "rotate-0"
                : column.getIsSorted() === "desc"
                ? "rotate-180"
                : ""
            }`}
          />
        </Button>
      ),
      cell: ({ row }: { row: Row<User> }) => (
        <span>{row.original.management}</span>
      ),
      enableHiding: true,
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }: { row: Row<User> }) => (
        <div className="flex justify-center gap-2">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant || "default"}
              size="sm"
              onClick={() => action.onClick(row.original)}
            >
              {action.label}
            </Button>
          ))}
        </div>
      ),
    },
  ].filter(
    (column) => visibleColumns[column.accessorKey as keyof User] ?? true
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="text-center px-4 py-2"
                  style={{ width: `${100 / columns.length}%` }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className="text-center px-4 py-2"
                  style={{ width: `${100 / columns.length}%` }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between py-4">
        <span className="text-sm text-muted-foreground">
          Página {table.getState().pagination.pageIndex + 1} de{" "}
          {table.getPageCount()}
        </span>
        <div className="flex gap-3">
          <Button
            size="sm"
            variant="outline"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Próxima
          </Button>
        </div>
      </div>
    </div>
  );
}
