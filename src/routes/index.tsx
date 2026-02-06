import { lazy } from 'react'
import { Navigate, type RouteProps } from 'react-router-dom'

// Dashboard Routes/dashboard/analytics
const Analytics = lazy(() => import('@/app/(admin)/dashboard/analytics/page'))
const Ecommerce = lazy(() => import('@/app/(admin)/dashboard/ecommerce/page'))

// Apps Routes
const AnalyticCustomer = lazy(() => import('@/app/(admin)/apps/analytics/customers/page'))
const AnalyticReport = lazy(() => import('@/app/(admin)/apps/analytics/reports/page'))
const ProjectClient = lazy(() => import('@/app/(admin)/apps/projects/clients/page'))
const ProjectTeam = lazy(() => import('@/app/(admin)/apps/projects/team/page'))
const Project = lazy(() => import('@/app/(admin)/apps/projects/project/page'))
const ProjectTask = lazy(() => import('@/app/(admin)/apps/projects/task/page'))
const Kanban = lazy(() => import('@/app/(admin)/apps/projects/kanban/page'))
const ProjectUsers = lazy(() => import('@/app/(admin)/apps/projects/users/page'))
const ProjectCreate = lazy(() => import('@/app/(admin)/apps/projects/create/page'))
const ProductPage = lazy(()=> import('@/app/(admin)/apps/ecommerce/Products/page'))
const EditProduct = lazy(() => import("@/app/(admin)/apps/ecommerce/Products/components/EditProduct"))
const EcommerceCustomers = lazy(() => import('@/app/(admin)/apps/ecommerce/customers/page'))
const SubCategory = lazy(() => import("@/app/(admin)/apps/ecommerce/subCategory/page"))
const EditSubCategory = lazy(() => import("@/app/(admin)/apps/ecommerce/subCategory/components/EditSubCategory"))
const AddSubCategory = lazy(() => import("@/app/(admin)/apps/ecommerce/subCategory/components/AddSubCategory"))
const Brand = lazy(() => import("@/app/(admin)/apps/ecommerce/brand/page"))
const DeliveryList = lazy(() => import("@/app/(admin)/apps/ecommerce/DeliveryList/page"))
const EditBrand = lazy(() => import("@/app/(admin)/apps/ecommerce/brand/components/EditBrand"))
const AddBrand = lazy(() => import("@/app/(admin)/apps/ecommerce/brand/components/AddBrand"))
const CustomerDetails = lazy(() => import('@/app/(admin)/apps/ecommerce/customers/[customerId]/page'))
const Orders = lazy(() => import('@/app/(admin)/apps/ecommerce/orders/page'))
const GenericProducts = lazy(()=>import('@/app/(admin)/apps/ecommerce/genericProducts/page'))
const RxOrders = lazy(() => import('@/app/(admin)/apps/ecommerce/RxOrder/RxNewOrderTable/RxNewOrder'))
const RxOrderList = lazy(() => import('@/app/(admin)/apps/ecommerce/RxOrder/Page'))
const RxOrderListAdd = lazy(() => import('@/app/(admin)/apps/ecommerce/RxOrder/components/RxOrderList/components/AddRxOrderDetailsList'))
const OrderDetails = lazy(() => import('@/app/(admin)/apps/ecommerce/orders/[orderId]/page'))
const OrderDetailsID = lazy(() => import('@/app/(admin)/apps/ecommerce/orders/[orderDetailsId]/page'))
const CreateOrderDetails = lazy(() => import('@/app/(admin)/apps/ecommerce/orders/[CreateOrderId]/page'))
const RxOrderDetails = lazy(() => import('@/app/(admin)/apps/ecommerce/RxOrder/components/[orderId]/page'))
const OrderRefunds = lazy(() => import('@/app/(admin)/apps/ecommerce/refunds/page'))
const UsersList = lazy(() => import('@/app/(admin)/apps/ecommerce/user/page'))
const AdminUserPage = lazy(()=>import('@/app/(admin)/apps/ecommerce/AdminUser/page')) 
const AdminRolesPage = lazy(()=>import('@/app/(admin)/apps/ecommerce/AdminRoles/page')) 
const PermissionsPage = lazy(()=>import('@/app/(admin)/apps/ecommerce/Permissions/page')) 
const CreateUser = lazy(() => import('@/app/(admin)/apps/ecommerce/user/components/CreateUser'))
const UserEdit = lazy(() => import("@/app/(admin)/apps/ecommerce/user/components/UserEdit"))
const OrdersAnalytics = lazy(() => import('@/app/(admin)/apps/ecommerce/ordersMonthly/page'))
const ReferalCode = lazy(() => import('@/app/(admin)/apps/ecommerce/referalCode/page'))
const OrderListDelivery = lazy(()=>import('@/app/(admin)/apps/ecommerce/OrderListDelivery/page'))
const EditReferalCode = lazy(() => import('@/app/(admin)/apps/ecommerce/referalCode/components/EditReferalCode'))
const AddReferalCode = lazy(() => import('@/app/(admin)/apps/ecommerce/referalCode/components/AddreferalCode'))
const Store = lazy(() => import('@/app/(admin)/apps/ecommerce/Stores/store/page'))
const AddStore = lazy(() => import('@/app/(admin)/apps/ecommerce/Stores/store/components/AddStore'))
const EditStore = lazy(() => import('@/app/(admin)/apps/ecommerce/Stores/store/components/EditStore'))
const StoreUser = lazy(() => import('@/app/(admin)/apps/ecommerce/Stores/StoreUser/page'))
const AddStoreUser = lazy(() => import('@/app/(admin)/apps/ecommerce/Stores/StoreUser/components/AddStoreUser'))
const EditStoreUser = lazy(() => import('@/app/(admin)/apps/ecommerce/Stores/StoreUser/components/EditStoreUser'))
const Chat = lazy(() => import('@/app/(admin)/apps/chat/page'))
const Contacts = lazy(() => import('@/app/(admin)/apps/contacts/page'))
// const Invoices = lazy(() => import('@/app/(admin)/apps/invoice/page'))
const InvoicesNew = lazy(() => import('@/app/(admin)/apps/invoiceNew/page'))
const UserInvoice = lazy(()=> import('@/app/(admin)/apps/ecommerce/invoiceEdit/page'))
const Calendar = lazy(() => import('@/app/(admin)/apps/calendar/page'))
const BannerTable = lazy(() => import('@/app/(admin)/apps/ecommerce/banner/page'))
const AddHomeBanner = lazy(() => import('@/app/(admin)/apps/ecommerce/banner/AddHomeBanner'))
const EditHomeBanner = lazy(() => import('@/app/(admin)/apps/ecommerce/banner/EditHomeBanner'))
const Settings = lazy(() => import('@/app/(admin)/apps/ecommerce/settings/page'))
const Coupon = lazy(() => import('@/app/(admin)/apps/ecommerce/Coupon/page'))
const TicketCreateForm = lazy(() => import('@/app/(admin)/apps/ecommerce/Lead/Component/CreateTicket'))
const WalletTxn = lazy(() => import('@/app/(admin)/apps/ecommerce/Wallet/page'))

