import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Col, Row, FormLabel } from 'react-bootstrap';
import ComponentContainerCard from '@/components/ComponentContainerCard';
import { Link } from 'react-router-dom';

// Validation schema for the form
const validationSchema = Yup.object({

    currentAssignedCaller: Yup.string().required('Current Assigned Caller is required'),
    newAssignedCaller: Yup.string().required('New Assigned Caller is required'),
});

function AddNewLeadAssignCaller() {
    return (
        <ComponentContainerCard title="Add Lead">
            <Formik
                initialValues={{
                    currentAssignedCaller: '',
                    newAssignedCaller: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    console.log(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                    resetForm();
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Row className="mb-3">
                            <Col sm="6">
                                <FormLabel htmlFor="currentAssignedCaller" className="col-form-label">
                                    Current Assigned Caller
                                </FormLabel>
                                <Field
                                    as="select"
                                    name="currentAssignedCaller"
                                    className="form-select"
                                    aria-label="Current Assigned Caller"
                                >
                                    <option value="">Select Caller</option>
                                    <option value="Caller 1">Caller 1</option>
                                    <option value="Caller 2">Caller 2</option>
                                </Field>
                                <ErrorMessage name="currentAssignedCaller" component="div" className="text-danger" />
                            </Col>

                            <Col sm="6">
                                <FormLabel htmlFor="newAssignedCaller" className="col-form-label">
                                    New Assigned Caller
                                </FormLabel>
                                <Field
                                    as="select"
                                    name="newAssignedCaller"
                                    className="form-select"
                                    aria-label="New Assigned Caller"
                                >
                                    <option value="">Select New Caller</option>
                                    <option value="Caller 3">Caller 3</option>
                                    <option value="Caller 4">Caller 4</option>
                                </Field>
                                <ErrorMessage name="newAssignedCaller" component="div" className="text-danger" />
                            </Col>
                        </Row>

                        <div className="d-flex align-items-start">
                            <Button type="submit" variant="primary" className="me-1" disabled={isSubmitting}>
                                Submit
                            </Button>
                            <Link to="/app/ecommerce/lead">
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

export default AddNewLeadAssignCaller;
