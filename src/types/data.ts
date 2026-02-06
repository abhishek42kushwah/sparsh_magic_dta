export type IdType = string

export type FileType = Partial<File> & {
  preview?: string
}

export type ReferalCode = {
  id: IdType,
  referalCode: string,
  amount: number,
  active: number,
  createdAt: string
}

export type DateRange = {
  startDate: string;
  endDate: string;
};

export type UserMainType = {
  id: number;
  userUniqueId: number;
  displayName: string;
  mobile: string;
  email: string | null;
  createdAt: string;
  otp_verify: string;
};

export type DeliveryType = {
  id: number;
  name: string;
  mobile: string;
  updatedAt: string;
  createdAt: string;
};

export interface DeliveryBoy {
  id: string;            // Unique identifier for the delivery boy
  name: string;          // Full name
  phone: string;         // Contact number
  email: string;         // Email address
  assignedOrders: number; // Number of orders assigned
  status: 'active' | 'inactive'; // Current status
}


export interface GenericProductType {
  id: number;
  sku: number;
  DisplayName: string;
  sellPrice?: number;
  BuyPrice?: number;
  thumbnail?: string;
  brand?: string;
}

export type RangeOption =
  | 'All'
  | 'Today'
  | 'Last Week'
  | 'This Month'
  | 'Last Month'
  | 'Last Three Months'
  | 'This Year';

export type NotificationType = {
  title: string
  description: string
  icon: string
  type: 'project' | 'team'
  createdAt: Date
}

export type ProductType = {
  id: IdType
  DisplayName: string
  description: string
  thumbnail: string
  category: string
  metaDes: string
  masterCat: string
  pics: number
  BuyPrice: number
  brand: string
  sellPrice: number
  sellsCount: number
  stock: true | false
  createdAt: Date
  paymentType: 'UPI' | 'Banking' | 'Paypal' | 'BTC'
  sku:string
  name:string
  image:string
  price:number
  status:string
  packagingType:string
  drug:string
  hsnCode:string
  igst:string
  storeId?:string | number
}


export type BrandType = {
  id: IdType
  image: string
  name: string
  masterCat: string
  time: Date
 
}

export type masterCategoryType = {
  id: IdType
  name: string,
  image: string,
  createdAt: Date
}

export type ItemListType = {
  id?:  any
  productId?: any
  packingType:any
  productName:any
  itemSellPriceCopy:any
  itemBuyPrice:any
  quantity:any 
  total:any
  sku?:any
}

export type OrderListType = {
  id: IdType
  orderId:IdType
  name: string
  description: string
  image: string
  category: string
  pics: number
  price: number
  orderItems:any
  sellPrice: number
  sellsCount: number
  createdAt: Date
  itemBuyPrice:number
  itemSellPriceCopy:number
  productName:string
  quantity:number
  productImg:string
  status:string
  paymentType:string
  total:any
}

export interface OrderListDeliveryType {
  id: number
  orderId: number
  storeId: string
  addressId: number
  userId: number
  status: 'PACKED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'
  phone: string
  address: string
  deliveredAt: string | null
  shipAt: string | null
  packAt: string | null
  returnAt: string | null
  returnRecieveAt: string | null
  cancelAt: string | null
  createdAt: string
  updatedAt: string | null
  userName: string
  userMobile: string
  isPaid: boolean
  txStatus: string | null
  paidBy: string
  paymentMod: string
  subTotal: number
  couponCode: string
  coupondiscount: number
  total: number
  orderAmount: number
  shippingCharge: number
  codCharge: number
  waybillNo: string | null
  deliveryPartner: string | null
  shipMode: string
  paymentRecievedByDeliveryPartner: string | null
  prescription?: string
  customerOtp?: any 
}

export type leadsActionType = {
  lead_id:IdType
  id:number
  assign_id:IdType
  assign_name:string
  action_name:string
  action_des:string
  sessionId:string
  sessionName:string
}

