'use client'

import { TrendingUp } from 'lucide-react'
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts'

import { ChartConfig } from 'ui'

export const description = 'An area chart with axes'

const chartData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
  mobile: {
    label: 'Mobile',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="grid gap-2">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[0.70rem] uppercase text-muted-foreground">{label}</span>
          </div>
          {payload.map((entry: any) => (
            <div key={entry.name} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
                <span className="text-sm font-medium">{entry.name}</span>
              </div>
              <span className="text-sm text-muted-foreground">{entry.value}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }
  return null
}

export default function Component() {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">Area Chart - Axes</h3>
        <p className="text-sm text-muted-foreground">
          Showing total visitors for the last 6 months
        </p>
      </div>
      <div className="p-6 pt-0">
        <div
          style={
            {
              '--color-desktop': chartConfig.desktop.color,
              '--color-mobile': chartConfig.mobile.color,
            } as React.CSSProperties
          }
        >
          <AreaChart
            width={500}
            height={300}
            data={chartData}
            margin={{
              left: -20,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} tickCount={3} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              dataKey="mobile"
              name="Mobile"
              type="natural"
              fill="var(--color-mobile)"
              fillOpacity={0.4}
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="desktop"
              name="Desktop"
              type="natural"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
              stackId="a"
            />
          </AreaChart>
        </div>
      </div>
      <div className="flex items-center p-6 pt-0">
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
