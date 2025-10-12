"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type { ChartConfig } from "@/components/ui/chart"

const chartConfig = {
  views: {
    label: "Views",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

export default function AnalyticsChart({ data }: { data: any[] }) {
    return (
        <div className="h-[300px]">
            <ChartContainer config={chartConfig} className="w-full h-full">
                <BarChart data={data} accessibilityLayer>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(value) => `${value / 1000}k`} />
                    <ChartTooltip
                        cursor={{ fill: 'hsl(var(--muted))' }}
                        content={<ChartTooltipContent />}
                    />
                    <Bar dataKey="views" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ChartContainer>
        </div>
    )
}
