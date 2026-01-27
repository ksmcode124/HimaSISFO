'use client';

import { ConfirmationModal } from '@/features/admin/components/ConfirmationModal';
import { HeaderSection } from '@/features/admin/components/HeaderSection';
import { AdminTable } from '@/features/admin/components/AdminTable';
import { useModal } from '@/features/admin/hooks/useModal';
import * as React from 'react';
import { useConfirm } from '@/features/admin/hooks/useConfirm';
import { useAnggota, useAnggotaDetail } from '@/features/admin/hooks/useAnggota';
import { Anggota } from '@/features/admin';
import { anggotaColumns } from '@/features/admin/components/columns/anggota-columns';
import { DetailModal } from '@/features/admin/components/DetailModal';
import { useParams } from 'next/navigation';

export default function AnggotaPage() {
  const params = useParams();
  const slug_kabinet = Array.isArray(params['nama-kabinet']) ? params['nama-kabinet'][0] : params['nama-kabinet']
  const id_kabinet = slug_kabinet ? Number(slug_kabinet.split('-')[0]) : -1 // cuma ambil ID
  const nama_kabinet = slug_kabinet ? slug_kabinet.split('-').slice(1).join(' ') : 'NAMA KABINET';
  
  const slug_departemen = Array.isArray(params['nama-departemen']) ? params['nama-departemen'][0] : params['nama-departemen'];
  const nama_departemen = slug_departemen ? slug_departemen.split('-').slice(1).join(' ') : 'NAMA DEPARTEMEN';

  const { data, isLoading, saveData, deleteData, error } = useAnggota(id_kabinet);
  const modal = useModal();
  const { detail, isLoadingModal } = useAnggotaDetail(modal.id, id_kabinet);
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
          {label: nama_kabinet, href: `/admin/kabinet/${slug_kabinet}`},
          {label: nama_departemen, href: `/admin/kabinet/${slug_kabinet}/${slug_departemen}`},
        ]}
        title={nama_departemen}
      />

      <AdminTable
        data={data}
        loading={isLoading}
        error={error}
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
        isLoadingModal={isLoadingModal}
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
