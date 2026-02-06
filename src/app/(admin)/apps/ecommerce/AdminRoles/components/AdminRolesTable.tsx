import ReactTable from '@/components/Table';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import type { ColumnDef } from '@tanstack/react-table';
import AdminRolesUpdateModal from './AdminRolesUpdateModal';
import { useState } from 'react';
import { useAuthContext } from '@/context/useAuthContext';
import type { AdminRolesType } from '@/types/data';

const AdminRolesTable = ({
  adminRoles,
  setAdminRoles
}: {
  adminRoles: AdminRolesType[];
  setAdminRoles: React.Dispatch<React.SetStateAction<any[]>>;
}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState<AdminRolesType | null>(null);
  const { user } = useAuthContext();
  const role = user?.role;

  const safeData = adminRoles.filter((i) => i && typeof i === 'object');

  const columns: ColumnDef<any>[] = [
    {
      header: 'Role ID',
      accessorKey: 'id',
      cell: ({ row }) => row.original?.id ?? '—'
    },

    {
      header: 'Role Name',
      accessorKey: 'name',
      cell: ({ row }) => row.original?.name ?? '—'
    },

    {
      header: 'Description',
      accessorKey: 'description',
      cell: ({ row }) => row.original?.description ?? '—'
    },

    {
      header: 'Permissions',
      cell: ({ row: { original } }) => {
        if (!original?.permissions || original.permissions.length === 0) {
          return 'No permissions';
        }

        return (
          <div className="d-flex flex-column gap-1 text-start">
            {original.permissions.map((p: any, i: number) => (
              <div key={i}>
                <strong>
                  {p.permission.resource} - {p.permission.action}
                </strong>
                <div className="text-muted small">
                  {p.permission.description}
                </div>
              </div>
            ))}
          </div>
        );
      }
    },

    {
      header: 'Users Assigned',
      accessorFn: (row) => row?._count?.users ?? 0
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
        role === 'ADMIN' ? (
          <div className="text-end w-100">
            <span
              role="button"
              onClick={() => {
                setSelectedRoles(original);
                setShowModal(true);
              }}
              title="Update Role"
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

      {showModal && selectedRoles && (
        <AdminRolesUpdateModal
          show={showModal}
          setAdminRoles={setAdminRoles}
          onClose={() => setShowModal(false)}
          role={selectedRoles}
        />
      )}
    </>
  );
};

export default AdminRolesTable;
