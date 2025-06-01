"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts"

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

export const description = "A line chart with custom labels"

export function ChartLineDotsLabel() {
    const chartData = [
        { tipoDemanda: "Suporte", quantidade: 120 },
        { tipoDemanda: "Manutenção", quantidade: 90 },
        { tipoDemanda: "Atualização", quantidade: 70 },
        { tipoDemanda: "Treinamento", quantidade: 50 },
        { tipoDemanda: "Consultoria", quantidade: 80 },
        { tipoDemanda: "Desenvolvimento", quantidade: 100 },
        { tipoDemanda: "Outros", quantidade: 40 },
    ]

    const chartConfig = {
        quantidade: {
            label: "Demandas Resolvidas",
            color: "var(--chart-6)",
        },
    }

    return (
        <Card className="w-128 h-109">
            <CardHeader>
                <CardTitle>Demandas Resolvidas por Tipo</CardTitle>
                <CardDescription>
                    Gráfico de linha com rótulos mostrando as demandas resolvidas por tipo
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart
                        data={chartData}
                        margin={{
                            top: 20,
                            right: 20,
                            left: 20,
                            bottom: 20,
                        }}
                    >
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                        <XAxis
                            dataKey="tipoDemanda"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Line
                            dataKey="quantidade"
                            type="monotone"
                            stroke={chartConfig.quantidade.color}
                            strokeWidth={2}
                            dot={{
                                fill: chartConfig.quantidade.color,
                            }}
                            activeDot={{
                                r: 6,
                            }}
                        >
                            <LabelList
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}
                                dataKey="tipoDemanda"
                            />
                        </Line>
                    </LineChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 leading-none font-medium">
                    Tendência de aumento em demandas resolvidas{" "}
                    <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-muted-foreground leading-none">
                    Dados acumulados de 2024
                </div>
            </CardFooter>
        </Card>
    )
}
