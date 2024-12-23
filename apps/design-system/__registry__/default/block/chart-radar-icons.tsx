'use client'

import * as React from 'react'
import { ArrowDownFromLine, ArrowRightFromLine, ArrowUpFromLine } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart } from 'recharts'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'ui'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from 'ui'

const chartData = [
  { subject: 'Desktop', A: 120, B: 110, fullMark: 150 },
  { subject: 'Mobile', A: 98, B: 130, fullMark: 150 },
  { subject: 'Tablet', A: 86, B: 130, fullMark: 150 },
  { subject: 'Laptop', A: 99, B: 100, fullMark: 150 },
  { subject: 'Other', A: 85, B: 90, fullMark: 150 },
]

const IconWrapper = (Icon: LucideIcon): React.ComponentType => {
  return function IconComponent() {
    return <Icon />
  }
}

const chartConfig: ChartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
    icon: IconWrapper(ArrowDownFromLine),
  },
  mobile: {
    label: 'Mobile',
    color: 'hsl(var(--chart-2))',
    icon: IconWrapper(ArrowRightFromLine),
  },
  tablet: {
    label: 'Tablet',
    color: 'hsl(var(--chart-3))',
    icon: IconWrapper(ArrowUpFromLine),
  },
}

const description = 'A radar chart with icons'

export default function Component() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Radar Chart - Icons</CardTitle>
        <CardDescription>A radar chart with icons</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <RadarChart data={chartData}>
            <ChartTooltip content={<ChartTooltipContent />} />
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis />
            <Radar
              name="Series A"
              dataKey="A"
              stroke="var(--primary)"
              fill="var(--primary)"
              fillOpacity={0.5}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

Component.description = description