const VendorPortal = lazy(()=>import('@/app/(admin)/apps/ecommerce/VendorPortal/page'))
const CreateVendorPortal = lazy(()=>import('@/app/(admin)/apps/ecommerce/VendorPortal/components/AddVendorPortal'))
const UpdateVendorPortal = lazy(()=>import('@/app/(admin)/apps/ecommerce/VendorPortal/components/UpdateVendorPortal'))
const VendorDetails = lazy(()=> import('@/app/(admin)/apps/ecommerce/VendorPortal/[vendorId]/page'))
// // Base UI Routes
// const Alerts = lazy(() => import('@/app/(admin)/ui/alerts/page'))
// const Avatars = lazy(() => import('@/app/(admin)/ui/avatars/page'))
// const Badges = lazy(() => import('@/app/(admin)/ui/badges/page'))
// const Grids = lazy(() => import('@/app/(admin)/ui/grids/page'))
// const Buttons = lazy(() => import('@/app/(admin)/ui/buttons/page'))
// const Cards = lazy(() => import('@/app/(admin)/ui/cards/page'))
// const Carousel = lazy(() => import('@/app/(admin)/ui/carousels/page'))
// const Images = lazy(() => import('@/app/(admin)/ui/images/page'))
// const Dropdowns = lazy(() => import('@/app/(admin)/ui/dropdowns/page'))
// const ListGroup = lazy(() => import('@/app/(admin)/ui/list/page'))
// const Modals = lazy(() => import('@/app/(admin)/ui/modals/page'))
// const Navs = lazy(() => import('@/app/(admin)/ui/navs/page'))
// const Navbar = lazy(() => import('@/app/(admin)/ui/navbar/page'))
// const Pagination = lazy(() => import('@/app/(admin)/ui/paginations/page'))
// const PopoverAndTooltips = lazy(() => import('@/app/(admin)/ui/popovers-tooltips/page'))
// const Progress = lazy(() => import('@/app/(admin)/ui/progress/page'))
// const Spinners = lazy(() => import('@/app/(admin)/ui/spinners/page'))
// const Typography = lazy(() => import('@/app/(admin)/ui/typography/page'))
// const TabsAndAccordion = lazy(() => import('@/app/(admin)/ui/tabs-accordion/page'))
// const Videos = lazy(() => import('@/app/(admin)/ui/videos/page'))

// // Advanced UI Routes
// const Ratings = lazy(() => import('@/app/(admin)/advanced/ratings/page'))
// const SweetAlerts = lazy(() => import('@/app/(admin)/advanced/alerts/page'))
// const Animation = lazy(() => import('@/app/(admin)/advanced/animation/page'))
// const ClipBoard = lazy(() => import('@/app/(admin)/advanced/clipboard/page'))
// const Dragula = lazy(() => import('@/app/(admin)/advanced/dragula/page'))
// const FileManager = lazy(() => import('@/app/(admin)/advanced/file-manager/page'))
// const Highlight = lazy(() => import('@/app/(admin)/advanced/highlight/page'))
// const RangeSlider = lazy(() => import('@/app/(admin)/advanced/range-slider/page'))
// const Ribbons = lazy(() => import('@/app/(admin)/advanced/ribbons/page'))
// const Toasts = lazy(() => import('@/app/(admin)/advanced/toasts/page'))

