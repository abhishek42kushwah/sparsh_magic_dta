import { Button, Col, FormControl, FormLabel, Row } from 'react-bootstrap';
import ComponentContainerCard from '../../../../../../components/ComponentContainerCard';
import { Formik, Form, ErrorMessage } from 'formik';
import { BASE_URL, AddProductValidation } from '@/types/validationSchema';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { oumOptions } from '@/types/staticData';
import { errorToast, successToast } from '@/utils/toastMassage';
import { debounce } from 'lodash';
import { uploadImageToServer } from '@/hooks/uploadImage';
const AddNewProduct = () => {
  const initialValues = {
    storeId: '',
    stock: '',
    DisplayName: '',
    name: '',
    BuyPrice: '',
    sellPrice: '',
    description: '',
    masterCat: '',
    oum_qty: '',
    oum:'',
    drug: '',
    packagingType: '',
    usage: '',
    igst: '',
    hsnCode: '',
    package_qty: '',
    alternateMedicine: [] as string[],
    mainCat: '',
    subCat: [] as string[],
    image: null,
    brand: '',
    metaTitle: '',
    metaDes: ''
  };
  const [mainCatOptions, setMainCatOptions] = useState([]);
  const [masterCatOptions, setMasterCatOptions] = useState([]);
  const [alternateMedicineOptions, setAlternateMedicineOptions] = useState<{ value: string; label: string }[]>([]);
  const [storeOptions, setStoreOptions] = useState<{ value: string; label: string }[]>([]);
  const [subCatOptions, setSubCatOptions] = useState<{ value: string; label: string }[]>([]);
  const [allBrands, setAllBrands] = useState([]);
  const [medicineSearch, setMedicineSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const brandOptions = allBrands
    ? [...new Set(allBrands.map((item: any) => item?.name))].map((brand) => ({
        value: brand,
        label: brand
      }))
    : [];

  const handleSubmit = async (values: any, { resetForm }: { resetForm: any }) => {
    const formatMultiSelect = (arr: string[] | undefined | null) => (Array.isArray(arr) && arr.length ? arr.join(', ') : '');

    const payload = {
      storeId: values.storeId,
      stocks: values.stock === 'true',
      DisplayName: values.DisplayName,
      name: values.name,
      drug: values.drug,
      BuyPrice: values.BuyPrice,
      sellPrice: values.sellPrice,
      description: values.description,
      masterCat: values.masterCat,
      package_qty: values.package_qty,
      usage: values.usage,
      packagingType: values.packagingType,
      hsnCode: values.hsnCode,
      igst: values.igst,
      oum_qty: values.oum_qty,
      oum:values.oum,
      alternateMedicine: formatMultiSelect(values.alternateMedicine),
      mainCat: values.mainCat,
      subCat: formatMultiSelect(values.subCat),
      brand: values.brand,
      metaTitle: values.metaTitle,
      metaDes: values.metaDes,
      imageName: values.image || null
    };


    const apiUrl = `${BASE_URL}products`;
    setLoading(true);

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      let data: any;
      try {
        data = await response.json();
      } catch {
        throw new Error('Invalid response format from server');
      }

      if (!response.ok) {
        const errorMsg = data?.message || (Array.isArray(data?.errors) ? data.errors.join(', ') : 'Server error occurred');
        throw new Error(errorMsg);
      }

      if (data?.success) {
        successToast(data?.message || 'Product submitted successfully');
        resetForm();
        navigate('/apps/ecommerce/products');
      } else {
        throw new Error(data?.message || 'Something went wrong');
      }
    } catch (error: any) {
      errorToast(error.message || 'Failed to submit form');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await fetch(`${BASE_URL}store`);
        const data = await response.json();
        if (data.success && Array.isArray(data.result?.stores)) {
          const options = data.result.stores.map((s: any) => ({
            value: s._id || s.id || String(s.storeId || ''),
            label: s.name || s.storeName || s.store || 'Unknown'
          }));
          setStoreOptions(options);
        } else {
          setStoreOptions([]);
        }
      } catch (err: any) {
        errorToast(err?.message || 'Failed to load stores');
      }
    };

    fetchStores();
  }, []);

  const fetchProducts = useCallback(
    debounce(async (searchTerm: string) => {
      try {
        const response = await fetch(`${BASE_URL}products?DisplayName=${encodeURIComponent(searchTerm)}`);
        const data = await response.json();
        if (data.success && data.result?.products?.length > 0) {
          const options = data.result.products.map((product: any) => ({
            value: product.name,
            label: product.name
          }));
          setAlternateMedicineOptions(options);
        } else {
          setAlternateMedicineOptions([]);
        }
      } catch (error: any) {
        errorToast(error.message);
      }
    }, 500),
    []
  );

  useEffect(() => {
    fetchProducts(medicineSearch);
  }, [medicineSearch, fetchProducts]);

  useEffect(() => {
    const fetchMasterCat = async () => {
      try {
        const response = await fetch(`${BASE_URL}mastercat`);
        const data = await response.json();
        if (data.success && data.result.masterCats.length > 0) {
          setMasterCatOptions(data.result.masterCats.map((cat: { name: string }) => ({ value: cat.name, label: cat.name })));
        } else {
          setMasterCatOptions([]);
        }
      } catch (error: any) {
        errorToast(error.message);
      }
    };
    fetchMasterCat();
  }, []);
  const handleMasterCatChange = async (selectedOption: { value: string } | null, setFieldValue: (field: string, value: any) => void) => {
    const selectedMasterCat = selectedOption?.value || '';
    setFieldValue('masterCat', selectedMasterCat);
    setFieldValue('mainCat', '');
    setFieldValue('subCat', []);

    setMainCatOptions([]);
    setSubCatOptions([]);

    if (selectedMasterCat) {
      try {
        const response = await fetch(`${BASE_URL}fetchmaincategory?name=${selectedMasterCat}`);
        const data = await response.json();
        if (response.ok && data.result?.mainCats.length > 0) {
          setMainCatOptions(data.result?.mainCats.map((cat: { name: string }) => ({ value: cat.name, label: cat.name })));
        } else {
          setMainCatOptions([]);
        }
      } catch (error) {}
    } else {
      setMainCatOptions([]);
    }
  };

  const handleMainCatChange = async (selectedOption: { value: string } | null, setFieldValue: (field: string, value: any) => void) => {
    const selectedMainCat = selectedOption?.value || '';
    setFieldValue('mainCat', selectedMainCat);
    setFieldValue('subCat', []);

    setSubCatOptions([]);

    if (selectedMainCat) {
      try {
        const response = await fetch(`${BASE_URL}fetchsubcategory?name=${selectedMainCat}`);
        const data = await response.json();
        if (response.ok && data.result?.subCats.length > 0) {
          setSubCatOptions(data.result?.subCats.map((cat: { name: string }) => ({ value: cat.name, label: cat.name })));
        } else {
          setSubCatOptions([]);
        }
      } catch (error: any) {
        errorToast(error.message);
      }
    } else {
      setSubCatOptions([]);
    }
  };

  useEffect(() => {
    const fetchBrandData = async () => {
      try {
        const response = await fetch(`${BASE_URL}brandlist`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();

        if (data.success && data.result) {
          setAllBrands(data.result?.brands);
        }
      } catch (error) {}
    };

    fetchBrandData();
  }, []);

  return (
    <ComponentContainerCard title="Add Product">
      <Formik initialValues={initialValues} validationSchema={AddProductValidation} onSubmit={handleSubmit}>
        {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => (
          <Form>
            <Row>
              <Col lg="6">
                <Row className="mb-3">
                  <FormLabel htmlFor="name" className="col-sm-2 col-form-label text-start">
                    Product Name
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
                  <FormLabel htmlFor="DisplayName" className="col-sm-2 col-form-label text-start">
                    Display Name
                  </FormLabel>
                  <Col sm="10">
                    <FormControl
                      type="text"
                      id="DisplayName"
                      name="DisplayName"
                      value={values.DisplayName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.DisplayName && !!errors.DisplayName}
                    />
                    <FormControl.Feedback type="invalid">{errors.DisplayName}</FormControl.Feedback>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <FormLabel htmlFor="drug" className="col-sm-2 col-form-label text-start">
                    Drug
                  </FormLabel>
                  <Col sm="10">
                    <FormControl
                      type="text"
                      id="drug"
                      name="drug"
                      value={values.drug}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.drug && !!errors.drug}
                    />
                    <FormControl.Feedback type="invalid">{errors.drug}</FormControl.Feedback>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <FormLabel htmlFor="usage" className="col-sm-2 col-form-label text-start">
                    Usage
                  </FormLabel>
                  <Col sm="10">
                    <FormControl
                      type="text"
                      id="usage"
                      name="usage"
                      value={values.usage}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.usage && !!errors.usage}
                    />
                    <FormControl.Feedback type="invalid">{errors.usage}</FormControl.Feedback>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <FormLabel htmlFor="metaTitle" className="col-sm-2 col-form-label text-start">
                    Meta Title
                  </FormLabel>
                  <Col sm="10">
                    <FormControl
                      type="text"
                      id="metaTitle"
                      name="metaTitle"
                      value={values.metaTitle}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.metaTitle && !!errors.metaTitle}
                    />
                    <FormControl.Feedback type="invalid">{errors.metaTitle}</FormControl.Feedback>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <FormLabel htmlFor="metaDes" className="col-sm-2 col-form-label text-start">
                    Meta Description
                  </FormLabel>
                  <Col sm="10">
                    <FormControl
                      type="text"
                      id="metaDes"
                      name="metaDes"
                      value={values.metaDes}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.metaDes && !!errors.metaDes}
                    />
                    <FormControl.Feedback type="invalid">{errors.metaDes}</FormControl.Feedback>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <FormLabel htmlFor="description" className="col-sm-2 col-form-label text-start">
                    Description
                  </FormLabel>
                  <Col sm="10">
                    <FormControl
                      type="text"
                      id="description"
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.description && !!errors.description}
                    />
                    <FormControl.Feedback type="invalid">{errors.description}</FormControl.Feedback>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <FormLabel htmlFor="packagingType" className="col-sm-2 col-form-label text-start">
                    Packing Type
                  </FormLabel>
                  <Col sm="10">
                    <Select
                      id="packagingType"
                      name="packagingType"
                      options={[
                        { value: 'Bottle', label: 'Bottle' },
                        { value: 'Strip', label: 'Strip' },
                        { value: 'Sachet', label: 'Sachet' }
                      ]}
                      value={[
                        { value: 'Bottle', label: 'Bottle' },
                        { value: 'Strip', label: 'Strip' },
                        { value: 'Sachet', label: 'Sachet' }
                      ].find((option) => option.value === values.packagingType)}
                      onChange={(selectedOption) => setFieldValue('packagingType', selectedOption ? selectedOption.value : '')}
                      onBlur={() => handleBlur({ target: { name: 'packagingType' } })}
                      classNamePrefix="select"
                      className={touched.packagingType && errors.packagingType ? 'is-invalid' : ''}
                    />
                    {touched.packagingType && errors.packagingType ? (
                      <div className="invalid-feedback d-block">{errors.packagingType}</div>
                    ) : null}
                  </Col>
                </Row>

                <Row className="mb-3">
                  <FormLabel htmlFor="package_qty" className="col-sm-2 col-form-label text-start">
                 PTQ
                  </FormLabel>
                  <Col sm="10">
                    <FormControl
                      type="number"
                      id="package_qty"
                      name="package_qty"
                      value={values.package_qty}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={!!touched.package_qty && !!errors.package_qty}
                    />
                    {touched.package_qty && errors.package_qty && (
                      <FormControl.Feedback type="invalid">{errors.package_qty}</FormControl.Feedback>
                    )}
                  </Col>
                </Row>

               
              
                <Row className="mb-3">
                  <FormLabel htmlFor="image" className="col-sm-3 col-form-label text-start">
                    Image
                  </FormLabel>
                  <Col >
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
            
                <Row className="mb-3">
                  <FormLabel htmlFor="brand" className="col-sm-2 col-form-label text-start">
                    Brand
                  </FormLabel>
                  <Col sm="10">
                    <Select
                      id="brand"
                      name="brand"
                      options={brandOptions}
                      value={brandOptions.find((option) => option.value === values.brand)}
                      onChange={(selectedOption) => setFieldValue('brand', selectedOption ? selectedOption.value : '')}
                      onBlur={handleBlur}
                      className={`basic-single ${touched.brand && errors.brand ? 'is-invalid' : ''}`}
                      classNamePrefix="select"
                    />
                    {touched.brand && errors.brand ? <div className="invalid-feedback d-block">{errors.brand}</div> : null}
                  </Col>
                </Row>
              </Col>
              <Col lg="6">
                <Row className="mb-3">
                  <FormLabel htmlFor="BuyPrice" className="col-sm-2 col-form-label text-start">
                    BuyPrice
                  </FormLabel>
                  <Col sm="10">
                    <FormControl
                      type="text"
                      id="BuyPrice"
                      name="BuyPrice"
                      value={values.BuyPrice}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.BuyPrice && !!errors.BuyPrice}
                    />
                    <FormControl.Feedback type="invalid">{errors.BuyPrice}</FormControl.Feedback>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <FormLabel htmlFor="sellPrice" className="col-sm-2 col-form-label text-start">
                    sellPrice
                  </FormLabel>
                  <Col sm="10">
                    <FormControl
                      type="text"
                      id="sellPrice"
                      name="sellPrice"
                      value={values.sellPrice}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.sellPrice && !!errors.sellPrice}
                    />
                    <FormControl.Feedback type="invalid">{errors.sellPrice}</FormControl.Feedback>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <FormLabel htmlFor="storeId" className="col-sm-2 col-form-label text-start">
                    Store Id
                  </FormLabel>
                  <Col sm="10">
                    <Select
                      id="storeId"
                      name="storeId"
                      options={storeOptions}
                      value={storeOptions.find((opt) => opt.value === values.storeId) || null}
                      onChange={(opt) => setFieldValue('storeId', opt ? opt.value : '')}
                      onBlur={() => handleBlur({ target: { name: 'storeId' } })}
                      className={touched.storeId && errors.storeId ? 'is-invalid' : ''}
                      classNamePrefix="select"
                    />
                    {touched.storeId && errors.storeId ? <div className="invalid-feedback d-block">{errors.storeId}</div> : null}
                  </Col>
                </Row>

                <Row className="mb-3">
                  <FormLabel htmlFor="igst" className="col-sm-2 col-form-label text-start">
                    IGST
                  </FormLabel>
                  <Col sm="10">
                    <FormControl
                      type="text"
                      id="igst"
                      name="igst"
                      value={values.igst}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.igst && !!errors.igst}
                    />
                    <FormControl.Feedback type="invalid">{errors.igst}</FormControl.Feedback>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <FormLabel htmlFor="stock" className="col-sm-2 col-form-label text-start">
                    Stock
                  </FormLabel>
                  <Col sm="10">
                    <FormControl
                      as="select"
                      id="stock"
                      name="stock"
                      value={values.stock}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.stock && !!errors.stock}
                    >
                      <option value="">Select</option>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </FormControl>
                    <FormControl.Feedback type="invalid">{errors.stock}</FormControl.Feedback>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <FormLabel htmlFor="masterCat" className="col-sm-2 col-form-label text-start">
                    Master Category
                  </FormLabel>
                  <Col sm="10">
                    <Select
                      id="masterCat"
                      name="masterCat"
                      options={masterCatOptions}
                      onChange={(selectedOption) => handleMasterCatChange(selectedOption, setFieldValue)}
                      onBlur={() => handleBlur({ target: { name: 'masterCat' } })}
                      className={touched.masterCat && errors.masterCat ? 'is-invalid' : ''}
                    />
                    {touched.masterCat && errors.masterCat ? <div className="invalid-feedback d-block">{errors.masterCat}</div> : null}
                  </Col>
                </Row>

                <Row className="mb-3">
                  <FormLabel htmlFor="mainCat" className="col-sm-2 col-form-label text-start">
                    Main Category
                  </FormLabel>
                  <Col sm="10">
                    <Select
                      id="mainCat"
                      name="mainCat"
                      options={mainCatOptions}
                      onChange={(selectedOption) => handleMainCatChange(selectedOption, setFieldValue)}
                      onBlur={() => handleBlur({ target: { name: 'mainCat' } })}
                      className={touched.mainCat && errors.mainCat ? 'is-invalid' : ''}
                      isDisabled={mainCatOptions.length === 0}
                    />
                    {touched.mainCat && errors.mainCat && <div className="invalid-feedback d-block">{errors.mainCat}</div>}
                  </Col>
                </Row>
                <Row className="mb-3">
                  <FormLabel htmlFor="subCat" className="col-sm-2 col-form-label text-start">
                    Sub Category
                  </FormLabel>
                  <Col sm="10">
                    <Select
                      id="subCat"
                      name="subCat"
                      options={subCatOptions}
                      isMulti
                      value={subCatOptions.filter((option: { value: string }) => values.subCat?.includes(option.value))}
                      onChange={(selectedOptions) =>
                        setFieldValue(
                          'subCat',
                          selectedOptions.map((option) => option.value)
                        )
                      }
                      onBlur={() => handleBlur({ target: { name: 'subCat' } })}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      isDisabled={subCatOptions.length === 0}
                    />
                    {touched.subCat && errors.subCat ? <div className="invalid-feedback d-block">{errors.subCat}</div> : null}
                  </Col>
                </Row>

                <Row className="mb-3">
                  <FormLabel htmlFor="alternateMedicine" className="col-sm-2 col-form-label text-start">
                    Alternate Medicine
                  </FormLabel>
                  <Col sm="10">
                    <Select
                      id="alternateMedicine"
                      name="alternateMedicine"
                      isMulti
                      options={alternateMedicineOptions}
                      value={alternateMedicineOptions.filter((option) => 
                        values.alternateMedicine.includes(option.value)
                      )}
                      onChange={(selectedOptions) =>
                        setFieldValue(
                          'alternateMedicine', 
                          selectedOptions ? selectedOptions.map((opt) => opt.value) : []
                        )
                      }
                      onInputChange={(newValue) => {
                        setMedicineSearch(newValue);
                        fetchProducts(newValue);
                      }}
                      onBlur={() => handleBlur({ target: { name: 'alternateMedicine' } })}
                      classNamePrefix="select"
                      className={`basic-multi-select${
                        touched.alternateMedicine && errors.alternateMedicine ? ' is-invalid' : ''
                      }`}
                      isLoading={medicineSearch.length > 0}
                      filterOption={null} // Disable local filtering
                      noOptionsMessage={() => medicineSearch.length > 0 ? "No medicines found" : "Type to search..."}
                    />
                    {touched.alternateMedicine && errors.alternateMedicine && (
                      <div className="invalid-feedback d-block">{errors.alternateMedicine}</div>
                    )}
                  </Col>
                </Row>

                <Row className="mb-3">
                  <FormLabel htmlFor="hsnCode" className="col-sm-2 col-form-label text-start">
                    HSN Code
                  </FormLabel>
                  <Col sm="10">
                    <FormControl
                      type="text"
                      id="hsnCode"
                      name="hsnCode"
                      value={values.hsnCode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.hsnCode && !!errors.hsnCode}
                    />
                    <FormControl.Feedback type="invalid">{errors.hsnCode}</FormControl.Feedback>
                  </Col>
                </Row>
                  <Row className="mb-3">
                  <FormLabel htmlFor="oum" className="col-sm-2 col-form-label text-start">
                    OUM
                  </FormLabel>
                  <Col sm="10">
                    <Select
                      id="oum"
                      name="oum"
                      options={oumOptions}
                      value={oumOptions.find((opt) => opt.value === values.oum)}
                      onChange={(opt) => setFieldValue('oum', opt ? opt.value : '')}
                      className={touched.oum && errors.oum ? 'is-invalid' : ''}
                    />
                    {touched.oum && errors.oum && <div className="invalid-feedback d-block">{errors.oum}</div>}
                  </Col>
                </Row>

                <Row className="mb-3">
                  <FormLabel htmlFor="oum_qty" className="col-sm-2 col-form-label text-start">
                    OUM Qty
                  </FormLabel>
                  <Col sm="10">
                    <FormControl
                      type="number"
                      id="oum_qty"
                      name="oum_qty"
                      value={values.oum_qty}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.oum_qty && !!errors.oum_qty}
                    />
                    <FormControl.Feedback type="invalid">{errors.oum_qty}</FormControl.Feedback>
                  </Col>
                </Row>
              </Col>
            </Row>
            <div>
              <div className="d-flex align-items-start">
                <Button type="submit" variant="primary" className="me-1" disabled={loading}>
                  {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : 'Submit'}
                </Button>
                <Link to={'/apps/ecommerce/products'}>
                  <Button type="button" variant="danger">
                    Cancel
                  </Button>
                </Link>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </ComponentContainerCard>
  );
};

export default AddNewProduct;
