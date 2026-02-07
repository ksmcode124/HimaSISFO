import { Episode, EventListResponse } from '@/lib/types/interface'
import { useQuery } from '@tanstack/react-query'

interface BerandaData {
  episodes: Episode[]
  events: EventListResponse[]
}

export default function useBeranda() {
  return useQuery<BerandaData>({
    queryKey: ['beranda'],
    queryFn: async () => {
      const res = await fetch('/api/display/home')
      if (!res.ok) throw new Error('Failed fetch')
      return res.json()
    },
    staleTime: 1000 * 60, // 1 menit dianggap fresh
  })
}