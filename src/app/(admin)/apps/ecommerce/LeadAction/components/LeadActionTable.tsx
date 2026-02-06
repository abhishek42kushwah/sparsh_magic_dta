import ReactTable from '@/components/Table';
import { useState } from 'react';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import type { leadsActionType } from '@/types/data';
import type { ColumnDef } from '@tanstack/react-table';
import { FormCheck } from 'react-bootstrap';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import DeleteConfirmationModal from '../../DeleteModal/DeleteConfirmationModal';
import { BASE_URL } from '@/types/validationSchema';

interface LeadActionTableProps {
  leadAction: leadsActionType[];
  onDelete: () => void;
}

const LeadActionTable = ({ leadAction, onDelete }: LeadActionTableProps) => {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  

  const confirmDeleteHandler = async () => {
    if (!deleteTargetId) return;

    try {
      const response = await fetch(`${BASE_URL}crm-lead-action/${deleteTargetId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        onDelete();
        setShowDeleteModal(false);
        toast.success('Deleted Successfully', { position: 'top-right' });
      } else {
        throw new Error('Failed to delete the record');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      toast.error(`Error: ${errorMessage}`, { position: 'top-right' });
    }
  };

  const openDeleteModal = (id: number) => {
    setDeleteTargetId(id);
    setShowDeleteModal(true);
  };

  const columns: ColumnDef<leadsActionType>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <FormCheck
          id="select-all"
          type="checkbox"
          onChange={(e) => {
            const checked = e.target.checked;
            table.getRowModel().rows.forEach((row) => row.toggleSelected(checked));
          }}
        />
      ),
      cell: ({ row }) => (
        <div style={{ width: 16 }}>
          <FormCheck
            id={`checkbox-${row.id}`}
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        </div>
      ),
    },
    {
      header: 'Lead ID',
      accessorKey: 'lead_id',
    },
    {
      header: 'Assign ID',
      accessorKey: 'assign_id',
    },
    {
      header: 'Action Name',
      accessorKey: 'action_name',
    },
    {
      header: 'Session Name',
      accessorKey: 'sessionName',
    },
    {
      header: 'Action Description',
      accessorKey: 'action_des',
    },
    {
      header: 'Assign Name',
      accessorKey: 'assign_name',
    },
    {
      header: 'Action Time',
      accessorKey: 'action_time',
      cell: ({ getValue }) => new Date(getValue() as string).toLocaleString(),
    },
    {
      id: 'action',
      header: () => <div className="text-end">Action</div>,
      cell: ({ row: { original } }) => (
        <div className="text-end w-100">
          <span role="button" onClick={() => navigate('/app/ecommerce/editleadaction', { state: { original } })}>
            <IconifyIcon icon="la:pen" className="text-secondary fs-18 me-2" />
          </span>
          <span role="button" onClick={() => openDeleteModal((original.id))}>
            <IconifyIcon icon="la:trash-alt" className="text-secondary fs-18" />
          </span>
        </div>
      ),
    },
  ];

  return (
    <div>
      <ReactTable<leadsActionType>
        columns={columns}
        data={leadAction}
        tableClass="mb-0"
        theadClass="table-light"
        showPagination
      />
      <DeleteConfirmationModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        handleConfirm={confirmDeleteHandler}
        bannerName='lead action'
      />
    </div>
  );
};

export default LeadActionTable;
