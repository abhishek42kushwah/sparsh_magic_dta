import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Button, Col, FormControl, FormLabel, FormSelect, Row } from 'react-bootstrap';
import ComponentContainerCard from '@/components/ComponentContainerCard';
import { Link, useNavigate } from 'react-router-dom';
import { errorToast, successToast } from '@/utils/toastMassage';
import { BASE_URL, HomeBannerValidationSchema } from '@/types/validationSchema';

function AddHomeBanner() {
  const navigate = useNavigate();

  return (
    <ComponentContainerCard title="Add Home Banner">
      <Formik
        initialValues={{
          section: '',
          type: '',
          image: '',
          url: '',
        }}
        validationSchema={HomeBannerValidationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          const formData = new FormData();
          Object.entries(values).forEach(([key, value]) => {
            formData.append(key, value);
          });

          fetch(`${BASE_URL}homebanner`, {
            method: 'POST',
            body: formData,
          })
            .then(async (response) => {
              const data = await response.json();
              if (response.ok && data.success) {
                resetForm();
                successToast('Added Successfully');
                navigate('/app/ecommerce/banner');
              } else {
                errorToast(data.message || 'Something went wrong, please try again later');
              }
            })
            .catch(() => {
              errorToast('Something went wrong, please try again later');
            })
            .finally(() => {
              setSubmitting(false);
            });
        }}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form>
            <Row>
              <Col lg="6">
                <Row className="mb-3">
                  <FormLabel htmlFor="section" className="col-sm-2 col-form-label text-start">
                    Section
                  </FormLabel>
                  <Col sm="10">
                    <Field as={FormSelect} id="section" name="section">
                      <option value="">Select section</option>
                      <option value="TOP">TOP</option>
                      <option value="BOTTOM">BOTTOM</option>
                    </Field>
                    <ErrorMessage name="section" component="div" className="text-danger" />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <FormLabel htmlFor="type" className="col-sm-2 col-form-label text-start">
                    Type
                  </FormLabel>
                  <Col sm="10">
                    <Field as={FormSelect} id="type" name="type">
                      <option value="">Select type</option>
                      <option value="APP">APP</option>
                      <option value="WEB">WEB</option>
                    </Field>
                    <ErrorMessage name="type" component="div" className="text-danger" />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <FormLabel htmlFor="url" className="col-sm-2 col-form-label text-start">
                    URL
                  </FormLabel>
                  <Col sm="10">
                    <Field as={FormControl} type="text" id="url" name="url" />
                    <ErrorMessage name="url" component="div" className="text-danger" />
                  </Col>
                </Row>
              </Col>

              <Col lg="6">
                <Row className="mb-3">
                  <FormLabel htmlFor="image" className="col-sm-2 col-form-label text-start">
                    Image
                  </FormLabel>
                  <Col sm="10">
                    <FormControl
                      type="file"
                      id="image"
                      name="image"
                      onChange={(event) => {
                        const file = (event.currentTarget as HTMLInputElement).files?.[0];
                        if (file) {
                          setFieldValue('image', file);
                        }
                      }}
                    />
                    <ErrorMessage name="image" component="div" className="text-danger" />
                  </Col>
                </Row>
              </Col>
            </Row>

            <div className="d-flex align-items-start">
              <Button type="submit" variant="primary" className="me-1" disabled={isSubmitting}>
                Submit{' '}
                {isSubmitting && (
                  <span
                    className="spinner-border spinner-border-sm ms-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                )}
              </Button>
              <Link to="/app/ecommerce/banner">
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

export default AddHomeBanner;
