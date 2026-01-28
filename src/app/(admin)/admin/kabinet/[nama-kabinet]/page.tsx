'use client';

import { ConfirmationModal } from '@/features/admin/components/ConfirmationModal';
import { HeaderSection } from '@/features/admin/components/HeaderSection';
import { AdminTable } from '@/features/admin/components/AdminTable';
import { useModal } from '@/features/admin/hooks/useModal';
import * as React from 'react';
import { useConfirm } from '@/features/admin/hooks/useConfirm';
import { departemenColumns } from '@/features/admin/components/columns/departemen-columns';
import { useDepartemen, useDepartemenDetail } from '@/features/admin/hooks/useDepartemen';
import { DetailModal } from '@/features/admin/components/DetailModal';
import { useParams } from 'next/navigation';
import { FormModal } from '@/features/admin/components/FormModal';
import { createDepartemenSchema, updateDepartemenSchema } from '@/schemas/departemen.schema';
import { createDepartemenFields, updateDepartemenFields } from '@/features/admin/components/forms/departemen-form-config';

export default function DepartemenPage() {
  const params = useParams();
  const slug = Array.isArray(params['nama-kabinet']) ? params['nama-kabinet'][0] : params['nama-kabinet'];
  const id_kabinet = slug ? Number(slug.split('-')[0]) : -1; // cuma ambil ID
  const nama_kabinet = slug ? slug.split('-').slice(1).join(' ') : 'NAMA KABINET';


  const { data, isLoading, createDepartemen, updateDepartemen, deleteDepartemen, error } = useDepartemen(id_kabinet);
  const modal = useModal();
  const { detail, isLoadingModal } = useDepartemenDetail(modal.id, id_kabinet);
  const confirm = useConfirm();;

  const onDeleteRequest = (id: number) => {
    confirm.confirm('delete', async () => {
      await deleteDepartemen(id);
      modal.close();
    });
  };

  return (
    <>
      <HeaderSection
      // breadcrumbs seharusnya mengikut nama kabinet
        breadcrumbs={[
          {label: "Kabinet", href: '/admin/kabinet'},
          {label: nama_kabinet, href:`/admin/kabinet/${slug}`}
        ]}
        title={nama_kabinet}
        handleTambah={modal.openCreate}
      />

      <AdminTable
        data={data}
        loading={isLoading}
        error={error}
        columns={departemenColumns({
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
        fields={createDepartemenFields}
        schema={createDepartemenSchema}
        initialData={{id_kabinet: id_kabinet}}
        submitLabel="Buat Departemen"
        onSubmit={async data => {
          await createDepartemen(data);
          modal.close();
        }}
      />

      {modal.isEdit && !isLoadingModal && (
        <FormModal
          open={modal.isEdit}
          onOpenChange={v => !v && modal.close()}
          title="Edit Departemen"
          fields={updateDepartemenFields}
          schema={updateDepartemenSchema}
          initialData={detail ?? {}}
          submitLabel="Update"
          onSubmit={async data => {
            if (!detail?.id_departemen) return;
            await updateDepartemen({ id: detail.id_departemen, data });
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
        id={detail?.id_departemen}
        title={detail?.nama_departemen}
        subtitle={detail?.id_departemen.toString()}
        meta={
          detail
            ? [
                { label: 'Anggota', value: detail.anggota_count },
                { label: 'Proker', value: detail.proker_count },
              ]
            : []
        }
        description={detail?.deskripsi_departemen}
      />

      <ConfirmationModal {...confirm} />

    </>
  );
}