export type StoresType={
  id:IdType
  userId:IdType
  name:string
  createdAt:string
  updateAt:string
}

export type StoreUsersType={
  id:IdType
  name:string
  mobile:string
  time:string
}

export interface AdminUserType {
  id: number;
  name: string;
  email: string;
  mobile: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;

  roles: {
    id: number;
    name: string;
    description: string;

    permissions: {
      id: number;
      resource: string;
      action: string;
      description: string;
    }[];
  }[];
}

export type PermissionResource =
  | 'PRODUCT'
  | 'ORDER'
  | 'BRAND'
  | 'USER'
  | 'STORE'
  | 'COUPON'
  | 'BANNER'
  | 'DELIVERYBOY';

export type PermissionAction = 'READ' | 'WRITE';

export type PermissionType = {
  id: number;
  resource: PermissionResource;
  action: PermissionAction;
  description: string;
  createdAt: string; 
  updatedAt: string;   
  _count?: {
    roles: number;
  };
};


export type CreatePermissionPayload = Pick<PermissionType, 'resource' | 'action' | 'description'>;
export type UpdatePermissionPayload = Partial<CreatePermissionPayload>;

export interface AdminRolesType {
  id: number;
  name: string;
  email: string;
  mobile: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;

  roles: {
    id: number;
    name: string;
    description: string;
   
    permissions: {
      id: number;
      resource: string;
      action: string;
      description: string;
      
    }[];
  }[];
}


export type RxOrderCrmType = {
  id: IdType
  name: string
  description: string
  image: string
  category: string
  pics: number
  price: number
  sellPrice: number
  sellsCount: number
  status: 'In Stock' | 'Out of Stock' | 'Published' | 'Inactive'
  createdAt: Date
  paymentType: 'UPI' | 'Banking' | 'Paypal' | 'BTC'
}

export type OrderType = {
  id: IdType
  productId: ProductType['id']
  product?: ProductType
  quantity: number
  total: number
}

export type RxOrderCrmListType = {
  id: IdType
  productId: ProductType['id']
  product?: ProductType
  quantity: number
  total: number
}

export type CustomerType = {
  id: IdType
  name: string
  avatar: string
  email: string
  order: number
  spend: number
  city: string
  startDate: Date
  completion: number
  status: 'Repeat' | 'Inactive' | 'New'
}

export type productDataType = {
  id: string;
  product: string,
  quantity: number,
  price: number
  total: number
  discount: string
  InvoiceAmount: string;
  AmountPaid: string;
  ReferenceNumber: string
};
export type OrderDetailsType = {
  id: string;
  orderId: number;
  storeId: string;
  addressId: number;
  userId: number;
  txId:string;
  status: string;
  phone: string;
  address: string;
  deliveredAt: string | null;
  shipAt: string | null;
  packAt: string | null;
  returnAt: string | null;
  returnRecieveAt: string | null;
  cancelAt: string | null;
  createdAt: string;
  updatedAt: string | null;
  userName: string;
  userMobile: string;
  isPaid: boolean;
  txStatus: string | null;
  paidBy: string | null;
  paymentMod: string | null;
  subTotal: number;
  couponCode: string | null;
  coupondiscount: number;
  total: number;
  orderAmount: number;
  shippingCharge: number;
  codCharge: number;
  waybillNo: string | null;
  deliveryPartner: string | null;
  shipMode: string | null;
  paymentRecievedByDeliveryPartner: string | null;
  prescription: string | null;
  // Optional fields (may or may not come in future)
  pincode?: string | null;
};


export type CategoryType = {
  id: IdType
  name: string
  image: string
  masterCat: string
  showHome: number,
  createdAt: Date
  avatar:string
  mainCategory:string
}

export type SubCategoryType = {
  id: IdType
  name: string
  image: string
  mainCat: string
  masterCat: string
  createdAt: Date
}

