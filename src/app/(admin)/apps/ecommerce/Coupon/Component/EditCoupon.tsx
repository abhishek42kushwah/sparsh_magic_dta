import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Col, Row, FormControl, FormLabel } from 'react-bootstrap';
import ComponentContainerCard from '@/components/ComponentContainerCard';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { errorToast, successToast } from '@/utils/toastMassage';
import {EditCouponValidationSchema,BASE_URL} from "@/types/validationSchema";

function EditCoupon() {
  const location = useLocation();
  const item = location?.state?.original;
  const navigate = useNavigate();

  const handleSubmit = async (values:any, { setSubmitting, resetForm }:{setSubmitting:any,resetForm:any}) => {
    try {
      const response = await fetch(`${BASE_URL}coupons/${item.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      
      const data = await response.json();

      if (response.ok && data.success) {
        resetForm();
        navigate('/app/ecommerce/coupon');
        successToast('Updated successfully');
      } else {
        errorToast(data.message || 'Something went wrong');
      }
    } catch (error:any) {
      errorToast(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ComponentContainerCard title="Edit Coupon">
      <Formik
        initialValues={{
          name: item.name || '',
          coupon_code: item.coupon_code || '',
          percent: item.percent || '',
          expiry_date: item?.expiry_date ? new Date(item.expiry_date).toISOString().split('T')[0] : '',
          min_amount: item.min_amount || '',
          max_amount: item.max_amount || '',
          live: item.live || '',
        }}
        validationSchema={EditCouponValidationSchema}
        onSubmit={handleSubmit}
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
                      placeholder="Enter coupon name"
                    />
                    <ErrorMessage name="name" component="div" className="text-danger" />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <FormLabel htmlFor="coupon_code" className="col-sm-2 col-form-label text-start">
                    Coupon Code
                  </FormLabel>
                  <Col sm="10">
                    <Field
                      as={FormControl}
                      type="text"
                      id="coupon_code"
                      name="coupon_code"
                      placeholder="Enter coupon code"
                    />
                    <ErrorMessage name="coupon_code" component="div" className="text-danger" />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <FormLabel htmlFor="expiry_date" className="col-sm-2 col-form-label text-start">
                    Expiry Date
                  </FormLabel>
                  <Col sm="10">
                    <Field
                      as={FormControl}
                      type="date"
                      id="expiry_date"
                      name="expiry_date"
                      min={new Date().toISOString().split('T')[0]}
                    />
                    <ErrorMessage name="expiry_date" component="div" className="text-danger" />
                  </Col>
                </Row>

              </Col>


              <Col lg="6">
                <Row className="mb-3">
                  <FormLabel htmlFor="percent" className="col-sm-2 col-form-label text-start">
                    Percent
                  </FormLabel>
                  <Col sm="10">
                    <Field
                      as={FormControl}
                      type="number"
                      id="percent"
                      name="percent"
                      placeholder="Enter discount percent"
                    />
                    <ErrorMessage name="percent" component="div" className="text-danger" />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <FormLabel htmlFor="min_amount" className="col-sm-2 col-form-label text-start">
                    Min Amount
                  </FormLabel>
                  <Col sm="10">
                    <Field
                      as={FormControl}
                      type="number"
                      id="min_amount"
                      name="min_amount"
                      placeholder="Enter minimum amount"
                    />
                    <ErrorMessage name="min_amount" component="div" className="text-danger" />
                  </Col>
                </Row>
                  <Row className="mb-3">
                  <FormLabel htmlFor="max_amount" className="col-sm-2 col-form-label text-start">
                    Max Amount
                  </FormLabel>
                  <Col sm="10">
                    <Field
                      as={FormControl}
                      type="number"
                      id="max_amount"
                      name="max_amount"
                      placeholder="Enter maximum amount"
                    />
                    <ErrorMessage name="max_amount" component="div" className="text-danger" />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <FormLabel htmlFor="live" className="col-sm-2 col-form-label text-start">
                    Live
                  </FormLabel>
                  <Col sm="10">
                    <Field as="select" id="live" name="live" className="form-select">
                      <option value="">Select</option>
                      <option value="YES">YES</option>
                      <option value="NO">NO</option>
                    </Field>
                    <ErrorMessage name="live" component="div" className="text-danger" />
                  </Col>
                </Row>

              </Col>
            </Row>


            <div className="d-flex align-items-start">
              <Button type="submit" variant="primary" className="me-1" disabled={isSubmitting}>
                Submit {isSubmitting && (
                  <span className="spinner-border spinner-border-sm ms-2" role="status" aria-hidden="true"></span>
                )}
              </Button>
              <Link to="/app/ecommerce/coupon">
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

export default EditCoupon;
