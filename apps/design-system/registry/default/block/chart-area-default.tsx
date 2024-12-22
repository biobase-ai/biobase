'use client'

import * as React from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/shadcn/card'
import type { ResponsiveContainer as ResponsiveContainerType } from 'recharts'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { ResponsiveWrapper } from './utils/chart-components'

const data = [
  {
    name: 'Jan',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Feb',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Mar',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Apr',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'May',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Jun',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col">
            <span className="text-[0.70rem] uppercase text-muted-foreground">{label}</span>
            <span className="font-bold text-muted-foreground">{payload[0].value}</span>
          </div>
        </div>
      </div>
    )
  }

  return null
}

export default function Component() {
  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle>Area Chart</CardTitle>
          <CardDescription>Showing total visitors for the last 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] w-full">
            <ResponsiveWrapper width="100%" height={200}>
              <AreaChart
                data={data}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  className="text-sm text-muted-foreground"
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  className="text-sm text-muted-foreground"
                />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="total" className="fill-primary/10 stroke-primary" />
              </AreaChart>
            </ResponsiveWrapper>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
