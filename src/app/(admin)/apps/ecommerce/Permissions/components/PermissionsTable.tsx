import ReactTable from '@/components/Table';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import type { ColumnDef } from '@tanstack/react-table';
import PermissionsUpdateModal from './PermissionsUpdateModal';
import { useState } from 'react';
import { useAuthContext } from '@/context/useAuthContext';
import type { PermissionType } from '@/types/data';

const PermissionsTable = ({
  permissions,
  setPermissions
}: {
  permissions: PermissionType[];
  setPermissions: React.Dispatch<React.SetStateAction<any[]>>;
}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState<PermissionType | null>(null);
  const { user } = useAuthContext();
  const role = user?.role;

  const safeData = permissions.filter((i) => i && typeof i === 'object');

  const columns: ColumnDef<any>[] = [
    {
      header: 'Permission ID',
      accessorKey: 'id',
      cell: ({ row }) => row.original?.id ?? '—'
    },

    {
      header: 'Resource',
      accessorKey: 'resource'
    },
    {
      header: 'Action',
      accessorKey: 'action',
      cell: ({ row }) => row.original?.action ?? '—'
    },
   
    {
      header: 'Description',
      accessorKey: 'description'
    },


    {
      header: 'Assigned Roles',
      accessorFn: (row) => row?._count?.roles ?? 0
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
                setSelectedPermission(original);
                setShowModal(true);
              }}
              title="Update Permission"
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

      {showModal && selectedPermission && (
        <PermissionsUpdateModal
          show={showModal}
          setPermissions={setPermissions}
          onClose={() => setShowModal(false)}
          selectedPermissions={selectedPermission}
        />
      )}
    </>
  );
};

export default PermissionsTable;
