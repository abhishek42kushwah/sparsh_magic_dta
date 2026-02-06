import React, { useState } from 'react';
import { Modal, Button, Row, Col, FormControl, FormLabel } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { successToast, errorToast } from '@/utils/toastMassage';
import { BASE_URL } from '@/types/validationSchema';
import type { AdminUserType } from '@/types/data';
import { useAuthContext } from '@/context/useAuthContext';

type CreateAdminModalProps = {
  show: boolean;
  onClose: () => void;
  setAdminUser: React.Dispatch<React.SetStateAction<AdminUserType[]>>;
};

const CreateAdminModal: React.FC<CreateAdminModalProps> = ({ show, onClose, setAdminUser }) => {
  const { user: authUser } = useAuthContext();
  const Token = authUser?.token;
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    mobile: Yup.string().required('Mobile is required'),
    password: Yup.string().required('Password is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    roleIds: Yup.array().of(Yup.number().required()).min(1, 'Add at least one role ID')
  });

  const handleCreate = async (values: any) => {
    try {
      setLoading(true);

      const response = await fetch(`${BASE_URL}admin/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Token}`
        },
        body: JSON.stringify(values)
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        errorToast(data.message || 'Request failed');
        return;
      }

      successToast(data.message);

      setAdminUser((prev) => [...prev, data.result]);

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
        <Modal.Title>Create New Admin User</Modal.Title>
      </Modal.Header>

      <Formik
        initialValues={{
          name: '',
          mobile: '',
          password: '',
          email: '',
          roleIds: []
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          await handleCreate(values);
          setSubmitting(false);
        }}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form>
            <Modal.Body>
              {/* NAME */}
              <Row className="mb-3">
                <FormLabel className="col-sm-3 col-form-label">Name *</FormLabel>
                <Col sm={9}>
                  <Field as={FormControl} name="name" placeholder="Enter name" />
                  <ErrorMessage name="name" component="div" className="text-danger small" />
                </Col>
              </Row>

              {/* MOBILE */}
              <Row className="mb-3">
                <FormLabel className="col-sm-3 col-form-label">Mobile *</FormLabel>
                <Col sm={9}>
                  <Field as={FormControl} name="mobile" placeholder="Enter mobile" />
                  <ErrorMessage name="mobile" component="div" className="text-danger small" />
                </Col>
              </Row>

              {/* PASSWORD */}
              <Row className="mb-3">
                <FormLabel className="col-sm-3 col-form-label">Password *</FormLabel>
                <Col sm={9}>
                  <Field as={FormControl} name="password" placeholder="Enter password" />
                  <ErrorMessage name="password" component="div" className="text-danger small" />
                </Col>
              </Row>

              {/* EMAIL */}
              <Row className="mb-3">
                <FormLabel className="col-sm-3 col-form-label">Email *</FormLabel>
                <Col sm={9}>
                  <Field as={FormControl} name="email" placeholder="Enter email" />
                  <ErrorMessage name="email" component="div" className="text-danger small" />
                </Col>
              </Row>

              {/* ROLE NUMBER ARRAY INPUTS */}
              <Row className="mb-3">
                <FormLabel className="col-sm-3 col-form-label">Role IDs *</FormLabel>
                <Col sm={9}>
                  {values.roleIds.map((id: number, index: number) => (
                    <Row key={index} className="mb-2 align-items-center">
                      <Col>
                        <FormControl
                          type="number"
                          value={id}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const updated = [...(values.roleIds as number[])];
                            updated[index] = Number(e.target.value);
                            setFieldValue('roleIds', updated);
                          }}
                          placeholder="Enter Role ID"
                        />
                      </Col>
                      <Col xs="auto">
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => {
                            const updated = values.roleIds.filter((_, i) => i !== index);
                            setFieldValue('roleIds', updated);
                          }}
                        >
                          Remove
                        </Button>
                      </Col>
                    </Row>
                  ))}

                  {/* Add new role */}
                  <Button variant="outline-primary" size="sm" onClick={() => setFieldValue('roleIds', [...values.roleIds, 0])}>
                    + Add Role ID
                  </Button>

                  <ErrorMessage name="roleIds" component="div" className="text-danger small" />
                </Col>
              </Row>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="success" type="submit" disabled={isSubmitting || loading}>
                {loading ? 'Creating...' : 'Create Admin User'}
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

export default CreateAdminModal;
