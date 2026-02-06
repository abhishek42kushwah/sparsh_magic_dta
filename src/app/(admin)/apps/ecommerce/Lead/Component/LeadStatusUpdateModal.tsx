import React from 'react';
import { Modal, Button, FormSelect, FormLabel, Row, Col } from 'react-bootstrap';

interface LeadStatusUpdateModalProps {
  show: boolean;
  onClose: () => void;
}

const LeadStatusUpdateModal: React.FC<LeadStatusUpdateModalProps> = ({ show, onClose }) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Status</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="mb-3">
          <FormLabel className="col-sm-3 col-form-label">Status</FormLabel>
          <Col sm={9}>
            <FormSelect>
              <option value="">Select a status</option>
              <option value="status1">Status 1</option>
              <option value="status2">Status 2</option>
              <option value="status3">Status 3</option>
              <option value="status4">Status 4</option>
            </FormSelect>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onClose}>
          Update Status
        </Button>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LeadStatusUpdateModal;
