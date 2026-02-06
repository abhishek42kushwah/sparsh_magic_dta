import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Col, Row, FormControl, FormLabel } from 'react-bootstrap';
import ComponentContainerCard from '@/components/ComponentContainerCard';
import { Link } from 'react-router-dom';

// Validation schema for the form
const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  mobile: Yup.string().required('Mobile is required'),
  email: Yup.string().email('Invalid email address').optional(),
  description: Yup.string().required('Description is required'), 
  leadOrigin: Yup.string().required('Lead origin is required'), 
  source: Yup.string().required('Source is required') 
});

function AddNewLead() {
  return (
    <ComponentContainerCard title="Add Lead">
      <Formik
        initialValues={{
          name: '',
          mobile: '',
          email: '',
          description: '',
          leadOrigin: '',
          source: ''
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
                <FormLabel htmlFor="name" className="col-form-label text-start">
                  Name
                </FormLabel>
                <Field
                  as={FormControl}
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter lead name"
                />
                <ErrorMessage name="name" component="div" className="text-danger" />
              </Col>

              <Col sm="6">
                <FormLabel htmlFor="mobile" className="col-form-label text-start">
                  Mobile
                </FormLabel>
                <Field
                  as={FormControl}
                  type="text"
                  id="mobile"
                  name="mobile"
                  placeholder="Enter mobile number"
                />
                <ErrorMessage name="mobile" component="div" className="text-danger" />
              </Col>

              <Col sm="6">
                <FormLabel htmlFor="email" className="col-form-label text-start">
                  Email
                </FormLabel>
                <Field
                  as={FormControl}
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter email"
                />
                <ErrorMessage name="email" component="div" className="text-danger" />
              </Col>

              <Col sm="6">
                <FormLabel htmlFor="leadOrigin" className="col-form-label text-start">
                  Lead Origin
                </FormLabel>
                <Field
                  as="select"
                  id="leadOrigin"
                  name="leadOrigin"
                  className="form-select"
                >
                  <option value="">Select lead origin</option>
                  <option value="web">Web</option>
                  <option value="phone">Phone</option>
                  <option value="email">Email</option>
                  <option value="referral">Referral</option>
                </Field>
                <ErrorMessage name="leadOrigin" component="div" className="text-danger" />
              </Col>
            </Row>

            <Row className="mb-3">
              <Col sm="6">
                <FormLabel htmlFor="source" className="col-form-label text-start">
                  Source
                </FormLabel>
                <Field
                  as="select"
                  id="source"
                  name="source"
                  className="form-select"
                >
                  <option value="">Select source</option>
                  <option value="social_media">Social Media</option>
                  <option value="website">Website</option>
                  <option value="referral">Referral</option>
                  <option value="ad_campaign">Ad Campaign</option>
                  <option value="direct">Direct</option>
                </Field>
                <ErrorMessage name="source" component="div" className="text-danger" />
              </Col>

              <Col sm="6">
                <FormLabel htmlFor="description" className="col-form-label text-start">
                  Description
                </FormLabel>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  placeholder="Enter description"
                  rows={4}
                  className="form-control" // Ensure proper styling
                />
                <ErrorMessage name="description" component="div" className="text-danger" />
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

export default AddNewLead;
