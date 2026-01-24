'use client';

import { ConfirmationModal } from '@/features/admin/components/ConfirmationModal';
import { HeaderSection } from '@/features/admin/components/HeaderSection';
import { AdminTable } from '@/features/admin/components/AdminTable';
import { useModal } from '@/features/admin/hooks/useModal';
import * as React from 'react';
import { useConfirm } from '@/features/admin/hooks/useConfirm';
import { Departemen } from '@/lib/types/interface';
import { departemenColumns } from '@/features/admin/components/columns/departemen-columns';
import { useDepartemen, useDepartemenDetail } from '@/features/admin/hooks/useDepartemen';
import { DetailModal } from '@/features/admin/components/DetailModal';

export default function DepartemenPage() {
  const { data, isLoading, saveData, deleteData } = useDepartemen();
  const modal = useModal();
  const { detail, isLoadingModal } = useDepartemenDetail(modal.id);
  const confirm = useConfirm();;

  const onSaveRequest = (data: Departemen) => {
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
      // breadcrumbs seharusnya mengikut nama kabinet
        breadcrumbs={[
          {label: "Kabinet", href: '/admin/kabinet'},
          {label: "Nama Kabinet", href:'/admin/nama-kabinet'}
        ]}
        title="Nama Kabinet"
      />

      <AdminTable
        data={data}
        columns={departemenColumns({
          onView: modal.openView,
          onEdit: modal.openEdit,
          onDelete: onDeleteRequest,
        })}
      />

      <DetailModal
        open={modal.isView}
        onOpenChange={(v) => !v && modal.close()}
        onEdit={modal.openEdit}
        onDelete={onDeleteRequest}
        id={detail?.id}
        title={detail?.nama_departemen}
        subtitle={detail?.id.toString()}
        meta={
          detail
            ? [
                { label: 'Anggota', value: detail.anggota_count },
                { label: 'Proker', value: detail.proker_count },
              ]
            : []
        }
        description={detail?.deskripsi}
      />

      <ConfirmationModal {...confirm} />

    </>
  );
}
