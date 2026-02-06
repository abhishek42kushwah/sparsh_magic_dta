import { Button, Col, FormControl, FormLabel, FormSelect, Row, Spinner } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import ComponentContainerCard from '../../../../../../components/ComponentContainerCard';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { uploadImageToServer } from '@/hooks/uploadImage';
import { BASE_URL, EditSubCategoryValidationSchema } from '@/types/validationSchema';
import { errorToast, successToast } from '@/utils/toastMassage';

type OptionType = { value: string; label: string };

function EditSubCategory() {
  const [mainCatOptions, setMainCatOptions] = useState<OptionType[]>([]);
  const [masterCat, setMasterCat] = useState<{ id: string; name: string }[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { original } = location?.state;

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
        const options =
          data.result?.mainCats?.map((cat: { id: string; name: string }) => ({
            value: cat.name,
            label: cat.name,
          })) || [];

        setMainCatOptions(options);
      }
    } catch (error: any) {
      toast.error(error.message || 'Error fetching main categories');
    }
  };

  const fetchMasterCat = async () => {
    try {
      const response = await fetch(`${BASE_URL}mastercat`);
      const data = await response.json();

      if (data.success) {
        setMasterCat(data.result?.masterCats || []);
      }
    } catch (error: any) {
      toast.error(error.message || 'Error fetching master categories');
    }
  };

  useEffect(() => {
    fetchMasterCat();

    if (original?.masterCat) {
      handleMasterCatChange(
        { target: { value: original.masterCat } } as React.ChangeEvent<HTMLSelectElement>,
        () => {}
      );
    }
  }, [original?.masterCat]);

  return (
    <ComponentContainerCard title="Edit Sub Category">
      <Formik
        initialValues={{
          name: original?.name || '',
          image: original?.image || '', // important fix
          masterCat: original?.masterCat || '',
          mainCat: original?.mainCat
            ? original.mainCat.split(',').map((cat: string) => ({
                value: cat,
                label: cat,
              }))
            : [],
        }}
        validationSchema={EditSubCategoryValidationSchema}
        onSubmit={async (values, { resetForm, setSubmitting }) => {
          try {
            const formattedMainCat = values.mainCat.map((o: OptionType) => o.value).join(',');

            const payload = {
              name: values.name,
              imageName: values.image,
              masterCat: values.masterCat,
              mainCat: formattedMainCat,
            };

            const response = await fetch(`${BASE_URL}subcat?name=${original?.name}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok && data.success) {
              toast.success('Sub Category Updated Successfully');
              resetForm();
              navigate('/apps/ecommerce/subcategory');
            } else {
              toast.error(data.message || 'Failed to update Sub Category');
            }
          } catch (err: any) {
            toast.error(err.message || 'Something went wrong');
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ handleSubmit, setFieldValue, values, touched, errors, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <Row>
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
                        if (!file) return; 

                        try {
                          const uploadedFile = await uploadImageToServer(file);
                          setFieldValue('image', uploadedFile);
                          successToast('Image uploaded successfully!');
                        } catch (err: any) {
                          errorToast(err.message || 'Failed to upload image');
                        }
                      }}
                      isInvalid={touched.image && !!errors.image}
                    />
                    <ErrorMessage name="image" component="div" className="text-danger" />

                   
                  </Col>
                </Row>
              </Col>

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
                    />
                    <ErrorMessage name="mainCat" component="div" className="text-danger" />
                  </Col>
                </Row>
              </Col>

              <div className="d-flex align-items-start">
                <Button type="submit" variant="primary" className="me-2" disabled={isSubmitting}>
                  {isSubmitting ? <Spinner animation="border" size="sm" /> : 'Submit'}
                </Button>

                <Link to="/apps/ecommerce/subcategory">
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

export default EditSubCategory;
