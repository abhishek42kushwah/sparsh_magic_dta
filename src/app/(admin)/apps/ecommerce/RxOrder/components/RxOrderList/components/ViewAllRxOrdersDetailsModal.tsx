import React from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import { OrderDetailsType } from '@/types/data';

type ViewAllRxOrdersDetailsModalProps = {
  show: boolean;
  onClose: () => void;
  originalData: OrderDetailsType;
};

const ViewAllRxOrdersDetailsModal: React.FC<ViewAllRxOrdersDetailsModalProps> = ({
  show,
  onClose,
  originalData,
}) => {
  if (!originalData) return null;

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          Order Details #{originalData?.id} — Order ID: {originalData?.orderId}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Table striped bordered hover responsive>
          <tbody>
            <tr>
              <td>User ID</td>
              <td>{originalData?.userId}</td>
            </tr>
            <tr>
              <td>User Name / Contact</td>
              <td>
                <div>{originalData?.userName || 'N/A'}</div>
                <div>{originalData?.userMobile || originalData?.phone || 'N/A'}</div>
              </td>
            </tr>
            <tr>
              <td>Address</td>
              <td>{originalData?.address || 'N/A'}</td>
            </tr>
            <tr>
              <td>Store ID</td>
              <td>{originalData?.storeId}</td>
            </tr>
            <tr>
              <td>Status</td>
              <td>{originalData?.status}</td>
            </tr>
            <tr>
              <td>Prescription</td>
              <td>{originalData?.prescription || 'N/A'}</td>
            </tr>
            <tr>
              <td>Payment Mode</td>
              <td>{originalData?.paymentMod || 'N/A'}</td>
            </tr>
            <tr>
              <td>Paid By</td>
              <td>{originalData?.paidBy || 'N/A'}</td>
            </tr>
            <tr>
              <td>Is Paid</td>
              <td>{originalData?.isPaid ? 'Yes' : 'No'}</td>
            </tr>
            <tr>
              <td>Order Amount</td>
              <td>{originalData?.orderAmount}</td>
            </tr>
            <tr>
              <td>Sub Total</td>
              <td>{originalData?.subTotal}</td>
            </tr>
            <tr>
              <td>Coupon Code / Discount</td>
              <td>
                <div>{originalData?.couponCode || 'N/A'}</div>
                <div>{originalData?.coupondiscount}</div>
              </td>
            </tr>
            <tr>
              <td>Total</td>
              <td>{originalData?.total}</td>
            </tr>
            <tr>
              <td>Shipping Charge / COD Charge</td>
              <td>
                <div>{originalData?.shippingCharge}</div>
                <div>{originalData?.codCharge}</div>
              </td>
            </tr>
            <tr>
              <td>Ship Mode</td>
              <td>{originalData?.shipMode || 'N/A'}</td>
            </tr>
            <tr>
              <td>Waybill No</td>
              <td>{originalData?.waybillNo || 'N/A'}</td>
            </tr>
            <tr>
              <td>Delivery Partner</td>
              <td>{originalData?.deliveryPartner || 'N/A'}</td>
            </tr>
            <tr>
              <td>Delivered At</td>
              <td>{originalData?.deliveredAt || 'N/A'}</td>
            </tr>
            <tr>
              <td>Ship At / Pack At</td>
              <td>
                <div>{originalData?.shipAt || 'N/A'}</div>
                <div>{originalData?.packAt || 'N/A'}</div>
              </td>
            </tr>
            <tr>
              <td>Return / Cancel Dates</td>
              <td>
                <div>Return: {originalData?.returnAt || 'N/A'}</div>
                <div>Cancel: {originalData?.cancelAt || 'N/A'}</div>
              </td>
            </tr>
            <tr>
              <td>Created At</td>
              <td>
                {originalData?.createdAt
                  ? new Date(originalData.createdAt).toLocaleString()
                  : 'N/A'}
              </td>
            </tr>
            <tr>
              <td>Updated At</td>
              <td>{originalData?.updatedAt || 'N/A'}</td>
            </tr>
          </tbody>
        </Table>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewAllRxOrdersDetailsModal;
