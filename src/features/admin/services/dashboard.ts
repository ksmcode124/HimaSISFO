import { api } from "@/lib/services/api";
import { EventListResponse } from "@/lib/types/interface";

export type DashboardSummaryResponse = {
  key: 'komunitas' | 'kabinet' | 'event';
  count: number;
};

export type DashboardChartResponse = {
  kabinet: string;
  event: number;
};

export async function getDashboardSummary(): Promise<DashboardSummaryResponse[]> {
  const [komunitas, kabinet, event] = await Promise.all([
    api.get('/api/admin/komunitas'),
    api.get('/api/admin/kabinet'),
    api.get('/api/admin/event'),
  ]);

  return [
    { key: 'kabinet', count: kabinet.data.length },
    { key: 'event', count: event.data.length },
    { key: 'komunitas', count: komunitas.data.length },
  ];

}

export async function getDashboardChart(): Promise<DashboardChartResponse[]> {
  const event = (await api.get<EventListResponse[]>('/api/admin/event')).data
  
  function buildChartData(events: EventListResponse[]): DashboardChartResponse[] {
    const map: Record<string, number> = {};

    for (const e of events) {
      const name = e.kabinet.nama_kabinet;
      map[name] = (map[name] ?? 0) + 1;
    }

    return Object.entries(map).map(([kabinet, event]) => ({
      kabinet,
      event,
    }));
  }

  return buildChartData(event)
}

export async function loadDashboardData() {
  const [summary, chart] = await Promise.all([
    getDashboardSummary(),
    getDashboardChart(),
  ]);

  return { summary, chart };
}
