import { useEffect, useState } from "react";
import {
  Button,
  Col,
  FormControl,
  FormLabel,
  FormSelect,
  Row
} from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import ComponentContainerCard from "@/components/ComponentContainerCard";
import { Link, useNavigate } from "react-router-dom";
import { AddBrandValidationSchema, BASE_URL } from "@/types/validationSchema";
import { successToast, errorToast } from "@/utils/toastMassage";
import { uploadImageToServer } from "@/hooks/uploadImage";

// ------------------ Types ------------------

interface BrandFormValues {
  name: string;
  masterCat: string;
  image: string;
}

interface Category {
  id: string;
  name: string;
}

interface ApiResponse {
  success: boolean;
  message?: string;
  result?: any;
}

const AddBrand = () => {
  const initialValues: BrandFormValues = {
    name: "",
    masterCat: "",
    image: ""
  };

  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();

  // ------------------ Fetch Categories ------------------

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${BASE_URL}mastercat`);
        const data: ApiResponse = await response.json();

        if (Array.isArray(data.result?.masterCats)) {
          setCategories(data.result.masterCats);
        }
      } catch (error) {
        errorToast("Failed to load categories");
      }
    };

    fetchCategories();
  }, []);

  // ------------------ Submit Handler ------------------

  const handleSubmit = async (
    values: BrandFormValues,
    { resetForm }: FormikHelpers<BrandFormValues>
  ) => {
    try {
      if (!values.image) {
        errorToast("Image is required");
        return;
      }

      const payload = {
        name: values.name,
        masterCat: values.masterCat,
        imageName: values.image
      };

      const response = await fetch(`${BASE_URL}brandlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result: ApiResponse = await response.json();

      if (response.ok && result.success) {
        successToast("Brand created successfully");
        resetForm();
        navigate("/apps/ecommerce/brand");
      } else {
        errorToast(result.message || "Something went wrong");
      }
    } catch (error) {
      errorToast("Failed to create brand");
    }
  };

  // ------------------ JSX ------------------

  return (
    <ComponentContainerCard title="Add Brand">
      <Formik
        initialValues={initialValues}
        validationSchema={AddBrandValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, errors, touched }) => (
          <Form>
            <Row>
              {/* LEFT COLUMN */}
              <Col lg="6">
                {/* Name Field */}
                <Row className="mb-3">
                  <FormLabel className="col-sm-2 col-form-label text-start">
                    Name
                  </FormLabel>
                  <Col sm="10">
                    <Field
                      as={FormControl}
                      type="text"
                      name="name"
                      isInvalid={touched.name && !!errors.name}
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-danger mt-1"
                    />
                  </Col>
                </Row>

                {/* Master Category */}
                <Row className="mb-3">
                  <FormLabel className="col-sm-2 col-form-label text-start">
                    Master Category
                  </FormLabel>
                  <Col sm="10">
                    <Field
                      as={FormSelect}
                      name="masterCat"
                      isInvalid={touched.masterCat && !!errors.masterCat}
                    >
                      <option value="">Select</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.name}>
                          {cat.name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="masterCat"
                      component="div"
                      className="text-danger mt-1"
                    />
                  </Col>
                </Row>
              </Col>

              {/* RIGHT COLUMN */}
              <Col lg="6">
                {/* Image Upload */}
                <Row className="mb-3">
                  <FormLabel className="col-sm-3 col-form-label text-start">
                    Image
                  </FormLabel>
                  <Col sm="9">
                    <FormControl
                      type="file"
                      accept="image/*"
                      onChange={async (event) => {
                        const file =
                          (event.target as HTMLInputElement).files?.[0];
                        if (file) {
                          try {
                            const uploadedImageName =
                              await uploadImageToServer(file);
                            setFieldValue("image", uploadedImageName);
                            successToast("Image uploaded successfully!");
                          } catch (error: any) {
                            errorToast(
                              error.message || "Failed to upload image"
                            );
                            setFieldValue("image", "");
                          }
                        } else {
                          setFieldValue("image", "");
                        }
                      }}
                      isInvalid={touched.image && !!errors.image}
                    />

                    <ErrorMessage
                      name="image"
                      component="div"
                      className="text-danger mt-1"
                    />
                  </Col>
                </Row>
              </Col>

              {/* ACTIONS */}
              <div className="d-flex align-items-start mt-2">
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
};

export default AddBrand;
