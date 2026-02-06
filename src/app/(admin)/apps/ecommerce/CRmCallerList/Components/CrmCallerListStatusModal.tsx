import React from 'react';
import { Modal, Button, Row, Col, FormControl, FormLabel } from 'react-bootstrap';
import type { CrmCallerListType } from '@/types/data';

interface LeadStatusModalProps {
  showModal: boolean;
  handleCloseModal: () => void;
  selectedLead: CrmCallerListType | null;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  handleSavePassword: () => void;
}

const LeadStatusModal: React.FC<LeadStatusModalProps> = ({
  showModal,
  handleCloseModal,
  password,
  setPassword,
  handleSavePassword
}) => {
  return (
    <Modal show={showModal} onHide={handleCloseModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Change Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="mb-2">
          <FormLabel className="col-sm-3 col-form-label">New Password</FormLabel>
          <Col sm={9}>
            <FormControl
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
            />
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSavePassword}>
          Save Changes
        </Button>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LeadStatusModal;
