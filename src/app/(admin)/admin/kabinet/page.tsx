'use client';

import { kabinetColumns } from '@/features/admin/components/columns/kabinet-columns';
import { HeaderSection } from '@/features/admin/components/HeaderSection';
import { HimpunanTable } from '@/features/admin/components/HimpunanTable';
import { useKabinet } from '@/features/admin/hooks/useKabinet';
import { useModal } from '@/features/admin/hooks/useModal';
import * as React from 'react';

export default function KabinetPage() {
  const { data, setData, isLoading } = useKabinet();
  // const crud = useModal<KabinetListItem>();

  return (
    <>
      <HeaderSection
        page="Kabinet"
        title="Kabinet"
      />

      <HimpunanTable
        data={data}
        columns={kabinetColumns()}
      />
    </>
  );
}
