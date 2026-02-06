import { useEffect, useState } from 'react';
import { Button, Col, FormControl, FormLabel, FormSelect, Row } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import ComponentContainerCard from '@/components/ComponentContainerCard';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { successToast, errorToast } from '@/utils/toastMassage';
import { EditBrandValidationSchema, BASE_URL } from '@/types/validationSchema';
import { uploadImageToServer } from '@/hooks/uploadImage';
function EditBrand() {
  const location = useLocation();
  const navigate = useNavigate();
  const item = location.state?.original;

  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${BASE_URL}mastercat`);
        const data = await response.json();
        if (Array.isArray(data.result?.masterCats)) {
          setCategories(data.result?.masterCats);
        }
      } catch (error: any) {
        errorToast(error.message);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (values: any, { resetForm }: { resetForm: () => void }) => {
    try {
      const payload = {
        name: values.name,
        masterCat: values.masterCat,
        imageName: values.image
      };

      const response = await fetch(`${BASE_URL}brandlist/${item?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        successToast('Brand updated successfully');
        resetForm();
        navigate('/apps/ecommerce/brand');
      } else {
        errorToast(result.message || 'Something went wrong');
      }
    } catch (error: any) {
      errorToast(error.message || 'Failed to update brand');
    }
  };

  return (
    <ComponentContainerCard title="Edit Brand">
      <Formik
        initialValues={{
          name: item?.name || '',
          masterCat: item?.masterCat || '',
          image: ''
        }}
        validationSchema={EditBrandValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, errors, touched }) => (
          <Form>
            <Row>
              <Col lg="6">
                <Row className="mb-3">
                  <FormLabel htmlFor="name" className="col-sm-2 col-form-label text-start">
                    Name
                  </FormLabel>
                  <Col sm="10">
                    <Field as={FormControl} type="text" id="name" name="name" isInvalid={touched.name && !!errors.name} />
                    <ErrorMessage name="name" component="div" className="text-danger" />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <FormLabel htmlFor="masterCat" className="col-sm-2 col-form-label text-start">
                    Master Category
                  </FormLabel>
                  <Col sm="10">
                    <Field as={FormSelect} id="masterCat" name="masterCat" isInvalid={touched.masterCat && !!errors.masterCat}>
                      <option value="">Select</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.name}>
                          {cat.name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name="masterCat" component="div" className="text-danger" />
                  </Col>
                </Row>
              </Col>

              <Col lg="6">
                {/* Image Upload */}
                <Row className="mb-3">
                  <FormLabel className="col-sm-3 col-form-label text-start">Image</FormLabel>
                  <Col sm="9">
                    <FormControl
                      type="file"
                      accept="image/*"
                      onChange={async (event) => {
                        const file = (event.target as HTMLInputElement).files?.[0];
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
                  </Col>
                </Row>
              </Col>

              <div className="d-flex align-items-start">
                <Button type="submit" variant="primary" className="me-1">
                  Submit
                </Button>
                <Link to="/apps/ecommerce/brand">
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

export default EditBrand;
