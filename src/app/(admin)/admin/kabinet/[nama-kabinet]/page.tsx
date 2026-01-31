/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { ConfirmationModal } from '@/features/admin/components/ConfirmationModal';
import { HeaderSection } from '@/features/admin/components/HeaderSection';
import { AdminTable } from '@/features/admin/components/AdminTable';
import { useModal } from '@/features/admin/hooks/useModal';
import * as React from 'react';
// Note: don't wrap FormModal inside Sheet to avoid double overlay
import { FormModal } from '@/features/admin/components/FormModal';
import { useConfirm } from '@/features/admin/hooks/useConfirm';
import { departemenColumns } from '@/features/admin/components/columns/departemen-columns';
import { useDepartemen, useDepartemenDetail } from '@/features/admin/hooks/useDepartemen';
import { DetailModal } from '@/features/admin/components/DetailModal';
import { useParams } from 'next/navigation';
import { createDepartemenSchema, updateDepartemenSchema } from '@/schemas/departemen.schema';
import { createDepartemenFields, updateDepartemenFields } from '@/features/admin/components/forms/departemen-form-config';

export default function DepartemenPage() {
  const params = useParams();
  const slug = Array.isArray(params['nama-kabinet']) ? params['nama-kabinet'][0] : params['nama-kabinet'];
  const id_kabinet = slug ? Number(slug.split('-')[0]) : -1; // cuma ambil ID
  const nama_kabinet = slug ? slug.split('-').slice(1).join(' ') : 'NAMA KABINET';


  const { data, isLoading, createDepartemen, updateDepartemen, deleteDepartemen, error, reload } = useDepartemen(id_kabinet);
  const modal = useModal();
  const { detail, isLoadingModal } = useDepartemenDetail(modal.id, id_kabinet);
  const confirm = useConfirm();;

  const onDeleteRequest = (id: number) => {
    confirm.confirm('delete', async () => {
      await deleteDepartemen(id);
      modal.close();
    });
  };

  async function handleCreateDepartemen(values: any) {
    try {
      const payload: any = { ...values, id_kabinet };

      const extractUrl = (v: any) => {
        if (!v) return undefined;
        if (typeof v === 'string') return v;
        return v.url || v.fileUrl || v.file?.url || (Array.isArray(v) ? v[0]?.url || v[0]?.fileUrl : undefined);
      };

      if (payload.logo_departemen) payload.logo_departemen = extractUrl(payload.logo_departemen);
      if (payload.foto_departemen) payload.foto_departemen = extractUrl(payload.foto_departemen);

      createDepartemen(payload);
      reload()
    } catch (err) {
      console.error('create departemen error', err);
    }
  }

  async function handleEditDepartemen(values: any) {
    try {
      if (!detail?.id_departemen) {
        throw new Error("id_departemen tidak tersedia untuk edit");
      }

      const extractUrl = (input: unknown): string | undefined => {
        if (!input) return undefined;

        if (typeof input === "string") return input;

        if (Array.isArray(input)) {
          const first = input[0];
          if (!first) return undefined;
          return first.url || first.fileUrl || first.file?.url;
        }

        if (typeof input === "object") {
          const v = input as any;
          return v.url || v.fileUrl || v.file?.url;
        }

        return undefined;
      };

      const payload = {
        ...values,
        id_kabinet,
        id_departemen: detail.id_departemen,
        logo_departemen: extractUrl(values.logo_departemen),
        foto_departemen: extractUrl(values.foto_departemen),
      };

      await updateDepartemen(payload);
      await reload();
    } catch (err) {
      console.error("edit departemen error", err);
    }
  }


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

      <FormModal
        open={modal.isEdit}
        title={`Edit Departemen - ${nama_kabinet}`}
        fields={updateDepartemenFields}
        schema={updateDepartemenSchema}
        onSubmit={handleEditDepartemen}
        onOpenChange={v => !v && modal.close()}
        submitLabel="Simpan"
        initialData={detail ?? {}}
      />

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
        imageUrl={detail?.logo_departemen}
      />

      <FormModal
        open={modal.isCreate}
        title={`Tambah Departemen - ${nama_kabinet}`}
        fields={createDepartemenFields}
        schema={createDepartemenSchema}
        onSubmit={handleCreateDepartemen}
        onOpenChange={v => !v && modal.close()}
        submitLabel="Buat Departemen"
        initialData={{ id_kabinet }}
      />

      <ConfirmationModal {...confirm} />

    </>
  );
}