export type TopCountryType = {
  countryFlag: string
  name: string
  count: string
  change: number
  createdAt: Date
}

export type UserType = {
  id: IdType
  name: string
  avatar: string
  handle: string
  email: string
  phoneNo: string
  role: string
  lastActivity: Date
  activityStatus: 'typing' | 'online' | 'offline'
  lastMessage: string
  unreadCount?: number
  status: 'Active' | 'Inactive'
  source: string
}

export type ClientType = {
  id: IdType
  userId: UserType['id']
  user?: UserType
  flag: string
  project: string
  description: string
}

export type TeamType = {
  id: IdType
  userId: UserType['id']
  teamName: string
  user?: UserType
  logo: string
  description: string
  membersId: UserType['id'][]
  members?: (UserType | undefined)[]
  progress: number
}

export type ProjectType = {
  id: IdType
  teamId: TeamType['id']
  teams?: TeamType
  logo: string
  name: string
  client: string
  budget: string
  startDate: Date
  deadlineDate: Date
  description: string
  progress: number
  tasks: number
  status: 'In Progress' | 'Completed'
}

export type PriorityType = 'Low' | 'Medium' | 'High'

export type TaskType = {
  id: IdType
  projectId: ProjectType['id']
  projects?: ProjectType
  userId: UserType['id']
  allUsers?: UserType
  teamName: string
  taskName: string
  priority: PriorityType
  taskInfo: string
  report: number
  assignedTo: string
}

export type KanbanSectionType = {
  id: IdType
  title: string
}

export type KanbanTaskTag = 'API' | 'Form Submit' | 'Responsive'

export type KanbanTaskType = {
  id: IdType
  sectionId: KanbanSectionType['id']
  section?: KanbanSectionType
  title: string
  description?: string
  image?: string
  priority: PriorityType
  tags?: KanbanTaskTag[]
  totalTasks: number
  completedTasks: number
  commentsCount: number
}

export type ChatMessageType = {
  id: IdType
  from: UserType
  to: UserType
  message: string
  sentOn: Date
}

export type FolderType = {
  title: string
  image: string
  files: number
  storage: string
  progress: number
}

export type PricingType = {
  name: string
  description: string
  price: number
  features: string[]
  icon: string
  isPopular?: boolean
  iconVariant: string
}
export type HomeBannerType = {
  id: number;
  img: string;
  type: 'APP' | 'WEB' | 'BOTH';
  url: string;
  section: 'TOP' | 'BOTTOM';
  CreatedAt: Date
};

export type SettingsType = {
  "id": number,
  "codCharges": string
  "deliveryCharges": string,
  "expressCharges": string,
  "referalBonus": string,
  "CreatedAt": Date
};
export type CouponType = {
  "id": number,
  "name": string,
  "coupon_code": string,
  "percent": string,
  "expiry_date": string,
  "min_amount": number,
  'createdAt': Date,
};
export type CrmleadType = {
  "id": number,
  "mobile": number,
  "description": string,
  "source": string,
  "createAt": Date,
  "status": string

};

export type CrmCallerListType = {
  "id": number,
  "name": string,
  "type": string,
  "time": string,
  "loginId": string,
  "password": string,
  "status": 'OFF' | 'ACTIVE' | 'RESIGN',
  "createdAt": Date,
  "email": string,
  "ivrNumber": number,
  "leadCategory": string
};

export type LeadType = {
  "id": number,
  "name": string,
  "mobile": number,
  "description": string,
  "agentName": string,
  "status": string
  "source": string,
  "createAt": Date
};


export type WalletType = {
  userId: IdType | number | string,
  userName: string,
  amount: number,
  type: string,
  description: string,
  source: string,
  Date: Date,


};


export type VendorPortalType  = {
  userId: IdType | number | string,
  userName: string,
  amount: number,
  type: string,
  description: string,
  source: string,
  Date: Date,
  orderId :string
};