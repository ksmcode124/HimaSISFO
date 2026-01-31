'use client';

import { ConfirmationModal } from '@/features/admin/components/ConfirmationModal';
import { HeaderSection } from '@/features/admin/components/HeaderSection';
import { AdminTable } from '@/features/admin/components/AdminTable';
import { useAdminModal } from '@/features/admin/hooks/useAdminModal';
import * as React from 'react';
import { useConfirm } from '@/features/admin/hooks/useConfirm';
import { Anggota } from '@/lib/types/interface';
import { komunitasColumns } from '@/features/admin/components/columns/komunitas-columns';
import { useKomunitas, useKomunitasDetail } from '@/features/admin/hooks/useKomunitas';
import { DetailModal } from '@/features/admin/components/DetailModal';
import { notFound } from 'next/navigation';

export default function KomunitasPage() {
  notFound()
  
  const { data, isLoading, saveData, deleteData, error } = useKomunitas();
  const modal = useModal();
  const { detail, isLoadingModal } = useKomunitasDetail(modal.id);
  const confirm = useConfirm();;

  const onSaveRequest = (data: Anggota) => {
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
      {/** TODO: breadcrumbs should be dynamic follows the current active kabinet and departemen */}
      <HeaderSection
        breadcrumbs={[
          {label: "Komunitas", href: '/admin/komunitas'},
        ]}
        title="Komunitas"
      />

      <AdminTable
        data={data}
        loading={isLoading}
        error={error}
        columns={komunitasColumns({
          onView: modal.openView,
          onEdit: modal.openEdit,
          onDelete: onDeleteRequest,
        })}
      />

      {/* <DetailModal
        open={modal.isView}
        onOpenChange={(v) => !v && modal.close()}
        onEdit={modal.openEdit}
        onDelete={onDeleteRequest}
        id={detail?.id}
        title={detail?.nama_komunitas}
        subtitle={detail?.id.toString()}
        meta={
          detail
            ? [
                { label: 'Pencapaian', value: detail.pencapaian },
              ]
            : []
        }
      /> */}

      <ConfirmationModal {...confirm} />

    </>
  );
}
