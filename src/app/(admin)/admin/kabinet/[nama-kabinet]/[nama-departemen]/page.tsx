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
import { FormModal } from '@/features/admin/components/FormModal';
import { anggotaCreateFields, anggotaEditFields } from '@/features/admin/components/forms/anggota-form-config';
import { createAnggotaSchema, updateAnggotaSchema } from '@/schemas/anggota.schema';
import { createAnggotaDetailSchema, updateAnggotaDetailSchema } from '@/schemas/anggota_detail.schema';

export default function AnggotaPage() {
  const params = useParams();
  const slug_kabinet = Array.isArray(params['nama-kabinet']) ? params['nama-kabinet'][0] : params['nama-kabinet']
  const id_kabinet = slug_kabinet ? Number(slug_kabinet.split('-')[0]) : -1 // cuma ambil ID
  const nama_kabinet = slug_kabinet ? slug_kabinet.split('-').slice(1).join(' ') : 'NAMA KABINET';
  
  const slug_departemen = Array.isArray(params['nama-departemen']) ? params['nama-departemen'][0] : params['nama-departemen'];
  const id_departemen = slug_departemen ? Number(slug_departemen.split('-')[0]) : -1 // Extract ID departemen
  const nama_departemen = slug_departemen ? slug_departemen.split('-').slice(1).join(' ') : 'NAMA DEPARTEMEN';

  const { data, isLoading, saveData, deleteData, error, reload } = useAnggota(id_kabinet, id_departemen);
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

  const onCreateAnggota = async (data: any) => {
    console.log('=== onCreateAnggota data ===', data);
    console.log('foto_anggota type:', typeof data.foto_anggota);
    console.log('foto_anggota is array:', Array.isArray(data.foto_anggota));
    console.log('foto_anggota length:', data.foto_anggota?.length);
    console.log('foto_anggota[0]:', data.foto_anggota?.[0]);
    
    // Step 1: Create anggota with nama_anggota
    const anggotaPayload = {
      nama_anggota: data.nama_anggota,
    };
    
    const anggotaResponse = await fetch('/api/admin/anggota', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(anggotaPayload),
    });

    if (!anggotaResponse.ok) {
      const error = await anggotaResponse.json();
      throw new Error(error.message || 'Gagal membuat anggota');
    }

    const anggotaData = await anggotaResponse.json();
    const id_anggota = anggotaData.id_anggota;
    console.log('Created anggota with id:', id_anggota);

    // Step 2: Create detail_anggota with foto_anggota (if provided)
    // Extract URL dari uploadthing response
    let fotoUrl = null;
    if (data.foto_anggota && Array.isArray(data.foto_anggota) && data.foto_anggota.length > 0) {
      // Try different possible structures from uploadthing
      fotoUrl = data.foto_anggota[0].url || 
                data.foto_anggota[0].fileUrl || 
                data.foto_anggota[0] || 
                null;
      console.log('=== Foto URL Extraction ===');
      console.log('fotoUrl:', fotoUrl);
      console.log('Full first object:', JSON.stringify(data.foto_anggota[0]));
    } else {
      console.log('No foto_anggota provided or not array');
    }

    // Always create detail_anggota
    const detailPayload = {
      id_anggota: id_anggota,
      id_kabinet: id_kabinet,
      id_departemen: id_departemen,
      id_jabatan: 1, // TODO: get this from context or parameter
      foto_anggota: fotoUrl,
    };

    console.log('=== Detail payload ===', JSON.stringify(detailPayload, null, 2));

    const detailResponse = await fetch('/api/admin/anggota_detail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(detailPayload),
    });

    if (!detailResponse.ok) {
      const error = await detailResponse.json();
      console.error('Detail error:', error);
      throw new Error(error.message || 'Gagal membuat detail anggota');
    }

    const detailData = await detailResponse.json();
    console.log('Created detail_anggota:', detailData);

    // Refresh data
    await reload();
    modal.close();
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
        handleTambah={modal.openCreate}
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

      {modal.isCreate && (
        <FormModal
          open={modal.isCreate}
          onOpenChange={(v) => !v && modal.close()}
          title="Buat Anggota Baru"
          fields={anggotaCreateFields}
          schema={createAnggotaSchema}
          initialData={{}}
          submitLabel="Buat Anggota"
          onSubmit={async (data) => {
            await onCreateAnggota(data);
          }}
        />
      )}

      {modal.isEdit && !isLoadingModal && (
        <FormModal
          open={modal.isEdit}
          onOpenChange={(v) => !v && modal.close()}
          title="Edit Anggota"
          fields={anggotaEditFields}
          schema={updateAnggotaSchema.partial()}
          initialData={{
            nama_anggota: detail?.nama_anggota,
          }}
          submitLabel="Update Anggota"
          onSubmit={async (data) => {
            if (!detail?.id) return;
            const response = await fetch(`/api/admin/anggota/${detail.id}`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data),
            });
            if (!response.ok) {
              const error = await response.json();
              throw new Error(error.message || 'Gagal update anggota');
            }
            await reload();
            modal.close();
          }}
        />
      )}

      <ConfirmationModal {...confirm} />

    </>
  );
}
