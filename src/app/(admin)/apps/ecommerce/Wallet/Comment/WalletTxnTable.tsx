import { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormCheck } from 'react-bootstrap';
import { BASE_URL } from '@/types/validationSchema';
import ReactTable from '@/components/Table';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import DeleteConfirmationModal from '../../DeleteModal/DeleteConfirmationModal';
import type { WalletType } from '@/types/data';
import type { ColumnDef } from '@tanstack/react-table';
import { errorToast, successToast } from '@/utils/toastMassage';

interface WalletTxnTableProps {
  wallet: WalletType[];
  setWallet: React.Dispatch<React.SetStateAction<WalletType[]>>;
}

const WalletTxnTable = ({ wallet, setWallet }: WalletTxnTableProps) => {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const handleCloseModal = useCallback(() => setShowDeleteModal(false), []);
  
  const handleDeleteConfirm = useCallback(async () => {
    if (!deleteTargetId) return;

    try {
      const response = await fetch(`${BASE_URL}wallet-Txn/${deleteTargetId}`, { method: 'DELETE' });
      const data = await response.json();
      if (response.ok && data.success) {
        setWallet((prev) => prev.filter((item) => item.userId !== deleteTargetId));
        successToast('Deleted successfully');
        handleCloseModal();
      } else {
        errorToast(data.message || 'Failed to delete the wallet transaction');
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error occurred';
      errorToast(message);
    }
  }, [deleteTargetId, setWallet, handleCloseModal]);

  const handleOpenDeleteModal = useCallback((walletId: string) => {
    setDeleteTargetId(walletId);
    setShowDeleteModal(true);
  }, []);

  const columns: ColumnDef<WalletType>[] = useMemo(() => [
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
    { header: 'User ID', accessorKey: 'userId' },
    { header: 'User Name', accessorKey: 'userName' },
    { header: 'Amount', accessorKey: 'amount' },
    { header: 'Type', accessorKey: 'type' },
    { header: 'Source', accessorKey: 'source' },
    { header: 'Description', accessorKey: 'description' },
    {
      id: 'action',
      header: () => <div className="text-end">Action</div>,
      cell: ({ row: { original } }) => (
        <div className="text-end w-100 d-flex justify-content-end gap-2">
          <span role="button" onClick={() => navigate('/app/ecommerce/editwallettxn', { state: { original } })}>
            <IconifyIcon icon="la:pen" className="text-secondary fs-18" />
          </span>
          <span role="button" onClick={() => handleOpenDeleteModal(String(original.userId))}>
            <IconifyIcon icon="la:trash-alt" className="text-secondary fs-18" />
          </span>
        </div>
      ),
    },
  ], [navigate, handleOpenDeleteModal]);

  return (
    <>
      <ReactTable<WalletType>
        columns={columns}
        data={wallet}
        tableClass="mb-0"
        theadClass="table-light"
        showPagination
      />

      <DeleteConfirmationModal
        show={showDeleteModal}
        onClose={handleCloseModal}
        handleConfirm={handleDeleteConfirm}
        bannerName='wallet transaction'
      />
    </>
  );
};

export default WalletTxnTable;
