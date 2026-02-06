import React, { useState } from 'react';
import { Modal, Button, Row, Col, FormControl, FormLabel, FormCheck } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { successToast, errorToast } from '@/utils/toastMassage';
import { BASE_URL } from '@/types/validationSchema';
import type { AdminRolesType } from '@/types/data';
import { useAuthContext } from '@/context/useAuthContext';

type EditUserModalProps = {
  show: boolean;
  onClose: () => void;
  user: AdminRolesType;
  setAdminRole: React.Dispatch<React.SetStateAction<AdminRolesType[]>>;
};

const EditUserModal: React.FC<EditUserModalProps> = ({ show, onClose, user, setAdminRole }) => {
  const { user: authUser } = useAuthContext();
  const Token = authUser?.token;
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    isActive: Yup.boolean()
  });

  const handleUpdate = async (values: any) => {
    try {
      setLoading(true);

      const response = await fetch(`${BASE_URL}admin/users/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Token}`
        },
        body: JSON.stringify(values)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || 'Update failed');
      }

     
      setAdminRole((prev) => prev.map((u) => (u.id === user.id ? { ...u, ...values } : u)));

      successToast('User updated successfully!');
      onClose();
    } catch (error: any) {
      errorToast(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Admin User #{user.id}</Modal.Title>
      </Modal.Header>

      <Formik
        initialValues={{
          name: user.name,
          email: user.email,
          isActive: user.isActive
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          await handleUpdate(values);
          setSubmitting(false);
        }}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form>
            <Modal.Body>
              <Row className="mb-3">
                <FormLabel className="col-sm-3 col-form-label">Name *</FormLabel>
                <Col sm={9}>
                  <Field as={FormControl} name="name" placeholder="Enter name" />
                  <ErrorMessage name="name" component="div" className="text-danger small" />
                </Col>
              </Row>

              <Row className="mb-3">
                <FormLabel className="col-sm-3 col-form-label">Email *</FormLabel>
                <Col sm={9}>
                  <Field as={FormControl} name="email" placeholder="Enter email" />
                  <ErrorMessage name="email" component="div" className="text-danger small" />
                </Col>
              </Row>

              <Row>
                <FormLabel className="col-sm-3 col-form-label">Active</FormLabel>
                <Col sm={9} className="d-flex align-items-center">
                  <FormCheck type="switch" checked={values.isActive} onChange={(e) => setFieldValue('isActive', e.target.checked)} />
                </Col>
              </Row>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="success" type="submit" disabled={isSubmitting || loading}>
                {loading ? 'Updating...' : 'Update User'}
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

export default EditUserModal;
