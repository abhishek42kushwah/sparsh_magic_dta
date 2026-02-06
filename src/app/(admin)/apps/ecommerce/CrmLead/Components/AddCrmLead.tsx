import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Col, Row, FormControl, FormLabel } from 'react-bootstrap';
import ComponentContainerCard from '@/components/ComponentContainerCard';
import { Link, useNavigate } from 'react-router-dom';
import { errorToast, successToast } from '@/utils/toastMassage';
import { BASE_URL } from '@/types/validationSchema';

const validationSchema = Yup.object({
  source: Yup.string().required('Source is required'),
  description: Yup.string().required('Description is required'),
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
    .required('Mobile number is required'),
});

function AddCrmLead() {
  const navigate = useNavigate()
  return (
    <ComponentContainerCard title="Add CRM Lead">
      <Formik
        initialValues={{
          source: '',
          description: '',
          mobile: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          fetch(`${BASE_URL}crm-lead`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          })
            .then(async (response) => {
              if (response.ok) {
                resetForm();
                successToast('Added Successfully')
                navigate('/app/ecommerce/crmlead');
              } else {
                errorToast('Something went wrong, please try again later')
              }
            })
            .catch((error:any) => {
              errorToast(error.message || 'Something went wrong')
            })
            .finally(() => {
              setSubmitting(false);
            });
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
                Submit  {isSubmitting && (
                  <span className="spinner-border spinner-border-sm ms-2" role="status" aria-hidden="true"></span>
                )}
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

export default AddCrmLead;
