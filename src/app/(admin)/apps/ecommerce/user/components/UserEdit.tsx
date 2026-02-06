import { Button, Col, FormControl, FormLabel, FormSelect, Row } from 'react-bootstrap';
import ComponentContainerCard from '../../../../../../components/ComponentContainerCard';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
const UserEdit = () => {
  const initialValues = {
    userName: "",
    email: "",
    phoneNumber: "",
    city: "",
    state: "",
    pincode: "",
    role: "",
    profile: null,
    dob: "",
    address: ""
  };

  const validationSchema = Yup.object({
    userName: Yup.string().required('User Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phoneNumber: Yup.string().required('Phone Number is required'),
    city: Yup.string().required('City is required'),
    pincode: Yup.number().required('PinCode is required'),
    state: Yup.string().required('State is required'),
    role: Yup.string().required('Role is required'),
     profile: Yup.mixed()
    .required('Image is required')
    .test('fileSize', 'File size is too large', value => {
      if (value) {
        return (value as File).size <= 1 * 1024 * 1024; 
      }
      return false;
    })
    .test('fileType', 'Unsupported file format', value => {
      if (value) {
        return ['image/jpeg', 'image/png'].includes((value as File).type);
      }
      return false;
    }),
    dob: Yup.date().required('Date of Birth is required').nullable(),
    address: Yup.string().required('Address is required')
  });

  const roleOptions = [
    { value: 'admin', label: 'Admin' },
    { value: 'user', label: 'User' },
    { value: 'Manager', label: 'Manager' },
    { value: 'Leader', label: 'Leader' },
    { value: 'Sub.Manager', label: 'Sub.Manager' },
    { value: 'Member', label: 'Member' },
  ];

  const handleSubmit = (values: any, { resetForm }: { resetForm: () => void }) => {
    console.log('Form submitted:', values);
    resetForm();
  };

  return (
    <ComponentContainerCard title="Edit User">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => (
          <Form>
            <Row>
              <Col lg="6">
                <Row className="mb-3">
                  <FormLabel htmlFor="userName" className="col-sm-2 col-form-label text-start">
                    User Name
                  </FormLabel>
                  <Col sm="10">
                    <FormControl
                      type="text"
                      id="userName"
                      name="userName"
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

                <Row className="mb-3">
                  <FormLabel htmlFor="phoneNumber" className="col-sm-2 col-form-label text-start">
                    Phone Number
                  </FormLabel>
                  <Col sm="10">
                    <FormControl
                      type="text"
                      id="phoneNumber"
                      name="phoneNumber"
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
                <Row className="mb-3">
                  <FormLabel htmlFor="city" className="col-sm-2 col-form-label text-start">
                    City
                  </FormLabel>
                  <Col sm="10">
                    <FormControl
                      type="text"
                      id="city"
                      name="city"
                      value={values.city}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.city && !!errors.city}
                    />
                    <FormControl.Feedback type="invalid">
                      {errors.city}
                    </FormControl.Feedback>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <FormLabel htmlFor="state" className="col-sm-2 col-form-label text-start">
                    State
                  </FormLabel>
                  <Col sm="10">
                    <FormControl
                      type="text"
                      id="state"
                      name="state"
                      value={values.state}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.state && !!errors.state}
                    />
                    <FormControl.Feedback type="invalid">
                      {errors.state}
                    </FormControl.Feedback>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <FormLabel htmlFor="dob" className="col-sm-2 col-form-label text-start">
                    Date of Birth
                  </FormLabel>
                  <Col sm="10">
                    <FormControl
                      type="date"
                      id="dob"
                      name="dob"
                      value={values.dob}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.dob && !!errors.dob}
                    />
                    <FormControl.Feedback type="invalid">
                      {errors.dob}
                    </FormControl.Feedback>
                  </Col>
                </Row>

              </Col>
              <Col lg="6">
                <Row className="mb-3">
                  <FormLabel htmlFor="email" className="col-sm-2 col-form-label text-start">
                    Email
                  </FormLabel>
                  <Col sm="10">
                    <FormControl
                      type="email"
                      id="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.email && !!errors.email}
                    />
                    <FormControl.Feedback type="invalid">
                      {errors.email}
                    </FormControl.Feedback>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <FormLabel htmlFor="pincode" className="col-sm-2 col-form-label text-start">
                    PinCode
                  </FormLabel>
                  <Col sm="10">
                    <FormControl
                      type="pincode"
                      id="pincode"
                      name="pincode"
                      value={values.pincode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.pincode && !!errors.pincode}
                    />
                    <FormControl.Feedback type="invalid">
                      {errors.pincode}
                    </FormControl.Feedback>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <FormLabel htmlFor="profile" className="col-sm-2 col-form-label text-start">
                    Profile
                  </FormLabel>
                  <Col sm="10">
                    <FormControl
                      type="file"
                      id="profile"
                      name="profile"
                      onChange={(event) => {
                        setFieldValue('profile', (event.currentTarget as HTMLInputElement).files?.[0]);
                      }}
                      onBlur={handleBlur}
                      isInvalid={touched.profile && !!errors.profile}
                    />
                    <FormControl.Feedback type="invalid">
                      {errors.profile}
                    </FormControl.Feedback>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <FormLabel htmlFor="role" className="col-sm-2 col-form-label text-start">
                    Role
                  </FormLabel>
                  <Col sm="10">
                    <FormSelect
                      id="role"
                      name="role"
                      value={values.role}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.role && !!errors.role}
                    >
                      <option value="">Select</option>
                      {roleOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </FormSelect>
                    <FormControl.Feedback type="invalid">
                      {errors.role}
                    </FormControl.Feedback>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <FormLabel htmlFor="address" className="col-sm-2 col-form-label text-start">
                    Address
                  </FormLabel>
                  <Col sm="10">
                    <FormControl
                      as="textarea"
                      id="address"
                      name="address"
                      rows={3}
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
              </Col>
            </Row>
            <div className="d-flex align-items-start">
              <Button type="submit" variant="primary" className="me-1">
                Submit
              </Button>
                <Button type="button" variant="danger" onClick={() => window.history.back()}>
                  Cancel
                </Button>
             
            </div>
          </Form>
        )}
      </Formik>
    </ComponentContainerCard>
  );
}

export default UserEdit;
