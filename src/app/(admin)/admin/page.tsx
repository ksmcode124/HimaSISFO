'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { Spinner } from '@/components/ui/spinner';
import { HeaderSection } from '@/features/admin/components/HeaderSection';
import { DashboardChart } from '@/features/admin/components/DashboardChart';

import type { DashboardChartResponse, DashboardSummaryResponse } from '@/features/admin/services/dashboard';
import { getDashboardChart, getDashboardSummary } from '@/features/admin/services/dashboard';

import { Calendar, Handshake, Users } from 'lucide-react';


const dashboardSummaryConfig = {
  kabinet: {
    title: 'Kabinet',
    icon: Users,
    link: '/admin/kabinet',
  },
  event: {
    title: 'Event',
    icon: Calendar,
    link: '/admin/event',
  },
  komunitas: {
    title: 'Komunitas',
    icon: Handshake,
    link: '/admin/komunitas',
  },
};


export default function AdminPage() {
  const [summary, setSummary] = React.useState<DashboardSummaryResponse[]>([]);
  const [chartData, setChartData] = React.useState<DashboardChartResponse[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);
      setError(null);

      try {
        const [summaryRes, chartRes] = await Promise.all([
          getDashboardSummary(),
          getDashboardChart(),
        ]);

        setSummary(summaryRes);
        setChartData(chartRes);
      } catch {
        setError('Gagal memuat data dashboard.');
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner className="size-24" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-[#FF5449]">{error}</p>
      </div>
    );
  }

  return (
    <>
      <HeaderSection
        breadcrumbs={[{ label: 'Home', href: '/admin' }]}
        title="Dashboard Admin HIMASISFO"
      />

      <div className="flex gap-5 rounded-xl border border-black px-6 py-4 shadow-lg">
        {summary.map((item) => {
          const config = dashboardSummaryConfig[item.key];
          const Icon = config.icon;

          return (
            <Card
              key={item.key}
              className={cn(
                'flex w-full flex-col justify-between p-0 pt-8 text-center shadow-md bg-linear-to-t from-columbia-blue to-[#3385FF]'
              )}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2 text-lg font-semibold text-white">
                  <Icon /> {config.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="py-6">
                <span className="text-5xl font-bold text-white">
                  {item.count}
                </span>
              </CardContent>

              <CardFooter className="rounded-b-xl bg-white">
                <Link
                  href={config.link}
                  className="flex w-full items-center justify-center gap-2"
                >
                  More Info <ChevronRight />
                </Link>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      <div className="mx-auto mt-6 w-full max-w-7xl rounded-xl border p-4">
        <DashboardChart data={chartData} />
      </div>
    </>
  );
}
