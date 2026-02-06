import { Button, Col, FormControl, FormLabel, FormSelect, Row } from 'react-bootstrap';
import ComponentContainerCard from '@/components/ComponentContainerCard';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const AddRxOrderList = () => {
  const initialValues = {
    OrderPaymentBy: "",
    shipBy: "",
    amount: "",
    prescription: "",
    orderStatus: "",
    paymentStatus: "",
    shipmentList: "",
    address: "",    
    brand: "",
    HSN: "",
    delivery :"",
    productName:"",
    qty:"",
    vendorId:'',
    userName:'',
    phoneNumber :""
  };

  const validationSchema = Yup.object({
    OrderPaymentBy: Yup.string().required('Order Payment By is required'),
    shipBy: Yup.string().required('ShipBy is required'),
    amount: Yup.number().required('Amount is required'),
    prescription: Yup.string().required('Prescription is required'),
    orderStatus: Yup.string().required('Order Status is required'),
    paymentStatus: Yup.string().required('Payment Status is required'),
    shipmentList: Yup.string().required('Shipment List is required'),
    address: Yup.string().required('Address is required'), 
    brand: Yup.string().required('Brand is required'),
    HSN: Yup.number().required('HSN is required'),
    delivery: Yup.string().required('Delivery is required'),
    productName: Yup.string().required('Product Name is required'),
    qty:Yup.number().required("Quntity is required"),
    vendorId: Yup.number().required('Vendor Id is required'),
    userName:Yup.string().required("User Name is required"),
    phoneNumber : Yup.number().required("Conatct number is required ")
  });

  


  interface FormikHelpers {
    resetForm: () => void;
  }

  const handleSubmit = (values: any, { resetForm }: FormikHelpers) => {
    console.log('Form submitted:', values);
    resetForm();
  };

  const navigate = useNavigate();

  return (
    <ComponentContainerCard title="Create Rx Order Details List">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Form>
            <Row>
              <Col lg="6">
               {/* Product name */}
               <Row className="mb-3">
                  <FormLabel htmlFor="productName" className="col-sm-2 col-form-label text-start">
                  Product Name
                  </FormLabel>
                  <Col sm="10">
                    <FormControl
                      type="text"
                      id="productName"
                      name="productName"
                      placeholder="Enter Product Name"
                      value={values.productName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.productName && !!errors.productName}
                    />
                    <FormControl.Feedback type="invalid">
                      {errors.productName}
                    </FormControl.Feedback>
                  </Col>
                </Row>
                  {/* qty */}
                  <Row className="mb-3">
                  <FormLabel htmlFor="qty" className="col-sm-2 col-form-label text-start">
                  Quantity
                  </FormLabel>
                  <Col sm="10">
                    <FormControl
                      type="number"
                      id="qty"
                      name="qty"
                      placeholder="Enter Quanitity"
                      value={values.qty}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.qty && !!errors.qty}
                    />
                    <FormControl.Feedback type="invalid">
                      {errors.qty}
                    </FormControl.Feedback>
                  </Col>
                </Row>
             
                {/* amount  */}
                <Row className="mb-3">
                  <FormLabel htmlFor="amount" className="col-sm-2 col-form-label text-start">
                  Amount
                  </FormLabel>
                  <Col sm="10">
                    <FormControl
                      type="text"
                      id="amount"
                      name="amount"
                      placeholder="Enter Amount"
                      value={values.amount}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.amount && !!errors.amount}
                    />
                    <FormControl.Feedback type="invalid">
                      {errors.amount}
                    </FormControl.Feedback>
                  </Col>
                </Row>
                {/* ship by  */}
                <Row className="mb-3">
                  <FormLabel htmlFor="shipBy" className="col-sm-2 col-form-label text-start">
                  Ship By
                  </FormLabel>
                  <Col sm="10">
                    <FormControl
                      type="text"
                      id="shipBy"
                      name="shipBy"
                      placeholder="Enter Ship By"
                      value={values.shipBy}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.shipBy && !!errors.shipBy}
                    />
                    <FormControl.Feedback type="invalid">
                      {errors.shipBy}
                    </FormControl.Feedback>
                  </Col>
                </Row>
                {/* Order Payment By  */}
                <Row className="mb-3">
                  <FormLabel htmlFor="OrderPaymentBy" className="col-sm-2 col-form-label text-start">
                  Order Payment By
                  </FormLabel>
                  <Col sm="10">
                    <FormSelect
                      id="OrderPaymentBy"
                      name="OrderPaymentBy"

                      value={values.OrderPaymentBy}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.OrderPaymentBy && !!errors.OrderPaymentBy}
                    >
                      <option value="">Select</option>
                      <option value="PREPAID">Prepaid</option>
                      <option value="PAID">Paid</option>
                      <option value="UNPAID">Unpaid</option>
                    </FormSelect>
                    <FormControl.Feedback type="invalid">
                      {errors.OrderPaymentBy}
                    </FormControl.Feedback>
                  </Col>
                </Row>

                {/* order Status */}
                <Row className="mb-3">
                  <FormLabel htmlFor="orderStatus" className="col-sm-2 col-form-label text-start">
                Order Status
                  </FormLabel>
                  <Col sm="10">
                    <FormSelect
                      id="orderStatus"
                      name="orderStatus"

                      value={values.orderStatus}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.orderStatus && !!errors.orderStatus}
                    >
                      <option value="">Select</option>
                      <option value="Ordered">Ordered</option>
                      <option value="UnderProccess">Under Proccess</option>
                      <option value="Pandding">Pandding</option>
                    </FormSelect>
                    <FormControl.Feedback type="invalid">
                      {errors.orderStatus}
                    </FormControl.Feedback>
                  </Col>
                </Row>
                {/* shipmentList */}
                <Row className="mb-3">
                  <FormLabel htmlFor="shipmentList" className="col-sm-2 col-form-label text-start">
                  Shipment List
                  </FormLabel>
                  <Col sm="10">
                    <FormControl
                      type="text"
                      id="shipmentList"
                      name="shipmentList"
                      placeholder="Enter Shipment List"
                      value={values.shipmentList}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.shipmentList && !!errors.shipmentList}
                    />
                    <FormControl.Feedback type="invalid">
                      {errors.shipmentList}
                    </FormControl.Feedback>
                  </Col>
                </Row>

              
                 {/* paymentStatus */}
                 <Row className="mb-3">
                  <FormLabel htmlFor="paymentStatus" className="col-sm-2 col-form-label text-start">
                Payment Status
                  </FormLabel>
                  <Col sm="10">
                    <FormControl
                      type="text"
                      id="paymentStatus"
                      name="paymentStatus"
                      placeholder="Enter Payment Status"
                      value={values.paymentStatus}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.paymentStatus && !!errors.paymentStatus}
                    />
                    <FormControl.Feedback type="invalid">
                      {errors.paymentStatus}
                    </FormControl.Feedback>
                  </Col>
                </Row>

                {/* for dropdwon  */}
                {/* <Row className="mb-3">
                  <FormLabel htmlFor="masterCat" className="col-sm-2 col-form-label text-start">
                    Master Category
                  </FormLabel>
                  <Col sm="10">
                    <FormSelect
                      id="masterCat"
                      name="masterCat"
                      value={values.masterCat}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.masterCat && !!errors.masterCat}
                    >
                      <option value="">Select</option>
                      <option value="ALLOPATHY">ALLOPATHY</option>
                      <option value="APPOLLO">APPOLLO</option>
                      <option value="THOMTION">THOMTION</option>
                    </FormSelect>
                    <FormControl.Feedback type="invalid">
                      {errors.masterCat}
                    </FormControl.Feedback>
                  </Col>
                </Row> */}
             
               
              </Col>
              <Col lg="6">
               
               {/* brand  */}
                <Row className="mb-3">
                  <FormLabel htmlFor="brand" className="col-sm-2 col-form-label text-start">
                  Brand Name
                  </FormLabel>
                  <Col sm="10">
                    <FormControl
                      type="text"
                      id="brand"
                      name="brand"
                      placeholder="Enter Product Brand"
                      value={values.brand}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.brand && !!errors.brand}
                    />
                    <FormControl.Feedback type="invalid">
                      {errors.brand}
                    </FormControl.Feedback>
                  </Col>
                </Row>
                {/* HSN */}
                <Row className="mb-3">
                  <FormLabel htmlFor="HSN" className="col-sm-2 col-form-label text-start">
                  HSN
                  </FormLabel>
                  <Col sm="10">
                    <FormControl
                      type="number"
                      id="HSN"
                      name="HSN"
                      placeholder="Enter HSN Number"
                      value={values.HSN}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.HSN && !!errors.HSN}
                    />
                    <FormControl.Feedback type="invalid">
                      {errors.HSN}
                    </FormControl.Feedback>
                  </Col>
                </Row>
                {/* delivery */}
                <Row className="mb-3">
                  <FormLabel htmlFor="delivery" className="col-sm-2 col-form-label text-start">
                  Delivery
                  </FormLabel>
                  <Col sm="10">
                    <FormControl
                      type="text"
                      id="delivery"
                      name="delivery"
                      placeholder="Enter Delivery"
                      value={values.delivery}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.delivery && !!errors.delivery}
                    />
                    <FormControl.Feedback type="invalid">
                      {errors.delivery}
                    </FormControl.Feedback>
                  </Col>
                </Row>
                
              
                {/* vendorId  */}
                <Row className="mb-3">
                  <FormLabel htmlFor="vendorId" className="col-sm-2 col-form-label text-start">
                  vendor Id
                  </FormLabel>
                  <Col sm="10">
                    <FormControl
                      type="number"
                      id="vendorId"
                      name="vendorId"
                      placeholder="Enter vendorId"
                      value={values.vendorId}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.vendorId && !!errors.vendorId}
                    />
                    <FormControl.Feedback type="invalid">
                      {errors.vendorId}
                    </FormControl.Feedback>
                  </Col>
                </Row>

               
                 {/* user Name */}
                 <Row className="mb-3">
                  <FormLabel htmlFor="userName" className="col-sm-2 col-form-label text-start">
                  User Name
                  </FormLabel>
                  <Col sm="10">
                    <FormControl
                      type="text"
                      id="userName"
                      name="userName"
                      placeholder="Enter User Name"
                      value={values.userName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.userName && !!errors.userName}
                    />
                    <FormControl.Feedback type="invalid">
                      {errors.userName}
                    </FormControl.Feedback>
                  </Col>
                </Row>
                 {/* prescription  */}
                 <Row className="mb-3">
                  <FormLabel htmlFor="prescription" className="col-sm-2 col-form-label text-start">
                  Prescription
                  </FormLabel>
                  <Col sm="10">
                    <FormControl
                      type="text"
                      id="prescription"
                      name="prescription"
                      placeholder="Enter Prescription"
                      value={values.prescription}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.prescription && !!errors.prescription}
                    />
                    <FormControl.Feedback type="invalid">
                      {errors.prescription}
                    </FormControl.Feedback>
                  </Col>
                </Row>
                  {/* address  */}
                  <Row className="mb-3">
                  <FormLabel htmlFor="address" className="col-sm-2 col-form-label text-start">
                  Address
                  </FormLabel>
                  <Col sm="10">
                    <FormControl
                      size="sm"
                      type="text"
                      id="address"
                      name="address"
                      placeholder="Enter address"
                      value={values.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.address && !!errors.address}
                    />
                    <FormControl.Feedback type="invalid">
                      {errors.address}
                    </FormControl.Feedback>
                  </Col>
                </Row>
                 {/* constact number  */}
              <Row className="mb-3">
                  <FormLabel htmlFor="phoneNumber" className="col-sm-2 col-form-label text-start">
                Contact Number
                  </FormLabel>
                  <Col sm="10">
                    <FormControl
                      type="text"
                      id="phoneNumber"
                      name="phoneNumber"
                      placeholder="Enter Contact Number"
                      value={values.phoneNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.phoneNumber && !!errors.phoneNumber}
                    />
                    <FormControl.Feedback type="invalid">
                      {errors.phoneNumber}
                    </FormControl.Feedback>
                  </Col>
                </Row>
               
              </Col>
              <div className="d-flex align-items-start">
                <Button type="submit" variant="primary" className="me-1">
                  Submit
                </Button>
                <Button type="button" variant="danger" onClick={()=>navigate(-1)}>
                  Cancel
                </Button>
              </div>
            </Row>
          </Form>
        )}
      </Formik>
    </ComponentContainerCard>
  );
}

export default AddRxOrderList;
