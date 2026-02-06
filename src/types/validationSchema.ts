export const BASE_URL = import.meta.env.VITE_APP_API;
import * as Yup from 'yup';


export const AddProductValidation = Yup.object({
  storeId: Yup.string().required('Store ID is required'),
  stock: Yup.string().required('Stock is required'),
  DisplayName: Yup.string().required('Display Name is required'),
  drug: Yup.string().required('drug  is required'),
  hsnCode: Yup.number().required('hsnCode is required'),
  igst:Yup.number().required('igst is required'),
  name: Yup.string()
    .matches(/^[a-zA-Z0-9\s]+$/, 'Product Name cannot contain special characters')
    .required('Product Name is required'),
  BuyPrice: Yup.number().required('Buy Price is required').positive('Buy Price must be positive'),
  description: Yup.string().required('Description is required'),
  masterCat: Yup.string().required('Master Category is required'),
   oum: Yup.string().required('oum is required'),
  package_qty:  Yup.number().required('Quantity is required').positive('Quantity must be positive'),
  oum_qty: Yup.number().required('Oum Quantity is required').positive('Oum Quantity must be positive'),
  alternateMedicine: Yup.array().min(1, 'At least one Alternate Medicine is required'),
  packagingType: Yup.string().required('Packaging type is required'),
  mainCat: Yup.string().required('Main Category is required'),
  subCat: Yup.array().min(1, 'At least one Sub Category is required'),
  sellPrice: Yup.number().required('Sell Price is required').positive('Sell Price must be positive'),
  image: Yup.string().required('Image is required'),
  brand: Yup.string().required('Brand is required'),
  metaTitle: Yup.string().required('Meta Title is required'),
  usage: Yup.string().required('Usage is required'),
  metaDes: Yup.string().required('Meta Description is required')
});

export const EditValidationProduct = Yup.object({
  storeId: Yup.string().optional(),
  stock: Yup.boolean().optional(),
  displayName: Yup.string().optional(),
   usage: Yup.string().required('Usage is required'),
  name: Yup.string()
    .matches(/^[a-zA-Z0-9\s]+$/, 'Product Name cannot contain special characters')
    .optional(),
  buyPrice: Yup.number().positive('Must be positive').optional(),
  drug: Yup.string().required('drug  is required'),
  hsnCode: Yup.number().required('hsnCode is required'),
  igst:Yup.number().required('igst is required'),
  description: Yup.string().optional(),
  masterCat: Yup.string().optional(),
  oum: Yup.string().optional(), 
   oum_qty: Yup.number().optional(),
  package_qty:  Yup.number().required('Quantity is required').positive('Quantity must be positive'),
  packagingType: Yup.string().required('Packaging type is required'),
  alternateMedicine: Yup.array().min(1, 'At least one alternateMedicine is required').optional(),
  mainCat: Yup.string().optional(),
  subCat: Yup.array().min(1, 'At least one Sub Category is required').optional(),
  sellPrice: Yup.number().positive('Must be positive').optional(),
  image: Yup.string()
    .nullable()
    .notRequired(),
  brand: Yup.string().optional(),
  metaTitle: Yup.string().optional(),
  metaDes: Yup.string().optional()
});

export const HomeBannerValidationSchema = Yup.object({
  section: Yup.string().required('Section is required'),
  type: Yup.string().required('Type is required'),
  url: Yup.string().url('Invalid URL').required('URL is required'),
  image: Yup.mixed().notRequired()
});

export const EditHomeBannerValidationSchema = Yup.object({
  section: Yup.string().required('Section is required'),
  type: Yup.string().required('Type is required'),
  url: Yup.string().url('Invalid URL').required('URL is required'),
  image: Yup.mixed()
  .test('fileSize', 'File size is too large', (value) => {
    if (!value) return true; 
    if (value instanceof File) {
      return value.size <= 1 * 1024 * 1024;
    }
    return false;
  })
  .test('fileType', 'Unsupported file format', (value) => {
    if (!value) return true; 
    if (value instanceof File) {
      return ['image/jpeg', 'image/png'].includes(value.type);
    }
    return false;
  })
  .nullable()
  .notRequired(),
});

export const WalletCreateValidationSchema = Yup.object({
  userName: Yup.string().required('Name is required'),
  userId: Yup.number().typeError('User ID must be a number').required('User ID is required'),
  amount: Yup.number().required('Amount is required'),
  description: Yup.string().required('Description is required'),
  source: Yup.string()
    .oneOf(['REFERAL', 'PROMOTIONAL', 'REFUND', 'CASHBACK'], 'Source must be one of: REFERAL, PROMOTIONAL, REFUND, CASHBACK')
    .required('Source is required'),
  type: Yup.string().required('Type is required')
});

export const WalletUpdateValidationSchema = Yup.object({
  userName: Yup.string().required('Name is required'),
  userId: Yup.number().typeError('User ID must be a number').required('User ID is required'),
  amount: Yup.number().required('Amount is required'),
  description: Yup.string().required('Description is required'),
  source: Yup.string()
    .oneOf(['REFERAL', 'PROMOTIONAL', 'REFUND', 'CASHBACK'], 'Source must be one of: REFERAL, PROMOTIONAL, REFUND, CASHBACK')
    .required('Source is required'),
  type: Yup.string().required('Type is required')
});

