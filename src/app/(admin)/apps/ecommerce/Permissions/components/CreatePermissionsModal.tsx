import React, { useState } from 'react';
import { Modal, Button, Row, Col, FormControl, FormLabel, FormSelect } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { successToast, errorToast } from '@/utils/toastMassage';
import { BASE_URL } from '@/types/validationSchema';
import type { PermissionType, PermissionResource, PermissionAction, CreatePermissionPayload } from '@/types/data';
import { useAuthContext } from '@/context/useAuthContext';

type CreatePermissionsModalProps = {
  show: boolean;
  onClose: () => void;
  setPermissions: React.Dispatch<React.SetStateAction<PermissionType[]>>;
};

const RESOURCES: PermissionResource[] = [
  'PRODUCT',
  'ORDER',
  'BRAND',
  'USER',
  'STORE',
  'COUPON',
  'BANNER',
  'DELIVERYBOY',
];

const ACTIONS: PermissionAction[] = ['READ', 'WRITE'];

const CreatePermissionsModal: React.FC<CreatePermissionsModalProps> = ({ show, onClose, setPermissions }) => {
  const { user: authUser } = useAuthContext();
  const Token = authUser?.token;
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    resource: Yup.mixed<PermissionResource>().oneOf(RESOURCES).required('Resource is required'),
    action: Yup.mixed<PermissionAction>().oneOf(ACTIONS).required('Action is required'),
    description: Yup.string().trim().required('Description is required'),
  });

  const handleCreate = async (values: CreatePermissionPayload) => {
    try {
      setLoading(true);

      const response = await fetch(`${BASE_URL}permissions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Token}`,
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        errorToast(data.message || 'Request failed');
        return;
      }

      successToast(data.message || 'Permission created');

      setPermissions((prev) => [data.result as PermissionType, ...prev]);
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
        <Modal.Title>Create New Permission</Modal.Title>
      </Modal.Header>

      <Formik<CreatePermissionPayload>
        initialValues={{
          resource: 'PRODUCT',
          action: 'READ',
          description: '',
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          await handleCreate(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Modal.Body>
              {/* RESOURCE */}
              <Row className="mb-3">
                <FormLabel className="col-sm-3 col-form-label">Resource *</FormLabel>
                <Col sm={9}>
                  <Field as={FormSelect} name="resource">
                    {RESOURCES.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="resource" component="div" className="text-danger small" />
                </Col>
              </Row>

              {/* ACTION */}
              <Row className="mb-3">
                <FormLabel className="col-sm-3 col-form-label">Action *</FormLabel>
                <Col sm={9}>
                  <Field as={FormSelect} name="action">
                    {ACTIONS.map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="action" component="div" className="text-danger small" />
                </Col>
              </Row>

              {/* DESCRIPTION */}
              <Row className="mb-3">
                <FormLabel className="col-sm-3 col-form-label">Description *</FormLabel>
                <Col sm={9}>
                  <Field as={FormControl} name="description" placeholder="Describe the permission" />
                  <ErrorMessage name="description" component="div" className="text-danger small" />
                </Col>
              </Row>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="success" type="submit" disabled={isSubmitting || loading}>
                {loading ? 'Creating...' : 'Create Permission'}
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

export default CreatePermissionsModal;
