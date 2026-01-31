'use client';

import { HeaderSection } from '@/features/admin/components/HeaderSection';
import { AdminTable } from '@/features/admin/components/AdminTable';
import { FormModal } from '@/features/admin/components/FormModal';
import { DetailModal } from '@/features/admin/components/DetailModal';
import { ConfirmationModal } from '@/features/admin/components/ConfirmationModal';
import { useAdminModal } from '@/features/admin/hooks/useAdminModal';
import { useConfirm } from '@/features/admin/hooks/useConfirm';
import { kegiatanColumns } from '@/features/admin/components/columns/kegiatan-columns';
// import { createEventFields, updateEventFields } from '@/features/admin/components/forms/event-form-config';
import { eventSchema, updateEventSchema } from '@/schemas/event.schema';
import { useAdminEntity, useAdminEntityDetail } from '@/features/admin/hooks/useAdminEntity';
import { AdminEventRow, AdminEventDetail, EventResponseAdmin } from '@/features/admin/types';
import { api } from '@/lib/services/api';
import z from 'zod';
import { eventFormFields } from '@/features/admin/components/forms/event-form-config';
import { useMemo } from 'react';

export default function EventPage() {
  const modal = useAdminModal();
  const confirm = useConfirm();

  // CRUD + list
  const {
    data,
    isLoading,
    error,
    create,
    update,
    delete: remove,
  } = useAdminEntity<
    z.infer<typeof eventSchema>,
    z.infer<typeof updateEventSchema>,
    AdminEventRow,
    AdminEventDetail,
    EventResponseAdmin,
    EventResponseAdmin
  >({
    entity: 'event',
    mapToRow: (res) =>
      res.map((e) => ({
        id: e.id_event,
        title: e.judul,
        description: e.deskripsi,
        end: e.tanggal_berakhir,
        start: e.tanggal_mulai
      })),
    mapToDetail: (res) => ({
      id: res.id_event,
      judul: res.judul,
      deskripsi: res.deskripsi,
      gambar_event: res.gambar_event ?? '',
      tanggal_mulai: res.tanggal_mulai,
      tanggal_berakhir: res.tanggal_berakhir
    }),
    createSchema: eventSchema,
    updateSchema: updateEventSchema,
  });

  // Detail
  const { data: detail } = useAdminEntityDetail<AdminEventDetail, EventResponseAdmin>(
    'event',
    modal.id,
    (res) => ({
      id: res.id_event,
      judul: res.judul,
      deskripsi: res.deskripsi,
      gambar_event: res.gambar_event ?? '',
      tanggal_mulai: res.tanggal_mulai,
      tanggal_berakhir: res.tanggal_berakhir
    })
  );

  const memoInitialData = useMemo(() => {
    console.log(detail)
    if (!detail) return {};
    return {
      ...detail,
      tanggal_mulai: detail.tanggal_mulai ? new Date(detail.tanggal_mulai) : undefined,
      tanggal_berakhir: detail.tanggal_berakhir ? new Date(detail.tanggal_berakhir) : undefined,
    };
  }, [detail]);

  // Delete
  const handleDelete = (id: number) => {
    confirm.confirm('delete', async () => {
      await remove(id);
      modal.close();
    });
  };

  return (
    <>
      <HeaderSection
        breadcrumbs={[{ label: 'Event', href: '/admin/event' }]}
        title="Event"
        handleAddRequest={() => modal.open('create')}
      />

      <AdminTable
        data={data}
        loading={isLoading}
        error={error}
        columns={kegiatanColumns({
          onView: () => modal.open('view'),
          onEdit: () => modal.open('edit'),
          onDelete: handleDelete,
        })}
      />

      {/* CREATE */}
      <FormModal
        open={modal.isCreate}
        onOpenChange={(v) => !v && modal.close()}
        title="Buat Event Baru"
        fields={eventFormFields}
        schema={eventSchema}
        initialData={{}}
        submitLabel="Buat Event"
        onSubmit={async (data) => {
          await create(data);
          modal.close();
        }}
      />

      {/* EDIT */}
      <FormModal
        open={modal.isEdit}
        onOpenChange={(v) => !v && modal.close()}
        title="Edit Event"
        fields={eventFormFields}
        schema={updateEventSchema}
        initialData={memoInitialData ?? {}}
        submitLabel="Update"
        onSubmit={async (data) => {
          if (!detail?.id) return;
          await update({ id: detail.id, data });
          modal.close();
        }}
      />

      {/* DETAIL */}
      <DetailModal
        open={modal.isView}
        onOpenChange={(v) => !v && modal.close()}
        id={modal.id ?? undefined}
        fetchDetail={async (id) => {
          const res = await api.get<AdminEventDetail>(`/api/admin/event/${id}`);
          return res.data;
        }}
        mapDetailToUI={(d) => ({
          title: d.judul,
          subtitle: d.tanggal_mulai,
          logo: '',
          meta: [
            // { label: 'Lokasi', value: d.lokasi },
          ],
          // deskripsi: d.deskripsi,
          imageUrl: d.gambar_event ?? '',
        })}
        onEdit={() => modal.open('edit')}
        onDelete={handleDelete}
      />

      <ConfirmationModal {...confirm} />
    </>
  );
}
