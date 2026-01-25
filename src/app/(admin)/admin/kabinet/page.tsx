'use client';

import { ConfirmationModal } from '@/features/admin/components/ConfirmationModal';
import { HeaderSection } from '@/features/admin/components/HeaderSection';
import { AdminTable } from '@/features/admin/components/AdminTable';
import { useKabinet, useKabinetDetail } from '@/features/admin/hooks/useKabinet';
import { useModal } from '@/features/admin/hooks/useModal';
import * as React from 'react';
import { useConfirm } from '@/features/admin/hooks/useConfirm';
import { Kabinet } from '@/lib/types/interface';
import { kabinetColumns } from '@/features/admin/components/columns/kabinet-columns';
import { DetailModal } from '@/features/admin/components/DetailModal';
import { FormModal } from '@/features/admin/components/FormModal';
import { cabinetEditFields } from '@/features/admin/components/forms/kabinet-form-config';

export default function KabinetPage() {
  const { data, isLoading, saveData, deleteData, error } = useKabinet();
  const modal = useModal();
  const { detail, isLoadingModal } = useKabinetDetail(modal.id);
  const confirm = useConfirm();;

  const onSaveRequest = (data: Kabinet) => {
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
          {label: "Kabinet", href: '/admin/kabinet'},
        ]}
        title="Kabinet"
      />

      <AdminTable
        data={data}
        loading={isLoading}
        error={error}
        columns={kabinetColumns({
          onView: modal.openView,
          onEdit: modal.openEdit,
          onDelete: onDeleteRequest,
        })}
      />

      {/* Edit Modal */}
      {/* <FormModal
        open={modal.isEdit}
        onOpenChange={(v: boolean) => !v && modal.close()}
        title="Edit Kabinet"
        fields={cabinetEditFields}
        onSubmit={saveData}
        submitLabel="Update"
        schema={}
      /> */}
      
      {/* <FormModal
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        title="Buat Kabinet Baru"
        fields={kabinetCreateFields}
        schema={createKabinetSchema}
        onSubmit={handleCreate}
        submitLabel="Buat Kabinet"
      /> */}

      <DetailModal
        open={modal.isView}
        onOpenChange={(v) => !v && modal.close()}
        onEdit={modal.openEdit}
        onDelete={onDeleteRequest}
        id={detail?.id}
        title={detail?.nama_kabinet}
        subtitle={detail?.tahun_kerja}
        meta={
          detail
            ? [
                { label: 'Visi', value: detail.visi },
                { label: 'Misi', value: detail.misi },
                // { label: 'Departemen', value: detail. },
              ]
            : []
        }
        description={detail?.deskripsi}
      />

      <ConfirmationModal {...confirm} />

    </>
  );
}
