import ReactTable from '@/components/Table';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import type { ColumnDef } from '@tanstack/react-table';
import AdminUserUpdateModal from './AdminUserUpdateModal';
import { useState } from 'react';
import { useAuthContext } from '@/context/useAuthContext';
import type { AdminUserType } from '@/types/data';

const AdminUserTable = ({
  adminUser,
  setAdminUser
}: {
  adminUser: AdminUserType[];
  setAdminUser: React.Dispatch<React.SetStateAction<any[]>>;
}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AdminUserType | null>(null);
  const { user } = useAuthContext();
  const role = user?.role;

  
  const safeData = adminUser.filter((i) => i && typeof i === 'object');

  const columns: ColumnDef<any>[] = [
    {
      header: 'User ID',
      accessorKey: 'id',
      cell: ({ row }) => row.original?.id ?? '—'
    },

    {
      header: 'User Info',
      accessorFn: (row) => row,
      cell: ({ row: { original } }) =>
        original ? (
          <div className="text-start">
            <div className="fw-bold">{original?.name}</div>
            <div className="text-muted small">{original?.email}</div>
            <div className="small">📞 {original?.mobile}</div>
          </div>
        ) : (
          '—'
        )
    },

    {
      header: 'Active',
      accessorKey: 'isActive',
      cell: ({ getValue }) =>
        getValue() ? (
          <span className="badge bg-success">Active</span>
        ) : (
          <span className="badge bg-danger">Inactive</span>
        )
    },

    {
      header: 'Roles',
      accessorFn: (row) =>
        row?.roles
          ?.map((r: any) => `${r.name} (${r.description})`)
          .join(', ') || 'No roles'
    },

    {
      header: 'Permissions',
      cell: ({ row: { original } }) => {
        if (!original?.roles) return 'No permissions';

        const permissions =
          original.roles.flatMap((r: any) => r.permissions?.map((p: any) => p)) || [];

        if (permissions.length === 0) return 'No permissions';

        return (
          <div className="d-flex flex-column gap-1 text-start">
            {permissions.map((p: any, index: number) => (
              <div key={index}>
                <strong>
                  {p.resource} - {p.action}
                </strong>
                <div className="text-muted small">{p.description}</div>
              </div>
            ))}
          </div>
        );
      }
    },

    {
      header: 'Created',
      accessorKey: 'createdAt',
      cell: ({ getValue }) =>
        getValue() ? new Date(getValue() as string).toLocaleString() : '—'
    },

    {
      header: 'Updated',
      accessorKey: 'updatedAt',
      cell: ({ getValue }) =>
        getValue() ? new Date(getValue() as string).toLocaleString() : '—'
    },

    {
      id: 'action',
      header: () => <div className="text-end">Action</div>,
      cell: ({ row: { original } }) =>
        original && role === 'ADMIN' ? (
          <div className="text-end w-100">
            <span
              role="button"
              onClick={() => {
                setSelectedUser(original);
                setShowModal(true);
              }}
              title="Update User"
            >
              <IconifyIcon icon="la:pen" className="text-secondary fs-18 me-2" />
            </span>
          </div>
        ) : (
          '—'
        )
    }
  ];

  return (
    <>
      <ReactTable 
        columns={columns} 
        data={safeData} 
        tableClass="mb-0" 
        theadClass="table-light" 
        showPagination 
      />

      {showModal && selectedUser && (
        <AdminUserUpdateModal
          show={showModal}
          setAdminRole={setAdminUser}
          onClose={() => setShowModal(false)}
          user={selectedUser}
        />
      )}
    </>
  );
};

export default AdminUserTable;
