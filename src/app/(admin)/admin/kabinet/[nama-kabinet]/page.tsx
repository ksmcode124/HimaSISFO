'use client';

import { ConfirmationModal } from '@/features/admin/components/ConfirmationModal';
import { HeaderSection } from '@/features/admin/components/HeaderSection';
import { AdminTable } from '@/features/admin/components/AdminTable';
import { useModal } from '@/features/admin/hooks/useModal';
import * as React from 'react';
import { useConfirm } from '@/features/admin/hooks/useConfirm';
import { Departemen } from '@/lib/types/interface';
import { departemenColumns } from '@/features/admin/components/columns/departemen-columns';
import { useDepartemen } from '@/features/admin/hooks/useDepartemen';

export default function DepartemenPage() {
  const { data, isLoading, saveData, deleteData } = useDepartemen();
  const modal = useModal();
  const confirm = useConfirm();;

  const onSaveRequest = (data: Departemen) => {
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
      <HeaderSection
      // breadcrumbs seharusnya mengikut nama kabinet
        breadcrumbs={[
          {label: "Kabinet", href: '/admin/kabinet'},
          {label: "Nama Kabinet", href:'/admin/nama-kabinet'}
        ]}
        title="Nama Kabinet"
      />

      <AdminTable
        data={data}
        columns={departemenColumns({
          onView: modal.openView,
          onEdit: modal.openEdit,
          onDelete: onDeleteRequest,
        })}
      />

      <ConfirmationModal {...confirm} />

    </>
  );
}
