import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Button, Col, FormControl, FormLabel, FormSelect, Row } from 'react-bootstrap';
import ComponentContainerCard from '@/components/ComponentContainerCard';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { errorToast, successToast } from '@/utils/toastMassage';
import { BASE_URL, HomeBannerValidationSchema } from '@/types/validationSchema';

function EditHomeBanner() {
  const location = useLocation();
  const item = location.state.original;
  const navigate = useNavigate();

  return (
    <ComponentContainerCard title="Edit Home Banner">
      <Formik
        initialValues={{
          section: item.section || '',
          type: item.type || '',
          image: '',
          url: item.url || '',
        }}
        validationSchema={HomeBannerValidationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          const formData = new FormData();
          formData.append('section', values.section);
          formData.append('type', values.type);
          formData.append('url', values.url);

          if (values.image) {
            formData.append('image', values.image);
          }

          fetch(`${BASE_URL}homebanner/${item.id}`, {
            method: 'PUT',
            body: formData,
          })
            .then(async (response) => {
              if (response.ok) {
                resetForm();
                navigate('/app/ecommerce/banner');
                successToast('Updated Successfully');
              } else {
                const data = await response.json();
                errorToast(data.message || 'Something went wrong!');
              }
            })
            .catch((error) => {
              errorToast(error.message || 'Something went wrong!');
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

export default EditHomeBanner;
