'use client'

import z from 'zod'
import { HeaderSection } from '@/features/admin/components/HeaderSection'
import { AdminTable } from '@/features/admin/components/AdminTable'
import { FormModal } from '@/features/admin/components/FormModal'
import { DetailModal } from '@/features/admin/components/DetailModal'
import { ConfirmationModal } from '@/features/admin/components/ConfirmationModal'
import { useAdminModal } from '@/features/admin/hooks/useAdminModal'
import { useConfirm } from '@/features/admin/hooks/useConfirm'
import { departemenColumns } from '@/features/admin/components/columns/departemen-columns'
import { createDepartemenFields, updateDepartemenFields } from '@/features/admin/components/forms/departemen-form-config'
import { createDepartemenSchema, updateDepartemenSchema } from '@/schemas/departemen.schema'
import { useAdminEntity, useAdminEntityDetail } from '@/features/admin/hooks/useAdminEntity'
import { DepartemenResponse, AdminDepartemenRow, AdminDepartemenDetail } from '@/features/admin/types'
import { useParams } from 'next/navigation'
import { api } from '@/lib/services/api'

export default function DepartemenPage() {
  const params = useParams()
  const slug_kabinet = Array.isArray(params['nama-kabinet']) ? params['nama-kabinet'][0] : params['nama-kabinet']
  const id_kabinet = slug_kabinet ? Number(slug_kabinet.split('-')[0]) : -1
  const nama_kabinet = slug_kabinet ? slug_kabinet.split('-').slice(1).join(' ') : 'NAMA KABINET'

  const modal = useAdminModal()
  const confirm = useConfirm()

  // CRUD + list departemen filtered by id_kabinet
  const {
    data,
    isLoading,
    error,
    create,
    update,
    delete: remove,
  } = useAdminEntity<
    z.infer<typeof createDepartemenSchema>,
    z.infer<typeof updateDepartemenSchema>,
    AdminDepartemenRow,
    AdminDepartemenDetail,
    DepartemenResponse,
    DepartemenResponse
  >({
    entity: 'departemen',
    queryParams: {id_kabinet},
    mapToRow: (rows) => rows.map(
      (row) => ({
        id: row.id_departemen,
        nama_departemen: row.nama_departemen,
        logo_departemen: row.logo_departemen ?? '',
        anggota_count: -1,
        proker_count: row.proker?.length ?? 0,
        deskripsi_departemen: row.deskripsi_departemen,
        foto_departemen: row.foto_departemen ?? '',
        slug_kabinet: slug_kabinet ?? '1-gelora-harmoni'
    })),
    mapToDetail: (res) => ({
      id: res.id_departemen,
      nama_departemen: res.nama_departemen,
      deskripsi_departemen: res.deskripsi_departemen ?? '',
      logo_departemen: res.logo_departemen ?? '',
      foto_departemen: res.foto_departemen ?? '',
      anggota_count: -1,
      proker_count: res.proker?.length ?? 0,
    }),
    createSchema: createDepartemenSchema,
    updateSchema: updateDepartemenSchema,
  })

  // Detail modal fetch
  const { data: detail } = useAdminEntityDetail<AdminDepartemenDetail, DepartemenResponse>(
    'departemen',
    modal.id,
    (res) => ({
      id: res.id_departemen,
      nama_departemen: res.nama_departemen,
      deskripsi_departemen: res.deskripsi_departemen ?? '',
      logo_departemen: res.logo_departemen ?? '',
      foto_departemen: res.foto_departemen ?? '',
      anggota_count: -1, // FIXME: Change to anggota length or better BE gives only the count 
      proker_count: res.proker.length,
    }),
  )

  const handleDelete = (id: number) => {
    confirm.confirm('delete', async () => {
      await remove(id)
      modal.close()
    })
  }

  return (
    <>
      <HeaderSection
        breadcrumbs={[
          { label: 'Kabinet', href: '/admin/kabinet' },
          { label: nama_kabinet, href: `/admin/kabinet/${slug_kabinet}` },
        ]}
        title={nama_kabinet}
        handleAddRequest={() => modal.open('create')}
      />

      <AdminTable
        data={data}
        loading={isLoading}
        error={error}
        columns={departemenColumns({
          onView: (row) => modal.open('view', row),
          onEdit: (row) => modal.open('edit', row),
          onDelete: handleDelete,
        })}
      />

      {/* CREATE */}
      <FormModal
        open={modal.isCreate}
        onOpenChange={(v) => !v && modal.close()}
        title={`Tambah Departemen - ${nama_kabinet}`}
        fields={createDepartemenFields}
        schema={createDepartemenSchema}
        initialData={{ id_kabinet }}
        submitLabel="Buat Departemen"
        onSubmit={async (data) => {
          confirm.confirm('save', async () => {
            await create({ ...data, id_kabinet })
            modal.close()
          })
        }}
      />

      {/* EDIT */}
      <FormModal
        open={modal.isEdit}
        onOpenChange={(v) => !v && modal.close()}
        title={`Edit Departemen`}
        fields={updateDepartemenFields}
        schema={updateDepartemenSchema}
        initialData={detail ?? {}}
        submitLabel="Simpan"
        onSubmit={async (data) => {
          confirm.confirm('save', async () => {
            if (!detail?.id) return
            await update({ id: detail.id, data: { ...data } })
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
          const res = await api.get<DepartemenResponse>(`/api/admin/departemen/${id}`)
          return res.data
        }}
        mapDetailToUI={(d) => ({
          title: d.nama_departemen,
          subtitle: d.kabinet.nama_kabinet,
          logo: d.logo_departemen,
          meta: [
            { label: 'Proker', value: d.proker.length },
            { label: 'Anggota', value: d.proker.length ?? 0 }, // FIXME: Change to anggota length or better BE gives only the count
          ],
          deskripsi: d.deskripsi_departemen,
          imageUrl: d.logo_departemen ?? '',
        })}
        onEdit={(id) => modal.open('edit', id)}
        onDelete={handleDelete}
      />

      <ConfirmationModal {...confirm} loading={isLoading} />
    </>
  )
}
