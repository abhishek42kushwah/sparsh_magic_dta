import { useState, SetStateAction } from 'react';
import ReactTable from '@/components/TablePagination/index';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import type { ColumnDef } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import DeleteConfirmationModal from '../../DeleteModal/DeleteConfirmationModal';
import { BASE_URL } from '@/types/validationSchema';
import type { UserMainType } from '@/types/data';

const UsersTable = ({
  users,
  setUsers,
  currentPage,
  totalPages,
  total,
  limit,
  setCurrentPage,
  setLimit
}: {
  users: UserMainType[];
  setUsers: React.Dispatch<SetStateAction<UserMainType[]>>;
  currentPage: number;
  totalPages: number;
  total: number;
  limit: number;
  setCurrentPage: (page: number) => void;
  setLimit: (limit: number) => void;
}) => {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserMainType | null>(null);

  const confirmDeleteHandler = async () => {
    if (!selectedUser) return;

    try {
      const id = selectedUser.id;
      await fetch(`${BASE_URL}users/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      toast.success('User deleted successfully', { position: 'top-right' });
      setUsers((prev) => prev.filter((user) => user.id !== id));
      setShowDeleteModal(false);
    } catch (error) {
      toast.error('Something went wrong, please try again', { position: 'top-right' });
    }
  };

  const openDeleteModal = (user: UserMainType) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const columns: ColumnDef<UserMainType>[] = [
    {
      header: 'User ID',
      accessorKey: 'id',
      enableSorting: false,
      enableColumnFilter: false
    },
    {
      header: 'Unique ID',
      accessorKey: 'userUniqueId',
      enableSorting: false,
      enableColumnFilter: false
    },
    {
      header: 'Name',
      accessorKey: 'displayName',
      enableSorting: false,
      enableColumnFilter: false
    },
    {
      header: 'Mobile',
      accessorKey: 'mobile',
      enableSorting: false,
      enableColumnFilter: false
    },
    {
      header: 'Email',
      accessorKey: 'email',
      enableSorting: false,
      enableColumnFilter: false,
      cell: ({ row: { original } }) => original.email || '—'
    },
    {
      header: 'OTP Verified',
      accessorKey: 'otp_verify',
      enableSorting: false,
      enableColumnFilter: false,
      meta: {
        options: {
          filterOptions: [
            { label: 'YES', value: 'YES' },
            { label: 'NO', value: 'NO' }
          ]
        }
      }
    },
    {
      header: 'Created At',
      accessorKey: 'createdAt',
      enableSorting: false,
      enableColumnFilter: false,

      cell: ({ row: { original } }) => new Date(original.createdAt).toLocaleString()
    },
    {
      id: 'action',
      header: () => <div className="text-end">Action</div>,
      cell: ({ row: { original } }) => (
        <div className="text-end w-100">
          <span role="button" onClick={() => navigate('/apps/ecommerce/users/edit-user', { state: { user: original } })} className="me-3">
            <IconifyIcon icon="la:pen" className="text-secondary fs-18" />
          </span>
          <span role="button" onClick={() => openDeleteModal(original)}>
            <IconifyIcon icon="la:trash-alt" className="text-secondary fs-18" />
          </span>
        </div>
      )
    }
  ];

  return (
    <div>
      <ReactTable<UserMainType>
        columns={columns}
        data={users}
        pageSize={10}
        tableClass="mb-0"
        theadClass="table-light"
        showPagination
        limit={limit}
        setLimit={setLimit}
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        total={total}
      />
      <DeleteConfirmationModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        handleConfirm={confirmDeleteHandler}
        bannerName="User"
      />
    </div>
  );
};

export default UsersTable;