// // Charts and Maps Routes
// const ApexChart = lazy(() => import('@/app/(admin)/charts/apex/page'))
// const JustgageCharts = lazy(() => import('@/app/(admin)/charts/justgage/page'))
// const ChartjsCharts = lazy(() => import('@/app/(admin)/charts/chartjs/page'))
// const ToastChart = lazy(() => import('@/app/(admin)/charts/toast/page'))
// const GoogleMaps = lazy(() => import('@/app/(admin)/maps/google/page'))
// const VectorMaps = lazy(() => import('@/app/(admin)/maps/vector/page'))
// const Leafletmaps = lazy(() => import('@/app/(admin)/maps/leaflet/page'))

// Forms Routes
const Basic = lazy(() => import('@/app/(admin)/forms/basic/page'))
const FormAdvanced = lazy(() => import('@/app/(admin)/forms/advance/page'))
const FormValidation = lazy(() => import('@/app/(admin)/forms/validation/page'))
const FormWizard = lazy(() => import('@/app/(admin)/forms/wizard/page'))
const FormEditors = lazy(() => import('@/app/(admin)/forms/editors/page'))
const FormFileUpload = lazy(() => import('@/app/(admin)/forms/file-uploads/page'))
const FormImageCrop = lazy(() => import('@/app/(admin)/forms/image-crop/page'))
const AddNewProdct = lazy(() => import('@/./app/(admin)/apps/ecommerce/Products/components/AddNewProdect'))
const AddMainCategory = lazy(() => import('@/app/(admin)/apps/ecommerce/category/components/AddMainCategory'))
const MasterCategory = lazy(() => import('@/app/(admin)/apps/ecommerce/MasterCategory/page'))
const AddMasterCategory = lazy(() => import('@/app/(admin)/apps/ecommerce/MasterCategory/AddMasterCategory'))
const EditMasterCategory = lazy(() => import("@/app/(admin)/apps/ecommerce/MasterCategory/EditMasterCategory"))
const Category = lazy(() => import('@/app/(admin)/apps/ecommerce/category/page'))
const EditMainCategory = lazy(() => import("@/app/(admin)/apps/ecommerce/category/components/EditMainCategory"))
const AddOrder = lazy(() => import("@/app/(admin)/apps/ecommerce/orders/components/AddOrder"))
const EditOrder = lazy(() => import("@/app/(admin)/apps/ecommerce/orders/components/EditOrder"))
const CrmLead = lazy(() => import("@/app/(admin)/apps/ecommerce/CrmLead/page"))
const AddCrmLead = lazy(() => import("@/app/(admin)/apps/ecommerce/CrmLead/Components/AddCrmLead"))
const EditLead = lazy(() => import("@/app/(admin)/apps/ecommerce/CrmLead/Components/EditCrmLead"))
const LeadAnalytics = lazy(() => import("@/app/(admin)/apps/ecommerce/Lead/Lead analytics/page"))
const AddNewCoupon = lazy(() => import("@/app/(admin)/apps/ecommerce/Coupon/Component/AddNewCoupon"))
const Lead = lazy(() => import("@/app/(admin)/apps/ecommerce/Lead/page"))
const AddNewLead = lazy(() => import("@/app/(admin)/apps/ecommerce/Lead/Component/AddNewLead"))
const CRmCallerList = lazy(() => import("@/app/(admin)/apps/ecommerce/CRmCallerList/page"))
const CRmCallerListEdit = lazy(() => import("@/app/(admin)/apps/ecommerce/CRmCallerList/Components/CRMCallerListEdit"))
const CRmCallerListAdd = lazy(() => import("@/app/(admin)/apps/ecommerce/CRmCallerList/Components/CRMCallerListAdd"))
const AddNewLeadAssignCaller = lazy(() => import("@/app/(admin)/apps/ecommerce/Lead/Component/AddLeadAssignCaller"))
const LeadAction = lazy(()=>import("@/app/(admin)/apps/ecommerce/LeadAction/page"))
const AddLeadAction = lazy(()=>import("@/app/(admin)/apps/ecommerce/LeadAction/components/AddLeadAction"))
const EditLeadAction = lazy(()=>import("@/app/(admin)/apps/ecommerce/LeadAction/components/EditLeadAction"))
const EditCoupon = lazy(() => import("@/app/(admin)/apps/ecommerce/Coupon/Component/EditCoupon"))
const AddWalletTxn = lazy(() => import("@/app/(admin)/apps/ecommerce/Wallet/Comment/AddWalletTxn"))
const EditWalletTxn = lazy(() => import("@/app/(admin)/apps/ecommerce/Wallet/Comment/UpdateWalletTsx"))
// // Form Routes
// const BasicTable = lazy(() => import('@/app/(admin)/tables/basic/page'))
// const DataTables = lazy(() => import('@/app/(admin)/tables/data-tables/page'))

