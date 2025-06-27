"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import type { ChartConfig } from "@/components/ui/chart"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
} from "@/components/ui/dropdown-menu"
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export const description = "A simple pie chart"

interface ChartData {
    tipochamado: string
    quantity: number
    fill: string
}

interface ChartPieProps {
    chartData: ChartData[]
    chartConfig: ChartConfig
    cardTitle: string
    cardDescription: string
    years?: number[]
    selectedYear?: string
    onYearChange?: (year: string) => void
}

export function ChartPie({
    chartData,
    chartConfig,
    cardTitle,
    cardDescription,
    years = [],
    selectedYear = "",
    onYearChange,
}: ChartPieProps) {
    const [filterMenuOpen, setFilterMenuOpen] = React.useState(false)

    const totalQuantity = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.quantity, 0)
    }, [chartData])

    // Gera o título com o ano incluído
    const titleWithYear = selectedYear ? `${cardTitle} em ${selectedYear}` : cardTitle

    return (
        <Card className="flex flex-col w-full max-w-full lg:w-128 h-auto lg:h-112">
            <CardHeader className="items-center pb-3 md:pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-2">
                    <CardTitle className="text-base md:text-lg text-center sm:text-left">{titleWithYear}</CardTitle>
                    {years.length > 0 && onYearChange && (
                        <div className="flex gap-3 justify-end">
                            <DropdownMenu
                                open={filterMenuOpen}
                                onOpenChange={setFilterMenuOpen}
                            >
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <DropdownMenuTrigger asChild>
                                                <Button size="icon" variant="outline">
                                                    <Filter className="w-4 h-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            Filtrar
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                <DropdownMenuContent align="end" className="min-w-[220px]">
                                    <div className="px-4 py-2 font-semibold text-sm text-gray-700 dark:text-white">
                                        Ano
                                    </div>
                                    <div className="px-2 mb-2">
                                        <Select
                                            value={selectedYear}
                                            onValueChange={onYearChange}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Ano" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {years.map((year) => (
                                                        <SelectItem key={year} value={String(year)}>
                                                            {year}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    )}
                </div>
                <CardDescription className="text-sm text-center sm:text-left">{cardDescription}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0 px-3 md:px-6">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[200px] sm:max-h-[220px] md:max-h-[250px] w-full"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="quantity"
                            nameKey="tipochamado"
                            innerRadius={40}
                            outerRadius={80}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-xl md:text-3xl font-bold"
                                                >
                                                    {totalQuantity.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 20}
                                                    className="fill-muted-foreground text-sm"
                                                >
                                                    Total
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}