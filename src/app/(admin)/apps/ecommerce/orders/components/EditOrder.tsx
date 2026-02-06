import { Button, Col, FormControl, FormLabel, FormSelect, Row, Spinner } from 'react-bootstrap';
import { Formik, Form, FieldArray, Field, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import ComponentContainerCard from '../../../../../../components/ComponentContainerCard';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '@/types/validationSchema';
import { errorToast, successToast } from '@/utils/toastMassage';

function EditOrder() {
  const navigate = useNavigate();

  const initialValues = {
    userId: '',
    addressId: '',
    orderItems: [{ productId: '', quantity: 1 }],
    couponCode: '',
    prescription: '',
    shipMode: 'SURFACE',
    paymentMod: 'ONLINE',
  };

  const validationSchema = Yup.object({
    userId: Yup.string().required('User ID is required'),
    addressId: Yup.string().required('Address ID is required'),
    orderItems: Yup.array()
      .of(
        Yup.object().shape({
          productId: Yup.string().required('Product ID is required'),
          quantity: Yup.number()
            .required('Quantity is required')
            .min(1, 'Quantity must be at least 1'),
        })
      )
      .min(1, 'At least one order item is required'),
    couponCode: Yup.string().required('Coupon Code is required'),
    prescription: Yup.string().required('Prescription is required'),
    shipMode: Yup.string().required('Shipping mode is required'),
    paymentMod: Yup.string().required('Payment mode is required'),
  });

  interface OrderFormValues {
    userId: string;
    addressId: string;
    orderItems: { productId: string; quantity: number }[];
    couponCode: string;
    prescription: string;
    shipMode: string;
    paymentMod: string;
  }

  const handleSubmit = async (values: OrderFormValues, { setSubmitting, resetForm }: FormikHelpers<OrderFormValues>) => {
    try {
      const response = await fetch(`${BASE_URL}orders/${values.userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
         successToast(data.message || 'Order updated successfully');
        resetForm();
        navigate('/apps/ecommerce/orders');
      } else {
        const errorData = await response.json();
        errorToast(errorData.error || 'Failed to update order');
      }
    } catch (error:any) {
      errorToast(error.message || 'An error occurred while updating the order');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ComponentContainerCard title="Edit Order">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col lg="6">
                {/* User ID */}
                <Row className="mb-3">
                  <FormLabel htmlFor="userId" className="col-sm-2 col-form-label text-start">
                    User ID
                  </FormLabel>
                  <Col sm="10">
                    <Field
                      type="text"
                      id="userId"
                      name="userId"
                      as={FormControl}
                      isInvalid={touched.userId && !!errors.userId}
                      onChange={handleChange}
                    />
                    <FormControl.Feedback type="invalid">{errors.userId}</FormControl.Feedback>
                  </Col>
                </Row>

                {/* Address ID */}
                <Row className="mb-3">
                  <FormLabel htmlFor="addressId" className="col-sm-2 col-form-label text-start">
                    Address ID
                  </FormLabel>
                  <Col sm="10">
                    <Field
                      type="text"
                      id="addressId"
                      name="addressId"
                      as={FormControl}
                      isInvalid={touched.addressId && !!errors.addressId}
                      onChange={handleChange}
                    />
                    <FormControl.Feedback type="invalid">{errors.addressId}</FormControl.Feedback>
                  </Col>
                </Row>

                {/* Coupon Code */}
                <Row className="mb-3">
                  <FormLabel htmlFor="couponCode" className="col-sm-2 col-form-label text-start">
                    Coupon Code
                  </FormLabel>
                  <Col sm="10">
                    <Field
                      type="text"
                      id="couponCode"
                      name="couponCode"
                      as={FormControl}
                      isInvalid={touched.couponCode && !!errors.couponCode}
                      onChange={handleChange}
                    />
                    <FormControl.Feedback type="invalid">{errors.couponCode}</FormControl.Feedback>
                  </Col>
                </Row>

                {/* Prescription */}
                <Row className="mb-3">
                  <FormLabel htmlFor="prescription" className="col-sm-2 col-form-label text-start">
                    Prescription
                  </FormLabel>
                  <Col sm="10">
                    <Field
                      type="text"
                      id="prescription"
                      name="prescription"
                      as={FormControl}
                      isInvalid={touched.prescription && !!errors.prescription}
                      onChange={handleChange}
                    />
                    <FormControl.Feedback type="invalid">{errors.prescription}</FormControl.Feedback>
                  </Col>
                </Row>
              </Col>

              <Col lg="6">
                {/* Shipping Mode */}
                <Row className="mb-3">
                  <FormLabel htmlFor="shipMode" className="col-sm-2 col-form-label text-start">
                    Shipping Mode
                  </FormLabel>
                  <Col sm="10">
                    <Field as={FormSelect} id="shipMode" name="shipMode" onChange={handleChange}>
                      <option value="SURFACE">Surface</option>
                      <option value="EXPRESS">Express</option>
                    </Field>
                  </Col>
                </Row>

                {/* Payment Mode */}
                <Row className="mb-3">
                  <FormLabel htmlFor="paymentMod" className="col-sm-2 col-form-label text-start">
                    Payment Mode
                  </FormLabel>
                  <Col sm="10">
                    <Field as={FormSelect} id="paymentMod" name="paymentMod" onChange={handleChange}>
                      <option value="ONLINE">Online</option>
                      <option value="COD">Cash on Delivery</option>
                    </Field>
                  </Col>
                </Row>

                {/* Order Items */}
                <FieldArray name="orderItems">
                  {({ remove, push }) => (
                    <>
                      {values.orderItems.map((_, index) => (
                        <Row className="mb-3" key={index}>
                          <Col sm="6">
                            <Field
                              type="text"
                              name={`orderItems.${index}.productId`}
                              placeholder="Product ID"
                              as={FormControl}
                              isInvalid={
                                touched.orderItems?.[index]?.productId &&
                                Array.isArray(errors.orderItems) && typeof errors.orderItems[index] === 'object' && !!errors.orderItems[index]?.productId
                              }
                              onChange={handleChange}
                            />
                            <FormControl.Feedback type="invalid">
                              {Array.isArray(errors.orderItems) && typeof errors.orderItems[index] === 'object' && errors.orderItems[index]?.productId}
                            </FormControl.Feedback>
                          </Col>
                          <Col sm="4">
                            <Field
                              type="number"
                              name={`orderItems.${index}.quantity`}
                              placeholder="Quantity"
                              as={FormControl}
                              isInvalid={
                                touched.orderItems?.[index]?.quantity &&
                                Array.isArray(errors.orderItems) && typeof errors.orderItems[index] === 'object' && !!errors.orderItems[index]?.quantity
                              }
                              onChange={handleChange}
                            />
                            <FormControl.Feedback type="invalid">
                              {typeof errors.orderItems?.[index] === 'object' && errors.orderItems[index]?.quantity}
                            </FormControl.Feedback>
                          </Col>
                          <Col sm="2">
                            <Button
                              type="button"
                              variant="danger"
                              onClick={() => remove(index)}
                              disabled={values.orderItems.length === 1}
                            >
                              Remove
                            </Button>
                          </Col>
                        </Row>
                      ))}
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => push({ productId: '', quantity: 1 })}
                      >
                        Add Product
                      </Button>
                    </>
                  )}
                </FieldArray>
              </Col>
            </Row>

       
            <div className="d-flex align-items-start">
              <Button type="submit" variant="primary" className="me-1" disabled={isSubmitting}>
                {isSubmitting ? <Spinner animation="border" size="sm" /> : 'Submit'}
              </Button>
              <Link to="/apps/ecommerce/orders">
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

export default EditOrder;
