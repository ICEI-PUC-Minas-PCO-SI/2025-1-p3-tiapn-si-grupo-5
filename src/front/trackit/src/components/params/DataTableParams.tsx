"use client";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface ActionButton<T> {
  onClick: (row: T) => void;
}

interface DataTableParamsProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  visibleColumns?: Record<string, boolean>;
  pageSize?: number;
}

export function DataTableParams<T extends { id?: string | number }>({
  data,
  columns,
  visibleColumns = {},
  pageSize = 10,
}: DataTableParamsProps<T>) {
  // Filtra colunas conforme visibilidade
  const filteredColumns = columns.filter(
    (column) =>
      !column.accessorKey ||
      visibleColumns[column.accessorKey as string] !== false
  );

  const table = useReactTable({
    data,
    columns: filteredColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: pageSize,
      },
    },
    state: {
      pagination: {
        pageIndex: 0,
        pageSize: pageSize,
      },
    },
    manualPagination: false,
  });

  // Atualiza pageSize dinamicamente
  if (table.getState().pagination.pageSize !== pageSize) {
    table.setPageSize(pageSize);
  }

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
                  style={{ width: `${100 / filteredColumns.length}%` }}
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
              <td colSpan={filteredColumns.length} className="text-center py-6 dark:bg-slate-900 dark:text-slate-200">Nenhum registro encontrado</td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-t hover:bg-gray-50 dark:hover:bg-slate-800">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="text-center px-4 py-2"
                    style={{ width: `${100 / filteredColumns.length}%` }}
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