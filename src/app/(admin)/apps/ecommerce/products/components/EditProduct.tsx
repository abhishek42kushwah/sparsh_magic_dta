import { Button, Col, FormControl, FormLabel, Row } from 'react-bootstrap';
import ComponentContainerCard from '../../../../../../components/ComponentContainerCard';
import { ErrorMessage, FormikProvider, useFormik } from 'formik';
import { useState, useEffect } from 'react';
import { BASE_URL, EditValidationProduct } from '@/types/validationSchema';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { successToast, errorToast } from '@/utils/toastMassage';
import { oumOptions } from '@/types/staticData';
import { uploadImageToServer } from '@/hooks/uploadImage';
const EditProduct = () => {
  const [mainCatOptions, setMainCatOptions] = useState([]);
  const [masterCatOptions, setMasterCatOptions] = useState([]);
  const [subCatOptions, setSubCatOptions] = useState([]);
  const [storeOptions, setStoreOptions] = useState<{ value: string; label: string }[]>([]);
  const [allBrands, setAllBrands] = useState([]);
  const [alternateMedicineOptions, setAlternateMedicineOptions] = useState<{ value: string; label: string }[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { original } = location.state || {};
  const brandOptions = allBrands
    ? [...new Set(allBrands.map((item: any) => item?.name))].map((brand) => ({
        value: brand,
        label: brand
      }))
    : [];
  const formik = useFormik({
    initialValues: {
      sku: original?.sku || '',
      storeId: original?.storeId || '',
      stock: original?.stock === true ? 'true' : 'false',
      displayName: original?.DisplayName || '',
      name: original?.name || '',
      buyPrice: original?.BuyPrice || '',
      drug: original?.drug || '',
      oum_qty: original?.oum_qty || '',
      packagingType: original?.packagingType || '',
      igst: original?.igst || '',
      hsnCode: original?.hsnCode || '',
      usage: original?.usage || '',
      sellPrice: original?.sellPrice || '',
      description: original?.description || '',
      masterCat: original?.masterCat || '',
      oum: original?.oum || '',
      package_qty: original?.package_qty || '',
      mainCat: original?.mainCat || '',
      subCat: original?.subCat ? original.subCat.split(',') : [],
      image: null as File | null,
      alternateMedicine: original?.alternateMedicine ? original.alternateMedicine.split(',') : [],
      brand: original?.brand || '',
      metaTitle: original?.metaTitle || '',
      metaDes: original?.metaDes || ''
    },
    validationSchema: EditValidationProduct,
    onSubmit: async (values, { resetForm }) => {
      const formatMultiSelect = (arr: string[] | undefined | null) => (Array.isArray(arr) && arr.length ? arr.join(', ') : '');
      const payload = {
        storeId: values.storeId,
        stock: values.stock === 'true',
        DisplayName: values.displayName,
        name: values.name,
        drug: values.drug,
        usage: values.usage,
        hsnCode: values.hsnCode,
        BuyPrice: parseFloat(values.buyPrice),
        sellPrice: parseFloat(values.sellPrice),
        description: values.description,
        oum_qty: values.oum_qty,
        masterCat: values.masterCat,
        mainCat: values.mainCat,
        subCat: formatMultiSelect(values.subCat),
        brand: values.brand,
        metaTitle: values.metaTitle,
        metaDes: values.metaDes,
        packagingType: values.packagingType,
        alternateMedicine: formatMultiSelect(values.alternateMedicine),
        oum: values.oum,
        package_qty: parseFloat(values.package_qty),
        imageName: values.image || null
      };

      const sku = original?.sku;
      const apiUrl = `${BASE_URL}products/${sku}`;

      try {
        const response = await fetch(apiUrl, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok && data.success) {
          successToast(data.message);
          resetForm();
          navigate('/apps/ecommerce/products');
        } else {
          throw new Error(data?.message || 'Something went wrong');
        }
      } catch (error: any) {
        errorToast(`Failed to update product: ${error.message || 'An unknown error occurred'}`);
      }
    }
  });

  const { values, errors, touched, handleBlur, handleChange, setFieldValue } = formik;

  useEffect(() => {
    const fetchMasterCategories = async () => {
      try {
        const response = await fetch(`${BASE_URL}mastercat`);
        const data = await response.json();
        if (data.success && data.result?.masterCats.length > 0) {
          const options = data.result?.masterCats.map((cat: any) => ({
            value: cat.name,
            label: cat.name
          }));
          setMasterCatOptions(options);

          if (original?.masterCat) {
            const selectedMasterCat = options.find((opt: any) => opt.value === original.masterCat);
            if (selectedMasterCat) {
              setFieldValue('masterCat', selectedMasterCat.value);
              await handleMasterCatChange(selectedMasterCat, true);
            }
          }
        }
      } catch (error) {}
    };

    fetchMasterCategories();
  }, [original]);

  useEffect(() => {
    const fetchAlternateMedicines = async () => {
      try {
        const response = await fetch(`${BASE_URL}products`);
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
    };

    fetchAlternateMedicines();
  }, []);

  const handleMasterCatChange = async (selectedOption: { value: string; label: string } | null, isPreFill = false) => {
    const selectedMasterCat = selectedOption?.value || '';
    if (!isPreFill) {
      setMainCatOptions([]);
      setSubCatOptions([]);
      setFieldValue('mainCat', '');
      setFieldValue('subCat', []);
    }

    if (selectedMasterCat) {
      try {
        const response = await fetch(`${BASE_URL}fetchmaincategory?name=${selectedMasterCat}`);
        const data = await response.json();
        if (response.ok && data.result?.mainCats.length > 0) {
          const options = data.result?.mainCats.map((cat: any) => ({
            value: cat.name,
            label: cat.name
          }));
          setMainCatOptions(options);

          if (isPreFill && original?.mainCat) {
            const selectedMainCat = options.find((opt: any) => opt.value === original.mainCat);
            if (selectedMainCat) {
              setFieldValue('mainCat', selectedMainCat.value);
              await handleMainCatChange(selectedMainCat, true);
            }
          }
        }
      } catch (error) {}
    }

    setFieldValue('masterCat', selectedMasterCat);
  };

  const handleMainCatChange = async (selectedOption: { value: string; label: string } | null, isPreFill = false) => {
    const selectedMainCat = selectedOption?.value || '';

    if (!isPreFill) {
      setSubCatOptions([]);
      setFieldValue('subCat', []);
    }

    if (selectedMainCat) {
      try {
        const response = await fetch(`${BASE_URL}fetchsubcategory?name=${selectedMainCat}`);
        const data = await response.json();
        if (response.ok && data.result?.subCats.length > 0) {
          const options = data.result?.subCats.map((cat: any) => ({
            value: cat.name,
            label: cat.name
          }));
          setSubCatOptions(options);

          if (isPreFill && original?.subCat) {
            const selectedSubCats = options.filter((opt: any) => original.subCat.includes(opt.value));
            setFieldValue(
              'subCat',
              selectedSubCats.map((opt: any) => opt.value)
            );
          }
        }
      } catch (error) {}
    }

    setFieldValue('mainCat', selectedMainCat);
  };
  useEffect(() => {
    if (mainCatOptions.length === 0) {
      setFieldValue('mainCat', '');
    }
  }, [mainCatOptions]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(`${BASE_URL}brandlist`);
        const data = await response.json();
        if (!response.ok && data.success) {
          throw new Error(data.message);
        }
        if (data.success && data.result) {
          setAllBrands(data.result?.brands);
        }
      } catch (error) {}
    };

    fetchProductData();
  }, []);

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

  useEffect(() => {
    if (storeOptions.length > 0 && original?.storeId) {
      const selectedStore = storeOptions.find((opt) => String(opt.value) === String(original.storeId));
      if (selectedStore) {
        setFieldValue('storeId', selectedStore.value);
      }
    }
  }, [storeOptions, original?.storeId, setFieldValue]);

  return (
    <FormikProvider value={formik}>
      <ComponentContainerCard title="Edit Product">
        <form onSubmit={formik.handleSubmit}>
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
                  <FormControl.Feedback type="invalid">{typeof errors.name === 'string' ? errors.name : ''}</FormControl.Feedback>
                </Col>
              </Row>
              <Row className="mb-3">
                <FormLabel htmlFor="displayName" className="col-sm-2 col-form-label text-start">
                  Display Name
                </FormLabel>
                <Col sm="10">
                  <FormControl
                    type="text"
                    id="displayName"
                    name="displayName"
                    value={values.displayName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.displayName && !!errors.displayName}
                  />
                  <FormControl.Feedback type="invalid">
                    {typeof errors.displayName === 'string' ? errors.displayName : ''}
                  </FormControl.Feedback>
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
                  <FormControl.Feedback type="invalid">
                    {typeof errors.drug === 'string' ? errors.drug : Array.isArray(errors.drug) ? (errors.drug as string[]).join(', ') : ''}
                  </FormControl.Feedback>
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
                  <FormControl.Feedback type="invalid">{typeof errors.usage === 'string' ? errors.usage : ''}</FormControl.Feedback>
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
                  <FormControl.Feedback type="invalid">{typeof errors.metaTitle === 'string' ? errors.metaTitle : ''}</FormControl.Feedback>
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
                  <FormControl.Feedback type="invalid">{typeof errors.metaDes === 'string' ? errors.metaDes : ''}</FormControl.Feedback>
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
                  <FormControl.Feedback type="invalid">
                    {typeof errors.description === 'string' ? errors.description : ''}
                  </FormControl.Feedback>
                </Col>
              </Row>

              <Row className="mb-3">
                <FormLabel htmlFor="image" className="col-sm-2 col-form-label text-start">
                  Image
                </FormLabel>

                <Col sm="10">
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
                    className={`basic - single ${touched.brand && errors.brand ? 'is-invalid' : ''}`}
                    classNamePrefix="select"
                  />
                  {touched.brand && errors.brand
                    ? typeof errors.brand === 'string' && <div className="invalid-feedback d-block">{errors.brand}</div>
                    : null}
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
                    typeof errors.packagingType === 'string' ? (
                      <div className="invalid-feedback d-block">{errors.packagingType}</div>
                    ) : null
                  ) : null}
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
                    value={alternateMedicineOptions.filter((option) => values.alternateMedicine.includes(option.value))}
                    onChange={(selectedOptions) =>
                      setFieldValue('alternateMedicine', selectedOptions ? selectedOptions.map((opt) => opt.value) : [])
                    }
                    onBlur={() => handleBlur({ target: { name: 'alternateMedicine' } })}
                    classNamePrefix="select"
                    className={`basic-multi-select${touched.alternateMedicine && errors.alternateMedicine ? ' is-invalid' : ''}`}
                  />
                  <FormControl.Feedback type="invalid">
                    {typeof errors.alternateMedicine === 'string' ? errors.alternateMedicine : ''}
                  </FormControl.Feedback>
                </Col>
              </Row>
            </Col>
            <Col lg="6">
              <Row className="mb-3">
                <FormLabel htmlFor="buyPrice" className="col-sm-2 col-form-label text-start">
                  buyPrice
                </FormLabel>
                <Col sm="10">
                  <FormControl
                    type="text"
                    id="buyPrice"
                    name="buyPrice"
                    value={values.buyPrice}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.buyPrice && !!errors.buyPrice}
                  />
                  <FormControl.Feedback type="invalid">{typeof errors.buyPrice === 'string' ? errors.buyPrice : ''}</FormControl.Feedback>
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
                  <FormControl.Feedback type="invalid">{typeof errors.sellPrice === 'string' ? errors.sellPrice : ''}</FormControl.Feedback>
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
                  <FormControl.Feedback type="invalid">
                    {typeof errors.package_qty === 'number' ? errors.package_qty : ''}
                  </FormControl.Feedback>
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
                  <FormControl.Feedback type="invalid">
                    {typeof errors.igst === 'string' ? errors.igst : Array.isArray(errors.igst) ? errors.igst.join(', ') : ''}
                  </FormControl.Feedback>
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
                    value={storeOptions.find((opt) => String(opt.value) === String(values.storeId)) || null}
                    onChange={(opt) => setFieldValue('storeId', opt ? opt.value : '')}
                    onBlur={() => handleBlur({ target: { name: 'storeId' } })}
                    className={touched.storeId && errors.storeId ? 'is-invalid' : ''}
                    classNamePrefix="select"
                  />

                  {touched.storeId && errors.storeId ? (
                    <div className="invalid-feedback d-block">
                      {typeof errors.storeId === 'string'
                        ? errors.storeId
                        : Array.isArray(errors.storeId)
                          ? errors.storeId.join(', ')
                          : typeof errors.storeId === 'object'
                            ? JSON.stringify(errors.storeId)
                            : ''}
                    </div>
                  ) : null}
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
                    value={masterCatOptions.find((option: any) => option.value === values.masterCat)}
                    onChange={(option: any) => handleMasterCatChange(option)}
                    onBlur={() => handleBlur({ target: { name: 'masterCat' } })}
                    className={touched.masterCat && !!errors.masterCat ? 'is-invalid' : ''}
                  />
                  {touched.masterCat && errors.masterCat ? (
                    typeof errors.masterCat === 'string' ? (
                      <div className="invalid-feedback d-block">{errors.masterCat}</div>
                    ) : null
                  ) : null}
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
                    value={mainCatOptions.find((option: any) => option.value === values.mainCat) || null}
                    onChange={(option) => handleMainCatChange(option)}
                    onBlur={() => handleBlur({ target: { name: 'mainCat' } })}
                    className={touched.mainCat && !!errors.mainCat ? 'is-invalid' : ''}
                    isDisabled={mainCatOptions.length === 0}
                    placeholder="Select a main category"
                  />
                  {touched.mainCat && errors.mainCat
                    ? typeof errors.mainCat === 'string' && <div className="invalid-feedback d-block">{errors.mainCat}</div>
                    : null}
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
                    value={subCatOptions.filter((option: any) => values.subCat.includes(option.value))}
                    onChange={(selectedOptions) =>
                      setFieldValue(
                        'subCat',
                        selectedOptions.map((option: any) => option.value)
                      )
                    }
                    onBlur={() => handleBlur({ target: { name: 'subCat' } })}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    isDisabled={subCatOptions.length === 0}
                  />
                  {touched.subCat && errors.subCat
                    ? typeof errors.subCat === 'string' && <div className="invalid-feedback d-block">{errors.subCat}</div>
                    : null}
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
                  <FormControl.Feedback type="invalid">
                    {typeof errors.hsnCode === 'string' ? errors.hsnCode : Array.isArray(errors.hsnCode) ? errors.hsnCode.join(', ') : ''}
                  </FormControl.Feedback>
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
                    value={oumOptions.find((option) => option.value === values.oum)}
                    onChange={(selectedOption) => setFieldValue('oum', selectedOption ? selectedOption.value : '')}
                    onBlur={() => handleBlur({ target: { name: 'oum' } })}
                    classNamePrefix="select"
                    className={touched.oum && errors.oum ? 'is-invalid' : ''}
                  />
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
                  <FormControl.Feedback type="invalid">
                    {typeof errors.oum_qty === 'string' ? errors.oum_qty : Array.isArray(errors.oum_qty) ? errors.oum_qty.join(', ') : ''}
                  </FormControl.Feedback>
                </Col>
              </Row>
            </Col>
          </Row>
          <div className="d-flex align-items-start">
            <Button type="submit" variant="primary" className="me-1">
              submit
            </Button>
            <Link to="/apps/ecommerce/products">
              <Button type="button" variant="danger">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </ComponentContainerCard>
    </FormikProvider>
  );
};

export default EditProduct;
