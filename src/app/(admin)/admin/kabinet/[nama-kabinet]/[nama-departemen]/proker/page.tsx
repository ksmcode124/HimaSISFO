'use client';

import { ConfirmationModal } from '@/features/admin/components/ConfirmationModal';
import { HeaderSection } from '@/features/admin/components/HeaderSection';
import { AdminTable } from '@/features/admin/components/AdminTable';
import { useModal } from '@/features/admin/hooks/useModal';
import * as React from 'react';
import { useConfirm } from '@/features/admin/hooks/useConfirm';
import { DetailModal } from '@/features/admin/components/DetailModal';
import { useParams } from 'next/navigation';
import { FormModal } from '@/features/admin/components/FormModal';
import { useProker, useProkerDetail } from '@/features/admin/hooks/useProker';
import { prokerColumns } from '@/features/admin/components/columns/proker-columns';
import { createProkerSchema, updateProkerSchema } from '@/schemas/proker.schema';
import { createProkerFields, updateProkerFields } from '@/features/admin/components/forms/proker-form-config';

export default function ProkerPage() {
  const params = useParams();
  const slug_kabinet = Array.isArray(params['nama-kabinet']) ? params['nama-kabinet'][0] : params['nama-kabinet']
  const id_kabinet = slug_kabinet ? Number(slug_kabinet.split('-')[0]) : -1 // cuma ambil ID
  const nama_kabinet = slug_kabinet ? slug_kabinet.split('-').slice(1).join(' ') : 'NAMA KABINET';
  
  const slug_departemen = Array.isArray(params['nama-departemen']) ? params['nama-departemen'][0] : params['nama-departemen'];
  const nama_departemen = slug_departemen ? slug_departemen.split('-').slice(1).join(' ') : 'NAMA DEPARTEMEN';
  const id_departemen = slug_departemen ? slug_departemen.split('-')[0] : -1;

  const { data, isLoading, createProker, updateProker, deleteProker, error } = useProker(id_kabinet);
  const modal = useModal();
  const { detail, isLoadingModal } = useProkerDetail(modal.id, id_kabinet);
  const confirm = useConfirm();;

  const onDeleteRequest = (id: number) => {
    confirm.confirm('delete', async () => {
      await deleteProker(id);
      modal.close();
    });
  };


  return (
    <>
      {/** TODO: breadcrumbs should be dynamic follows the current active kabinet and departemen */}
      <HeaderSection
        breadcrumbs={[
          {label: "Kabinet", href: '/admin/kabinet'},
          {label: nama_kabinet, href: `/admin/kabinet/${slug_kabinet}`},
          {label: nama_departemen, href: `/admin/kabinet/${slug_kabinet}/${slug_departemen}`},
          {label: "Proker", href: `/admin/kabinet/${slug_kabinet}/${slug_departemen}/proker`},
        ]}
        title={nama_departemen}
        handleTambah={modal.openCreate}
      />

      <AdminTable
        data={data}
        loading={isLoading}
        error={error}
        columns={prokerColumns({
          onView: modal.openView,
          onEdit: modal.openEdit,
          onDelete: onDeleteRequest,
        })}
      />

      {/* Create Modal */}
      <FormModal
        open={modal.isCreate}
        onOpenChange={v => !v && modal.close()}
        title="Buat Program Kerja Baru"
        fields={createProkerFields}
        schema={createProkerSchema}
        initialData={{}}
        submitLabel="Buat Anggota"
        onSubmit={async data => {
          await createProker(data);
          modal.close();
        }}
      />

      {modal.isEdit && !isLoadingModal && (
        <FormModal
          open={modal.isEdit}
          onOpenChange={v => !v && modal.close()}
          title="Edit Proker"
          fields={updateProkerFields}
          schema={updateProkerSchema}
          initialData={detail ?? {}}
          submitLabel="Update"
          onSubmit={async data => {
            if (!detail?.id_proker) return;
            await updateProker({ id: detail.id_proker, data });
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
        id={detail?.id_proker}
        title={detail?.nama_proker}
        subtitle={detail?.id_departmeen.toString()}
        meta={
          detail
            ? [
                { label: 'Kabinet', value: detail?.id_kabinet },
              ]
            : []
        }
        imageUrl={detail?.foto_proker}
      />

      <ConfirmationModal {...confirm} />

    </>
  );
}
