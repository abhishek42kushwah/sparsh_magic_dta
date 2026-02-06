import { useState, useEffect,SetStateAction } from 'react';
import ReactTable from '@/components/TablePagination/index';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import type { OrderDetailsType } from '@/types/data';
import type { ColumnDef } from '@tanstack/react-table';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '@/types/validationSchema';
import Select from 'react-select';
import AssignToStoreModal from '../components/AssginToStoreModal';
import ConfirmPaymentModal from '../components/ConfirmPaymentModal';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { errorToast, successToast } from '@/utils/toastMassage';
import { formatDateTime } from '@/types/DateFilterItems';
import CancelOrderModal from '../../DeleteModal/CancelOrderModal';
const OrdersTable = ({
  orders,
  setOrders,
  currentPage,
  totalPages,
  statusArray,
  setCurrentPage,
  total,
  limit,
  setLimit
}: {
  orders: OrderDetailsType[];
  setOrders: React.Dispatch<SetStateAction<OrderDetailsType[]>>;
  currentPage: number;
  totalPages: number;
  statusArray: string[];
  setCurrentPage: (page: number) => void;
  setLimit: (limit: number) => void;
  total: number;
  limit: number;
}) => {
  const navigate = useNavigate();
  const [stores, setStores] = useState<{ id: number; name: string }[]>([]);
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderDetailsType | null>(null);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const confirmCancelOrder = async () => {
    if (!selectedOrder) return;

    try {
      setLoadingId(selectedOrder.orderId);

      const payload = {
        userId: selectedOrder.userId,
        orderId: selectedOrder.orderId
      };

      const res = await fetch(`${BASE_URL}orders/cancel`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to cancel order');

      successToast(data.message || 'Order cancelled successfully');

      setOrders((prev) => prev.map((o) => (o.orderId === selectedOrder.orderId ? { ...o, status: 'CANCELLED' } : o)));
    } catch (error: any) {
      errorToast(error?.message || 'Failed to cancel order');
    } finally {
      setLoadingId(null);
      setShowCancelModal(false);
      setSelectedOrder(null);
    }
  };

  
useEffect(() => {
  const fetchStores = async () => {
    try {
      const res = await fetch(`${BASE_URL}store`);
      const data = await res.json();
      if (res.ok && data?.result?.stores) {
        setStores(data.result.stores);
      }
    } catch (error) {
      console.error('Failed to fetch stores', error);
    }
  };

  fetchStores();
}, []);

  const handleStatusChange = async (order: OrderDetailsType, newStatus: string) => {
    try {
      setLoadingId(order.orderId);
      const payload = {
        orderId: order.orderId,
        userId: order.userId,
        status: newStatus
      };

      const res = await fetch(`${BASE_URL}orders/statusupdate`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update status');

      setOrders((prev) => prev.map((item) => (item.orderId === order.orderId ? { ...item, status: newStatus } : item)));

      successToast('Order status updated successfully');
    } catch {
      errorToast('Failed to update order status');
    } finally {
      setLoadingId(null);
    }
  };

  const columns: ColumnDef<OrderDetailsType>[] = [
    {
      header: 'Order ID',
      accessorKey: 'orderId',
      enableSorting: false,
      enableColumnFilter: false,
      cell: ({ row: { original } }) => (
        <div className="space-y-1">
          <Link to={`/apps/ecommerce/orders/orders-details/${original?.orderId}`} className="text-blue-600 hover:underline">
            #{original?.orderId}
          </Link>
          <div>{original?.createdAt ? formatDateTime(original.createdAt) : 'N/A'}</div>
          <div>Total: ₹{original?.total || 'N/A'}</div>
        </div>
      )
    },
    {
      header: 'User Info',
      accessorKey: 'userName',
      enableSorting: false,
      enableColumnFilter: false,
      cell: ({ row }) => {
        const { userName, phone, address } = row.original;
        return (
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <IconifyIcon icon="mdi:account-circle-outline" className="text-primary fs-18" />
              <span>{userName}</span>
            </div>
            <div className="flex items-center gap-2">
              <IconifyIcon icon="mdi:phone-outline" className="text-primary fs-18" />
              <span>{phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <IconifyIcon icon="mdi:map-marker-outline" className="text-primary fs-18" />
              <span className="truncate max-w-[200px]">{address}</span>
            </div>
          </div>
        );
      }
    },
    {
      header: 'Store',
      accessorKey: 'storeId',
      enableSorting: false,
      enableColumnFilter: false,
      cell: ({ row: { original } }) => {
        const storeName = stores.find((s) => s.id === Number(original.storeId))?.name || 'N/A';
        return (
          <div>
            <div>ID: {original.storeId || 'N/A'}</div>
            <div className="text-muted">Name: {storeName}</div>
          </div>
        );
      }
    },
    {
      header: 'Items',
      accessorKey: 'prescription',
      enableSorting: false,
      enableColumnFilter: false,
      cell: ({ row: { original } }) => <div>{original.prescription || 'No items'}</div>
    },
    {
      header: 'Order Status',
      accessorKey: 'status',
      enableColumnFilter: false,
      cell: ({ row: { original } }) => (
        <Select
          className="min-w-[150px]"
          value={{ value: original.status, label: original.status }}
          options={statusArray.map((item) => ({ label: item, value: item }))}
          isLoading={loadingId === original.orderId}
          onChange={(selected) => handleStatusChange(original, selected?.value || original.status)}
          menuPortalTarget={document.body}
        />
      )
    },
    {
      header: 'Payment Info',
      accessorKey: 'paymentMod',
      enableSorting: false,
      enableColumnFilter: false,
      cell: ({ row }) => {
        const { paymentMod, shipMode, paidBy } = row.original;
        return (
          <div className="space-y-1">
            {/* Payment Mode */}
            <div className="flex items-center gap-2">
              <IconifyIcon icon="mdi:credit-card-outline" className="text-primary fs-18" />
              <span> {paymentMod || 'N/A'}</span>
            </div>

            {/* Shipping Mode */}
            <div className="flex items-center gap-2">
              <IconifyIcon icon="mdi:truck-outline" className="text-secondary fs-18" />
              <span> {shipMode || 'N/A'}</span>
            </div>

            {/* Paid By */}
            <div className="flex items-center gap-2">
              <IconifyIcon icon="mdi:cash-multiple" className="text-success fs-18" />
              <span className="truncate max-w-[200px]"> {paidBy || 'N/A'}</span>
            </div>
          </div>
        );
      }
    },

    {
      id: 'action',
      header: () => <div className="text-center">Action</div>,
      cell: ({ row: { original } }) => (
        <div className="text-center">
          {/* Assign To Store */}
          <OverlayTrigger placement="top" overlay={<Tooltip id={`tooltip-store-${original.orderId}`}>Assign to Store</Tooltip>}>
            <span
              role="button"
              onClick={() => {
                setSelectedOrder(original);
                setOpenModal(true);
              }}
            >
              <IconifyIcon icon="mdi:store-outline" className="text-primary fs-18 me-1" />
            </span>
          </OverlayTrigger>

          {/* Confirm Payment */}
          <OverlayTrigger placement="top" overlay={<Tooltip id={`tooltip-payment-${original.orderId}`}>Confirm Payment</Tooltip>}>
            <span
              role="button"
              onClick={() => {
                setSelectedOrder(original);
                setOpenPaymentModal(true);
              }}
            >
              <IconifyIcon icon="mdi:credit-card-check-outline" className="text-green-600 fs-18 me-1" />
            </span>
          </OverlayTrigger>

          {['O', 'PENDING', 'P', 'IT'].includes(original.status) && (
            <OverlayTrigger placement="top" overlay={<Tooltip id={`tooltip-cancel-${original.orderId}`}>Cancel Order</Tooltip>}>
              <span
                role="button"
                onClick={() => {
                  setSelectedOrder(original);
                  setShowCancelModal(true);
                }}
              >
                <IconifyIcon icon="mdi:cancel" className="text-danger fs-18 me-1" />
              </span>
            </OverlayTrigger>
          )}

          <OverlayTrigger placement="top" overlay={<Tooltip id={`tooltip-invoice-${original.orderId}`}>Modify Order</Tooltip>}>
            <span role="button" className="d-inline-block" onClick={() => navigate(`/apps/ecommerce/orders/${original.orderId}`)}>
              <IconifyIcon icon="mdi:file-document-plus" width={24} height={24} color="#000" />
            </span>
          </OverlayTrigger>

         
          <OverlayTrigger placement="top" overlay={<Tooltip id={`tooltip-invoice-${original.orderId}`}>Invoice</Tooltip>}>
            <span role="button" onClick={() => {
              sessionStorage.setItem('invoiceOrderData', JSON.stringify(original));
              window.open('/apps/order-invoice', '_blank');
            }}>
              <IconifyIcon icon="mdi:receipt-text" width={24} height={24} color="#145DA0" />
            </span>
          </OverlayTrigger>
        </div>
      )
    }
  ];

  return (
    <>
      <ReactTable
        columns={columns}
        data={orders}
        pageSize={10}
        showPagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        limit={limit}
        setLimit={setLimit}
        total={total}
      />

      {openModal && <AssignToStoreModal show={openModal} onClose={() => setOpenModal(false)} order={selectedOrder} setOrders={setOrders} />}

      {openPaymentModal && (
        <ConfirmPaymentModal
          show={openPaymentModal}
          onClose={() => setOpenPaymentModal(false)}
          setOrders={setOrders}
          order={selectedOrder}
        />
      )}

      {selectedOrder && (
        <CancelOrderModal
          show={showCancelModal}
          onClose={() => setShowCancelModal(false)}
          handleConfirm={confirmCancelOrder}
          orderNumber={`${selectedOrder.orderId}`}
        />
      )}
    </>
  );
};

export default OrdersTable;

 