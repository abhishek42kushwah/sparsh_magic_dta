import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  Row,
  Col,
  Button,
  CardTitle,
  Card,
  CardBody,
  InputGroup,
  Form as BootstrapForm,
  FormControl,
  FormLabel,
  FormSelect
} from 'react-bootstrap';
import PageMetaData from '@/components/PageMetaData';
import RxNewOrdersTable from './RxNewOrderTable';

interface Product {
  productId: string;
  quantity: number;
  price: number;
}

interface CreateOrderFormValues {
  products: Product[];
  discount: number;
  amountPaid: number;
  referenceNumber: string;
  total: number;
  invoiceAmount: number;
  RemainingAmount: number;
}

const CreateOrderSchema = Yup.object().shape({
  products: Yup.array().of(
    Yup.object().shape({
      productId: Yup.string().required('Product is required'),
      quantity: Yup.number().required('Quantity is required').min(1, 'Minimum quantity is 1'),
      price: Yup.number().required('Price is required').min(0, 'Price must be 0 or higher')
    })
  ),
  discount: Yup.number().min(0, 'Must be 0 or higher').max(100, 'Cannot exceed 100'),
  amountPaid: Yup.number()
    .min(0, 'Must be 0 or higher')
    .test('is-lt-total', 'Amount Paid cannot exceed the Total', function (value) {
      const { total } = this.parent;
      return (value ?? 0) <= total;
    }),
  referenceNumber: Yup.string(),
  total: Yup.number(),
  RemainingAmount: Yup.number(),
  invoiceAmount: Yup.number()
});

