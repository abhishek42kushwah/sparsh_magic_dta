import { Button, Col, FormControl, FormLabel, FormSelect, Row } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import ComponentContainerCard from '../../../../../../components/ComponentContainerCard';
import { uploadImageToServer } from '@/hooks/uploadImage';
import { Link, useNavigate } from 'react-router-dom';
import { errorToast, successToast } from '@/utils/toastMassage';
import { BASE_URL, AddSubCategoryValidationSchema } from "@/types/validationSchema";

type OptionType = { value: string; label: string };

function AddSubCategory() {
  const [mainCatOptions, setMainCatOptions] = useState<OptionType[]>([]);
  const [masterCat, setMasterCat] = useState<{ id: string; name: string }[]>([]);
  const navigate = useNavigate();

  const handleMasterCatChange = async (
    e: React.ChangeEvent<HTMLSelectElement>,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const selectedMasterCat = e.target.value;

    setFieldValue('masterCat', selectedMasterCat);
    setFieldValue('mainCat', []);
    setMainCatOptions([]);

    if (!selectedMasterCat) return;

    try {
      const response = await fetch(`${BASE_URL}fetchmaincategory?name=${selectedMasterCat}`);
      const data = await response.json();

      if (data.success) {
        const options = data.result?.mainCats?.map((cat: { id: string; name: string }) => ({
          value: cat.name,
          label: cat.name,
        })) || [];

        setMainCatOptions(options);
      } else {
        errorToast('Failed to fetch main categories');
      }
    } catch {
      errorToast('Error fetching main categories');
    }
  };

  const fetchMasterCat = async () => {
    try {
      const response = await fetch(`${BASE_URL}mastercat`);
      const data = await response.json();

      if (data.success) {
        setMasterCat(data.result?.masterCats || []);
      } else {
        errorToast('Failed to fetch master categories');
      }
    } catch {
      errorToast('Error fetching master categories');
    }
  };

  useEffect(() => {
    fetchMasterCat();
  }, []);

  return (
    <ComponentContainerCard title="Add Sub Category">
      <Formik
        initialValues={{ name: '', image: '', masterCat: '', mainCat: [] as OptionType[] }}
        validationSchema={AddSubCategoryValidationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            const formattedMainCat = values.mainCat.map((o) => o.value).join(',');

            const payload = {
              name: values.name,
              imageName: values.image,
              masterCat: values.masterCat,
              mainCat: formattedMainCat,
            };

            const response = await fetch(`${BASE_URL}subcat`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok && data.success) {
              successToast('Added Successfully');
              resetForm();
              navigate('/apps/ecommerce/subcategory');
            } else {
              errorToast(data.message || 'Failed to add subcategory');
            }
          } catch (error: any) {
            errorToast(error.message || 'An error occurred');
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ handleSubmit, setFieldValue, values, touched, errors, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <Row>
              {/* Left Side */}
              <Col lg={6}>
                <Row className="mb-3">
                  <FormLabel htmlFor="name" className="col-sm-3 col-form-label text-start">
                    Name
                  </FormLabel>
                  <Col sm={9}>
                    <Field
                      name="name"
                      as={FormControl}
                      isInvalid={touched.name && !!errors.name}
                    />
                    <ErrorMessage name="name" component="div" className="text-danger" />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <FormLabel htmlFor="image" className="col-sm-3 col-form-label text-start">
                    Image
                  </FormLabel>
                  <Col sm={9}>
                    <FormControl
                      type="file"
                      accept="image/*"
                      onChange={async (event) => {
                        const file = (event.currentTarget as HTMLInputElement).files?.[0];
                        if (!file) {
                          setFieldValue('image', '');
                          return;
                        }

                        try {
                          const uploadedFile = await uploadImageToServer(file);
                          setFieldValue('image', uploadedFile);
                          successToast('Image uploaded successfully!');
                        } catch (err: any) {
                          errorToast(err.message || 'Failed to upload image');
                          setFieldValue('image', '');
                        }
                      }}
                      isInvalid={touched.image && !!errors.image}
                    />
                    <ErrorMessage name="image" component="div" className="text-danger" />
                  </Col>
                </Row>
              </Col>

              {/* Right Side */}
              <Col lg={6}>
                <Row className="mb-3">
                  <FormLabel htmlFor="masterCat" className="col-sm-3 col-form-label text-start">
                    Master Category
                  </FormLabel>
                  <Col sm={9}>
                    <FormSelect
                      id="masterCat"
                      value={values.masterCat}
                      onChange={(e) => handleMasterCatChange(e, setFieldValue)}
                      isInvalid={touched.masterCat && !!errors.masterCat}
                    >
                      <option value="">Select Master Category</option>
                      {masterCat.map((cat) => (
                        <option key={cat.id} value={cat.name}>
                          {cat.name}
                        </option>
                      ))}
                    </FormSelect>
                    <ErrorMessage name="masterCat" component="div" className="text-danger" />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <FormLabel htmlFor="mainCat" className="col-sm-3 col-form-label text-start">
                    Main Category
                  </FormLabel>
                  <Col sm={9}>
                    <Select
                      id="mainCat"
                      isMulti
                      options={mainCatOptions}
                      value={values.mainCat}
                      onChange={(selected) => setFieldValue('mainCat', selected)}
                      className={touched.mainCat && errors.mainCat ? 'is-invalid' : ''}
                    />
                    <ErrorMessage name="mainCat" component="div" className="text-danger" />
                  </Col>
                </Row>
              </Col>
            </Row>

            <div className="d-flex align-items-start mt-3">
              <Button type="submit" variant="primary" disabled={isSubmitting} className="me-2">
                Submit
              </Button>

              <Link to="/apps/ecommerce/subcategory">
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

export default AddSubCategory;
