'use client';

import { ConfirmationModal } from '@/features/admin/components/ConfirmationModal';
import { HeaderSection } from '@/features/admin/components/HeaderSection';
import { AdminTable } from '@/features/admin/components/AdminTable';
import { useModal } from '@/features/admin/hooks/useModal';
import * as React from 'react';
import { useConfirm } from '@/features/admin/hooks/useConfirm';
import { useEvent, useEventDetail } from '@/features/admin/hooks/useEvent';
import { kegiatanColumns } from '@/features/admin/components/columns/kegiatan-columns';
import { DetailModal } from '@/features/admin/components/DetailModal';
import { Event } from '@/features/admin';

export default function EventPage() {
  const { data, isLoading, saveData, deleteData, error } = useEvent();
  const modal = useModal();
  const {detail, isLoadingModal } = useEventDetail(modal.id)
  const confirm = useConfirm();;

  const onSaveRequest = (data: Event) => {
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
        loading={isLoading}
        error={error}
        columns={kegiatanColumns({
          onView: modal.openView,
          onEdit: modal.openEdit,
          onDelete: onDeleteRequest,
        })}
      />

      <DetailModal
        open={modal.isView}
        onOpenChange={(v) => !v && modal.close()}
        isLoadingModal={isLoadingModal}
        onEdit={modal.openEdit}
        onDelete={onDeleteRequest}
        id={detail?.id}
        title={detail?.title}
        subtitle={detail?.id.toString()}
        meta={
          detail
            ? [
                { label: 'Tanggal', value: detail.date },
                { label: 'Kategori', value: detail.type },
              ]
            : []
        }
        description={detail?.description}
      />
      
      <ConfirmationModal {...confirm} />

    </>
  );
}