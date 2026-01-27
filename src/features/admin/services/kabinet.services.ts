import { api } from '@/features/admin/services/api';

export async function getKabinet() {
  const res = await api.get('/api/admin/kabinet');
  return res.data;
}
