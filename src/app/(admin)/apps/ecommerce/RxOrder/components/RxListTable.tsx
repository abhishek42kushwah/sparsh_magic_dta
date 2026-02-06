import { useState } from 'react';
import ReactTable from '@/components/Table';
import type { OrderDetailsType } from '@/types/data';
import type { ColumnDef } from '@tanstack/react-table';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { FormCheck, OverlayTrigger, Tooltip } from 'react-bootstrap';
import {useNavigate, Link } from 'react-router-dom';
import ViewAllRxOrdersDetailsModal from './RxOrderList/components/ViewAllRxOrdersDetailsModal';
// import { toast } from 'sonner';
// import { BASE_URL } from '@/types/validationSchema';
import DeliverBoyModal from "./[orderId]/components/DeliveryBoyModal"
interface RxOrdersTableProps {
  OrderDetail: OrderDetailsType[];
  // onDelete?: (id: string) => void; 
  setOrderDetail: React.Dispatch<React.SetStateAction<any[]>>;
}

const RxOrdersTable = ({ OrderDetail, 
  // onDelete,
  setOrderDetail }: RxOrdersTableProps) => {
  const [openEye, setOpenEye] = useState(false);
  const [deliveryOpenModal,setDeliveryOpenModal]= useState(false)
  const [originalData, setOriginalData] = useState<OrderDetailsType | null>(null);
 const navigate = useNavigate()

  const handleOpenEyeModal = (original: OrderDetailsType) => {
    setOriginalData(original);
    setOpenEye(true);
  };

  const handleCloseEyeModal = () => {
    setOpenEye(false);
    setDeliveryOpenModal(false)
    setOriginalData(null);
  };

  // const deleteHandle = async (original: OrderDetailsType) => {
  //   const id = original.orderId;
  //   const confirmDelete = window.confirm(`Are you sure you want to delete the order with ID ${id}?`);
  //   if (!confirmDelete) return;

  //   try {
  //     const response = await fetch(`${BASE_URL}orders/${id}`, { method: 'DELETE' });
  //     const data = await response.json();

  //     if (response.ok && data.success) {
  //       toast.success('Order deleted successfully', { position: 'top-right' });
  //       onDelete?.(id);
  //     } else {
  //       toast.error(data.message || 'Failed to delete the order', { position: 'top-right' });
  //     }
  //   } catch (error) {
  //     toast.error('Something went wrong, please try again', { position: 'top-right' });
  //     console.error(error);
  //   }
  // };

  const columns: ColumnDef<OrderDetailsType>[] = [
    {
      id: 'select',
      header: () => <FormCheck id="checkbox-all" />,
      cell: ({ row: { original } }) => (
        <div style={{ width: 16 }}>
          <FormCheck id={`checkbox-${original.orderId}`} />
        </div>
      )
    },
    {
      header: 'Order ID',
      accessorKey: 'orderId',
      cell: ({ row: { original } }) => (
        <Link to={`/apps/ecommerce/orders/rx-order-details/${original.orderId}`}>
          #{original.orderId}
        </Link>
      )
    },
    { header: 'User Name', accessorKey: 'userName' },
    { header: 'Contact', accessorKey: 'phone' },
    { header: 'Address', accessorKey: 'address' },
    {
      header: 'Items',
      accessorKey: 'prescription',
      cell: ({ row: { original } }) => <div>{original.prescription || 'No items'}</div>
    },
    { header: 'Order Status', accessorKey: 'status' },
    { header: 'Payment Mode', accessorKey: 'paymentMod' },
    { header: 'Total Amount', accessorKey: 'total' },
    {
      header: 'Action',
      cell: ({ row: { original } }) => (
        <div className="text-end d-flex align-items-center gap-2">
          {/* Edit */}
          <span
            role="button"
            onClick={() =>
              navigate('/apps/order-invoice', { state: { original } })
            }
          >
            <IconifyIcon   icon="tabler:file-invoice"  className="text-secondary fs-18 icon-hover" />
          </span>

          {/* Delete */}
          {/* <span role="button" onClick={() => deleteHandle(original)}>
            <IconifyIcon icon="la:trash-alt" className="text-secondary fs-18 icon-hover" />
          </span> */}

          {/* Delivery Boy */}
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id={`delivery-boy-tooltip-${original.orderId}`}>Delivery Boy</Tooltip>}
          >
            <span
              role="button"
              onClick={() => { setDeliveryOpenModal(true), setOriginalData(original) }}
            >
              <IconifyIcon icon="mdi:bike-fast" className="text-secondary fs-18 icon-hover" />
            </span>
          </OverlayTrigger>

          {/* View More */}
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id={`view-more-tooltip-${original.orderId}`}>View More Details</Tooltip>}
          >
            <span role="button" onClick={() => handleOpenEyeModal(original)}>
              <IconifyIcon icon="la:eye" className="text-secondary fs-18 icon-hover" />
            </span>
          </OverlayTrigger>
        </div>
      )
    }
  ];

  return (
    <div style={{ overflowX: 'auto' }}>
      <ReactTable<OrderDetailsType>
        columns={columns}
        data={OrderDetail || []}
        pageSize={10}
        tableClass="mb-0"
        theadClass="table-light"
        showPagination
      />

      {originalData && (
        <ViewAllRxOrdersDetailsModal
          originalData={originalData}
          show={openEye}
          onClose={handleCloseEyeModal}
        />
      )}

 <DeliverBoyModal  
  show={deliveryOpenModal}
   originalData={originalData}
   setOrderDetail={setOrderDetail}
   onClose={handleCloseEyeModal}
    />
    </div>
  );
};

export default RxOrdersTable;
