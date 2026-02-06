import React, { useState } from 'react';
import { Modal, Button, Row, Col, FormControl, FormLabel } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { successToast, errorToast } from '@/utils/toastMassage';
import { BASE_URL } from '@/types/validationSchema';
import type { PermissionType } from '@/types/data';
import { useAuthContext } from '@/context/useAuthContext';

type EditPermissionsModalProps = {
  show: boolean;
  onClose: () => void;
  selectedPermissions: PermissionType;
  setPermissions: React.Dispatch<React.SetStateAction<PermissionType[]>>;
};

const EditPermissionsModal: React.FC<EditPermissionsModalProps> = ({
  show,
  onClose,
  selectedPermissions,
  setPermissions
}) => {
  const { user: authUser } = useAuthContext();
  const Token = authUser?.token;
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    description: Yup.string().required('Description is required')
  });

  const handleUpdate = async (values: any) => {
    try {
      setLoading(true);

      const response = await fetch(`${BASE_URL}permissions/${selectedPermissions.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Token}`
        },
        body: JSON.stringify(values)
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data?.message || 'Update failed');
      }

      successToast(data.message || 'Permission updated successfully');

      setPermissions((prev) =>
        prev.map((p) =>
          p.id === selectedPermissions.id ? { ...p, ...values } : p
        )
      );

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
        <Modal.Title>Edit Permission #{selectedPermissions.id}</Modal.Title>
      </Modal.Header>

      <Formik
        initialValues={{
          description: selectedPermissions.description
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          await handleUpdate(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Modal.Body>
              <Row className="mb-3">
                <FormLabel className="col-sm-3 col-form-label">Description *</FormLabel>
                <Col sm={9}>
                  <Field
                    as={FormControl}
                    name="description"
                    placeholder="Enter permission description"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-danger small"
                  />
                </Col>
              </Row>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="success" type="submit" disabled={isSubmitting || loading}>
                {loading ? 'Updating...' : 'Update Permission'}
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

export default EditPermissionsModal;
