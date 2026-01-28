'use client'
import { ConfirmationModal } from '@/features/admin/components/ConfirmationModal';
import { HeaderSection } from '@/features/admin/components/HeaderSection';
import { AdminTable } from '@/features/admin/components/AdminTable';
import { useKabinet, useKabinetDetail } from '@/features/admin/hooks/useKabinet';
import { useModal } from '@/features/admin/hooks/useModal';
import * as React from 'react';
import { useConfirm } from '@/features/admin/hooks/useConfirm';
import { kabinetColumns } from '@/features/admin/components/columns/kabinet-columns';
import { DetailModal } from '@/features/admin/components/DetailModal';
import { FormModal } from '@/features/admin/components/FormModal';
import { createKabinetFields, updateKabinetFields } from '@/features/admin/components/forms/kabinet-form-config';
import { createKabinetSchema, updateKabinetSchema } from '@/schemas/kabinet.schema';

export default function KabinetPage() {
  const { data, isLoading, createKabinet, updateKabinet, deleteKabinet, error } = useKabinet();
  const modal = useModal();
  const { detail, isLoadingModal } = useKabinetDetail(modal.id);
  const confirm = useConfirm();

  const onDeleteRequest = (id: number) => {
    confirm.confirm('delete', async () => {
      await deleteKabinet(id);
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
        handleTambah={modal.openCreate}
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

      {/* Create Modal */}
      <FormModal
        open={modal.isCreate}
        onOpenChange={v => !v && modal.close()}
        title="Buat Kabinet Baru"
        fields={createKabinetFields}
        schema={createKabinetSchema}
        initialData={{}}
        submitLabel="Buat Kabinet"
        onSubmit={async data => {
          await createKabinet(data);
          modal.close();
        }}
      />

      {modal.isEdit && !isLoadingModal && (
        <FormModal
          open={modal.isEdit}
          onOpenChange={v => !v && modal.close()}
          title="Edit Kabinet"
          fields={updateKabinetFields}
          schema={updateKabinetSchema.partial()}
          initialData={{
            nama_kabinet: detail?.nama_kabinet,
            tahun_kerja: detail?.tahun_kerja,
            visi: detail?.visi,
            misi: detail?.misi,
            deskripsi: detail?.deskripsi,
            gambar_logo: detail?.logo,
            foto_kabinet: detail?.foto_kabinet
          }}
          submitLabel="Update"
          onSubmit={async data => {
            if (!detail?.id) return;
            await updateKabinet({ id: detail.id, data });
            modal.close();
          }}
        />
      )}

      <DetailModal
        open={modal.isView}
        onOpenChange={(v) => !v && modal.close()}
        onEdit={modal.openEdit}
        onDelete={onDeleteRequest}
        isLoadingModal={isLoadingModal}
        id={detail?.id}
        title={detail?.nama_kabinet}
        subtitle={detail?.tahun_kerja}
        meta={
          detail
            ? [
                { label: 'Visi', value: detail.visi },
                { label: 'Misi', value: detail.misi },
                { label: 'Departemen', value: detail.departemen_count },
              ]
            : []
        }
        description={detail?.deskripsi}
      />

      <ConfirmationModal loading={isLoading} {...confirm} />

    </>
  );
}