// // Icon Routes
// const FontAwesomeIcons = lazy(() => import('@/app/(admin)/icons/fa/page'))
// const LaIcons = lazy(() => import('@/app/(admin)/icons/la/page'))
// const IcofontIcons = lazy(() => import('@/app/(admin)/icons/icofont/page'))
// const IconoirIcons = lazy(() => import('@/app/(admin)/icons/iconoir/page'))

//template routes
const BasicEmail = lazy(() => import('@/app/(admin)/email-templates/basic/page'))
const AlertEmail = lazy(() => import('@/app/(admin)/email-templates/alert/page'))
const BillingEmail = lazy(() => import('@/app/(admin)/email-templates/billing/page'))

// Not Found Routes
const Error500 = lazy(() => import('@/app/(other)/error-500/page'))
const NotFound = lazy(() => import('@/app/(other)/not-found/page'))

// Pages Routes
const ProfilePage = lazy(() => import('@/app/(admin)/pages/profile/page'))
const Notifications = lazy(() => import('@/app/(admin)/pages/notifications/page'))
const TimelinePage = lazy(() => import('@/app/(admin)/pages/timeline/page'))
const TreeviewPage = lazy(() => import('@/app/(admin)/pages/treeview/page'))
const StarterPage = lazy(() => import('@/app/(admin)/pages/starter/page'))
const PricingPage = lazy(() => import('@/app/(admin)/pages/pricing/page'))
const BlogPage = lazy(() => import('@/app/(admin)/pages/blogs/page'))
const FAQsPage = lazy(() => import('@/app/(admin)/pages/faqs/page'))
const GalleryPage = lazy(() => import('@/app/(admin)/pages/gallery/page'))
const Maintenance = lazy(() => import('@/app/(other)/maintenance/page'))

// Auth Routes
const AuthLogin = lazy(() => import('@/app/(other)/auth/login/page'))
const AuthRegister = lazy(() => import('@/app/(other)/auth/register/page'))
const ResetPassword = lazy(() => import('@/app/(other)/auth/reset-pass/page'))
const LockScreen = lazy(() => import('@/app/(other)/auth/lock-screen/page'))

export type RoutesProps = {
  path: RouteProps['path']
  name: string
  element: RouteProps['element']
  exact?: boolean
}

const initialRoutes: RoutesProps[] = [
  {
    path: '/',
    name: 'root',
    element: <Navigate to="/dashboard/ecommerce" />,
  },
]

const generalRoutes: RoutesProps[] = [
  {
    path: '/dashboard/analytics',
    name: 'Analytics',
    element: <Analytics />,
  },
  {
    path: '/dashboard/ecommerce',
    name: 'Finance',
    element: <Ecommerce />,
  },
]

