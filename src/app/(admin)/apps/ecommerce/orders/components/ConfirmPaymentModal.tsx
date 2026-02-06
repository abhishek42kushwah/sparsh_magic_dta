import React, { useState, useEffect } from 'react';
import { Modal, Button, Row, Col, FormLabel, Spinner, FormControl } from 'react-bootstrap';
import Select from 'react-select';
import { errorToast, successToast } from '@/utils/toastMassage';
import { BASE_URL } from '@/types/validationSchema';
import type { OrderDetailsType } from '@/types/data';

interface ItemProps {
  show: boolean;
  onClose: () => void;
  order: OrderDetailsType | null;
  setOrders: React.Dispatch<React.SetStateAction<OrderDetailsType[]>>;
}

const paidByOptions = [
  { value: 'CASHFREE', label: 'Cashfree' },
  { value: 'RAZORPAY', label: 'Razorpay' },
  { value: 'COD', label: 'Cash on Delivery' },
  { value: 'BANK', label: 'Bank Transfer' },
];

const txStatusOptions = [
  { value: 'SUCCESS', label: 'Success' },
  { value: 'FAILED', label: 'Failed' },
  { value: 'PENDING', label: 'Pending' },
];

const ConfirmPaymentModal: React.FC<ItemProps> = ({ show, onClose, order, setOrders }) => {
  const [txId, setTxId] = useState<string>('');
  const [paidBy, setPaidBy] = useState<any>(null);
  const [txStatus, setTxStatus] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    if (order) {
      setTxId(order.txId || '');
      setPaidBy(paidByOptions.find(o => o.value === order.paidBy) || null);
      setTxStatus(txStatusOptions.find(o => o.value === order.txStatus) || null);
    } else {
      setTxId('');
      setPaidBy(null);
      setTxStatus(null);
    }
  }, [order]);

  const handleConfirmPayment = async () => {
    if (!order?.orderId) return errorToast('Order ID not found');
    if (!txId) return errorToast('Please enter Transaction ID');
    if (!paidBy || !txStatus) return errorToast('Please select PaidBy & TxStatus');

    const payload = {
      orderId: order.orderId,
      txId,
      paidBy: paidBy.value,
      txStatus: txStatus.value,
    };

    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}orders/confirm-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        successToast(data.message || 'Payment confirmed!');


        setOrders(prev =>
          prev.map(o =>
            o.orderId === order.orderId
              ? { ...o, txId, paidBy: paidBy.value, txStatus: txStatus.value }
              : o
          )
        );

        onClose();
      } else {
        errorToast(data.message || 'Failed to confirm payment');
      }
    } catch (error: any) {
      errorToast(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Payment</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row className="mb-3">
          <FormLabel className="col-sm-3 col-form-label">Transaction ID</FormLabel>
          <Col sm={9}>
            <FormControl
              placeholder="Enter TXN ID"
              value={txId}
              onChange={(e) => setTxId(e.target.value)}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <FormLabel className="col-sm-3 col-form-label">Paid By</FormLabel>
          <Col sm={9}>
            <Select
              options={paidByOptions}
              value={paidBy}
              onChange={setPaidBy}
              placeholder="Select Payment Method"
              isClearable
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <FormLabel className="col-sm-3 col-form-label">Payment Status</FormLabel>
          <Col sm={9}>
            <Select
              options={txStatusOptions}
              value={txStatus}
              onChange={setTxStatus}
              placeholder="Select Payment Status"
              isClearable
            />
          </Col>
        </Row>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={handleConfirmPayment} disabled={loading}>
          {loading ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
              Processing...
            </>
          ) : 'Confirm Payment'}
        </Button>
        <Button variant="secondary" onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmPaymentModal;
