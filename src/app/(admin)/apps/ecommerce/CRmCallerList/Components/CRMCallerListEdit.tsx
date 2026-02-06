import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Col, Row, FormControl, FormLabel, FormSelect } from 'react-bootstrap';
import ComponentContainerCard from '@/components/ComponentContainerCard';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { errorToast, successToast } from '@/utils/toastMassage';

// Validation schema for the form
const validationSchema = Yup.object({
  password: Yup.string().required('Password is required'),
  status: Yup.string().required('Status is required'),
  leadCategory: Yup.string().required('Lead Category is required'),
  ivrNumber: Yup.string().required('IVR Number is required')
});

function CrmCallerListEdit() {
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate()
  return (
    <ComponentContainerCard title="Edit CRM Caller List">
      <Formik
        initialValues={{
          name: data?.name || '',
          password: data?.password || '',
          status: data?.status || '',
          leadCategory: data?.leadCategory || '',
          ivrNumber: data?.ivrNumber || '',
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            const response = await fetch(`http://localhost:3000/crm-caller/${data.id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(values),
            });


            if (response.ok) {
              successToast('Updated successfully');
              resetForm();
              navigate('/app/ecommerce/crmcallerlist')
            } else {
              errorToast('Failed to update, please try again');
            }
          } catch (error) {
            errorToast('Something went wrong, please try again later');
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Row>
              <Col lg="6">


                <Row className="mb-3">
                  <FormLabel htmlFor="status" className="col-sm-2 col-form-label text-start">
                    Status
                  </FormLabel>
                  <Col sm="10">
                    <Field as={FormSelect} id="status" name="status">
                      <option value="">Select Status</option>
                      <option value="ACTIVE">ACTIVE</option>
                      <option value="OFF">OFF</option>
                      <option value="RESIGN">RESIGN</option>
                    </Field>
                    <ErrorMessage name="status" component="div" className="text-danger" />
                  </Col>
                </Row>


                <Row className="mb-3">
                  <FormLabel htmlFor="ivrNumber" className="col-sm-2 col-form-label text-start">
                    IVR Number
                  </FormLabel>
                  <Col sm="10">
                    <Field
                      as={FormControl}
                      type="text"
                      id="ivrNumber"
                      name="ivrNumber"
                      placeholder="Enter IVR Number"
                    />
                    <ErrorMessage name="ivrNumber" component="div" className="text-danger" />
                  </Col>
                </Row>


              </Col>

              <Col lg="6">

                <Row className="mb-3">
                  <FormLabel htmlFor="password" className="col-sm-2 col-form-label text-start">
                    Password
                  </FormLabel>
                  <Col sm="10">
                    <Field
                      as={FormControl}
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Enter Password"
                    />
                    <ErrorMessage name="password" component="div" className="text-danger" />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <FormLabel htmlFor="leadCategory" className="col-sm-2 col-form-label text-start">
                    Lead Category
                  </FormLabel>
                  <Col sm="10">
                    <Field
                      as={FormControl}
                      type="text"
                      id="leadCategory"
                      name="leadCategory"
                      placeholder="Enter Lead Category"
                    />
                    <ErrorMessage name="leadCategory" component="div" className="text-danger" />
                  </Col>
                </Row>

              </Col>
            </Row>

            <div className="d-flex align-items-start">
              <Button type="submit" variant="primary" className="me-1" disabled={isSubmitting}>
                Submit
              </Button>
              <Link to={"/app/ecommerce/crmcallerlist"}>
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

export default CrmCallerListEdit;
