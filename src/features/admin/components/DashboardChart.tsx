'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';

interface DashboardChartProps {
  data: { kabinet: string; kegiatan: number }[];
}

const chartConfig = {
  kabinet: {
    label: 'Kabinet',
    color: '#102F41',
  },
} satisfies ChartConfig;

export function DashboardChart({ data }: DashboardChartProps) {
  return (
    <div className="max-w-7xl mx-auto rounded-xl border p-4">
      <ChartContainer config={chartConfig} className="w-full">
        <BarChart accessibilityLayer data={data}>
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#102F41" />
              <stop offset="100%" stopColor="#DBFCFF" />
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

          <Bar dataKey="kegiatan" fill="url(#barGradient)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
