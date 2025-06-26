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
import { ArrowUpDown, ChevronLeft, ChevronRight, Pencil, Trash2, CheckCircle2 } from "lucide-react";
import type { User as UserBase, ActionButton } from "../../interfaces/InterfacesDataTableUsers";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type User = UserBase & { fotoPerfil?: string };

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
            className={`ml-2 ${column.getIsSorted() === "asc"
              ? "rotate-0"
              : column.getIsSorted() === "desc"
                ? "rotate-180"
                : ""
              }`}
          />
        </Button>
      ),
      cell: ({ row }: { row: Row<User> }) => {
        const name = row.original.name || "";
        const displayName = name.length > 15 ? name.slice(0, 15) + "..." : name;
        // Pega as iniciais
        const initials = name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .slice(0, 2)
          .toUpperCase();
        // Foto de perfil se existir
        const fotoPerfil = row.original.fotoPerfil || undefined;
        return (
          <div className="flex gap-10">
            <Avatar className="w-8 h-8">
              <AvatarImage src={fotoPerfil} alt={name} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <span>{displayName}</span>
          </div>
        );
      },
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
            className={`ml-2 ${column.getIsSorted() === "asc"
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
            className={`ml-2 ${column.getIsSorted() === "asc"
              ? "rotate-0"
              : column.getIsSorted() === "desc"
                ? "rotate-180"
                : ""
              }`}
          />
        </Button>
      ),
      cell: ({ row }: { row: Row<User> }) => (
        <span>{row.original.management.nomeGerencia}</span>
      ),
      enableHiding: true,
      sortingFn: (a: Row<User>, b: Row<User>) => {
        const nameA = a.original.management.nomeGerencia.toLowerCase();
        const nameB = b.original.management.nomeGerencia.toLowerCase();
        return nameA.localeCompare(nameB);
      },
    },
    {
      accessorKey: "ativo",
      header: ({ column }: { column: Column<User, unknown> }) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ativo
          <ArrowUpDown
            className={`ml-2 ${column.getIsSorted() === "asc"
              ? "rotate-0"
              : column.getIsSorted() === "desc"
                ? "rotate-180"
                : ""
              }`}
          />
        </Button>
      ),
      cell: ({ row }: { row: Row<User> }) => (
        <span>{row.original.ativo === 1 ? "Sim" : "Não"}</span>
      ),
      enableHiding: true,
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }: { row: Row<User> }) => (
        <div className="flex justify-center gap-2">
          {/* Editar */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => actions[0].onClick(row.original)}
                  aria-label="Editar"
                >
                  <Pencil className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Editar
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {/* Ativar/Desativar */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={row.original.ativo === 1 ? "delete" : "active"}
                  size="icon"
                  onClick={() => actions[1].onClick(row.original)}
                  aria-label={row.original.ativo === 1 ? "Desativar" : "Ativar"}
                >
                  {row.original.ativo === 1 ? (
                    <Trash2 className="w-4 h-4" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {row.original.ativo === 1 ? "Desativar" : "Ativar"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
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
      <table className="w-full border rounded bg-white text-sm dark:bg-slate-900 dark:text-slate-200">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="bg-gray-100 text-gray-700 dark:bg-slate-800">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={`text-center px-4 py-2 ${header.column.getCanSort() ? "group" : ""} ${header.id === "actions" ? "dark:text-white" : ""}`}
                  style={{ width: `${100 / columns.length}%` }}
                >
                  {header.isPlaceholder
                    ? null
                    : (
                      <div className={header.column.getCanSort() ? "dark:text-slate-200" : ""}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-6 dark:bg-slate-900 dark:text-slate-200">Nenhum usuário encontrado</td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-t hover:bg-gray-50 dark:hover:bg-slate-800">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="text-center px-4 py-2"
                    style={{ width: `${100 / columns.length}%` }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="flex items-center justify-between py-4">
        <span className="text-sm text-muted-foreground">
          Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
        </span>
        <div className="flex gap-3">
          <Button
            size="icon"
            variant="outline"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
