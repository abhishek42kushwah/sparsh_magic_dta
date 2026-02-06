import React from 'react';
import { Modal, Button, Row, Col, FormLabel, FormSelect } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import type { CrmleadType } from '@/types/data';
import { errorToast, successToast } from '@/utils/toastMassage';
import { BASE_URL } from '@/types/validationSchema';

interface LeadStatusModalProps {
  showModal: boolean;
  handleCloseModal: () => void;
  selectedLead: CrmleadType | null;
  OnSuccess:any
}

const validationSchema = Yup.object({
  status: Yup.string().required('Status is required'),
});

const LeadStatusModal: React.FC<LeadStatusModalProps> = ({
  showModal,
  handleCloseModal,
  selectedLead,
  OnSuccess,
}) => {
  const handleSaveStatus = async (values: { status: string }) => {
    try {
      const response = await fetch(`${BASE_URL}crm-lead/statusupdate`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: selectedLead?.id,
          status: values.status,
        }),
      });

      if (!response.ok) {
        errorToast('Failed to update lead status')
      }
      handleCloseModal();
      OnSuccess()
      successToast("updated status successfully")
    } catch (error) {
      errorToast('Failed to update lead status')
    }
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal} centered>
      <Formik
        initialValues={{
          status: selectedLead?.status || 'New',
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handleSaveStatus(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Modal.Header closeButton>
              <Modal.Title>Lead Status</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row className="mb-2">
                <FormLabel className="col-sm-3 col-form-label">Lead Status</FormLabel>
                <Col sm={9}>
                  <Field as={FormSelect} name="status">
                    <option value="New">New</option>
                    <option value="PENDING">PENDING</option>
                    <option value="SUCCESS">SUCCESS</option>
                    <option value="DEAD">DEAD</option>
                    <option value="FOLLOWUP">FOLLOWUP</option>
                  </Field>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button type="submit" variant="primary" disabled={isSubmitting}>
                Save Changes
              </Button>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default LeadStatusModal;
