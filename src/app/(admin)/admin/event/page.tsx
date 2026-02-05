"use client";

import { HeaderSection } from "@/features/admin/components/HeaderSection";
import { AdminTable } from "@/features/admin/components/AdminTable";
import { FormModal } from "@/features/admin/components/FormModal";
import { DetailModal } from "@/features/admin/components/DetailModal";
import { ConfirmationModal } from "@/features/admin/components/ConfirmationModal";
import { useAdminModal } from "@/features/admin/hooks/useAdminModal";
import { useConfirm } from "@/features/admin/hooks/useConfirm";
import { kegiatanColumns } from "@/features/admin/components/columns/kegiatan-columns";
import { eventSchema, updateEventSchema } from "@/schemas/event.schema";
import {
  useAdminEntity,
  useAdminEntityDetail,
} from "@/features/admin/hooks/useAdminEntity";
import {
  AdminEventRow,
  AdminEventDetail,
  EventResponseAdmin,
} from "@/features/admin/types";
import { api } from "@/lib/services/api";
import z from "zod";
import { eventFormFields } from "@/features/admin/components/forms/event-form-config";
import { useMemo } from "react";

export default function EventPage() {
  const modal = useAdminModal();
  const confirm = useConfirm();

  /**
   * Ambil list kabinet (untuk menentukan id_kabinet yang akan disuntikkan).
   * MapToRow biarin "identity" biar gampang ambil field aslinya.
   */
  const { data: kabinetList } = useAdminEntity<any, any, any, any>({
    entity: "kabinet",
    mapToRow: (r) => r,
  });

  /**
   * Tentukan kabinet aktif.
   * - Jika backend return `id_kabinet`, pakai itu.
   * - Jika hanya `id`, pakai `id`.
   * Silakan sesuaikan logika (misal cari yang `is_active === true`).
   */
  const activeKabinetId = useMemo(() => {
    const first = kabinetList?.[0];
    if (!first) return undefined;
    return first.id_kabinet ?? first.id; // fallback
  }, [kabinetList]);

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
    EventResponseAdmin
  >({
    entity: "event",
    mapToRow: (res) =>
      res.map((e) => ({
        id: e.id_event,
        title: e.judul,
        description: e.deskripsi,
        end: e.tanggal_berakhir,
        start: e.tanggal_mulai,
      })),
    createSchema: eventSchema,
    updateSchema: updateEventSchema,
  });

  // Detail
  const { data: detail } = useAdminEntityDetail<
    AdminEventDetail,
    EventResponseAdmin
  >("event", modal.id, (res) => ({
    id: res.id_event,
    judul: res.judul,
    deskripsi: res.deskripsi,
    gambar_event: res.gambar_event ?? "",
    tanggal_mulai: res.tanggal_mulai,
    tanggal_berakhir: res.tanggal_berakhir,
  }));

  const memoInitialData = useMemo(() => {
    if (!detail) return {};

    return {
      judul: detail.judul,
      deskripsi: detail.deskripsi,
      gambar_event: detail.gambar_event ?? "",
      tanggal_mulai: detail.tanggal_mulai
        ? new Date(detail.tanggal_mulai)
        : undefined,
      tanggal_berakhir: detail.tanggal_berakhir
        ? new Date(detail.tanggal_berakhir)
        : undefined,
    };
  }, [detail]);

  // Delete
  const handleDelete = async (id: number) => {
    const ok = await confirm.confirm("delete");
    if (!ok) return;
    await remove(id);
    modal.close();
  };

  return (
    <>
      <HeaderSection
        breadcrumbs={[{ label: "Event", href: "/admin/event" }]}
        title="Event"
        handleAddRequest={() => modal.open("create")}
      />
      <AdminTable
        data={data}
        loading={isLoading}
        error={error}
        columns={kegiatanColumns({
          onView: (row) => modal.open("view", row),
          onEdit: (row) => modal.open("edit", row),
          onDelete: handleDelete,
        })}
      />
      {/* CREATE */}
      <FormModal
        open={modal.isCreate}
        onOpenChange={(v) => !v && modal.close()}
        title="Buat Event Baru"
        fields={eventFormFields}
        schema={eventSchema.omit({ id_kabinet: true })}
        initialData={{}}
        submitLabel="Buat Event"
        onSubmit={async (data) => {
          // Pastikan id_kabinet sudah ada (kalau belum, stop biar ga fail zod)
          if (!activeKabinetId) {
            throw new Error(
              "Kabinet aktif belum tersedia. Pastikan data kabinet sudah ada.",
            );
          }

          await create({
            ...data,
            id_kabinet: activeKabinetId,
          });

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
      <DetailModal
        open={modal.isView}
        onOpenChange={(v) => !v && modal.close()}
        id={modal.id ?? undefined}
        fetchDetail={async (id) => {
          const res = await api.get<EventResponseAdmin>(
            `/api/admin/event/${id}`,
          );
          console.log(res.data);
          return res.data;
        }}
        mapDetailToUI={(d) => ({
          title: d.judul,
          subtitle: d.tanggal_mulai,
          imageUrl: d.gambar_event ?? "",
          meta: [],
          deskripsi: d.deskripsi,
        })}
        onEdit={(id) => modal.open("edit", id)}
        onDelete={handleDelete}
      />
      <ConfirmationModal
        open={confirm.open}
        variant={confirm.variant}
        handleConfirm={confirm.handleConfirm}
        handleCancel={confirm.handleCancel}
      />
      ;
    </>
  );
}
