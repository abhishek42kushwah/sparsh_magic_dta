import React from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import { LeadType } from '@/types/data';


type ViewActionListModalProps = {
  show: boolean;
  onClose: () => void;
  selectedId: number;
  leadData: LeadType; 
};

const ViewActionListModal: React.FC<ViewActionListModalProps> = ({ show, onClose, selectedId, leadData }) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>View Actions for Lead #{selectedId}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Assigned</th>
              <th>Status</th>
              <th>Mobile</th>
              <th>source</th>

            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{leadData.id}</td>
              <td>{leadData.name}</td>
              <td>{leadData.agentName}</td>
              <td>{leadData.status}</td>
              <td>{leadData.source}</td>
              <td>{leadData.mobile}</td>

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

export default ViewActionListModal;
