'use client';

import { ConfirmationModal } from '@/features/admin/components/ConfirmationModal';
import { HeaderSection } from '@/features/admin/components/HeaderSection';
import { AdminTable } from '@/features/admin/components/AdminTable';
import { useModal } from '@/features/admin/hooks/useModal';
import * as React from 'react';
import { useConfirm } from '@/features/admin/hooks/useConfirm';
import { useAnggota, useAnggotaDetail } from '@/features/admin/hooks/useAnggota';
import { Anggota } from '@/lib/types/interface';
import { anggotaColumns } from '@/features/admin/components/columns/anggota-columns';
import { DetailModal } from '@/features/admin/components/DetailModal';

export default function AnggotaPage() {
  const { data, isLoading, saveData, deleteData } = useAnggota();
  const modal = useModal();
  const { detail, isLoadingModal } = useAnggotaDetail(modal.id);
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
          {label: "Kabinet", href: '/admin/kabinet'},
          {label: "Nama Kabinet", href: '/admin/kabinet/nama-kabinet'},
          {label: "Nama Departemen", href: '/admin/kabinet/nama-departemen'},
        ]}
        title="Anggota"
      />

      <AdminTable
        data={data}
        columns={anggotaColumns({
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
        title={detail?.nama_anggota}
        subtitle={detail?.id.toString()}
        meta={
          detail
            ? [
                { label: 'Kabinet', value: detail?.kabinet },
                { label: 'Jabatan', value: detail?.jabatan },
              ]
            : []
        }
        imageUrl={detail?.foto_anggota}
      />

      <ConfirmationModal {...confirm} />

    </>
  );
}
