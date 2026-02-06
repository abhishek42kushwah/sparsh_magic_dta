import { Button, Col, FormControl, FormLabel, FormSelect, Row } from 'react-bootstrap';
import { Formik, Field, Form, FieldArray, ErrorMessage } from 'formik';
import ComponentContainerCard from '../../../../../../components/ComponentContainerCard';
import {  useNavigate } from 'react-router-dom';
import { BASE_URL, AddOrderValidationSchema } from '@/types/validationSchema';
import { errorToast, successToast } from '@/utils/toastMassage';

function AddOrder() {
  interface OrderFormValues {
    userId: string | number;
    addressId: string | number;
    discountCoupon: string;
    prescription: string;
    shippingCharge: number;
    paymentMod: string;
    orderItems: {
      productId: string | number;
      itemName: string;
      sellPrice: number;
      buyPrice: number;
      quantity: number;
    }[];
  }

  const navigate = useNavigate();

  const handleSubmit = async (values: OrderFormValues, { resetForm }: { resetForm: () => void }) => {
    try {
      const payload = {
        ...values,
        addressId: Number(values.addressId),
        shippingCharge: Number(values.shippingCharge),
        orderItems: values.orderItems.map((item) => ({
          ...item,
          productId: Number(item.productId),
          sellPrice: Number(item.sellPrice),
          buyPrice: Number(item.buyPrice),
          quantity: Number(item.quantity),
        })),
      };

      const response = await fetch(`${BASE_URL}orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Error submitting the order');
      }

      successToast(data.message);
      resetForm();
      navigate(-1);
    } catch (error: any) {
      errorToast(error.message);
    }
  };

  return (
    <ComponentContainerCard title="Create Order">
      <Formik
        initialValues={{
          userId: 73044026,
          addressId: 13,
          discountCoupon: '',
          prescription: '',
          shippingCharge: 0,
          paymentMod: 'ONLINE',
          orderItems: [{
            productId: '',
            itemName: '',
            sellPrice: 0,
            buyPrice: 0,
            quantity: 1,
          }],
        }}
        validationSchema={AddOrderValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange }) => (
          <Form>
            <Row>
              <Col lg="6">
                {/* User ID */}
                <Row className="mb-3">
                  <FormLabel htmlFor="userId" className="col-sm-3 col-form-label text-start">User ID</FormLabel>
                  <Col sm="9">
                    <Field as={FormControl} type="text" name="userId" onChange={handleChange} />
                    <ErrorMessage name="userId" component="div" className="text-danger" />
                  </Col>
                </Row>

                {/* Address ID */}
                <Row className="mb-3">
                  <FormLabel htmlFor="addressId" className="col-sm-3 col-form-label text-start">Address ID</FormLabel>
                  <Col sm="9">
                    <Field as={FormControl} type="text" name="addressId" onChange={handleChange} />
                    <ErrorMessage name="addressId" component="div" className="text-danger" />
                  </Col>
                </Row>

                {/* Discount Coupon */}
                <Row className="mb-3">
                  <FormLabel htmlFor="discountCoupon" className="col-sm-3 col-form-label text-start">Coupon</FormLabel>
                  <Col sm="9">
                    <Field as={FormControl} type="text" name="discountCoupon" onChange={handleChange} />
                    <ErrorMessage name="discountCoupon" component="div" className="text-danger" />
                  </Col>
                </Row>

                {/* Prescription */}
                <Row className="mb-3">
                  <FormLabel htmlFor="prescription" className="col-sm-3 col-form-label text-start">Prescription</FormLabel>
                  <Col sm="9">
                    <Field as={FormControl} type="text" name="prescription" onChange={handleChange} />
                    <ErrorMessage name="prescription" component="div" className="text-danger" />
                  </Col>
                </Row>

                {/* Shipping Charge */}
                <Row className="mb-3">
                  <FormLabel htmlFor="shippingCharge" className="col-sm-3 col-form-label text-start">Shipping</FormLabel>
                  <Col sm="9">
                    <Field as={FormControl} type="number" name="shippingCharge" onChange={handleChange} />
                    <ErrorMessage name="shippingCharge" component="div" className="text-danger" />
                  </Col>
                </Row>
              </Col>

              <Col lg="6">
                {/* Payment Mode */}
                <Row className="mb-3">
                  <FormLabel htmlFor="paymentMod" className="col-sm-3 col-form-label text-start">Payment Mode</FormLabel>
                  <Col sm="9">
                    <Field as={FormSelect} name="paymentMod" onChange={handleChange}>
                      <option value="ONLINE">Online</option>
                      <option value="COD">Cash on Delivery</option>
                    </Field>
                    <ErrorMessage name="paymentMod" component="div" className="text-danger" />
                  </Col>
                </Row>

                {/* Order Items */}
                <FieldArray name="orderItems">
                  {({ remove, push }) => (
                    <>
                      {values.orderItems.map((_, index) => (
                        <div key={index} className="mb-3 border p-3 rounded bg-light">
                          <Row className="mb-2">
                            <Col sm="6">
                              <Field
                                as={FormControl}
                                type="text"
                                name={`orderItems.${index}.productId`}
                                placeholder="Product ID"
                              />
                              <ErrorMessage name={`orderItems.${index}.productId`} component="div" className="text-danger" />
                            </Col>
                            <Col sm="6">
                              <Field
                                as={FormControl}
                                type="text"
                                name={`orderItems.${index}.itemName`}
                                placeholder="Item Name"
                              />
                              <ErrorMessage name={`orderItems.${index}.itemName`} component="div" className="text-danger" />
                            </Col>
                          </Row>

                          <Row className="mb-2">
                            <Col sm="4">
                              <Field
                                as={FormControl}
                                type="number"
                                name={`orderItems.${index}.sellPrice`}
                                placeholder="Sell Price"
                              />
                              <ErrorMessage name={`orderItems.${index}.sellPrice`} component="div" className="text-danger" />
                            </Col>
                            <Col sm="4">
                              <Field
                                as={FormControl}
                                type="number"
                                name={`orderItems.${index}.buyPrice`}
                                placeholder="Buy Price"
                              />
                              <ErrorMessage name={`orderItems.${index}.buyPrice`} component="div" className="text-danger" />
                            </Col>
                            <Col sm="4">
                              <Field
                                as={FormControl}
                                type="number"
                                name={`orderItems.${index}.quantity`}
                                placeholder="Quantity"
                              />
                              <ErrorMessage name={`orderItems.${index}.quantity`} component="div" className="text-danger" />
                            </Col>
                          </Row>

                          <div className="text-end">
                            <Button variant="danger" type="button" onClick={() => remove(index)}>Remove</Button>
                          </div>
                        </div>
                      ))}
                      <Button variant="secondary" type="button" onClick={() => push({
                        productId: '',
                        itemName: '',
                        sellPrice: 0,
                        buyPrice: 0,
                        quantity: 1,
                      })}>Add Product</Button>
                    </>
                  )}
                </FieldArray>
              </Col>

              {/* Submit Buttons */}
              <div className="d-flex align-items-start mt-3">
                <Button type="submit" variant="primary" className="me-2">Submit</Button>
               
                  <Button variant="danger" type="button" onClick={()=> navigate(-1)}>Cancel</Button>
               
              </div>
            </Row>
          </Form>
        )}
      </Formik>
    </ComponentContainerCard>
  );
}

export default AddOrder;
