export type DashboardSummaryResponse = {
  key: 'komunitas' | 'kabinet' | 'event';
  count: number;
};

export type DashboardChartResponse = {
  kabinet: string;
  event: number;
};

export async function getDashboardSummary(): Promise<DashboardSummaryResponse[]> {
  // TODO: replace with real API
  return [
    { key: 'komunitas', count: 5 },
    { key: 'kabinet', count: 8 },
    { key: 'event', count: 30 },
  ];
}

export async function getDashboardChart(): Promise<DashboardChartResponse[]> {
  // TODO: replace with real API
  return [
    { kabinet: 'Aksayapatra', event: 12 },
    { kabinet: 'Gelora Harmoni', event: 8 },
  ];
}
