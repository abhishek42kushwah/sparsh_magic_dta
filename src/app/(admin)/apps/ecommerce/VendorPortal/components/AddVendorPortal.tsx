import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Col, Row, FormControl, FormLabel } from 'react-bootstrap';
import ComponentContainerCard from '@/components/ComponentContainerCard';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL, WalletCreateValidationSchema } from '@/types/validationSchema';
import { errorToast, successToast } from '@/utils/toastMassage';

function CreateVendor() {
  const navigate = useNavigate();

  return (
    <ComponentContainerCard title="Create Vendor">
      <Formik
        initialValues={{  
          userName: '',
          userId: '',
          amount: '',
          description: '',
          source: '',
          type: '',
        }}
        validationSchema={WalletCreateValidationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            const response = await fetch(`${BASE_URL}vendor-portal`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(values),
            });

            const data = await response.json();

            if (data.success) {
              successToast(' Create vendor successfully');
              resetForm();
              navigate('/app/ecommerce/vendor-portal');
            } else {
              errorToast(data.message || 'Failed to add vendor transaction');
            }
          } catch (error: any) {
            errorToast(error?.message || 'Something went wrong');
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
                  <FormLabel htmlFor="userName" className="col-sm-2 col-form-label text-start">
                    User Name
                  </FormLabel>
                  <Col sm="10">
                    <Field
                      as={FormControl}
                      type="text"
                      id="userName"
                      name="userName"
                      placeholder="Enter User Name"
                    />
                    <ErrorMessage name="userName" component="div" className="text-danger" />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <FormLabel htmlFor="userId" className="col-sm-2 col-form-label text-start">
                    User ID
                  </FormLabel>
                  <Col sm="10">
                    <Field
                      as={FormControl}
                      type="number"
                      id="userId"
                      name="userId"
                      placeholder="Enter User ID"
                    />
                    <ErrorMessage name="userId" component="div" className="text-danger" />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <FormLabel htmlFor="amount" className="col-sm-2 col-form-label text-start">
                    Amount
                  </FormLabel>
                  <Col sm="10">
                    <Field
                      as={FormControl}
                      type="number"
                      id="amount"
                      name="amount"
                      placeholder="Enter Amount"
                    />
                    <ErrorMessage name="amount" component="div" className="text-danger" />
                  </Col>
                </Row>
              </Col>

              <Col lg="6">
                <Row className="mb-3">
                  <FormLabel htmlFor="description" className="col-sm-2 col-form-label text-start">
                    Description
                  </FormLabel>
                  <Col sm="10">
                    <Field
                      as="textarea"
                      id="description"
                      name="description"
                      placeholder="Enter Description"
                      className="form-control"
                      rows={3}
                    />
                    <ErrorMessage name="description" component="div" className="text-danger" />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <FormLabel htmlFor="source" className="col-sm-2 col-form-label text-start">
                    Source
                  </FormLabel>
                  <Col sm="10">
                    <Field as="select" id="source" name="source" className="form-select">
                      <option value="">Select Source</option>
                      <option value="REFERAL">REFERAL</option>
                      <option value="PROMOTIONAL">PROMOTIONAL</option>
                      <option value="REFUND">REFUND</option>
                      <option value="CASHBACK">CASHBACK</option>
                    </Field>
                    <ErrorMessage name="source" component="div" className="text-danger" />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <FormLabel htmlFor="type" className="col-sm-2 col-form-label text-start">
                    Type
                  </FormLabel>
                  <Col sm="10">
                    <Field as="select" id="type" name="type" className="form-select">
                      <option value="">Select Type</option>
                      <option value="CREDIT">Credit</option>
                      <option value="DEBIT">Debit</option>
                    </Field>
                    <ErrorMessage name="type" component="div" className="text-danger" />
                  </Col>
                </Row>
              </Col>
            </Row>

            <div className="d-flex align-items-start">
              <Button type="submit" variant="primary" className="me-2" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
              <Link to="/app/ecommerce/vendor-portal">
                <Button variant="danger">Cancel</Button>
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </ComponentContainerCard>
  );
}

export default CreateVendor;
