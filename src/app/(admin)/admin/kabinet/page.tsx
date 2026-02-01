'use client'

import z from 'zod'
import { HeaderSection } from '@/features/admin/components/HeaderSection'
import { AdminTable } from '@/features/admin/components/AdminTable'
import { FormModal } from '@/features/admin/components/FormModal'
import { DetailModal } from '@/features/admin/components/DetailModal'
import { ConfirmationModal } from '@/features/admin/components/ConfirmationModal'
import { useAdminModal } from '@/features/admin/hooks/useAdminModal'
import { useConfirm } from '@/features/admin/hooks/useConfirm'
import { kabinetColumns } from '@/features/admin/components/columns/kabinet-columns'
import { createKabinetFields, updateKabinetFields } from '@/features/admin/components/forms/kabinet-form-config'
import { createKabinetSchema, updateKabinetSchema } from '@/schemas/kabinet.schema'
import { useAdminEntity, useAdminEntityDetail } from '@/features/admin/hooks/useAdminEntity'
import { AdminKabinetRow, AdminKabinetDetail, KabinetResponseAdmin } from '@/features/admin/types'
import { api } from '@/lib/services/api'

export default function KabinetPage() {
  const modal = useAdminModal()
  const confirm = useConfirm()

  // CRUD + list
  const {
    data,
    isLoading,
    error,
    create,
    update,
    delete: remove,
  } = useAdminEntity<
    z.infer<typeof createKabinetSchema>,
    z.infer<typeof updateKabinetSchema>,
    AdminKabinetRow,
    KabinetResponseAdmin
  >({
    entity: 'kabinet',
    mapToRow: (rows) => rows.map((row) =>({
      id: row.id_kabinet,
      nama_kabinet: row.nama_kabinet,
      tahun_kerja: row.tahun_kerja ?? '-',
      logo: row.gambar_logo ?? '',
      departemen_count: row.departemen.length,
    })),
    createSchema: createKabinetSchema,
    updateSchema: updateKabinetSchema,
  })

  // Detail (fetch selalu ketika modal.isEdit or modal.isView)
  const { data: detail } = useAdminEntityDetail<
    AdminKabinetDetail,
    KabinetResponseAdmin
  >('kabinet', modal.id, (res) => ({
    id: res.id_kabinet,
    nama_kabinet: res.nama_kabinet,
    tahun_kerja: res.tahun_kerja,
    deskripsi: res.deskripsi ?? '',
    visi: res.visi ?? '',
    misi: res.misi ?? '',
    departemen_count: res.departemen.length,
    logo: res.gambar_logo ?? '',
    foto_kabinet: res.foto_kabinet ?? '',
  }))

  // Delete handler
  const handleDelete = async (id: number) => {
    const ok = await confirm.confirm('delete')
    if (!ok) return
    await remove(id)
    modal.close()
  }

  return (
    <>
      <HeaderSection
        breadcrumbs={[{ label: 'Kabinet', href: '/admin/kabinet' }]}
        title="Kabinet"
        handleAddRequest={() => modal.open('create')}
      />

      <AdminTable
        data={data}
        loading={isLoading}
        error={error}
        columns={kabinetColumns({
          onView: (row) => modal.open('view', row),
          onEdit: (row) => modal.open('edit', row),
          onDelete: (row) => handleDelete(row),
        })}
      />

      {/* CREATE */}
      <FormModal
        open={modal.isCreate}
        onOpenChange={(v) => !v && modal.close()}
        title="Buat Kabinet Baru"
        fields={createKabinetFields}
        schema={createKabinetSchema}
        initialData={{}}
        submitLabel="Buat Kabinet"
        onSubmit={async (data) => {
          const ok = await confirm.confirm('save')
          if (!ok) return
          await create(data)
          modal.close()
        }}
      />

      {/* EDIT */}
      <FormModal
        open={modal.isEdit}
        onOpenChange={(v) => !v && modal.close()}
        title="Edit Kabinet"
        fields={updateKabinetFields}
        schema={updateKabinetSchema}
        initialData={detail ?? {}}
        submitLabel="Simpan"
        onSubmit={async (data) => {
          const ok = await confirm.confirm('save')
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
          const res = await api.get<KabinetResponseAdmin>(`/api/admin/kabinet/${id}`);
          return res.data;
        }}
        mapDetailToUI={(detail) => ({
          title: detail.nama_kabinet,
          subtitle: detail.tahun_kerja,
          logo: detail.gambar_logo,
          meta: [
            { label: 'Visi', value: detail.visi },
            { label: 'Misi', value: detail.misi },
            { label: 'Departemen', value: detail.departemen.length },
          ],
          deskripsi: detail.deskripsi ?? '',
        })}
        onEdit={(id) => modal.open('edit', id)}
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
