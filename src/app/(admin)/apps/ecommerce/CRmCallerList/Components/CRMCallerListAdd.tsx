import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Col, Row, FormControl, FormLabel, FormSelect } from 'react-bootstrap';
import ComponentContainerCard from '@/components/ComponentContainerCard';
import { Link, useNavigate } from 'react-router-dom';
import { errorToast, successToast } from '@/utils/toastMassage';
import { BASE_URL } from '@/types/validationSchema';

// Validation schema for the form
const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  role: Yup.string().required('role is required'),
  loginId: Yup.string().required('LoginId is required'),
  password: Yup.string().required('Password is required'),
  status: Yup.string().required('Status is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  leadCategory: Yup.string().required('Lead Category is required'),
  ivrNumber: Yup.string().required('IVR Number is required')
});

function CrmCallerListAdd() {
  const navigate = useNavigate()
  return (
    <ComponentContainerCard title="Create CRM Caller List">
      <Formik
        initialValues={{
          name: '',
          role: '',
          loginId: '',
          password: '',
          status: '',
          email: '',
          leadCategory: '',
          ivrNumber: '',


        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          fetch(`${BASE_URL}crm-caller`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          })
            .then(async (response) => {
              const data = await response.json();
              if (response.ok && data.success) {
                resetForm();
                successToast('Added Successfully');
                navigate('/app/ecommerce/crmcallerlist');
              } else {
                errorToast('data.message');
              }
            })
            .catch((error:any) => {
              errorToast(error.message);
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
                  <FormLabel htmlFor="name" className="col-sm-2 col-form-label text-start">
                    Name
                  </FormLabel>
                  <Col sm="10">
                    <Field
                      as={FormControl}
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter Name"
                    />
                    <ErrorMessage name="name" component="div" className="text-danger" />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <FormLabel htmlFor="role" className="col-sm-2 col-form-label text-start">
                    Role
                  </FormLabel>
                  <Col sm="10">
                    <Field as={FormSelect} id="role" name="role">
                      <option value="">Select Type</option>
                      <option value="MANAGER">Manager</option>
                      <option value="CALLER">Caller</option>
                    </Field>
                    <ErrorMessage name="role" component="div" className="text-danger" />
                  </Col>
                </Row>

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
                  <FormLabel htmlFor="email" className="col-sm-2 col-form-label text-start">
                    Email
                  </FormLabel>
                  <Col sm="10">
                    <Field
                      as={FormControl}
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter Email"
                    />
                    <ErrorMessage name="email" component="div" className="text-danger" />
                  </Col>
                </Row>

              </Col>

              <Col lg="6">
                <Row className="mb-3">
                  <FormLabel htmlFor="loginId" className="col-sm-2 col-form-label text-start">
                    LogIn Id
                  </FormLabel>
                  <Col sm="10">
                    <Field
                      as={FormControl}
                      type="text"
                      id="loginId"
                      name="loginId"
                      placeholder="Enter Login Id"
                      autoComplete="off"
                    />
                    <ErrorMessage name="loginId" component="div" className="text-danger" />
                  </Col>
                </Row>

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
                      autoComplete="new-password"
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

export default CrmCallerListAdd;
