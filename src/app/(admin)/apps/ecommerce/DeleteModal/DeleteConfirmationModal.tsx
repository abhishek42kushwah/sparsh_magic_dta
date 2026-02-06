import React, { useState } from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';

interface DeleteConfirmationModalProps {
  show: boolean;
  onClose: () => void; 
  handleConfirm: () => Promise<void>; 
  bannerName: string;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  show,
  onClose,
  handleConfirm,
  bannerName
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
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{`Are you sure you want to delete this ${bannerName} ?`}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onConfirm} disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : 'Delete'}
        </Button>
        <Button variant="secondary" onClick={onClose} disabled={loading}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmationModal;
