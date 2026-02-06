import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Col, Row, FormControl, FormLabel } from 'react-bootstrap';
import ComponentContainerCard from '@/components/ComponentContainerCard';
import { Link, useLocation } from 'react-router-dom';

// Validation schema for the form
const validationSchema = Yup.object({
  source: Yup.string().required('Source is required'),
  description: Yup.string().required('Description is required'),
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
    .required('Mobile number is required'),
});

function EditCrmLead() {
  const location = useLocation()
  const data = location.state
  return (
    <ComponentContainerCard title="Edit CRM Lead">
      <Formik
        initialValues={{
          source: data.source || "",
          description: data.description || '',
          mobile: data.mobile || '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            console.log(JSON.stringify(values, null, 2));
            setSubmitting(false);
            resetForm();
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Row>
              <Col lg="6">
                <Row className="mb-3">
                  <FormLabel htmlFor="source" className="col-sm-2 col-form-label text-start">
                    Source
                  </FormLabel>
                  <Col sm="10">
                    <Field
                      as={FormControl}
                      type="text"
                      id="source"
                      name="source"
                      placeholder="Enter source name"
                    />
                    <ErrorMessage name="source" component="div" className="text-danger" />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <FormLabel htmlFor="description" className="col-sm-2 col-form-label text-start">
                    Description
                  </FormLabel>
                  <Col sm="10">
                    <Field
                      as={FormControl}
                      type="text"
                      id="description"
                      name="description"
                      placeholder="Enter description"
                    />
                    <ErrorMessage name="description" component="div" className="text-danger" />
                  </Col>
                </Row>
              </Col>

              <Col lg="6">
                <Row className="mb-3">
                  <FormLabel htmlFor="mobile" className="col-sm-2 col-form-label text-start">
                    Mobile
                  </FormLabel>
                  <Col sm="10">
                    <Field
                      as={FormControl}
                      type="text"
                      id="mobile"
                      name="mobile"
                      placeholder="Enter mobile number"
                    />
                    <ErrorMessage name="mobile" component="div" className="text-danger" />
                  </Col>
                </Row>
              </Col>
            </Row>

            <div className="d-flex align-items-start">
              <Button type="submit" variant="primary" className="me-1" disabled={isSubmitting}>
                Submit
              </Button>
              <Link to={"/app/ecommerce/crmlead"}>      
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

export default EditCrmLead;