const appsRoutes: RoutesProps[] = [
  {
    name: 'Analytic Customers',
    path: '/apps/analytics/customers',
    element: <AnalyticCustomer />,
  },
  {
    name: 'Analytic Reports',
    path: '/apps/analytics/reports',
    element: <AnalyticReport />,
  },


  {
    name: 'Project Client',
    path: '/apps/projects/clients',
    element: <ProjectClient />,
  },
  {
    name: 'Project Team',
    path: '/apps/projects/team',
    element: <ProjectTeam />,
  },
  {
    name: 'Project',
    path: '/apps/projects/project',
    element: <Project />,
  },
  {
    name: 'Project Task',
    path: '/apps/projects/task',
    element: <ProjectTask />,
  },
  {
    name: 'Kanban',
    path: '/apps/projects/kanban',
    element: <Kanban />,
  },
  {
    name: 'Project Users',
    path: '/apps/projects/users',
    element: <ProjectUsers />,
  },
  {
    name: 'Project Create',
    path: '/apps/projects/create',
    element: <ProjectCreate />,
  },
 
  {
    name: 'Customer',
    path: '/apps/ecommerce/customers',
    element: <EcommerceCustomers />,
  },
  {
    name: 'Brand',
    path: '/apps/ecommerce/brand',
    element: <Brand />,
  },
  {
    name: 'Sub Category',
    path: '/apps/ecommerce/subcategory',
    element: <SubCategory />,
  },
  {
    name: 'Customers',
    path: '/apps/ecommerce/customers/:customerId',
    element: <CustomerDetails />,
  },
  {
    name: 'Ecommerce Orders',
    path: '/apps/ecommerce/orders',
    element: <Orders />,
  },
    {
    name: 'Ecommerce Generic Products',
    path: '/apps/ecommerce/generic-products',
    element: <GenericProducts />,
  },
    
  {
    name: 'Ecommerce Banner',
    path: '/app/ecommerce/banner',
    element: <BannerTable />,
  },
  {
    name: 'Rx Orders',
    path: '/apps/ecommerce/orders/rxorder',
    element: <RxOrders />,
  },
  {
    name: 'Rx Order List',
    path: '/apps/ecommerce/orders/rxorder/rxorderlist',
    element: <RxOrderList />,
  },

  {
    name: 'Rx Order List Add',
    path: '/apps/ecommerce/orders/rxorder/rxorderlistadd',
    element: <RxOrderListAdd />,
  },

  {
    name: 'Users List',
    path: '/apps/ecommerce/users-list',
    element: <UsersList />,
  },
    {
    name: 'Admin Role List',
    path: '/apps/ecommerce/admin-user-list',
    element: <AdminUserPage />,
  },
  {
    name: 'Admin Roles List',
    path: '/apps/ecommerce/admin-roles-list',
    element: <AdminRolesPage />,
  },
  {
    name: 'Permissions List',
    path: '/apps/ecommerce/admin-permissions-list',
    element: <PermissionsPage />,
  },
  {
    name: 'Create User',
    path: '/apps/ecommerce/users/create-user',
    element: <CreateUser />,
  },
  {
    name: 'Edit User',
    path: '/apps/ecommerce/users/edit-user',
    element: <UserEdit />,
  },
  {
    name: 'Order Analytics',
    path: '/apps/ecommerce/orders/ordersanalytics',
    element: <OrdersAnalytics />,
  },

  {
    name: 'Ecommerce Banner',
    path: '/app/ecommerce/banner',
    element: <BannerTable />,

  },
  {
    name: 'Ecommerce Banner',
    path: '/app/ecommerce/addbanner',
    element: <AddHomeBanner />,
  },
  {
    name: 'Ecommerce Banner',
    path: '/app/ecommerce/EditHomeBanner',
    element: <EditHomeBanner />,
  },
  {
    name: 'Ecommerce Settings',
    path: '/app/ecommerce/settings',
    element: <Settings />,
  },
  {
    name: 'Ecommerce Coupon',
    path: '/app/ecommerce/coupon',
    element: <Coupon />,
  },
  {
    name: 'Ecommerce Coupon',
    path: '/app/ecommerce/addcoupon',
    element: <AddNewCoupon />,
  },

   {
    name: 'Products',
    path: '/apps/ecommerce/products',
    element: <ProductPage />,
  },

  {
    name: 'Ecommerce crmlead',
    path: '/app/ecommerce/crmlead',
    element: <CrmLead />,
  },
  {
    name: 'Ecommerce crmlead',
    path: '/app/ecommerce/lead',
    element: <Lead />,
  },
  {
    name: 'Ecommerce leadAction',
    path: '/apps/ecommerce/leadaction',
    element: <LeadAction />,
  },
  {
  name:'Ecommerce Lead Action Add',
  path:'/app/ecommerce/addleadaction',
  element:<AddLeadAction />
  },{
    name:'Ecommerce Lead Action Edit',
    path:'/app/ecommerce/editleadaction',
    element:<EditLeadAction />
    },
  
  {
    name: 'Ecommerce crm caller list',
    path: '/app/ecommerce/crmcallerlist',
    element: <CRmCallerList />,
  },
  {
    name: 'Ecommerce crm caller list Edit',
    path: '/app/ecommerce/crmcallerlistedit',
    element: <CRmCallerListEdit />,
  },
  {
    name: 'Ecommerce crm caller list Add',
    path: '/app/ecommerce/crmcallerlistadd',
    element: <CRmCallerListAdd />,
  },
  {
    name: 'Ecommerce lead',
    path: '/app/ecommerce/leadassigncaller',
    element: <AddNewLeadAssignCaller />,
  },

  {
    name: 'Ecommerce Banner',
    path: '/app/ecommerce/EditHomeBanner',
    element: <EditHomeBanner />,
  },
  {
    name: 'Ecommerce Settings',
    path: '/app/ecommerce/settings',
    element: <Settings />,
  },
  {
    name: 'Ecommerce Coupon',
    path: '/app/ecommerce/coupon',
    element: <Coupon />,
  },
  {
    name: 'Ecommerce Coupon',
    path: '/app/ecommerce/addcoupon',
    element: <AddNewCoupon />,
  },

  {
    name: 'Ecommerce crmlead',
    path: '/app/ecommerce/crmlead',
    element: <CrmLead />,
  },
  {
    name: 'Ecommerce crmlead',
    path: '/app/ecommerce/lead',
    element: <Lead />,
  },

  // {
  //   name:'Ecommerce crmlead',
  //   path: '/app/ecommerce/viewactionlist/:id',
  //   element:<ViewActionListModal/>,
  // },


  {
    name: 'Ecommerce ticket',
    path: '/app/ecommerce/createticket',
    element: <TicketCreateForm />,
  },
  {
    name: 'Ecommerce crmlead',
    path: '/app/ecommerce/addcrmlead',
    element: <AddCrmLead />,
  },
  {
    name: 'Ecommerce crmlead',
    path: '/app/ecommerce/editcrmlead',
    element: <EditLead />,
  },
  {
    name: "Lead Analytics",
    path: "/apps/ecommerce/lead/leadanalytics",
    element: <LeadAnalytics />
  },
  {
    name: 'Ecommerce coupon',
    path: '/app/ecommerce/Editcoupon',
    element: <EditCoupon />,
  },

  {
    name:'Referal Code',
   path:'/app/ecommerce/ReferalCode',
   element:<ReferalCode/>
  },
  {
    name:'Referal Code Edit',
    path:'/app/ecommerce/editreferalcode',
    element:<EditReferalCode />
  },
    {
    name:'Order List Delivery',
    path:'/app/ecommerce/order-list-delivery',
    element:<OrderListDelivery />
  },
  {
    name:'Referal Code Add',
    path:'/app/ecommerce/addreferalcode',
    element:<AddReferalCode />
  },
  {
    name:'Store',
    path:'/app/ecommerce/store',
    element:<Store />
  },
  {
    name:'Store Add',
    path:'/app/ecommerce/addstore',
    element:<AddStore />
  },
  {
    name:'Store Edit',
    path:'/app/ecommerce/editstore',
    element:<EditStore />
  },
  {
    name:'Store User',
    path:'/app/ecommerce/storeuser',
    element:<StoreUser />
  },
  {
    name:'Store User Add',
    path:'/app/ecommerce/addstoreuser',
    element:<AddStoreUser />
  },
  {
    name:'Store User Edit',
    path:'/app/ecommerce/editstoreuser',
    element:<EditStoreUser />
  },



  // /app/ecommerce/storeuser
  {
    name: 'Ecommerce lead',
    path: '/app/ecommerce/AddNewLead',
    element: <AddNewLead />,
  },

  {
    name: 'Ecommerce ticket',
    path: '/app/ecommerce/createticket',
    element: <TicketCreateForm />,
  },
  {
    name: 'Ecommerce crmlead',
    path: '/app/ecommerce/addcrmlead',
    element: <AddCrmLead />,
  },
  {
    name: 'Ecommerce crmlead',
    path: '/app/ecommerce/editcrmlead',
    element: <EditLead />,
  },
  {
    name: 'Ecommerce coupon',
    path: '/app/ecommerce/Editcoupon',
    element: <EditCoupon />,
  },
  {
    name: 'Ecommerce lead',
    path: '/app/ecommerce/AddNewLead',
    element: <AddNewLead />,
  },
  {
    name: 'Ecommerce wallet',
    path: '/app/ecommerce/wallettxn',
    element: <WalletTxn />,
  },
  {
    name: 'Ecommerce wallet add',
    path: '/app/ecommerce/addwallettxn',
    element: <AddWalletTxn />,
  },
  {
    name: 'Ecommerce wallet edit',
    path: 'app/ecommerce/editwallettxn',
    element: <EditWalletTxn />,
  },

  {
    name: 'Ecommerce vendor',
    path: '/app/ecommerce/vendor-portal',
    element: <VendorPortal />,
  },
  {
    name: 'Ecommerce vendor add',
    path: '/app/ecommerce/create-vendor-portal',
    element: <CreateVendorPortal />,
  },
  {
    name: 'Ecommerce vendor update',
    path: 'app/ecommerce/update-vendor-portal',
    element: <UpdateVendorPortal />,
  },
  {
    name: 'Ecommerce Orders Details',
    path: '/apps/ecommerce/vendor/:venderId',
    element: <VendorDetails />,
  },
  {
    name: 'Ecommerce Orders Details',
    path: '/apps/ecommerce/orders/:orderId',
    element: <OrderDetails />,
  },
  {
    name: 'Ecommerce Orders Details',
    path: '/apps/ecommerce/orders/orders-details/:orderId',
    element: <OrderDetailsID />,
  },
   {
    name: 'Ecommerce Create Orders Details',
    path: '/apps/ecommerce/orders/create-order',
    element: <CreateOrderDetails />,
  },
  {
    name: 'Ecommerce Rx Orders Details',
    path: '/apps/ecommerce/orders/rx-order-details/:orderId',
    element: <RxOrderDetails />,
  },
 
  {
    name: 'Refunds',
    path: '/apps/ecommerce/refunds',
    element: <OrderRefunds />,
  },
  {
    name: 'Chat',
    path: '/apps/chat',
    element: <Chat />,
  },
  {
    name: 'Contacts',
    path: '/apps/contacts',
    element: <Contacts />,
  },
  // {
  //   name: 'Invoices List',
  //   path: '/apps/invoice',
  //   element: <Invoices />,
  // },
    {
    name: 'InvoicesNew List',
    path: '/apps/order-invoice',
    element: <InvoicesNew />,
  },
  {
    name:'UserInvoice',
    path:'/apps/ecommerce/order/invoice',
    element:<UserInvoice />
  },
  {
    name: 'Calendar',
    path: '/apps/calendar',
    element: <Calendar />,
  },
]

