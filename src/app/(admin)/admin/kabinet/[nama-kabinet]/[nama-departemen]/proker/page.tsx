/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { HeaderSection } from '@/features/admin/components/HeaderSection'
import { AdminTable } from '@/features/admin/components/AdminTable'
import { FormModal } from '@/features/admin/components/FormModal'
import { DetailModal } from '@/features/admin/components/DetailModal'
import { ConfirmationModal } from '@/features/admin/components/ConfirmationModal'
import { useAdminModal } from '@/features/admin/hooks/useAdminModal'
import { useConfirm } from '@/features/admin/hooks/useConfirm'
import { prokerColumns } from '@/features/admin/components/columns/proker-columns'
import { createProkerFields, updateProkerFields } from '@/features/admin/components/forms/proker-form-config'
import { createProkerSchema, updateProkerSchema } from '@/schemas/proker.schema'
import { useAdminEntity, useAdminEntityDetail } from '@/features/admin/hooks/useAdminEntity'
import { AdminProkerRow, AdminProkerDetail } from '@/features/admin/types'
import { api } from '@/lib/services/api'
import { useParams } from 'next/navigation'

export default function ProkerPage() {
  const params = useParams()
  const slug_kabinet = Array.isArray(params['nama-kabinet']) ? params['nama-kabinet'][0] : params['nama-kabinet']
  const id_kabinet = slug_kabinet ? Number(slug_kabinet.split('-')[0]) : -1
  const nama_kabinet = slug_kabinet ? slug_kabinet.split('-').slice(1).join(' ') : 'NAMA KABINET'

  const slug_departemen = Array.isArray(params['nama-departemen']) ? params['nama-departemen'][0] : params['nama-departemen']
  const id_departemen = slug_departemen ? Number(slug_departemen.split('-')[0]) : -1
  const nama_departemen = slug_departemen ? slug_departemen.split('-').slice(1).join(' ') : 'NAMA DEPARTEMEN'

  const modal = useAdminModal()
  const confirm = useConfirm()

  // Gunakan useAdminEntity supaya CRUD lebih konsisten
  const {
    data,
    isLoading,
    error,
    create,
    update,
    delete: remove
  } = useAdminEntity<
    typeof createProkerSchema._input,
    typeof updateProkerSchema._input,
    AdminProkerRow,
    any
  >({
    entity: 'proker',
    mapToRow: (rows) =>
      rows
        .filter(r => r.id_departemen === id_departemen && r.id_kabinet === id_kabinet)
        .map(r => ({
          id: r.id_proker,
          nama_proker: r.nama_proker,
          deskripsi: r.deskripsi ?? '',
          foto_proker: r.foto_proker ?? ''
        })),
    createSchema: createProkerSchema,
    updateSchema: updateProkerSchema
  })

  const { data: detail } = useAdminEntityDetail<AdminProkerDetail, any>(
    'proker',
    modal.id,
    r => ({
      id: r.id_proker,
      id_kabinet: r.id_kabinet,
      id_departemen: r.id_departemen,
      nama_proker: r.nama_proker,
      deskripsi: r.deskripsi ?? '',
      foto_proker: r.foto_proker ?? ''
    })
  )

  const handleDelete = async (id_proker: number) => {
    const ok =  await confirm.confirm('delete')
    if (!ok) return
    await remove(id_proker)
    modal.close()
  }

  return (
    <>
      <HeaderSection
        breadcrumbs={[
          { label: 'Kabinet', href: '/admin/kabinet' },
          { label: nama_kabinet, href: `/admin/kabinet/${slug_kabinet}` },
          { label: nama_departemen, href: `/admin/kabinet/${slug_kabinet}/` },
          { label: 'Proker', href: `/admin/kabinet/${slug_kabinet}/${slug_departemen}/proker` }
        ]}
        title="Proker"
        handleAddRequest={() => modal.open('create')}
      />

      <AdminTable
        data={data}
        loading={isLoading}
        error={error}
        columns={prokerColumns({
          onView: (row) => modal.open('view', row),
          onEdit: (row) => modal.open('edit', row),
          onDelete: handleDelete
        })}
      />

      {/* CREATE */}
      <FormModal
        open={modal.isCreate}
        onOpenChange={(v) => !v && modal.close()}
        title="Buat Program Kerja"
        fields={createProkerFields}
        schema={createProkerSchema}
        initialData={{}}
        submitLabel="Buat Proker"
        onSubmit={async (data) => {
          const ok =  await confirm.confirm('save')
          if (!ok) return
          await create({ ...data, id_kabinet, id_departemen})
          modal.close()
        }}
      />

      {/* EDIT */}
      <FormModal
        open={modal.isEdit}
        onOpenChange={(v) => !v && modal.close()}
        title="Edit Proker"
        fields={updateProkerFields}
        schema={updateProkerSchema}
        initialData={detail ?? {}}
        submitLabel="Update"
        onSubmit={async (data) => {
          const ok =  await confirm.confirm('save')
          if (!ok) return
          if (!detail?.id) return
          await update({ id: detail.id, data })
          modal.close()
        }}
      />

      {/* DETAIL */}
      <DetailModal
        open={modal.isView}
        onOpenChange={(v) => !v && modal.close()}
        id={modal.id ?? undefined}
        fetchDetail={async (id) => {
          const res = await api.get<AdminProkerDetail>(`/api/admin/proker/${id}`)
          return res.data
        }}
        mapDetailToUI={(d: AdminProkerDetail) => ({
          title: d.nama_proker,
          subtitle: `Departemen ID: ${d.id_departemen}`,
          logo: '', // optional, kalau ada logo/foto proker bisa diisi
          meta: [
            { label: 'Kabinet', value: d.id_kabinet },
          ],
          deskripsi: d.deskripsi,
          imageUrl: d.foto_proker ?? '',
        })}
        onEdit={() => modal.open('edit')}
        onDelete={handleDelete}
      />


      <ConfirmationModal
        open={confirm.open}
        variant={confirm.variant}
        handleConfirm={confirm.handleConfirm}
        handleCancel={confirm.handleCancel}
      />;
    </>
  )
}
