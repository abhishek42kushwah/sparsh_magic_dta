import { useState, useCallback, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '@/types/validationSchema';
import ReactTable from '@/components/Table';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import DeleteConfirmationModal from '../../DeleteModal/DeleteConfirmationModal';
import type { VendorPortalType } from '@/types/data';
import type { ColumnDef } from '@tanstack/react-table';
import { errorToast, successToast } from '@/utils/toastMassage';

interface VendorPortalProps {
  vendor: VendorPortalType[];
  setVendor: React.Dispatch<React.SetStateAction<VendorPortalType[]>>;
}

const VendorProtalTable = ({ vendor, setVendor }: VendorPortalProps) => {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const handleCloseModal = useCallback(() => setShowDeleteModal(false), []);
  const handleDeleteConfirm = useCallback(async () => {
    if (!deleteTargetId) return;

    try {
      const response = await fetch(`${BASE_URL}vendor-portal/${deleteTargetId}`, { method: 'DELETE' });
      const data = await response.json();
      if (response.ok && data.success) {
        setVendor((prev: any) => prev.filter((item: any) => item.userId !== deleteTargetId));
        successToast('Deleted successfully');
        handleCloseModal();
      } else {
        errorToast(data.message || 'Failed to delete the vendor ');
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error occurred';
      errorToast(message);
    }
  }, [deleteTargetId, setVendor, handleCloseModal]);

  const handleOpenDeleteModal = useCallback((VendorId: string) => {
    setDeleteTargetId(VendorId);
    setShowDeleteModal(true);
  }, []);

  const columns: ColumnDef<VendorPortalType>[] = useMemo(() => [

    {
      header: 'Vendor ID',
      cell: ({ row: { original } }) => (
        <Link to={`/apps/ecommerce/vendor/${original?.orderId}`}>
          #{original?.orderId}
        </Link>
      ),
    },
    { header: 'ID', accessorKey: 'id' },
    { header: 'Order ID', accessorKey: 'orderId' },
    { header: 'Store ID', accessorKey: 'storeId' },
    { header: 'User ID', accessorKey: 'userId' },
    { header: 'Status', accessorKey: 'status' },
    { header: 'Create AT', accessorKey: 'createdAt' },

    {
      id: 'action',
      header: () => <div className="text-end">Action</div>,
      cell: ({ row: { original } }) => (
        <div className="text-end w-100 d-flex justify-content-end gap-2">
          <span role="button" onClick={() => navigate('/app/ecommerce/update-vendor-portal', { state: { original } })}>
            <IconifyIcon icon="la:pen" className="text-secondary fs-18" />
          </span>
          <span role="button" onClick={() => handleOpenDeleteModal(String(original.orderId))}>
            <IconifyIcon icon="la:trash-alt" className="text-secondary fs-18" />
          </span>
        </div>
      ),
    },
  ], [navigate, handleOpenDeleteModal]);

  return (
    <>
      <ReactTable<VendorPortalType>
        columns={columns}
        data={vendor}
        tableClass="mb-0"
        theadClass="table-light"
        showPagination
      />

      <DeleteConfirmationModal
        show={showDeleteModal}
        onClose={handleCloseModal}
        handleConfirm={handleDeleteConfirm}
        bannerName='Vendor'
      />
    </>
  );
};

export default VendorProtalTable;