const customRoutes: RoutesProps[] = [
  {
    path: '/pages/profile',
    name: 'Profile',
    element: <ProfilePage />,
  },
  {
    path: '/pages/notifications',
    name: 'Notifications',
    element: <Notifications />,
  },
  {
    path: '/pages/timeline',
    name: 'Timeline',
    element: <TimelinePage />,
  },
  {
    path: '/pages/treeview',
    name: 'Treeview',
    element: <TreeviewPage />,
  },
  {
    path: '/pages/starter',
    name: 'Starter Page',
    element: <StarterPage />,
  },
  {
    path: '/pages/pricing',
    name: 'Pricing',
    element: <PricingPage />,
  },
  {
    path: '/pages/blogs',
    name: 'Blogs',
    element: <BlogPage />,
  },
  {
    path: '/pages/faqs',
    name: 'Faqs',
    element: <FAQsPage />,
  },
  {
    path: '/pages/gallery',
    name: 'Gallery',
    element: <GalleryPage />,
  },
]

// const baseUIRoutes: RoutesProps[] = [
//   {
//     name: 'Alerts',
//     path: '/ui/alerts',
//     element: <Alerts />,
//   },
//   {
//     name: 'Avatars',
//     path: '/ui/avatars',
//     element: <Avatars />,
//   },
//   {
//     name: 'Badges',
//     path: '/ui/badges',
//     element: <Badges />,
//   },
//   {
//     name: 'Grids',
//     path: '/ui/grids',
//     element: <Grids />,
//   },
//   {
//     name: 'Buttons',
//     path: '/ui/buttons',
//     element: <Buttons />,
//   },
//   {
//     name: 'Cards',
//     path: '/ui/cards',
//     element: <Cards />,
//   },
//   {
//     name: 'Carousel',
//     path: '/ui/carousels',
//     element: <Carousel />,
//   },
//   {
//     name: 'Images',
//     path: '/ui/images',
//     element: <Images />,
//   },
//   {
//     name: 'Dropdowns',
//     path: '/ui/dropdowns',
//     element: <Dropdowns />,
//   },
//   {
//     name: 'List Group',
//     path: '/ui/list',
//     element: <ListGroup />,
//   },
//   {
//     name: 'Modals',
//     path: '/ui/modals',
//     element: <Modals />,
//   },
//   {
//     name: 'Navs',
//     path: '/ui/navs',
//     element: <Navs />,
//   },
//   {
//     name: 'Navbar',
//     path: '/ui/navbar',
//     element: <Navbar />,
//   },
//   {
//     name: 'Pagination',
//     path: '/ui/paginations',
//     element: <Pagination />,
//   },
//   {
//     name: 'Popovers Tooltips',
//     path: '/ui/popovers-tooltips',
//     element: <PopoverAndTooltips />,
//   },
//   {
//     name: 'Progress',
//     path: '/ui/progress',
//     element: <Progress />,
//   },
//   {
//     name: 'Spinners',
//     path: '/ui/spinners',
//     element: <Spinners />,
//   },
//   {
//     name: 'Tabs Accordion',
//     path: '/ui/tabs-accordion',
//     element: <TabsAndAccordion />,
//   },
//   {
//     name: 'Typography',
//     path: '/ui/typography',
//     element: <Typography />,
//   },
//   {
//     name: 'Videos',
//     path: '/ui/videos',
//     element: <Videos />,
//   },
// ]

