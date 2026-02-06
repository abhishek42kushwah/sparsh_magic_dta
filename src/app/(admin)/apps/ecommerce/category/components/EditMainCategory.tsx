import { useState, useEffect } from "react";
import {
  Button,
  Col,
  FormControl,
  FormLabel,
  FormSelect,
  Row,
  Spinner
} from "react-bootstrap";
import ComponentContainerCard from "../../../../../../components/ComponentContainerCard";
import { Formik, Form, ErrorMessage } from "formik";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { BASE_URL } from "@/types/validationSchema";
import { uploadImageToServer } from "@/hooks/uploadImage";
import { errorToast, successToast } from "@/utils/toastMassage";
import * as Yup from "yup";

const EditMainCategory = () => {
  const [masterCategories, setMasterCategories] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const location = useLocation();
  const item = location.state?.original;
  const navigate = useNavigate();

  const initialValues = {
    name: item?.name || "",
    masterCat: item?.masterCat || "",
    image: item?.image || "" // keep existing image
  };

  const EditMainCategoryValidationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    masterCat: Yup.string().required("Master Category is required"),
    image: Yup.string().nullable()
  });

  interface FormValues {
    name: string;
    masterCat: string;
    image: string;
  }

  const handleSubmit = async (
    values: FormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    setSubmitting(true);

    try {
      const payload = {
        id: item?.id,
        name: values.name,
        masterCat: values.masterCat,
        image: values.image
      };

      const response = await fetch(
        `${BASE_URL}maincat?name=${encodeURIComponent(item?.name)}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        }
      );

      const data = await response.json();

      if (!response.ok) throw new Error(data?.message || "Update failed");

      successToast(data?.message || "Category updated successfully");

      resetForm();
      navigate("/apps/ecommerce/category");
    } catch (error:any) {
      errorToast(error.message || "Failed to update category");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchMasterCategories = async () => {
      try {
        const response = await fetch(`${BASE_URL}mastercat`);
        if (!response.ok) throw new Error("Failed to load master categories");

        const data = await response.json();

        if (data?.success && Array.isArray(data?.result?.masterCats)) {
          setMasterCategories(data.result.masterCats);
        } else {
          throw new Error("No master categories found");
        }
      } catch (error:any) {
        errorToast(error.message);
      }
    };

    fetchMasterCategories();
  }, []);

  return (
    <ComponentContainerCard title="Edit Main Category">
      <Formik
        initialValues={initialValues}
        validationSchema={EditMainCategoryValidationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, handleChange, handleBlur, setFieldValue, errors, touched }) => (
          <Form>
            <Row>
              <Col lg="6">
                <Row className="mb-3">
                  <FormLabel className="col-sm-2 col-form-label text-start">
                    Name
                  </FormLabel>
                  <Col sm="10">
                    <FormControl
                      type="text"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.name && !!errors.name}
                    />
                    <FormControl.Feedback type="invalid">
                      {typeof errors.name === "string" ? errors.name : ""}
                    </FormControl.Feedback>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <FormLabel className="col-sm-2 col-form-label text-start">
                    Master Category
                  </FormLabel>
                  <Col sm="10">
                    <FormSelect
                      name="masterCat"
                      value={values.masterCat}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.masterCat && !!errors.masterCat}
                    >
                      <option value="">Select</option>
                      {masterCategories.map((cat:any) => (
                        <option key={cat.id} value={cat.name}>
                          {cat.name}
                        </option>
                      ))}
                    </FormSelect>

                    <FormControl.Feedback type="invalid">
                      {typeof errors.masterCat === "string" ? errors.masterCat : ""}
                    </FormControl.Feedback>
                  </Col>
                </Row>
              </Col>

              <Col lg="6">
                <Row className="mb-3">
                  <FormLabel className="col-sm-3 col-form-label text-start">
                    Image
                  </FormLabel>
                  <Col sm="9">
                    <FormControl
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = (e.currentTarget as HTMLInputElement).files?.[0];
                        if (!file) return;

                        try {
                          const uploadedName = await uploadImageToServer(file);
                          setFieldValue("image", uploadedName);
                          successToast("Image uploaded successfully");
                        } catch (err) {
                          errorToast("Image upload failed");
                        }
                      }}
                    />
                    <ErrorMessage
                      name="image"
                      component="div"
                      className="text-danger mt-1"
                    />
                  </Col>
                </Row>
              </Col>

              <div className="d-flex align-items-start">
                <Button type="submit" variant="primary" className="me-1" disabled={submitting}>
                  {submitting ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" /> Updating...
                    </>
                  ) : (
                    "Update"
                  )}
                </Button>

                <Link to={"/apps/ecommerce/category"}>
                  <Button variant="danger">Cancel</Button>
                </Link>
              </div>
            </Row>
          </Form>
        )}
      </Formik>
    </ComponentContainerCard>
  );
};

export default EditMainCategory;
