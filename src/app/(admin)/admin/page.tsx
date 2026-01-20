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

export default function AdminPage() {
  const [chartData, setChartData] = React.useState<
    { kabinet: string; kegiatan: number }[]
  >([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const [summary, setSummary] = React.useState([
    {
      title: 'Komunitas',
      icon: Handshake,
      count: 5,
      link: '/admin/komunitas',
    },
    {
      title: 'Kabinet',
      icon: Users,
      count: 8,
      link: '/admin/kabinet',
    },
    {
      title: 'Kegiatan',
      icon: Calendar,
      count: 30,
      link: '/admin/kegiatan',
    },
  ]);

  React.useEffect(() => {
    const loadSummary = async () => {
      setIsLoading(true);
      try {
        // TODO: API should be called here & calculated the length of each API calls then set to chartData
        const chartDataMock = [
          {
            kabinet: "aksayapatra",
            kegiatan: 30
          },
          {
            kabinet: "gelora harmoni",
            kegiatan: 30
          },
        ]
        setChartData(chartDataMock);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadSummary();
  }, []);

  if (isLoading) {
    return <Spinner className="size-16" />; // <-- Loading keseluruhan page
  }

  return (
    <>
      <HeaderSection page="Home" title="Dashboard Admin HIMASISFO" />

      <div className="card flex gap-5 rounded-xl border border-black px-6 py-4 text-white shadow-lg">
        {summary.map((item, index) => (
          <Card
            key={index}
            className={cn(
              'flex w-full flex-col justify-between p-0 pt-8 text-center shadow-md bg-accent',
            )}
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2 text-2xl text-white">
                <item.icon /> {item.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="py-6">
              <span className="text-5xl font-bold text-white">
                {item.count}
              </span>
            </CardContent>
            <CardFooter className="h-full bg-black/40 text-white">
              <Link
                className="flex w-full items-center justify-center gap-2"
                href={item.link}
              >
                More Info <ChevronRight />
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-6">
        <DashboardChart data={chartData} />
      </div>
    </>
  );
}
