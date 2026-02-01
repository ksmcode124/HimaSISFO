import useSWR, { SWRConfiguration } from 'swr';

export function useApi<T>(
  key: string | null,
  config?: SWRConfiguration
) {
  return useSWR<T>(key, config);
}
