'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Calendar, ChevronRight, Handshake, Users } from 'lucide-react';
import { DashboardChart } from '@/features/admin/components/DashboardChart';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';
import { HeaderSection } from '@/features/admin/components/HeaderSection';
import { Spinner } from '@/components/ui/spinner';

const fetchSummary = async () => {
  // TODO: Replace with real API call
  return [
    { title: 'Komunitas', count: 5, link: '/admin/komunitas', icon: Handshake },
    { title: 'Kabinet', count: 8, link: '/admin/kabinet', icon: Users },
    { title: 'Event', count: 30, link: '/admin/event', icon: Calendar },
  ];
};

const fetchChartData = async () => {
  // TODO: Replace with real API call
  return [
    { kabinet: 'Aksayapatra', event: 12 },
    { kabinet: 'Gelora Harmoni', event: 8 },
  ];
};


export default function AdminPage() {
  const [summary, setSummary] = React.useState<
    { title: string; count: number; link: string; icon: React.ElementType }[]
  >([]);
  const [chartData, setChartData] = React.useState<{ kabinet: string; event: number }[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [summaryData, chartDataData] = await Promise.all([
          fetchSummary(),
          fetchChartData(),
        ]);
        setSummary(summaryData);
        setChartData(chartDataData);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className='w-full h-full flex items-center justify-center'>
        <Spinner className="size-24" />;
      </div>
    )
  }

  return (
    <>
      <HeaderSection
        breadcrumbs={[{ label: 'Home', href: '/admin' }]}
        title="Dashboard Admin HIMASISFO"
      />

      <div className="flex gap-5 rounded-xl border border-black px-6 py-4 shadow-lg">
        {summary.map((item, index) => (
          <Card
            key={index}
            className={cn(
              'flex w-full flex-col justify-between p-0 pt-8 text-center shadow-md bg-linear-to-t from-columbia-blue to-[#3385FF]'
            )}
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2 text-lg font-semibold text-white">
                <item.icon /> {item.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="py-6">
              <span className="text-5xl font-bold text-white">{item.count}</span>
            </CardContent>
            <CardFooter className="h-full bg-white rounded-b-xl">
              <Link className="flex w-full items-center justify-center gap-2" href={item.link}>
                More Info <ChevronRight />
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mx-auto mt-6 max-w-7xl w-full rounded-xl border p-4">
        <DashboardChart data={chartData} />
      </div>
    </>
  );
}
