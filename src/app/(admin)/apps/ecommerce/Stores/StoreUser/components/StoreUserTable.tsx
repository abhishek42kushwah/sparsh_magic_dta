import React, { useState } from 'react';
import ReactTable from '@/components/Table';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import type { StoreUsersType } from '@/types/data';
import type { ColumnDef } from '@tanstack/react-table';
import { FormCheck } from 'react-bootstrap';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import DeleteConfirmationModal from '../../../DeleteModal/DeleteConfirmationModal';
import { BASE_URL } from '@/types/validationSchema';
import { errorToast, successToast } from '@/utils/toastMassage';

const StoreUserTable = ({
  storeUsers,
  setStoreUsers
}: {
  storeUsers: StoreUsersType[];
  setStoreUsers: React.Dispatch<React.SetStateAction<StoreUsersType[]>>;
}) => {
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
      const response = await fetch(`${BASE_URL}storeusers/${deleteTargetId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        successToast('User store deleted successfully');
        setStoreUsers(prev => prev.filter(user => user.id !== deleteTargetId));
        closeDeleteModal();
      } else {
        const errorText = await response.text();
        errorToast(errorText || 'Failed to delete user store');
        closeDeleteModal();
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      toast.error(`Error: ${errorMessage}`, { position: 'top-right' });
    }
  };

  
  const columns: ColumnDef<StoreUsersType>[] = [
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
        { header: 'User ID', accessorKey: 'id' },
        { header: 'User Name', accessorKey: 'name' },
        { header: 'Role', accessorKey: 'role' },
        { header: 'Store Id', accessorKey: 'storeId' },
        { header: 'Mobile', accessorKey: 'mobile' },
        {
          header: 'Password',
          accessorKey: 'password',
          cell: ({ getValue }) => {
          const [showPassword, setShowPassword] = useState(false);
          return (
            <div className="d-flex align-items-center">
            <span>{showPassword ? (getValue() as string) : (getValue() as string).replace(/./g, "*")}</span>
            <button
              type="button"
              className="btn btn-link p-0 ms-2"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <IconifyIcon icon={showPassword ? 'mdi:eye-off' : 'mdi:eye'} fontSize={18} />
            </button>
            </div>
          );
          },
        },
        {
          header: 'Time',
          accessorKey: 'time',
          cell: ({ getValue }) => new Date(getValue() as string).toLocaleString(),
        },
        {
          id: 'action',
          header: () => <div className="text-end">Action</div>,
      cell: ({ row: { original } }) => (
        <div className="text-end w-100">
          <span role="button" onClick={() =>navigate('/app/ecommerce/editstoreuser', { state: { original } })}>
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
      <ReactTable<StoreUsersType>
        columns={columns}
        data={storeUsers}
        tableClass="mb-0"
        theadClass="table-light"
        showPagination
      />

      <DeleteConfirmationModal
        show={showDeleteModal}
        onClose={closeDeleteModal}
        handleConfirm={confirmDeleteHandler}
        bannerName='Store User'
      />
    </div>
  );
};

export default StoreUserTable;
