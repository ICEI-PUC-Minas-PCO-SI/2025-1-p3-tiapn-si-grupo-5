"use client"

import { Filter } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
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
    Select,
    SelectTrigger,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"

export const description = "A bar chart"

interface ChartData {
    month: string
    Quantidade: number
}

interface ChartBarProps {
    chartData: ChartData[]
    chartConfig: ChartConfig
    cardTitle: string
    cardDescription: string
    footerInfo: string
    years?: number[]
    selectedYear?: string
    onYearChange?: (year: string) => void
}

export function ChartBar({
    chartData,
    chartConfig,
    cardTitle,
    cardDescription,
    footerInfo,
    years = [],
    selectedYear = "",
    onYearChange,
}: ChartBarProps) {
    const [filterMenuOpen, setFilterMenuOpen] = useState(false)

    return (
        <Card className="w-128 h-112">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>{cardTitle}</CardTitle>
                    {years.length > 0 && onYearChange && (
                        <DropdownMenu
                            open={filterMenuOpen}
                            onOpenChange={setFilterMenuOpen}
                        >
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <Filter className="w-4 h-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="end"
                                className="min-w-[120px]"
                            >
                                <div className="px-4 py-2 font-semibold text-sm text-gray-700">
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
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar
                            dataKey="Quantidade"
                            fill={chartConfig.desktop.color}
                            radius={8}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="leading-none text-slate-750 mt-4">
                    {footerInfo}
                </div>
            </CardFooter>
        </Card>
    )
}