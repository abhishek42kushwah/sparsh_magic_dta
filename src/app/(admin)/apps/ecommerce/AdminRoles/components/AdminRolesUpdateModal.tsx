import React, { useState } from 'react';
import { Modal, Button, Row, Col, FormControl, FormLabel } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { successToast, errorToast } from '@/utils/toastMassage';
import { BASE_URL } from '@/types/validationSchema';
import type { AdminRolesType } from '@/types/data';
import { useAuthContext } from '@/context/useAuthContext';

type EditRoleModalProps = {
  show: boolean;
  onClose: () => void;
  role: AdminRolesType;
  setAdminRoles: React.Dispatch<React.SetStateAction<AdminRolesType[]>>;
};

const EditAdminRolesModal: React.FC<EditRoleModalProps> = ({
  show,
  onClose,
  role,
  setAdminRoles
}) => {
  const { user: authUser } = useAuthContext();
  const Token = authUser?.token;
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().required('Role name is required'),
    description: Yup.string().required('Description is required'),
    permissionIds: Yup.array()
      .of(Yup.number().required('Permission ID required'))
      .min(1, 'Add at least one permission ID')
  });

  const handleUpdate = async (values: any) => {
    try {
      setLoading(true);

      const response = await fetch(`${BASE_URL}roles/${role.id}`, {
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

      successToast(data.message || 'Role updated successfully');

      setAdminRoles((prev) =>
        prev.map((r) => (r.id === role.id ? { ...r, ...data.result } : r))
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
        <Modal.Title>Edit Role #{role.id}</Modal.Title>
      </Modal.Header>

      <Formik
        initialValues={{
          name: role.name,
          description: (role as any).description ?? '',
          permissionIds: (role as any).permissions?.map((p: any) => p.permissionId) ?? []
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
              {/* NAME */}
              <Row className="mb-3">
                <FormLabel className="col-sm-3 col-form-label">Name *</FormLabel>
                <Col sm={9}>
                  <Field as={FormControl} name="name" placeholder="Enter role name" />
                  <ErrorMessage name="name" component="div" className="text-danger small" />
                </Col>
              </Row>

              {/* DESCRIPTION */}
              <Row className="mb-3">
                <FormLabel className="col-sm-3 col-form-label">Description *</FormLabel>
                <Col sm={9}>
                  <Field
                    as={FormControl}
                    name="description"
                    placeholder="Enter description"
                  />
                  <ErrorMessage name="description" component="div" className="text-danger small" />
                </Col>
              </Row>

              {/* PERMISSION IDS */}
              <Row className="mb-3">
                <FormLabel className="col-sm-3 col-form-label">Permissions *</FormLabel>
                <Col sm={9}>
                  {values.permissionIds.map((id: number, index: number) => (
                    <Row key={index} className="mb-2 align-items-center">
                      <Col>
                        <FormControl
                          type="number"
                          value={id}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const updated = [...values.permissionIds];
                            updated[index] = Number(e.target.value);
                            setFieldValue('permissionIds', updated);
                          }}
                          placeholder="Permission ID"
                        />
                      </Col>

                      <Col xs="auto">
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => {
                            const updated = values.permissionIds.filter((_: number, i: number) => i !== index);
                            setFieldValue('permissionIds', updated);
                          }}
                        >
                          Remove
                        </Button>
                      </Col>
                    </Row>
                  ))}

                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() =>
                      setFieldValue('permissionIds', [...values.permissionIds, 0])
                    }
                  >
                    + Add Permission ID
                  </Button>

                  <ErrorMessage
                    name="permissionIds"
                    component="div"
                    className="text-danger small"
                  />
                </Col>
              </Row>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="success" type="submit" disabled={isSubmitting || loading}>
                {loading ? 'Updating...' : 'Update Role'}
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

export default EditAdminRolesModal;
