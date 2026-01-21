'use client';

import { kegiatanColumns } from '@/features/admin/components/columns/kegiatan-columns';
import { HeaderSection } from '@/features/admin/components/HeaderSection';
import { HimpunanTable } from '@/features/admin/components/HimpunanTable';
import { useKegiatan } from '@/features/admin/hooks/useKegiatan';
import { useModal } from '@/features/admin/hooks/useModal';
import { EventDetailResponse } from '@/lib/types/interface';
import * as React from 'react';

export default function KegiatanPage() {
  const { data, setData, isLoading } = useKegiatan();
  const modal = useModal<EventDetailResponse>();

  return (
    <>
      <HeaderSection
        page="Kegiatan"
        title="Kegiatan"
      />

      <HimpunanTable
        data={data}
        columns={kegiatanColumns({
          onView: modal.openView,
          onEdit: modal.openEdit,
          onDelete: modal.openDelete,
        })}
      />
    </>
  );
}
