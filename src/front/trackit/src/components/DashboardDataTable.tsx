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
import { Searchbar } from "@/components/SearchBar";
import { useState } from "react";

export function DashboardDataTable() {
    const mockData = [
        { name: "João Silva", demandasAtendidas: 120, principalAtividade: "Suporte Técnico", desde: "2020" },
        { name: "Maria Oliveira", demandasAtendidas: 150, principalAtividade: "Gestão de Projetos", desde: "2018" },
        { name: "Carlos Souza", demandasAtendidas: 90, principalAtividade: "Análise de Sistemas", desde: "2021" },
        { name: "Ana Lima", demandasAtendidas: 110, principalAtividade: "Treinamento", desde: "2019" },
    ];

    const [filteredData, setFilteredData] = useState(mockData);

    const columns: ColumnDef<typeof mockData[0]>[] = [
        {
            accessorKey: "name",
            header: ({ column }: { column: Column<typeof mockData[0], unknown> }) => (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Nome do Analista
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
            cell: ({ row }: { row: Row<typeof mockData[0]> }) => <span>{row.original.name}</span>,
        },
        {
            accessorKey: "demandasAtendidas",
            header: ({ column }: { column: Column<typeof mockData[0], unknown> }) => (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Demandas Atendidas
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
            cell: ({ row }: { row: Row<typeof mockData[0]> }) => <span>{row.original.demandasAtendidas}</span>,
        },
        {
            accessorKey: "principalAtividade",
            header: ({ column }: { column: Column<typeof mockData[0], unknown> }) => (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Principal Atividade
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
            cell: ({ row }: { row: Row<typeof mockData[0]> }) => <span>{row.original.principalAtividade}</span>,
        },
        {
            accessorKey: "desde",
            header: ({ column }: { column: Column<typeof mockData[0], unknown> }) => (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Desde
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
            cell: ({ row }: { row: Row<typeof mockData[0]> }) => <span>{row.original.desde}</span>,
        },
    ];

    const table = useReactTable({
        data: filteredData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    const handleSearch = (query: string) => {
        const lowerCaseQuery = query.toLowerCase();
        const filtered = mockData.filter((item) =>
            item.name.toLowerCase().includes(lowerCaseQuery) ||
            item.principalAtividade.toLowerCase().includes(lowerCaseQuery) ||
            item.desde.includes(query)
        );
        setFilteredData(filtered);
    };

    return (
        <div className="space-y-4 w-[66rem]">
            <Searchbar onSearch={handleSearch} />
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
                    Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
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
