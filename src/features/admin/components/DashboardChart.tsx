'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';

interface DashboardChartProps {
  data: { kabinet: string; event: number }[];
}

const chartConfig = {
  kabinet: {
    label: 'Kabinet',
    color: '#102F41',
  },
} satisfies ChartConfig;

export function DashboardChart({ data }: DashboardChartProps) {
  return (
    <ChartContainer config={chartConfig} className="w-full">
      <BarChart accessibilityLayer data={data}>
        <defs>
          <linearGradient id="barGradient" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#8DDDFF" />
            <stop offset="100%" stopColor="#3385FF" />
          </linearGradient>
        </defs>

        <CartesianGrid vertical={false} />

        <YAxis tickLine={false} axisLine={false} tickMargin={10} />

        <XAxis
          dataKey="kabinet"
          interval={0}
          textAnchor="middle"
          tickLine={false}
          axisLine={false}
        />

        <ChartTooltip content={<ChartTooltipContent />} />

        <Bar dataKey="event" fill="url(#barGradient)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
