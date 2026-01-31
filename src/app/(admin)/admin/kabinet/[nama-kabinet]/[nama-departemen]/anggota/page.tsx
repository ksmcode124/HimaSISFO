'use client'

import { HeaderSection } from '@/features/admin/components/HeaderSection'
import { AdminTable } from '@/features/admin/components/AdminTable'
import { FormModal } from '@/features/admin/components/FormModal'
import { DetailModal } from '@/features/admin/components/DetailModal'
import { ConfirmationModal } from '@/features/admin/components/ConfirmationModal'
import { useAdminModal } from '@/features/admin/hooks/useAdminModal'
import { useConfirm } from '@/features/admin/hooks/useConfirm'
import { anggotaColumns } from '@/features/admin/components/columns/anggota-columns'
import { anggotaCreateFields, anggotaEditFields } from '@/features/admin/components/forms/anggota-form-config'
import { createAnggotaSchema, updateAnggotaSchema } from '@/schemas/anggota.schema'
import { useParams } from 'next/navigation'
import { api } from '@/lib/services/api'
import { useAdminEntity, useAdminEntityDetail } from '@/features/admin/hooks/useAdminEntity'
import { z } from 'zod'
import { AdminAnggotaDetail, AdminAnggotaRow, AnggotaResponse, AnggotaResponse2, DetailAnggotaRes, DetailAnggotaRes2 } from '@/features/admin'