export const AddReferalCodeValidationSchema = Yup.object({
  referalCode: Yup.string().required('Referal code is required'),
  amount: Yup.number().min(1, 'Amount must be at least 1').required('Amount is required'),
  active: Yup.number().oneOf([0, 1], 'Active status must be 0 or 1').required('Active status is required')
});

export const EditReferalCodeValidationSchema = Yup.object({
  referalCode: Yup.string().required('Referal code is required'),
  amount: Yup.number().min(1, 'Amount must be at least 1').required('Amount is required'),
  active: Yup.number().oneOf([0, 1], 'Active status must be 0 or 1').required('Active status is required')
});

export const EditCouponValidationSchema = Yup.object({
  name: Yup.string()
    .matches(/^[a-zA-Z0-9 ]*$/, 'invalid characters')
    .required('Name is required'),
  coupon_code: Yup.string().required('Coupon code is required'),
  percent: Yup.number().min(1, 'Percent must be at least 1').max(100, 'Percent cannot exceed 100').required('Percent is required'),
  expiry_date: Yup.date().min(new Date(), 'Expiry date must be in the future').required('Expiry date is required'),
  min_amount: Yup.number().min(1, 'Minimum amount must be greater than 0').required('Minimum amount is required'),
  max_amount: Yup.number().min(1, 'Maximum amount must be greater than 0').required('Maximum amount is required')
});

export const AddNewCouponValidationSchema = Yup.object({
  name: Yup.string()
    .matches(/^[a-zA-Z0-9 ]*$/, 'invalid characters')
    .required('Name is required'),
  coupon_code: Yup.string().required('Coupon code is required'),
  percent: Yup.number().min(1, 'Percent must be at least 1').max(100, 'Percent cannot exceed 100').required('Percent is required'),
  expiry_date: Yup.date().min(new Date(), 'Expiry date must be in the future').required('Expiry date is required'),
  min_amount: Yup.number().min(1, 'Minimum amount must be greater than 0').required('Minimum amount is required'),
  max_amount: Yup.number().min(1, 'Maximum amount must be greater than 0').required('Maximum amount is required')
});

export const AddStoreUsersValidationSchema = Yup.object({
  name: Yup.string().required('Store User Name is required'),
  mobile: Yup.string()
    .required('Mobile is required')
    .matches(/^\d{10}$/, 'Mobile must be a 10-digit number')
});

export const EditStoreUserValidationSchema = Yup.object({
  name: Yup.string().required('Store User Name is required'),
  mobile: Yup.string()
    .required('Mobile is required')
    .matches(/^\d{10}$/, 'Mobile must be a 10-digit number')
});

export const AddBrandValidationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  masterCat: Yup.string().required('Master Category is required'),
  image: Yup.string()
    .required('Image is required')
   
});

export const EditBrandValidationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  masterCat: Yup.string().required('Master Category is required'),
  image: Yup.string()
    .nullable()
});

export const AddSubCategoryValidationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  masterCat: Yup.string().required('Master Category is required'),
  image: Yup.string()
    .required('Image is required'),
  mainCat: Yup.array()
    .of(
      Yup.object({
        value: Yup.string().required(),
        label: Yup.string().required()
      })
    )
    .min(1, 'At least one Main Category is required')
});

export const EditSubCategoryValidationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  masterCat: Yup.string().required('Master Category is required'),
  
  image:Yup.string()
  .nullable()
  .notRequired(),
  mainCat: Yup.array()
    .of(
      Yup.object({
        value: Yup.string().required(),
        label: Yup.string().required()
      })
    )
    .min(1, 'At least one Main Category is required')
});


export const AddMainCategoryValidationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  masterCat: Yup.string().required('Master Category is required'),
  image: Yup.mixed()
    .nullable()
    .notRequired()
    .test('fileSize', 'File size is too large', (value) => {
      if (!value) return true;
      if (value instanceof File) {
        return value.size <= 1 * 1024 * 1024;
      }
      return false;
    })
    .test('fileType', 'Unsupported file format', (value) => {
      if (!value) return true;
      if (value instanceof File) {
        return ['image/jpeg', 'image/png'].includes(value.type);
      }
      return false;
    }),
});

export const EditMainCategoryValidationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  masterCat: Yup.string().required('Master Category is required'),
  
  image: Yup.mixed()
    .nullable()
    .notRequired()
    .test('fileSize', 'File size is too large', (value) => {
      if (!value) return true;
      if (value instanceof File) {
        return value.size <= 1 * 1024 * 1024;
      }
      return false;
    })
    .test('fileType', 'Unsupported file format', (value) => {
      if (!value) return true;
      if (value instanceof File) {
        return ['image/jpeg', 'image/png'].includes(value.type);
      }
      return false;
    }),
});

export const AddOrderValidationSchema = Yup.object({
  userId: Yup.string().required('User ID is required'),
  addressId: Yup.string().required('Address ID is required'),
  couponCode: Yup.string().required("Coupon Code is required"),
  prescription: Yup.string().required("Prescription is required"),
  shipMode: Yup.string().required('Shipping Mode is required'),
  paymentMod: Yup.string().required("Payment is required"),
  orderItems: Yup.array().of(
    Yup.object({
      productId: Yup.mixed()
        .test("is-string-or-number", "Product ID is required", value => value !== null && value !== '')
        .required('Product ID is required'),
        quantity: Yup.number().min(1, 'Quantity must be at least 1').required('Quantity is required'),
    })
  ).required('At least one order item is required'),
});