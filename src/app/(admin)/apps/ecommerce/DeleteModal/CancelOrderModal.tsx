import React, { useState } from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';

interface CancelOrderModalProps {
  show: boolean;
  onClose: () => void; 
  handleConfirm: () => Promise<void>; 
  orderNumber: string;
}

const CancelOrderModal: React.FC<CancelOrderModalProps> = ({
  show,
  onClose,
  handleConfirm,
  orderNumber
}) => {
  const [loading, setLoading] = useState(false);

  const onConfirm = async () => {
    setLoading(true);
    try {
      await handleConfirm();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Cancel Order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{`Are you sure you want to cancel order #${orderNumber}?`}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onConfirm} disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : 'Cancel Order'}
        </Button>
        <Button variant="secondary" onClick={onClose} disabled={loading}>
          Keep Order
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CancelOrderModal;