// const advancedUIRoutes: RoutesProps[] = [
//   {
//     path: '/advanced/animation',
//     name: 'Animation',
//     element: <Animation />,
//   },
//   {
//     path: '/advanced/clipboard',
//     name: 'Clip-Board',
//     element: <ClipBoard />,
//   },
//   {
//     path: '/advanced/dragula',
//     name: 'Dragula',
//     element: <Dragula />,
//   },
//   {
//     path: '/advanced/file-manager',
//     name: 'File Manager',
//     element: <FileManager />,
//   },
//   {
//     path: '/advanced/highlight',
//     name: 'Highlight',
//     element: <Highlight />,
//   },
//   {
//     path: '/advanced/range-slider',
//     name: 'Range Slider',
//     element: <RangeSlider />,
//   },
//   {
//     path: '/advanced/ratings',
//     name: 'Ratings',
//     element: <Ratings />,
//   },
//   {
//     path: '/advanced/ribbons',
//     name: 'Ribbons',
//     element: <Ribbons />,
//   },
//   {
//     path: '/advanced/alerts',
//     name: 'Sweet Alerts',
//     element: <SweetAlerts />,
//   },
//   {
//     path: '/advanced/toasts',
//     name: 'Toasts',
//     element: <Toasts />,
//   },
// ]

// const chartsNMapsRoutes: RoutesProps[] = [
//   {
//     path: '/charts/apex',
//     name: 'Apex',
//     element: <ApexChart />,
//   },
//   {
//     path: '/charts/justgage',
//     name: 'Justgage',
//     element: <JustgageCharts />,
//   },
//   {
//     path: '/charts/chartjs',
//     name: 'Chartjs',
//     element: <ChartjsCharts />,
//   },
//   {
//     path: '/charts/toast',
//     name: 'Toast Chart',
//     element: <ToastChart />,
//   },
//   {
//     name: 'Google',
//     path: '/maps/google',
//     element: <GoogleMaps />,
//   },
//   {
//     name: 'Vector',
//     path: '/maps/vector',
//     element: <VectorMaps />,
//   },
//   {
//     name: 'Leaflet',
//     path: '/maps/leaflet',
//     element: <Leafletmaps />,
//   },
// ]

