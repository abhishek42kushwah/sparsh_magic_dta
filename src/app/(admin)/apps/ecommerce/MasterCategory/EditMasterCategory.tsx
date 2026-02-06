import { Button, Col, FormControl, FormLabel, Row } from 'react-bootstrap';
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ComponentContainerCard from '@/components/ComponentContainerCard';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { errorToast, successToast } from '@/utils/toastMassage';
import { BASE_URL } from '@/types/validationSchema';
import { uploadImageToServer } from '@/hooks/uploadImage';
interface FormValues {
  name: string;
  image: string;
}

function EditMasterCat() {
  const navigate = useNavigate();
  const location = useLocation();
  const item = location?.state?.row;

  const initialValues: FormValues = {
    name: item?.name || '',
    image: item?.image || '', 
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Master Category is required'),
    image: Yup.string().nullable().notRequired(),
  });

  const handleSubmit = async (values: FormValues, { setSubmitting, resetForm }: FormikHelpers<FormValues>) => {
    try {
      const payload = {
        name: values.name,
        image: values.image,
      };

      const response = await fetch(`${BASE_URL}mastercat?name=${item.name}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        successToast('Updated successfully');
        resetForm();
        navigate('/apps/ecommerce/mastercategory');
      } else {
        errorToast(data.message || 'Failed to update');
      }
    } catch (error: any) {
      errorToast(error.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ComponentContainerCard title="Edit Master Category">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ errors, touched, setFieldValue, handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <Row>
              {/* Name */}
              <Col lg="6">
                <Row className="mb-3">
                  <FormLabel htmlFor="name" className="col-sm-2 col-form-label text-start">
                    Master Category
                  </FormLabel>
                  <Col sm="10">
                    <Field
                      type="text"
                      id="name"
                      name="name"
                      as={FormControl}
                      isInvalid={touched.name && !!errors.name}
                    />
                    <FormControl.Feedback type="invalid">
                      {typeof errors.name === 'string' ? errors.name : ''}
                    </FormControl.Feedback>
                  </Col>
                </Row>
              </Col>

              {/* Image */}
              <Col lg="6">
                <Row className="mb-3">
                  <FormLabel htmlFor="image" className="col-sm-3 col-form-label text-start">
                    Image
                  </FormLabel>
                  <Col sm="9">
                   <FormControl
                      type="file"
                      id="image"
                      name="image"
                      accept="image/*"
                      onChange={async (event) => {
                        const file = (event.currentTarget as HTMLInputElement).files?.[0];
                        if (file) {
                          try {
                            const uploadedImageName = await uploadImageToServer(file);
                            setFieldValue('image', uploadedImageName);
                            successToast('Image uploaded successfully!');
                          } catch (error: any) {
                            errorToast(error.message || 'Failed to upload image');
                            setFieldValue('image', '');
                          }
                        } else {
                          setFieldValue('image', '');
                        }
                      }}
                      isInvalid={touched.image && !!errors.image}
                    />
                    <ErrorMessage name="image" component="div" className="text-danger mt-1" />
                    <ErrorMessage name="image" component="div" className="text-danger mt-1" />
                  </Col>
                </Row>
              </Col>

              {/* Buttons */}
              <div className="d-flex align-items-start">
                <Button type="submit" variant="primary" className="me-2" disabled={isSubmitting}>
                  Submit{' '}
                  {isSubmitting && (
                    <span className="spinner-border spinner-border-sm ms-2" role="status" aria-hidden="true"></span>
                  )}
                </Button>
                <Link to="/apps/ecommerce/mastercategory">
                  <Button type="button" variant="danger">
                    Cancel
                  </Button>
                </Link>
              </div>
            </Row>
          </Form>
        )}
      </Formik>
    </ComponentContainerCard>
  );
}

export default EditMasterCat;
