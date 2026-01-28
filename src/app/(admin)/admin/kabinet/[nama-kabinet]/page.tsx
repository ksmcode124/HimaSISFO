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


  const { data, isLoading, createDepartemen, updateDepartemen, deleteDepartemen, error } = useDepartemen(id_kabinet);
  const modal = useModal();
  const { detail, isLoadingModal } = useDepartemenDetail(modal.id, id_kabinet);
  const confirm = useConfirm();;
  const [isOpen, setIsOpen] = React.useState(false);

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

      await fetch(`/api/admin/departemen`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      // refresh list — fallback to full reload until query invalidation is wired
      window.location.reload();
    } catch (err) {
      console.error('create departemen error', err);
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
        handleTambah={() => setIsOpen(true)}
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

      <FormModal
        open={isOpen}
        title={`Tambah Departemen - ${nama_kabinet}`}
        fields={createDepartemenFields}
        schema={createDepartemenSchema}
        onSubmit={handleCreateDepartemen}
        onOpenChange={setIsOpen}
        submitLabel="Buat Departemen"
        initialData={{ id_kabinet }}
      />

      <ConfirmationModal {...confirm} />

    </>
  );
}
