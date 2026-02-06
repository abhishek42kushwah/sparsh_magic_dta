import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Col, Row, FormControl, FormLabel } from 'react-bootstrap';
import ComponentContainerCard from '@/components/ComponentContainerCard';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { WalletUpdateValidationSchema,BASE_URL} from "@/types/validationSchema";
import { errorToast, successToast } from '@/utils/toastMassage';

function UpdateVendor() {
const navigate = useNavigate();
const location = useLocation();
const vendor = location.state?.original || location.state?.originalData;

  return (
    <ComponentContainerCard title="Update Vendor">
      <Formik
        initialValues={{
          userName: vendor?.userName || '',
          userId: vendor?.userId || '',
          amount: vendor?.amount  ||'',
          description:vendor?.description || '',
          source: vendor?.source || '',
          type: vendor?.type || '',
        }}
        validationSchema={WalletUpdateValidationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const payload = {
            userId: vendor?.userId,
            userName: values.userName,
            amount: values.amount,
            description: values.description,
            source: values.source,
            type: values.type,
          };

          try {
            const id = vendor?.id;
            const response = await fetch(`${BASE_URL}vendor-portal/update/${id}`, {
              method: 'PUT',
               headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(payload),
            });
             const data = await response.json();
            if (response.ok && data.success) {
              successToast('Vendor updated successfully');
              resetForm();
              navigate('/app/ecommerce/vendor-portal');
            } else{
              errorToast(data.message || 'Failed to update vendor');
            }
          } catch (error:any) {
            errorToast(error.message || 'Failed to update vendor');
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
                      as={FormControl}
                      type="text"
                      id="description"
                      name="description"
                      placeholder="Enter Description"
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
              <Button type="submit" variant="primary" className="me-1" disabled={isSubmitting}>
                Submit
              </Button>
              <Link to="/app/ecommerce/vendor-portal">
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

export default UpdateVendor;
