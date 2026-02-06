import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Col, Row, FormControl, FormLabel } from 'react-bootstrap';
import ComponentContainerCard from '@/components/ComponentContainerCard';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { BASE_URL } from '@/types/validationSchema';
const validationSchema = Yup.object({
  assign_name: Yup.number()
    .integer('Assign name must be an integer number')
    .required('Assign name is required'),
  action_name: Yup.string().required('Action name is required'),
  action_des: Yup.string().required('Action description is required'),
  sessionName: Yup.string().required('Session Name is required'),
  sessionId: Yup.number().required('Session ID is required'),
  lead_id: Yup.number().required('Lead ID is required'),
  assign_id: Yup.number().required('Assign ID is required'),
});

function AddLeadAction() {
  return (
    <ComponentContainerCard title="Add CRM Lead">
      <Formik
        initialValues={{
          assign_name: '',
          action_name: '',
          action_des: '',
          sessionName: '',
          sessionId: '',
          lead_id: '',
          assign_id: '',
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            const response = await fetch(`${BASE_URL}crm-lead-action/create`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(values),
            });

            const data = await response.json()
            if (response.ok && data.success) {
              toast.success("Lead action submitted successfully", { position: 'top-right' });
              resetForm();
            } else {
              toast.error(data.message, {
                position: "top-right"
              })
            }
          } catch (err: any) {
            toast.error(`Error: ${err.message}`, {
              position: "top-right"
            });
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Row>
              <Col lg="6">
                <Row className="mb-3">
                  <FormLabel htmlFor="assign_name" className="col-sm-3 col-form-label text-start">
                    Assign Name
                  </FormLabel>
                  <Col sm="9">
                    <Field
                      as={FormControl}
                      type="text"
                      id="assign_name"
                      name="assign_name"
                      placeholder="Enter assign name"
                    />
                    <ErrorMessage name="assign_name" component="div" className="text-danger" />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <FormLabel htmlFor="action_name" className="col-sm-3 col-form-label text-start">
                    Action Name
                  </FormLabel>
                  <Col sm="9">
                    <Field
                      as={FormControl}
                      type="text"
                      id="action_name"
                      name="action_name"
                      placeholder="Enter action name"
                    />
                    <ErrorMessage name="action_name" component="div" className="text-danger" />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <FormLabel htmlFor="lead_id" className="col-sm-3 col-form-label text-start">
                    Lead ID
                  </FormLabel>
                  <Col sm="9">
                    <Field
                      as={FormControl}
                      type="number"
                      id="lead_id"
                      name="lead_id"
                      placeholder="Enter lead ID"
                    />
                    <ErrorMessage name="lead_id" component="div" className="text-danger" />
                  </Col>
                </Row>
              </Col>

              <Col lg="6">
                <Row className="mb-3">
                  <FormLabel htmlFor="action_des" className="col-sm-3 col-form-label text-start">
                    Action Description
                  </FormLabel>
                  <Col sm="9">
                    <Field
                      as={FormControl}
                      type="text"
                      id="action_des"
                      name="action_des"
                      placeholder="Enter action description"
                    />
                    <ErrorMessage name="action_des" component="div" className="text-danger" />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <FormLabel htmlFor="sessionName" className="col-sm-3 col-form-label text-start">
                    Session Name
                  </FormLabel>
                  <Col sm="9">
                    <Field
                      as={FormControl}
                      type="text"
                      id="sessionName"
                      name="sessionName"
                      placeholder="Enter session name"
                    />
                    <ErrorMessage name="sessionName" component="div" className="text-danger" />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <FormLabel htmlFor="sessionId" className="col-sm-3 col-form-label text-start">
                    Session ID
                  </FormLabel>
                  <Col sm="9">
                    <Field
                      as={FormControl}
                      type="number"
                      id="sessionId"
                      name="sessionId"
                      placeholder="Enter session ID"
                    />
                    <ErrorMessage name="sessionId" component="div" className="text-danger" />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <FormLabel htmlFor="assign_id" className="col-sm-3 col-form-label text-start">
                    Assign ID
                  </FormLabel>
                  <Col sm="9">
                    <Field
                      as={FormControl}
                      type="number"
                      id="assign_id"
                      name="assign_id"
                      placeholder="Enter assign ID"
                    />
                    <ErrorMessage name="assign_id" component="div" className="text-danger" />
                  </Col>
                </Row>
              </Col>
            </Row>

            <div className="d-flex align-items-start mt-3">
              <Button type="submit" variant="primary" className="me-2" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
              <Link to="/apps/ecommerce/leadaction">
                <Button type="button" variant="danger">
                  Cancel
                </Button>
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </ComponentContainerCard>
  );
}

export default AddLeadAction;
