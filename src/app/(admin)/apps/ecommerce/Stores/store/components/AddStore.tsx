import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Col, Row, FormControl, FormLabel } from 'react-bootstrap';
import ComponentContainerCard from '@/components/ComponentContainerCard';
import { BASE_URL } from '@/types/validationSchema';
import { errorToast, successToast } from '@/utils/toastMassage';
import { Link,useNavigate } from 'react-router-dom';
const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    userId: Yup.string().required('User ID is required'), 
});

function AddStore() {
    const navigate = useNavigate()
    return (
        <ComponentContainerCard title="Add Store">
            <Formik
                initialValues={{
                    name: '',
                    userId: '', 
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                    try {
                        const response = await fetch(`${BASE_URL}store`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                ...values,
                                userId: [values.userId], 
                            }),
                        });

                         const data = await response.json();

                        if (response.ok && data.success) {
                            successToast("Submitted successfully");
                            resetForm();
                            navigate("/app/ecommerce/store")
                        } else {
                            errorToast(data.message);
                        }
                    } catch (error) {
                        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
                         errorToast(errorMessage);
                    }
                    setSubmitting(false);
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Row>
                            <Col lg="6">
                                <Row className="mb-3">
                                    <FormLabel htmlFor="name" className="col-sm-3 col-form-label text-start">
                                        Store Name
                                    </FormLabel>
                                    <Col sm="9">
                                        <Field
                                            as={FormControl}
                                            type="text"
                                            id="name"
                                            name="name"
                                            placeholder="Enter store name"
                                        />
                                        <ErrorMessage name="name" component="div" className="text-danger" />
                                    </Col>
                                </Row>
                            </Col>

                            <Col lg="6">
                                <Row className="mb-3">
                                    <FormLabel htmlFor="userId" className="col-sm-3 col-form-label text-start">
                                        User ID
                                    </FormLabel>
                                    <Col sm="9">
                                        <Field
                                            as={FormControl}
                                            type="text"
                                            id="userId"
                                            name="userId"
                                            placeholder="Enter user ID"
                                        />
                                        <ErrorMessage name="userId" component="div" className="text-danger" />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        <div className="d-flex align-items-start mt-3">
                            <Button type="submit" variant="primary" className="me-2" disabled={isSubmitting}>
                                {isSubmitting ? 'Submitting...' : 'Submit'}
                            </Button>
                            <Link to="/app/ecommerce/store">
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

export default AddStore;
