import React from 'react';
import { Modal, Button, FormSelect, FormLabel, Row, Col } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import { LeadType } from '@/types/data';

type AssignedModalProps = {
  show: boolean;
  onClose: () => void;
  assignData: LeadType;
};

const AssignedModal: React.FC<AssignedModalProps> = ({ show, onClose, assignData }) => {
  const handleSubmit = (values: { telecallerAgent: string }) => {
    console.log('Submitting form with values:', values, 'and lead ID:', assignData.id);

    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>View Actions for Lead #{assignData.id}</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{ telecallerAgent: '' }}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <Modal.Body>
              <Row className="mb-3">
                <FormLabel className="col-sm-3 col-form-label">telecallerAgents</FormLabel>
                <Col sm={9}>
                  <Field as={FormSelect} name="telecallerAgent">
                    <option value="">Select an agent</option>
                    <option value="agent1">agent1</option>
                    <option value="agent2">agent2</option>
                    <option value="agent3">agent3</option>
                    <option value="agent4">agent4</option>
                  </Field>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
              <Button variant="secondary" onClick={onClose}>
                Close
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AssignedModal;
