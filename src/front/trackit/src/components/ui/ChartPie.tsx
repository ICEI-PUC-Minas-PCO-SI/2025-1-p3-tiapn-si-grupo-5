"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
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
    footerInfo: string
    years?: number[]
    selectedYear?: string
    onYearChange?: (year: string) => void
}

export function ChartPie({
    chartData,
    chartConfig,
    cardTitle,
    cardDescription,
    footerInfo,
    years = [],
    selectedYear = "",
    onYearChange,
}: ChartPieProps) {
    const [filterMenuOpen, setFilterMenuOpen] = React.useState(false)

    const totalQuantity = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.quantity, 0)
    }, [chartData])

    return (
        <Card className="flex flex-col w-128 h-112">
            <CardHeader className="items-center pb-0">
                <div className="flex items-center justify-between w-full">
                    <CardTitle>{cardTitle}</CardTitle>
                    {years.length > 0 && onYearChange && (
                        <DropdownMenu
                            open={filterMenuOpen}
                            onOpenChange={setFilterMenuOpen}
                        >
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" size="icon">
                                                <Filter className="w-4 h-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        Filtrar
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <DropdownMenuContent
                                align="end"
                                className="min-w-[120px]"
                            >
                                <div className="px-4 py-2 font-semibold text-sm text-gray-700 dark:text-white">
                                    Ano
                                </div>
                                <Select
                                    value={selectedYear}
                                    onValueChange={onYearChange}
                                >
                                    <SelectTrigger className="w-full mb-2">
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
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
                <CardDescription>{cardDescription}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
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
                            innerRadius={60}
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
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {totalQuantity.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
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
            <CardFooter className="flex-col items-start gap-2 text-sm mt-1">
                <div className="leading-none text-slate-750">
                    {footerInfo}
                </div>
            </CardFooter>
        </Card>
    )
}
