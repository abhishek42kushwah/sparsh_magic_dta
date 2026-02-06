import { useState } from 'react';
import ReactTable from '@/components/Table';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import type { ReferalCode } from '@/types/data';
import type { ColumnDef } from '@tanstack/react-table';
import { FormCheck } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import DeleteConfirmationModal from '../../DeleteModal/DeleteConfirmationModal';
import { BASE_URL } from '@/types/validationSchema';
import { errorToast, successToast } from '@/utils/toastMassage';

interface ReferralCodeTableProps {
  referal: ReferalCode[];
  setReferrals: React.Dispatch<React.SetStateAction<ReferalCode[]>>;
}

const ReferralCodeTable = ({ referal, setReferrals }: ReferralCodeTableProps) => {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const openDeleteModal = (id: string) => {
    setDeleteTargetId(id);
    setShowDeleteModal(true);
  };

  const confirmDeleteHandler = async () => {
    if (!deleteTargetId) return;

    try {
      const response = await fetch(`${BASE_URL}referalcode/${deleteTargetId}`, {
        method: 'DELETE'
      });
       const data = await response.json();
      if (response.ok && data.success) {
        successToast('Referral deleted successfully');
        setReferrals((prev) => prev.filter((item) => item.id !== deleteTargetId));
      } else {
        errorToast(data.message || 'Failed to delete');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      errorToast(errorMessage);
    } finally {
      setShowDeleteModal(false);
      setDeleteTargetId(null);
    }
  };

  const columns: ColumnDef<ReferalCode>[] = [
    {
      id: 'select',
      header: () => <FormCheck id="select-all" />,
      cell: ({ row }) => (
        <FormCheck
          id={`checkbox-${row.id}`}
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
          style={{ width: 16 }}
        />
      )
    },
    { header: 'Referral Code', accessorKey: 'referalCode' },
    { header: 'Amount', accessorKey: 'amount' },
    {
      header: 'Active',
      accessorKey: 'active',
      cell: ({ getValue }) => (getValue() === 1 ? 'true' : 'false')
    },
    {
      id: 'action',
      header: () => <div className="text-end">Action</div>,
      cell: ({ row: { original } }) => (
        <div className="text-end w-100 d-flex justify-content-end gap-2">
          <span
            role="button"
            aria-label="Edit Referral Code"
            onClick={() => navigate(`/app/ecommerce/editReferalCode`, { state: { original } })}
          >
            <IconifyIcon icon="la:pen" className="text-secondary fs-18" />
          </span>
          <span
            role="button"
            aria-label="Delete Referral Code"
            onClick={() => openDeleteModal(original.id)}
          >
            <IconifyIcon icon="la:trash-alt" className="text-secondary fs-18" />
          </span>
        </div>
      )
    }
  ];

  return (
    <>
      <ReactTable<ReferalCode>
        columns={columns}
        data={referal}
        pageSize={10}
        tableClass="mb-0"
        theadClass="table-light"
        showPagination
      />

      <DeleteConfirmationModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        handleConfirm={confirmDeleteHandler}
        bannerName="Referral Code"
      />
    </>
  );
};

export default ReferralCodeTable;
