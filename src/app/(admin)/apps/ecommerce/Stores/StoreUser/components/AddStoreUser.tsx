import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Col, Row, FormControl, FormLabel } from 'react-bootstrap';
import ComponentContainerCard from '@/components/ComponentContainerCard';
import { Link, useNavigate } from 'react-router-dom';
import { AddStoreUsersValidationSchema, BASE_URL } from '@/types/validationSchema';
import { errorToast, successToast } from '@/utils/toastMassage';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { useEffect, useState } from 'react';
import Select from 'react-select';

function AddStoreUser() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [storeOptions, setStoreOptions] = useState<{ label: string; value: number }[]>([]);

  // ✅ Fetch Stores from API
  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await fetch(`${BASE_URL}store`);
        const data = await response.json();
        if (response.ok && data.success) {
          const stores = data.result?.stores || [];
          const options = stores.map((store: any) => ({
            value: store.id,
            label: store.name,
          }));
          setStoreOptions(options);
        } else {
          errorToast(data.message || 'Failed to fetch stores');
        }
      } catch (error) {
        errorToast('Error fetching stores');
      }
    };

    fetchStores();
  }, []);

  return (
    <ComponentContainerCard title="Add Store User">
      <Formik
        initialValues={{
          name: '',
          mobile: '',
          password: '',
          storeId: null,
        }}
        validationSchema={AddStoreUsersValidationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            const response = await fetch(`${BASE_URL}storeusers`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                name: values.name,
                mobile: values.mobile,
                password: values.password,
                storeId: values.storeId,
              }),
            });

            const data = await response.json();
            if (response.ok && data.success) {
              successToast('Submitted successfully');
              resetForm();
              navigate('/app/ecommerce/storeuser');
            } else {
              errorToast(data.message || 'Failed to submit form');
            }
          } catch (error) {
            const errorMessage =
              error instanceof Error ? error.message : 'Unknown error occurred';
            errorToast(errorMessage);
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form>
            <Row>
              {/* Left Column */}
              <Col lg={6}>
                <Row className="mb-3">
                  <FormLabel htmlFor="name" className="col-sm-3 col-form-label text-start">
                    Store User Name
                  </FormLabel>
                  <Col sm={9}>
                    <Field
                      as={FormControl}
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter store user name"
                    />
                    <ErrorMessage name="name" component="div" className="text-danger" />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <FormLabel htmlFor="mobile" className="col-sm-3 col-form-label text-start">
                    Mobile
                  </FormLabel>
                  <Col sm={9}>
                    <Field
                      as={FormControl}
                      type="text"
                      id="mobile"
                      name="mobile"
                      placeholder="Enter mobile number"
                    />
                    <ErrorMessage name="mobile" component="div" className="text-danger" />
                  </Col>
                </Row>

              
              </Col>

              {/* Right Column */}
              <Col lg={6}>
                {/* ✅ Store Dropdown (React Select) */}
                <Row className="mb-3">
                  <FormLabel htmlFor="storeId" className="col-sm-3 col-form-label text-start">
                    Store
                  </FormLabel>
                  <Col sm={9}>
                    <Select
                      id="storeId"
                      name="storeId"
                      placeholder="Select store..."
                      options={storeOptions}
                      value={storeOptions.find((opt) => opt.value === values.storeId) || null}
                      onChange={(selectedOption) =>
                        setFieldValue('storeId', selectedOption ? selectedOption.value : null)
                      }
                      isSearchable
                      classNamePrefix="react-select"
                    />
                    <ErrorMessage name="storeId" component="div" className="text-danger mt-1" />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <FormLabel htmlFor="password" className="col-sm-3 col-form-label text-start">
                    Password
                  </FormLabel>
                  <Col sm={9}>
                    <div className="position-relative">
                      <Field
                        as={FormControl}
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        placeholder="Enter password"
                      />
                      <span
                        role="button"
                        className="position-absolute top-50 end-0 translate-middle-y me-3 text-secondary"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        <IconifyIcon
                          icon={showPassword ? 'la:eye-slash' : 'la:eye'}
                          className="fs-18"
                        />
                      </span>
                    </div>
                    <ErrorMessage name="password" component="div" className="text-danger" />
                  </Col>
                </Row>
              </Col>
            </Row>

            <div className="d-flex align-items-start mt-3">
              <Button type="submit" variant="primary" className="me-2" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
              <Link to="/app/ecommerce/storeuser">
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

export default AddStoreUser;
