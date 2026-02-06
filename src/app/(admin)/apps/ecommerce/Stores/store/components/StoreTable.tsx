import React, { useState } from 'react';
import ReactTable from '@/components/Table';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import type { StoresType } from '@/types/data';
import type { ColumnDef } from '@tanstack/react-table';
import { FormCheck } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import DeleteConfirmationModal from '../../../DeleteModal/DeleteConfirmationModal';
import { BASE_URL } from '@/types/validationSchema';
import { errorToast, successToast } from '@/utils/toastMassage';

const StoreTable = ({ store, setStore }: { store: StoresType[]; setStore: React.Dispatch<React.SetStateAction<StoresType[]>> }) => {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const openDeleteModal = (id: string) => {
    setDeleteTargetId(id);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteTargetId(null);
    setShowDeleteModal(false);
  };

  const confirmDeleteHandler = async () => {
    if (!deleteTargetId) return;

    try {
      const response = await fetch(`${BASE_URL}store/${deleteTargetId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        successToast('Store deleted successfully');
        setStore((prevStores) => prevStores.filter(store => store.id !== deleteTargetId)); 
        closeDeleteModal();
      } else {
        const errorText = await response.text();
        errorToast(errorText);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      errorToast(errorMessage);
    }
  };

  const columns: ColumnDef<StoresType>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <FormCheck
          id="select-all"
          type="checkbox"
          onChange={(e) => {
            const checked = e.target.checked;
            table.getRowModel().rows.forEach((row) => row.getToggleSelectedHandler()(checked));
          }}
        />
      ),
      cell: ({ row }) => (
        <FormCheck
          id={`checkbox-${row.id}`}
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
          style={{ width: 16 }}
        />
      ),
    },
    { header: 'Store Id', accessorKey: 'id' },
    { header: 'Store Name', accessorKey: 'name' },
    { header: 'User Id', accessorKey: 'userId' },
    {
      header: 'Created At',
      accessorKey: "createdAt",
      cell: ({ row: { original } }) => {
        const date = new Date(original?.createdAt); 
        const options = { timeZone: 'Asia/Kolkata' };
        const formattedDate = date.toLocaleDateString('en-GB', options);
        const timeFormatter = new Intl.DateTimeFormat('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
          timeZone: 'Asia/Kolkata',
        });
        const formattedTime = timeFormatter.format(date);
        return `${formattedDate} ${formattedTime}`;
      }
      
    },
    {
      header: 'Updated At',
      accessorKey: 'updatedAt',
      cell: ({ row: { original } }) => {
        const date = new Date(original?.createdAt); 
        const options = { timeZone: 'Asia/Kolkata' };
        const formattedDate = date.toLocaleDateString('en-GB', options);
        const timeFormatter = new Intl.DateTimeFormat('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
          timeZone: 'Asia/Kolkata',
        });
        const formattedTime = timeFormatter.format(date);
        return `${formattedDate} ${formattedTime}`;
      }
      
    },
    {
      id: 'action',
      header: () => <div className="text-end">Action</div>,
      cell: ({ row: { original } }) => (
        <div className="text-end w-100">
          <span role="button" onClick={() => navigate('/app/ecommerce/editstore', { state: { original } })}>
            <IconifyIcon icon="la:pen" className="text-secondary fs-18 me-2" />
          </span>
          <span role="button" onClick={() => openDeleteModal(original.id)}>
            <IconifyIcon icon="la:trash-alt" className="text-secondary fs-18" />
          </span>
        </div>
      ),
    },
  ];

  return (
    <div>
      <ReactTable<StoresType>
        columns={columns}
        data={store}
        tableClass="mb-0"
        theadClass="table-light"
        showPagination
      />

      <DeleteConfirmationModal
        show={showDeleteModal}
        onClose={closeDeleteModal}
        handleConfirm={confirmDeleteHandler}
        bannerName='Store'
      />
    </div>
  );
};

export default StoreTable;
