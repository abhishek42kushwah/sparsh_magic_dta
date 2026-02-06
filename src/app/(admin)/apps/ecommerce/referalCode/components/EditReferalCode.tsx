import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Col, Row, FormControl, FormLabel } from 'react-bootstrap';
import ComponentContainerCard from '@/components/ComponentContainerCard';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { EditReferalCodeValidationSchema, BASE_URL } from '@/types/validationSchema';
import { errorToast, successToast } from '@/utils/toastMassage';

function EditReferalCode() {
  const location = useLocation();
  const { original } = location?.state;
  const navigate = useNavigate();
  return (
    <ComponentContainerCard title="Edit Referal Code">
      <Formik
        initialValues={{
          referalCode: original?.referalCode || '',
          amount: original?.amount || '',
          active: original?.active || 0
        }}
        validationSchema={EditReferalCodeValidationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          const id = original?.id;

          fetch(`${BASE_URL}referalcode/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
          })
            .then(async (response) => {
              const data = await response.json();

              if (response.ok && data?.success) {
                successToast(data?.message || 'Referral code updated successfully');
                resetForm();
                navigate(-1);
              } else {
                errorToast(data?.message || 'Failed to update referral code');
              }
            })
            .catch((error: any) => {
              errorToast(error.message || 'Failed to update referral code');
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
                  <FormLabel htmlFor="referalCode" className="col-sm-2 col-form-label text-start">
                    Referal Code
                  </FormLabel>
                  <Col sm="10">
                    <Field as={FormControl} type="text" id="referalCode" name="referalCode" placeholder="Enter referal code" />
                    <ErrorMessage name="referalCode" component="div" className="text-danger" />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <FormLabel htmlFor="amount" className="col-sm-2 col-form-label text-start">
                    Amount
                  </FormLabel>
                  <Col sm="10">
                    <Field as={FormControl} type="number" id="amount" name="amount" placeholder="Enter amount" />
                    <ErrorMessage name="amount" component="div" className="text-danger" />
                  </Col>
                </Row>
              </Col>

              <Col lg="6">
                <Row className="mb-3">
                  <FormLabel htmlFor="active" className="col-sm-2 col-form-label text-start">
                    Active
                  </FormLabel>
                  <Col sm="10">
                    <Field as="select" id="active" name="active" className="form-select">
                      <option value="">Select status</option>
                      <option value="1">True</option>
                      <option value="0">False</option>
                    </Field>
                    <ErrorMessage name="active" component="div" className="text-danger" />
                  </Col>
                </Row>
              </Col>
            </Row>

            <div className="d-flex align-items-start">
              <Button type="submit" variant="primary" className="me-1" disabled={isSubmitting}>
                Update
              </Button>
              <Link to={'/app/ecommerce/referalCode'}>
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

export default EditReferalCode;
