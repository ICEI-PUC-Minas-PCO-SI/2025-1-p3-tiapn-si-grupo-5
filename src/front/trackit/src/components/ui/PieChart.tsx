"use client"

import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"

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

export const description = "A simple pie chart"

interface ChartData {
    tipochamado: string
    quantidade: number
    fill: string
}

interface ChartPieProps {
    chartData: ChartData[]
    chartConfig: ChartConfig
    cardTitle: string
    cardDescription: string
    trendInfo: string
    footerInfo: string
}

export function ChartPie({
    chartData,
    chartConfig,
    cardTitle,
    cardDescription,
    trendInfo,
    footerInfo,
}: ChartPieProps) {
    return (
        <Card className="flex flex-col w-128 h-109">
            <CardHeader className="items-center pb-0">
                <CardTitle>{cardTitle}</CardTitle>
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
                        <Pie data={chartData} dataKey="quantidade" nameKey="tipochamado" />
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 leading-none font-medium">
                    {trendInfo} <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-muted-foreground leading-none">
                    {footerInfo}
                </div>
            </CardFooter>
        </Card>
    )
}