const CreateOrder: React.FC = () => {
  const [orderData, setOrderData] = useState<CreateOrderFormValues | null>(null);

  return (
    <Formik<CreateOrderFormValues>
      initialValues={{
        products: [{ productId: '', quantity: 1, price: 0 }],
        discount: 0,
        amountPaid: 0,
        referenceNumber: '',
        total: 0,
        invoiceAmount: 0,
        RemainingAmount: 0
      }}
      validationSchema={CreateOrderSchema}
      onSubmit={(values) => {
        console.log('Order Created', values);
        setOrderData(values);
      }}
    >
      {({ values, handleChange, setFieldValue }) => {
        useEffect(() => {
          const calculateTotal = () => {
            const totalAmount = values.products.reduce((sum, product) => sum + product.quantity * product.price, 0);
            const discountAmount = totalAmount * (values.discount / 100);
            const invoiceAmount = totalAmount - discountAmount;
            const remainingAmount = invoiceAmount - values.amountPaid;

            setFieldValue('total', totalAmount);
            setFieldValue('invoiceAmount', invoiceAmount);
            setFieldValue('RemainingAmount', remainingAmount);
          };

          calculateTotal();
        }, [values.products, values.discount, values.amountPaid, setFieldValue]);

        return (
          <>
            <PageMetaData title="New Rx Order" />
            <Form>
              <Card>
                <CardBody>
                  <Col>
                    <CardTitle as="h4">New Rx Order</CardTitle>
                  </Col>
                  <FieldArray name="products">
                    {({ remove, push }) => (
                      <>
                        {values.products.length > 0 ? (
                          values.products.map((_, index) => (
                            <Row key={index} className="mb-3">
                              <Col md={4}>
                                <BootstrapForm.Group>
                                  <FormLabel>Product</FormLabel>
                                  <Field
                                    as={FormSelect}
                                    name={`products.${index}.productId`}
                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                      const selectedProductId = e.target.value;
                                      const isDuplicate = values.products.some(
                                        (product, idx) => product.productId === selectedProductId && idx !== index
                                      );

                                      if (isDuplicate) {
                                        alert('This product has already been added.');
                                      } else {
                                        handleChange(e);
                                        setFieldValue(`products.${index}.productId`, selectedProductId);
                                      }
                                    }}
                                    isInvalid={!!(values.products[index].productId && values.products[index].productId === '')}
                                  >
                                    <option value="">Select Product</option>
                                    <option value="ice">Ice</option>
                                    <option value="maggie">Maggie</option>
                                    <option value="yum">Yum</option>
                                    <option value="Choco">Choco</option>
                                  </Field>
                                  <ErrorMessage name={`products.${index}.productId`} component="div" className="text-danger" />
                                </BootstrapForm.Group>
                              </Col>

                              <Col md={2}>
                                <BootstrapForm.Group>
                                  <FormLabel>Quantity</FormLabel>
                                  <Field
                                    as={FormControl}
                                    type="number"
                                    name={`products.${index}.quantity`}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                      handleChange(e);
                                      setFieldValue(`products.${index}.quantity`, parseFloat(e.target.value));
                                    }}
                                    isInvalid={!!(values.products[index].quantity && values.products[index].quantity <= 0)}
                                  />
                                  <ErrorMessage name={`products.${index}.quantity`} component="div" className="text-danger" />
                                </BootstrapForm.Group>
                              </Col>

                              <Col md={2}>
                                <BootstrapForm.Group>
                                  <FormLabel>Price</FormLabel>
                                  <Field
                                    as={FormControl}
                                    type="number"
                                    name={`products.${index}.price`}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                      handleChange(e);
                                      setFieldValue(`products.${index}.price`, parseFloat(e.target.value));
                                    }}
                                    isInvalid={!!(values.products[index].price && values.products[index].price < 0)}
                                  />
                                  <ErrorMessage name={`products.${index}.price`} component="div" className="text-danger" />
                                </BootstrapForm.Group>
                              </Col>

                              <Col md={4} className="d-flex align-items-center pt-3">
                                <Button variant="danger" type="button" onClick={() => remove(index)} className="me-2">
                                  Remove
                                </Button>
                                {index === values.products.length - 1 && (
                                  <Button variant="primary" type="button" onClick={() => push({ productId: '', quantity: 1, price: 0 })}>
                                    Add New Product
                                  </Button>
                                )}
                              </Col>
                            </Row>
                          ))
                        ) : (
                          <Row>
                            <Col>
                              <Button variant="primary" type="button" onClick={() => push({ productId: '', quantity: 1, price: 0 })}>
                                Add New Product
                              </Button>
                            </Col>
                          </Row>
                        )}
                      </>
                    )}
                  </FieldArray>

                  <Row className="mt-4">
                    <Col md={4}>
                      <BootstrapForm.Group>
                        <FormLabel>Total</FormLabel>
                        <InputGroup>
                          <Field as={FormControl} type="text" name="total" value={values.total} readOnly />
                        </InputGroup>
                      </BootstrapForm.Group>
                    </Col>
                    <Col md={4}>
                      <BootstrapForm.Group>
                        <FormLabel>Discount %</FormLabel>
                        <InputGroup>
                          <Field
                            as={FormControl}
                            type="number"
                            name="discount"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                              handleChange(e);
                              setFieldValue('discount', parseFloat(e.target.value));
                            }}
                          />
                        </InputGroup>
                        <ErrorMessage name="discount" component="div" className="text-danger" />
                      </BootstrapForm.Group>
                    </Col>
                    <Col md={4}>
                      <BootstrapForm.Group>
                        <FormLabel>Amount Paid</FormLabel>
                        <Field as={FormControl} type="number" name="amountPaid" />
                        <ErrorMessage name="amountPaid" component="div" className="text-danger" />
                      </BootstrapForm.Group>
                    </Col>
                  </Row>

                  <Row className="mt-4">
                    <Col md={4}>
                      <BootstrapForm.Group>
                        <FormLabel>Invoice Amount</FormLabel>
                        <InputGroup>
                          <Field as={FormControl} type="text" name="invoiceAmount" value={values.invoiceAmount} readOnly />
                        </InputGroup>
                      </BootstrapForm.Group>
                    </Col>
                    <Col md={4}>
                      <BootstrapForm.Group>
                        <FormLabel>Remaining Amount</FormLabel>
                        <InputGroup>
                          <Field as={FormControl} type="text" name="RemainingAmount" value={values.RemainingAmount} readOnly />
                        </InputGroup>
                      </BootstrapForm.Group>
                    </Col>
                    <Col md={4}>
                      <BootstrapForm.Group>
                        <FormLabel>Reference Number</FormLabel>
                        <InputGroup>
                          <Field as={FormControl} type="text" name="referenceNumber" />
                        </InputGroup>
                      </BootstrapForm.Group>
                    </Col>
                  </Row>

                  <Button type="submit" className="mt-4">
                    Create Order
                  </Button>
                </CardBody>
              </Card>
            </Form>

            <Card className="mt-4">
              <CardBody>
                <CardTitle as="h5">Product Discounts Details</CardTitle>
                {orderData && <RxNewOrdersTable productData={orderData} />}
              </CardBody>
            </Card>
          </>
        );
      }}
    </Formik>
  );
};

export default CreateOrder;
