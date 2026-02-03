// app/providers.tsx
'use client';

import { SWRConfig } from 'swr';
import { api } from '@/lib/services/api';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) =>
          api.get(url).then(res => res.data),
        revalidateOnFocus: false,
        shouldRetryOnError: false,
      }}
    >
      {children}
    </SWRConfig>
  );
}
