import React, { useState, useEffect } from 'react';
import { Button, Col, FormControl, FormLabel, FormSelect, Row, Spinner } from 'react-bootstrap';
import ComponentContainerCard from '../../../../../../components/ComponentContainerCard';
import { Formik, Form, FormikHelpers, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { BASE_URL, AddMainCategoryValidationSchema } from '@/types/validationSchema';
import { errorToast, successToast } from '@/utils/toastMassage';
import { uploadImageToServer } from '@/hooks/uploadImage';
interface MasterCategory {
  id: string;
  name: string;
}

interface FormValues {
  name: string;
  masterCat: string;
  image: string;
}

const AddMainCategory: React.FC = () => {
  const [masterCategories, setMasterCategories] = useState<MasterCategory[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const initialValues: FormValues = {
    name: '',
    masterCat: '',
    image: ''
  };

  const handleSubmit = async (values: FormValues, { resetForm }: FormikHelpers<FormValues>) => {
    setSubmitting(true);
    try {
      const payload = {
        name: values.name,
        masterCat: values.masterCat,
        showHome: '1',
        imageName: values.image
      };

      const response = await fetch(`${BASE_URL}maincat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        successToast(data.message || 'Category added successfully');
        resetForm();
        navigate('/apps/ecommerce/category');
      } else {
        throw new Error(data.message || 'Failed to add category');
      }
    } catch (error: any) {
      errorToast(error.message || 'Unexpected error occurred. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchMasterCategories = async () => {
      try {
        const response = await fetch(`${BASE_URL}mastercat`);
        if (!response.ok) throw new Error('Failed to load master categories');

        const data = await response.json();
        if (data.success && Array.isArray(data.result.masterCats)) {
          setMasterCategories(data.result.masterCats);
        } else {
          throw new Error(data.message || 'No master categories found');
        }
      } catch (error: any) {
        toast.error(error.message || 'Unable to fetch master categories', { position: 'top-right' });
      }
    };
    fetchMasterCategories();
  }, []);

  return (
    <ComponentContainerCard title="Add Main Category">
      <Formik initialValues={initialValues} validationSchema={AddMainCategoryValidationSchema} onSubmit={handleSubmit}>
        {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => (
          <Form>
            <Row>
              {/* LEFT COLUMN */}
              <Col lg="6">
                <Row className="mb-3">
                  <FormLabel htmlFor="name" className="col-sm-2 col-form-label text-start">
                    Name
                  </FormLabel>
                  <Col sm="10">
                    <FormControl
                      type="text"
                      id="name"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.name && !!errors.name}
                    />
                    <FormControl.Feedback type="invalid">{errors.name}</FormControl.Feedback>
                  </Col>
                </Row>

                <Row className="mb-3">
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
                      {masterCategories.map((category) => (
                        <option key={category.id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </FormSelect>
                    <FormControl.Feedback type="invalid">{errors.masterCat}</FormControl.Feedback>
                  </Col>
                </Row>
              </Col>

              {/* RIGHT COLUMN */}
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

              {/* ACTION BUTTONS */}
              <div className="d-flex align-items-start">
                <Button type="submit" variant="primary" className="me-1" disabled={submitting}>
                  {submitting ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Submitting...
                    </>
                  ) : (
                    'Submit'
                  )}
                </Button>

                <Link to="/apps/ecommerce/category">
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
};

export default AddMainCategory;