const formsRoutes: RoutesProps[] = [
  {
    path: '/forms/basic',
    name: 'Basic Elements',
    element: <Basic />,
  },
  {
    path: '/apps/ecommerce/addnewproduct',
    name: 'Add New Product',
    element: <AddNewProdct />,
  },
  {
    path: '/apps/ecommerce/maincategory',
    name: 'Add Main Category',
    element: <AddMainCategory />,
  },
  {
    path: "/apps/ecommerce/mastercategory",
    name: "Master Category",
    element: <MasterCategory />

  },
  {
    path: "/apps/ecommerce/editmastercategory",
    name: "Edit Master Category",
    element: <EditMasterCategory />
  },
  {
    path: "/apps/ecommerce/addmastercategory",
    name: "Add Master Category",
    element: <AddMasterCategory />
  },
  {
    path: '/apps/ecommerce/category',
    name: 'Add Category',
    element: <Category />,
  },
  {
    path: '/apps/ecommerce/editcategory',
    name: 'Edit Main Category',
    element: <EditMainCategory />,
  },
  {
    path: '/apps/ecommerce/addsubcategory',
    name: 'Add Sub Category',
    element: <AddSubCategory />,
  },
  {
    path: '/apps/ecommerce/editsubcategory',
    name: 'Edit Sub Category',
    element: <EditSubCategory />,
  },
  {
    path: '/apps/ecommerce/addorder',
    name: 'Add Order',
    element: <AddOrder />,
  },
  {
    path: '/apps/ecommerce/editorder',
    name: 'Edit Order',
    element: <EditOrder />,
  },
  {
    path: '/apps/ecommerce/editproduct',
    name: 'Edit Product',
    element: <EditProduct />,
  },
  {
    path: '/apps/ecommerce/editbrand',
    name: 'Edit Brand',
    element: <EditBrand />,
  },
  {
    path: '/apps/ecommerce/delivery-list',
    name: 'Delivery List',
    element: <DeliveryList />,
  },
  {
    path: '/apps/ecommerce/addbrand',
    name: 'Add Brand',
    element: <AddBrand />,
  },

  {
    path: '/forms/advance',
    name: 'Advance Elements',
    element: <FormAdvanced />,
  },
  {
    path: '/forms/validation',
    name: 'Validation',
    element: <FormValidation />,
  },
  {
    path: '/forms/wizard',
    name: 'Wizard',
    element: <FormWizard />,
  },
  {
    path: '/forms/editors',
    name: 'Editors',
    element: <FormEditors />,
  },
  {
    path: '/forms/file-uploads',
    name: 'File Upload',
    element: <FormFileUpload />,
  },
  {
    path: '/forms/image-crop',
    name: 'Image Crop',
    element: <FormImageCrop />,
  },
]

// const tableRoutes: RoutesProps[] = [
//   {
//     name: 'Basic Tables',
//     path: '/tables/basic',
//     element: <BasicTable />,
//   },
//   {
//     name: 'Data Table',
//     path: '/tables/data-tables',
//     element: <DataTables />,
//   },
// ]

// const iconRoutes: RoutesProps[] = [
//   {
//     name: 'Font Awesome',
//     path: '/icons/fa',
//     element: <FontAwesomeIcons />,
//   },
//   {
//     name: 'Line Awesome',
//     path: '/icons/la',
//     element: <LaIcons />,
//   },
//   {
//     name: 'Icofont',
//     path: '/icons/icofont',
//     element: <IcofontIcons />,
//   },
//   {
//     name: 'Iconoir',
//     path: '/icons/iconoir',
//     element: <IconoirIcons />,
//   },
// ]

const templateRoutes: RoutesProps[] = [
  {
    name: 'Basic Email Template',
    path: '/email-templates/basic',
    element: <BasicEmail />,
  },
  {
    name: 'Alert Email Template',
    path: '/email-templates/alert',
    element: <AlertEmail />,
  },
  {
    name: 'Billing Email Template',
    path: '/email-templates/Billing',
    element: <BillingEmail />,
  },
]

export const authRoutes: RoutesProps[] = [
  {
    path: '/auth/login',
    name: 'Sign In',
    element: <AuthLogin />,
  },
  {
    name: 'Register',
    path: '/auth/register',
    element: <AuthRegister />,
  },
  {
    name: 'Reset Password',
    path: '/auth/reset-pass',
    element: <ResetPassword />,
  },
  {
    name: 'Lock Screen',
    path: '/auth/lock-screen',
    element: <LockScreen />,
  },
  {
    name: '404 Error',
    path: '/not-found',
    element: <NotFound />,
  },
  {
    name: '500 Error',
    path: '/error-500',
    element: <Error500 />,
  },
  {
    name: 'Maintenance',
    path: '/maintenance',
    element: <Maintenance />,
  },
]

export const appRoutes = [
  ...initialRoutes,
  ...generalRoutes,
  ...appsRoutes,
  ...customRoutes,
  // ...baseUIRoutes,
  // ...advancedUIRoutes,
  // ...chartsNMapsRoutes,
  ...formsRoutes,
  // ...tableRoutes,
  // ...iconRoutes,
  ...authRoutes,
  ...templateRoutes,
]
