'use client';

import { ConfirmationModal } from '@/features/admin/components/ConfirmationModal';
import { HeaderSection } from '@/features/admin/components/HeaderSection';
import { AdminTable } from '@/features/admin/components/AdminTable';
import { useModal } from '@/features/admin/hooks/useModal';
import * as React from 'react';
import { useConfirm } from '@/features/admin/hooks/useConfirm';
import { EventDetailResponse } from '@/lib/types/interface';
import { useEvent } from '@/features/admin/hooks/useKegiatan';
import { kegiatanColumns } from '@/features/admin/components/columns/kegiatan-columns';

export default function KabinetPage() {
  const { data, isLoading, saveData, deleteData } = useEvent();
  const modal = useModal();
  const confirm = useConfirm();;

  const onSaveRequest = (data: EventDetailResponse) => {
    confirm.confirm('save', async () => {
      await saveData(data);
      modal.close();
    });
  };

  const onDeleteRequest = (id: number) => {
    confirm.confirm('delete', async () => {
      await deleteData(id);
      modal.close();
    });
  };


  return (
    <>
      <HeaderSection
        breadcrumbs={[
          {label: "Event", href: '/admin/event'},
        ]}
        title="Event"
      />

      <AdminTable
        data={data}
        columns={kegiatanColumns({
          onView: modal.openView,
          onEdit: modal.openEdit,
          onDelete: onDeleteRequest,
        })}
      />

      <ConfirmationModal {...confirm} />

    </>
  );
}