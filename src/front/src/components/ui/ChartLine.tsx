"use client"

import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
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
import { Filter } from "lucide-react"
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useState } from "react"
import type { ChartConfig } from "@/components/ui/chart"

interface ChartData {
    month: string
    [key: string]: number | string
}

interface ChartLineProps {
    chartData: ChartData[]
    chartConfig: ChartConfig
    cardTitle: string
    cardDescription: string
    trendInfo?: string
    footerInfo: string
    years?: number[]
    selectedYear?: string
    onYearChange?: (year: string) => void
}

export function ChartLine({
    chartData,
    chartConfig,
    cardTitle,
    cardDescription,
    trendInfo,
    footerInfo,
    years = [],
    selectedYear = "",
    onYearChange,
}: ChartLineProps) {
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
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => String(value).slice(0, 3)}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        {Object.keys(chartConfig).map((key) => (
                            <Line
                                key={key}
                                dataKey={key}
                                type="monotone"
                                stroke={chartConfig[key].color}
                                strokeWidth={2}
                                dot={false}
                            />
                        ))}
                    </LineChart>
                </ChartContainer>
            </CardContent>
            <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        {trendInfo && (
                            <div className="flex items-center gap-2 leading-none font-medium">
                                {trendInfo}
                            </div>
                        )}
                        <div className="leading-none text-slate-750">
                            {footerInfo}
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}
