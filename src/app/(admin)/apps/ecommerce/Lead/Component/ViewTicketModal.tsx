// ViewTicketModal.tsx
import React from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import { LeadType } from '@/types/data';

interface ViewTicketModalProps {
  show: boolean;
  onClose: () => void;
  ticketData: LeadType; 
}


const ViewTicketModal: React.FC<ViewTicketModalProps> = ({ show, onClose, ticketData }) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>View Ticket {ticketData.id}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
          <Table striped bordered hover>
            <tbody>
              <tr>
                <td><strong>Subject</strong></td>
                <td>subject</td>
              </tr>
              <tr>
                <td><strong>Priority</strong></td>
                <td>priority</td>
              </tr>
              <tr>
                <td><strong>Category</strong></td>
                <td>category</td>
              </tr>
              <tr>
                <td><strong>Description</strong></td>
                <td>description</td>
              </tr>
            </tbody>
          </Table>
        
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewTicketModal;