export default function AnggotaPage() {
  const params = useParams()
  const slug_kabinet = Array.isArray(params['nama-kabinet']) ? params['nama-kabinet'][0] : params['nama-kabinet']
  const id_kabinet = slug_kabinet ? Number(slug_kabinet.split('-')[0]) : -1
  const nama_kabinet = slug_kabinet ? slug_kabinet.split('-').slice(1).join(' ').toUpperCase() : 'NAMA KABINET'

  const slug_departemen = Array.isArray(params['nama-departemen']) ? params['nama-departemen'][0] : params['nama-departemen']
  const id_departemen = slug_departemen ? Number(slug_departemen.split('-')[0]) : -1
  const nama_departemen = slug_departemen ? slug_departemen.split('-').slice(1).join(' ').toUpperCase() : 'NAMA DEPARTEMEN'

  const modal = useAdminModal()
  const confirm = useConfirm()

  const {
    data,
    isLoading,
    error,
    create,
    update,
    delete: remove,
    reload
  } = useAdminEntity<
    z.infer<typeof createAnggotaSchema>,
    z.infer<typeof updateAnggotaSchema>,
    AdminAnggotaRow,
    AdminAnggotaDetail,
    AnggotaResponse,
    AnggotaResponse
  >({
    entity: 'anggota',
    mapToRow: (rows) =>
      rows
        .filter((r) => r.detailAnggota.some((d) => d.id_departemen === id_departemen && d.id_kabinet == id_kabinet) ?? false)
        .map((r) => {
          const da = r.detailAnggota.find((d) => d.id_departemen === id_departemen && d.id_kabinet == d.id_kabinet)
          return ({
            id: r.id_anggota,
            nama_anggota: r.nama_anggota,
            kabinet: nama_kabinet,
            id_jabatan: da?.id_jabatan ?? -1
          })}),
    mapToDetail: (r) => {
      const da = r.detailAnggota.find((d) => d.id_departemen === id_departemen && d.id_kabinet == d.id_kabinet)
      return ({
        id: r.id_anggota,
        nama_anggota: r.nama_anggota,
        foto_anggota: da?.foto_anggota ?? '',
        id_jabatan: da?.id_jabatan ?? -1,
        kabinet: nama_kabinet,
        departemen: nama_departemen
      })},
    createSchema: createAnggotaSchema,
    updateSchema: updateAnggotaSchema,
  })

  const { data: detail } = useAdminEntityDetail<AdminAnggotaDetail, AnggotaResponse2>(
    'anggota',
    modal.id,
    (r) => {
      const da = r.detailAnggota.find((d) => d.id_departemen === id_departemen && d.id_kabinet == d.id_kabinet)
      return ({
        id: r.id_anggota,
        nama_anggota: r.nama_anggota,
        foto_anggota: da?.foto_anggota ?? '',
        id_jabatan: da?.id_jabatan ?? -1,
        kabinet: nama_kabinet,
        departemen: nama_departemen
      })}
  )

  // Handle delete
  const handleDelete = (id: number) => {
    confirm.confirm('delete', async () => {
      await remove(id)
      modal.close()
    })
  }

  // Handle create khusus karena 2-step
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCreateAnggota = async (data: any) => {
    // 1. Fetch semua anggota
    const allAnggotaRes = await fetch('/api/admin/anggota')
    if (!allAnggotaRes.ok) throw new Error('Gagal mengambil daftar anggota')
    const allAnggota = await allAnggotaRes.json() as { id_anggota: number; nama_anggota: string }[]

    // 2. Cek nama anggota
    const existing = allAnggota.find(a => a.nama_anggota.toLowerCase() === data.nama_anggota.toLowerCase())
    let id_anggota: number
    if (existing) {
      id_anggota = existing.id_anggota
      console.log('Nama anggota sudah ada, pakai id_existing:', id_anggota)
    } else {
      // 3. Create anggota baru
      const anggotaPayload = { nama_anggota: data.nama_anggota }
      const anggotaRes = await fetch('/api/admin/anggota', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(anggotaPayload)
      })
      if (!anggotaRes.ok) throw new Error('Gagal membuat anggota')
      const anggotaData = await anggotaRes.json()
      id_anggota = anggotaData.id_anggota
      console.log('Created anggota baru dengan id:', id_anggota)
    }

    // 4. Create detail anggota
    let fotoUrl: string | undefined
    if (data.foto_anggota && Array.isArray(data.foto_anggota) && data.foto_anggota.length > 0) {
      const first = data.foto_anggota[0]
      fotoUrl = first.url || first.fileUrl || first
    }

    const detailPayload = {
      id_anggota,
      id_kabinet,
      id_departemen,
      id_jabatan: data.id_jabatan ?? 1,
      foto_anggota: fotoUrl,
    }

    const detailRes = await fetch('/api/admin/anggota_detail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(detailPayload)
    })
    if (!detailRes.ok) throw new Error('Gagal membuat detail anggota')

    await reload()
    modal.close()
  }


  return (
    <>
      <HeaderSection
        breadcrumbs={[
          { label: 'Kabinet', href: '/admin/kabinet' },
          { label: nama_kabinet, href: `/admin/kabinet/${slug_kabinet}` },
          { label: nama_departemen, href: `/admin/kabinet/${slug_kabinet}/${slug_departemen}` },
        ]}
        title={nama_departemen}
        handleAddRequest={() => modal.open('create')}
      />

      <AdminTable
        data={data}
        loading={isLoading}
        error={error}
        columns={anggotaColumns({
          onView: (row) => modal.open('view', row),
          onEdit: (row) => modal.open('edit', row),
          onDelete: handleDelete,
        })}
      />

      {/* CREATE */}
      <FormModal
        open={modal.isCreate}
        onOpenChange={(v) => !v && modal.close()}
        title="Buat Anggota Baru"
        fields={anggotaCreateFields}
        schema={createAnggotaSchema}
        initialData={{}}
        submitLabel="Buat Anggota"
        onSubmit={handleCreateAnggota}
      />

      {/* EDIT */}
      <FormModal
        open={modal.isEdit}
        onOpenChange={(v) => !v && modal.close()}
        title="Edit Anggota"
        fields={anggotaEditFields} // FIXME: change zod and form fields to match the anggota_detail and change the API update to anggota_detail instead of anggota
        schema={updateAnggotaSchema}
        initialData={detail ?? {}}
        submitLabel="Update Anggota"
        onSubmit={async (data) => {
          confirm.confirm('save', async () => {
          if (!detail?.id) return
          await update({ id: detail.id, data })
          modal.close()
          })
        }}
      />

      {/* DETAIL */}
      <DetailModal
        open={modal.isView}
        onOpenChange={(v) => !v && modal.close()}
        id={modal.id ?? undefined}
        fetchDetail={async (id) => {
          const res = await api.get<AnggotaResponse2>(`/api/admin/anggota/${id}`)
          return res.data
        }}
        mapDetailToUI={(d) => {
          const detail = d.detailAnggota.find(
            x => x.id_departemen === id_departemen
          ) ?? {};

          return {
            title: d.nama_anggota,
            subtitle: detail?.jabatan?.nama_jabatan ?? '',
            meta: [
              { label: 'Kabinet', value: detail.kabinet?.nama_kabinet ?? '' },
              { label: 'Jabatan', value: detail.jabatan?.nama_jabatan ?? '' },
            ],
            deskripsi: '',
            imageUrl: ''
          };
        }}
        onEdit={(id) => modal.open('edit', id)}
        onDelete={handleDelete}
      />

      <ConfirmationModal {...confirm} />
    </>
  )
}
