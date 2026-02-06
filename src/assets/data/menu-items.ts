import type { MenuItemType } from '@/types/menu'

export const MENU_ITEMS: MenuItemType[] = [
  {
    key: 'main',
    label: 'Main Menu',
    isTitle: true,
  },
  {
    key: 'dashboards',
    icon: 'iconoir:reports-solid',
    label: 'Dashboards',
    children: [
      // {
      //   key: 'dashboard-analytics',
      //   label: 'Analytics',
      //   url: '/dashboard/analytics',
      //   parentKey: 'dashboards',
      // },
      {
        key: 'dashboard-ecommerce',
        label: 'Order Analytics ',
        url: '/dashboard/ecommerce',
        parentKey: 'dashboards',
      },
    ],
  },

  {
    key: 'Orders',
    icon: 'iconoir:view-grid',
    label: 'Orders',
    children: [
      {
        key: 'dashboard-ecommerce-orders',
        label: 'Order list ',
        url: '/apps/ecommerce/orders',
        parentKey: 'Orders',
      },
      // {

      //   key: 'dashboard-ecommerce-Ordersanalytics',
      //   label: 'Orders Analytics ',
      //   url: '/apps/ecommerce/orders/ordersanalytics',
      //   parentKey: 'Orders Analytics',
      // },

    ],
  },
  {
    key: 'Rx Orders',
    icon: 'iconoir:package',
    label: 'Rx Orders',
    children: [

      {
        key: 'dashboard-ecommerce-orders-rxorder',
        label: 'Rx Order',
        url: '/apps/ecommerce/orders/rxorder',
        parentKey: 'RxOrders',
      },
      {
        key: 'dashboard-ecommerce-orders-rxorderlist',
        label: 'Rx Order List',
        url: '/apps/ecommerce/orders/rxorder/rxorderlist',
        parentKey: 'RxOrderlist',
      },
     
    ],
  },
  // {
  //   key: 'Lead',
  //   icon: 'iconoir:user',
  //   label: 'Lead',
  //   children: [

  //     {
  //       key: 'dashboard-ecommerce-lead',
  //       label: 'Lead ',
  //       url: '/app/ecommerce/lead',
  //       parentKey: 'Lead',
  //     },
  //     {
  //       key:'dashboard-ecommerce-leadanalytics',
  //       label:"Lead Analytics",
  //       url: '/apps/ecommerce/lead/leadanalytics',
  //       parentKey:'LeadAnalytics'
  //     },
  //     {
  //       key: 'dashboard-ecommerce-crmlead',
  //       label: 'Crm Lead ',
  //       url: '/app/ecommerce/crmlead',
  //       parentKey: 'Orders',
  //     },
  //     {
  //       key: 'dashboard-ecommerce-crmcallerlist',
  //       label: 'Crm Caller List ',
  //       url: '/app/ecommerce/crmcallerlist',
  //       parentKey: 'CrmCallerList',
  //     },
  //     {
  //       key: 'dashboard-ecommerce-orders-usersList',
  //       label: 'Users List',
  //       url: '/apps/ecommerce/orders/usersList',
  //       parentKey: 'UsersList',
  //     },
  //     {
  //       key: 'dashboard-ecommerce-leadAction',
  //       label: 'Lead Action',
  //       url: '/apps/ecommerce/leadaction',
  //       parentKey: 'Lead Action',
  //     },

  //   ],
  // },

  {
    key: 'Products',
    icon: 'iconoir:flower',
    label: 'Product Managment',
    children: [

      {
        key: 'dashboard-ecommerce-products',
        label: 'Product list',
        url: '/apps/ecommerce/products',
        parentKey: 'Products',
      },
      //   {
      //   key: 'dashboard-ecommerce-generic-products',
      //   label: 'Generic Products list ',
      //   url: '/apps/ecommerce/generic-products',
      //   parentKey: 'Products',
      // },
      {
        key: 'ddashboard-ecommerce-category',
        label: 'Category List ',
        url: '/apps/ecommerce/category',
        parentKey: 'Products',
      },

      {
        key: 'ddashboard-ecommerce-subcategory',
        label: 'Sub Category List ',
        url: '/apps/ecommerce/subcategory',
        parentKey: 'Products',
      },
      {
        key: 'ddashboard-ecommerce-masterCategory',
        label: 'Master Category List',
        url: '/apps/ecommerce/mastercategory',
        parentKey: 'Products',
      },

      {
        key: 'ddashboard-ecommerce-brand',
        label: 'Brand  List ',
        url: '/apps/ecommerce/brand',
        parentKey: 'Products',
      },

    ],
  },
    {
    key: 'Users',
    icon: 'iconoir:user',
    label: 'Users',
    children: [

      {
        key: 'users-ecommerce',
        label: 'Users List',
        url: '/apps/ecommerce/users-list',
        parentKey: 'users',
      },
    ],
  },
   {
    key: 'Admin_Role',
    icon: 'iconoir:community',
    label: 'Admin User & Role',
    children: [
      {
        key: 'admin-ecommerce',
        label: 'Admin User List',
        url: '/apps/ecommerce/admin-user-list',
        parentKey: 'Admin_Role',
      },
      {
        key: 'admin-ecommerce',
        label: 'Admin Roles List',
        url: '/apps/ecommerce/admin-roles-list',
        parentKey: 'Admin_Role',
      },
      {
        key: 'admin-ecommerce',
        label: 'Permissions List',
        url: '/apps/ecommerce/admin-permissions-list',
        parentKey: 'Admin_Role',
      },
    ],
  },
  {
    key: 'Delivery',
    icon: 'iconoir:delivery',
    label: 'Delivery',
    children: [
      {
        key: 'dashboard-ecommerce-store',
        label: 'Order List ',
        url: '/app/ecommerce/order-list-delivery',
        parentKey: 'Delivery',
      },
    ],
  },

  {
    key: 'Delivery_list',
    icon: 'iconoir:delivery',
    label: 'Delivery List',
    children: [
      {
        key: 'dashboard-ecommerce-delivery-list',
        label: 'Delivery Boy List ',
        url: '/apps/ecommerce/delivery-list',
        parentKey: 'Delivery_list',
      },
    ],
  },

  {
    key: 'Store',
    icon: 'iconoir:palette',
    label: 'Store',
    children: [
      {
        key: 'dashboard-ecommerce-store',
        label: 'Store ',
        url: '/app/ecommerce/store',
        parentKey: 'Store',
      },
      {
        key: 'dashboard-ecommerce-storeUser',
        label: 'Store User ',
        url: '/app/ecommerce/storeuser',
        parentKey: 'Store User',
      },
    ],
  },

  // {
  //   key: 'vendor',
  //   icon: 'iconoir:star',
  //   label: 'Vendor Portal',
  //   children: [

  //     {
  //       key: 'vendor-ecommerce',
  //       label: 'Vendor Portal',
  //       url: '/app/ecommerce/vendor-portal',
  //       parentKey: 'vendor',
  //     },
  //   ],
  // },

  {
    key: 'Coupon',
    icon: 'iconoir:iconoir',
    label: 'Coupon',
    children: [
      {
        key: 'dashboard-ecommerce-coupon',
        label: 'coupon list ',
        url: '/app/ecommerce/coupon',
        parentKey: 'Coupon',
      },
    ],
  },

  {
    key: 'Referal Code',
    icon: 'iconoir:code',
    label: 'Referal Code',
    children: [
      {
        key: 'dashboard-ecommerce-referalCode',
        label: 'Referal Code ',
        url: '/app/ecommerce/referalCode',
        parentKey: 'referalCode',
      },
    ],
  },

  {
    key: 'Banner',
    icon: 'iconoir:cinema-old',
    label: 'Banner',
    children: [
      {
        key: 'dashboard-ecommerce-home-banner',
        label: 'Home list ',
        url: '/app/ecommerce/banner',
        parentKey: 'Banner',
      },

    ],
  },

  {
    key: 'Settings',
    icon: 'iconoir:settings',
    label: 'Settings',
    children: [
      {
        key: 'dashboard-ecommerce-main-setting',
        label: 'Settings   ',
        url: '/app/ecommerce/settings',
        parentKey: 'Settings',
      },

    ],
  },
  {
    key: 'wallet',
    icon: 'iconoir:wallet',
    label: 'Wallet',
    children: [

      {
        key: 'Wallet-ecommerce',
        label: 'Wallet ',
        url: '/app/ecommerce/wallettxn',
        parentKey: 'wallet',
      },
    ],
  },


  // {
  //   key: 'apps',
  //   icon: 'iconoir:view-grid',
  //   label: 'Applications',
  //   children: [
  //     {
  //       key: 'apps-analytics',
  //       label: 'Analytics',
  //       parentKey: 'apps',
  //       children: [
  //         {
  //           key: 'apps-analytics-customers',
  //           label: 'Customers',
  //           url: '/apps/analytics/customers',
  //           parentKey: 'apps-analytics',
  //         },
  //         {
  //           key: 'apps-analytics-reports',
  //           label: 'Reports',
  //           url: '/apps/analytics/reports',
  //           parentKey: 'apps-analytics',
  //         },
  //       ],
  //     },
  //     {
  //       key: 'apps-projects',
  //       label: 'CRM',
  //       parentKey: 'apps',
  //       children: [
  //         // {
  //         //   key: 'apps-projects-clients',
  //         //   label: 'Clients',
  //         //   url: '/apps/projects/clients',
  //         //   parentKey: 'apps-projects',
  //         // },
  //         // {
  //         //   key: 'apps-projects-team',
  //         //   label: 'Team',
  //         //   url: '/apps/projects/team',
  //         //   parentKey: 'apps-projects',
  //         // },
  //         // {
  //         //   key: 'apps-projects-project',
  //         //   label: 'Project',
  //         //   url: '/apps/projects/project',
  //         //   parentKey: 'apps-projects',
  //         // },
  //         {
  //           key: 'apps-projects-task',
  //           label: 'Lead',
  //           url: '/apps/projects/task',
  //           parentKey: 'apps-projects',
  //         },
  //         // {
  //         //   key: 'apps-projects-kanban',
  //         //   label: 'Kanban Board',
  //         //   url: '/apps/projects/kanban',
  //         //   parentKey: 'apps-projects',
  //         // },
  //         // {
  //         //   key: 'apps-projects-users',
  //         //   label: 'Users',
  //         //   url: '/apps/projects/users',
  //         //   parentKey: 'apps-projects',
  //         // },
  //         // {
  //         //   key: 'apps-projects-create',
  //         //   label: 'Project Create',
  //         //   url: '/apps/projects/create',
  //         //   parentKey: 'apps-projects',
  //         // },
  //       ],
  //     },
  //     {
  //       key: 'apps-ecommerce',
  //       label: 'Orders Managment',
  //       parentKey: 'apps',
  //       children: [
  //         {
  //           key: 'apps-ecommerce-products',
  //           label: 'Products',
  //           url: '/apps/ecommerce/products',
  //           parentKey: 'apps-ecommerce',
  //         },
  //         {
  //           key: 'apps-ecommerce-customers',
  //           label: 'Customers',
  //           url: '/apps/ecommerce/customers',
  //           parentKey: 'apps-ecommerce',
  //         },
  //         {
  //           key: 'apps-ecommerce-customers-details',
  //           label: 'Customers History',
  //           url: '/apps/ecommerce/customers/2001',
  //           parentKey: 'apps-ecommerce',
  //         },
  //         {
  //           key: 'apps-ecommerce-orders',
  //           label: 'Orders',
  //           url: '/apps/ecommerce/orders',
  //           parentKey: 'apps-ecommerce',
  //         },
  //         {
  //           key: 'apps-ecommerce-orders-details',
  //           label: 'Orders Details',
  //           url: '/apps/ecommerce/orders/1001',
  //           parentKey: 'apps-ecommerce',
  //         },
  //         // {
  //         //   key: 'apps-ecommerce-refunds',
  //         //   label: 'Refunds',
  //         //   url: '/apps/ecommerce/refunds',
  //         //   parentKey: 'apps-ecommerce',
  //         // },
  //       ],
  //     },


  //     // {
  //     //   key: 'apps-chat',
  //     //   label: 'Chat',
  //     //   parentKey: 'apps',
  //     //   url: '/apps/chat',
  //     // },
  //     // {
  //     //   key: 'apps-contact-list',
  //     //   label: 'Contact List',
  //     //   parentKey: 'apps',
  //     //   url: '/apps/contacts',
  //     // },
  //     // {
  //     //   key: 'apps-calendar',
  //     //   label: 'Calendar',
  //     //   parentKey: 'apps',
  //     //   url: '/apps/calendar',
  //     // },
  //     {
  //       key: 'apps-invoice',
  //       label: 'Invoice',
  //       parentKey: 'apps',
  //       url: '/apps/invoice',
  //     },
  //   ],
  // },
  // {
  //   key: 'components',
  //   label: 'COMPONENTS',
  //   isTitle: true,
  // },
  // {
  //   key: 'base-ui',
  //   icon: 'iconoir:compact-disc',
  //   label: 'UI Elements',
  //   children: [
  //     {
  //       key: 'base-ui-alerts',
  //       label: 'Alerts',
  //       url: '/ui/alerts',
  //       parentKey: 'base-ui',
  //     },
  //     {
  //       key: 'base-ui-avatars',
  //       label: 'Avatars',
  //       url: '/ui/avatars',
  //       parentKey: 'base-ui',
  //     },
  //     {
  //       key: 'base-ui-buttons',
  //       label: 'Buttons',
  //       url: '/ui/buttons',
  //       parentKey: 'base-ui',
  //     },
  //     {
  //       key: 'base-ui-badges',
  //       label: 'Badges',
  //       url: '/ui/badges',
  //       parentKey: 'base-ui',
  //     },
  //     {
  //       key: 'base-ui-cards',
  //       label: 'Cards',
  //       url: '/ui/cards',
  //       parentKey: 'base-ui',
  //     },

  //     {
  //       key: 'base-ui-carousel',
  //       label: 'Carousels',
  //       url: '/ui/carousels',
  //       parentKey: 'base-ui',
  //     },
  //     {
  //       key: 'base-ui-dropdowns',
  //       label: 'Dropdowns',
  //       url: '/ui/dropdowns',
  //       parentKey: 'base-ui',
  //     },
  //     {
  //       key: 'base-ui-grids',
  //       label: 'Grids',
  //       url: '/ui/grids',
  //       parentKey: 'base-ui',
  //     },
  //     {
  //       key: 'base-ui-images',
  //       label: 'Images',
  //       url: '/ui/images',
  //       parentKey: 'base-ui',
  //     },
  //     {
  //       key: 'base-ui-list',
  //       label: 'List',
  //       url: '/ui/list',
  //       parentKey: 'base-ui',
  //     },
  //     {
  //       key: 'base-ui-modals',
  //       label: 'Modals',
  //       url: '/ui/modals',
  //       parentKey: 'base-ui',
  //     },
  //     {
  //       key: 'base-ui-navs',
  //       label: 'Navs',
  //       url: '/ui/navs',
  //       parentKey: 'base-ui',
  //     },
  //     {
  //       key: 'base-ui-navbar',
  //       label: 'Navbar',
  //       url: '/ui/navbar',
  //       parentKey: 'base-ui',
  //     },
  //     {
  //       key: 'base-ui-pagination',
  //       label: 'Paginations',
  //       url: '/ui/paginations',
  //       parentKey: 'base-ui',
  //     },
  //     {
  //       key: 'base-ui-popover-tooltip',
  //       label: 'Popovers & Tooltips',
  //       url: '/ui/popovers-tooltips',
  //       parentKey: 'base-ui',
  //     },
  //     {
  //       key: 'base-ui-progress',
  //       label: 'Progress',
  //       url: '/ui/progress',
  //       parentKey: 'base-ui',
  //     },
  //     {
  //       key: 'base-ui-spinners',
  //       label: 'Spinners',
  //       url: '/ui/spinners',
  //       parentKey: 'base-ui',
  //     },
  //     {
  //       key: 'base-ui-tabs-accordion',
  //       label: 'Tabs & Accordions',
  //       url: '/ui/tabs-accordion',
  //       parentKey: 'base-ui',
  //     },
  //     {
  //       key: 'base-ui-typography',
  //       label: 'Typography',
  //       url: '/ui/typography',
  //       parentKey: 'base-ui',
  //     },
  //     {
  //       key: 'base-ui-videos',
  //       label: 'Videos',
  //       url: '/ui/videos',
  //       parentKey: 'base-ui',
  //     },
  //   ],
  // },
  // {
  //   key: 'advanced-ui',
  //   icon: 'iconoir:peace-hand',
  //   badge: {
  //     text: 'new',
  //     variant: 'info',
  //   },
  //   label: 'Advanced UI',
  //   children: [
  //     {
  //       key: 'advanced-ui-animation',
  //       label: 'Animation',
  //       url: '/advanced/animation',
  //       parentKey: 'advanced-ui',
  //     },
  //     {
  //       key: 'advanced-ui-clipboard',
  //       label: 'Clip Board',
  //       url: '/advanced/clipboard',
  //       parentKey: 'advanced-ui',
  //     },
  //     {
  //       key: 'advanced-ui-dragula',
  //       label: 'Dragula',
  //       url: '/advanced/dragula',
  //       parentKey: 'advanced-ui',
  //     },
  //     {
  //       key: 'advanced-ui-file-manager',
  //       label: 'File Manager',
  //       url: '/advanced/file-manager',
  //       parentKey: 'advanced-ui',
  //     },
  //     {
  //       key: 'advanced-ui-highlight',
  //       label: 'Highlight',
  //       url: '/advanced/highlight',
  //       parentKey: 'advanced-ui',
  //     },
  //     {
  //       key: 'advanced-ui-range-slider',
  //       label: 'Range Slider',
  //       url: '/advanced/range-slider',
  //       parentKey: 'advanced-ui',
  //     },
  //     {
  //       key: 'advanced-ui-ratings',
  //       label: 'Ratings',
  //       url: '/advanced/ratings',
  //       parentKey: 'advanced-ui',
  //     },
  //     {
  //       key: 'advanced-ui-ribbons',
  //       label: 'Ribbons',
  //       url: '/advanced/ribbons',
  //       parentKey: 'advanced-ui',
  //     },
  //     {
  //       key: 'advanced-ui-sweet-alert',
  //       label: 'Sweet Alerts',
  //       url: '/advanced/alerts',
  //       parentKey: 'advanced-ui',
  //     },
  //     {
  //       key: 'advanced-ui-toast',
  //       label: 'Toasts',
  //       url: '/advanced/toasts',
  //       parentKey: 'advanced-ui',
  //     },
  //   ],
  // },
  // {
  //   key: 'forms',
  //   icon: 'iconoir:journal-page',
  //   label: 'Forms',
  //   children: [
  //     {
  //       key: 'forms-basic-elements',
  //       label: 'Basic Elements',
  //       url: '/forms/basic',
  //       parentKey: 'forms',
  //     },
  //     {
  //       key: 'forms-advance',
  //       label: 'Advance Elements',
  //       url: '/forms/advance',
  //       parentKey: 'forms',
  //     },
  //     {
  //       key: 'forms-validation',
  //       label: 'Validation',
  //       url: '/forms/validation',
  //       parentKey: 'forms',
  //     },
  //     {
  //       key: 'forms-wizard',
  //       label: 'Wizard',
  //       url: '/forms/wizard',
  //       parentKey: 'forms',
  //     },
  //     {
  //       key: 'forms-editors',
  //       label: 'Editors',
  //       url: '/forms/editors',
  //       parentKey: 'forms',
  //     },
  //     {
  //       key: 'forms-file-uploads',
  //       label: 'File Upload',
  //       url: '/forms/file-uploads',
  //       parentKey: 'forms',
  //     },
  //     {
  //       key: 'forms-image-crop',
  //       label: 'Image Crop',
  //       url: '/forms/image-crop',
  //       parentKey: 'forms',
  //     },
  //   ],
  // },
  // {
  //   key: 'charts',
  //   label: 'Charts',
  //   icon: 'iconoir:candlestick-chart',
  //   children: [
  //     {
  //       key: 'charts-apex',
  //       label: 'Apex',
  //       url: '/charts/apex',
  //       parentKey: 'charts',
  //     },
  //     {
  //       key: 'charts-justgage',
  //       label: 'JustGage',
  //       url: '/charts/justgage',
  //       parentKey: 'charts',
  //     },
  //     {
  //       key: 'charts-chartjs',
  //       label: 'ChartjS',
  //       url: '/charts/chartjs',
  //       parentKey: 'charts',
  //     },
  //     {
  //       key: 'charts-toast',
  //       label: 'Toast',
  //       url: '/charts/toast',
  //       parentKey: 'charts',
  //     },
  //   ],
  // },
  // {
  //   key: 'tables',
  //   icon: 'iconoir:table-rows',
  //   label: 'Tables',
  //   children: [
  //     {
  //       key: 'tables-basic',
  //       label: 'Basic Tables',
  //       url: '/tables/basic',
  //       parentKey: 'tables',
  //     },
  //     {
  //       key: 'tables-data-tables',
  //       label: 'Datatables',
  //       url: '/tables/data-tables',
  //       parentKey: 'tables',
  //     },
  //   ],
  // },
  // {
  //   key: 'icons',
  //   icon: 'iconoir:trophy',
  //   label: 'Icons',
  //   children: [
  //     {
  //       key: 'icons-font-awesome',
  //       label: 'Font Awesome',
  //       url: '/icons/fa',
  //       parentKey: 'icons',
  //     },
  //     {
  //       key: 'icons-line-awesome',
  //       label: 'Line Awesome',
  //       url: '/icons/la',
  //       parentKey: 'icons',
  //     },
  //     {
  //       key: 'icons-icofont',
  //       label: 'Icofont',
  //       url: '/icons/icofont',
  //       parentKey: 'icons',
  //     },
  //     {
  //       key: 'icons-iconoir',
  //       label: 'Iconoir',
  //       url: '/icons/iconoir',
  //       parentKey: 'icons',
  //     },
  //   ],
  // },
  // {
  //   key: 'maps',
  //   icon: 'iconoir:navigator-alt',
  //   label: 'Maps',
  //   children: [
  //     {
  //       key: 'maps-google',
  //       label: 'Google Maps',
  //       url: '/maps/google',
  //       parentKey: 'maps',
  //     },
  //     {
  //       key: 'maps-leaflet',
  //       label: 'Leaflet Maps',
  //       url: '/maps/leaflet',
  //       parentKey: 'maps',
  //     },
  //     {
  //       key: 'maps-vector',
  //       label: 'Vector Maps',
  //       url: '/maps/vector',
  //       parentKey: 'maps',
  //     },
  //   ],
  // },
  // {
  //   key: 'email-templates',
  //   label: 'Email Templates',
  //   icon: 'iconoir:send-mail',
  //   children: [
  //     {
  //       key: 'email-templates-basic',
  //       label: 'Basic Action Email',
  //       url: '/email-templates/basic',
  //       parentKey: 'email-templates',
  //     },
  //     {
  //       key: 'email-templates-alert',
  //       label: 'Alert Email',
  //       url: '/email-templates/alert',
  //       parentKey: 'email-templates',
  //     },
  //     {
  //       key: 'email-templates-billing',
  //       label: 'Billing Email',
  //       url: '/email-templates/billing',
  //       parentKey: 'email-templates',
  //     },
  //   ],
  // },
  // {
  //   key: 'crafted',
  //   label: 'CRAFTED',
  //   isTitle: true,
  // },
  // {
  //   key: 'pages',
  //   label: 'Pages',
  //   isTitle: false,
  //   icon: 'iconoir:page-star',
  //   children: [
  //     {
  //       key: 'page-profile',
  //       label: 'Profile',
  //       url: '/pages/profile',
  //       parentKey: 'pages',
  //     },
  //     {
  //       key: 'page-notifications',
  //       label: 'Notifications',
  //       url: '/pages/notifications',
  //       parentKey: 'pages',
  //     },
  //     {
  //       key: 'page-timeline',
  //       label: 'Timeline',
  //       url: '/pages/timeline',
  //       parentKey: 'pages',
  //     },
  //     {
  //       key: 'page-tree-view',
  //       label: 'Treeview',
  //       url: '/pages/treeview',
  //       parentKey: 'pages',
  //     },
  //     {
  //       key: 'page-starter',
  //       label: 'Starter Page',
  //       url: '/pages/starter',
  //       parentKey: 'pages',
  //     },
  //     {
  //       key: 'page-pricing',
  //       label: 'Pricing',
  //       url: '/pages/pricing',
  //       parentKey: 'pages',
  //     },
  //     {
  //       key: 'page-blogs',
  //       label: 'Blogs',
  //       url: '/pages/blogs',
  //       parentKey: 'pages',
  //     },
  //     {
  //       key: 'page-faqs',
  //       label: 'FAQs',
  //       url: '/pages/faqs',
  //       parentKey: 'pages',
  //     },
  //     {
  //       key: 'page-gallery',
  //       label: 'Gallery',
  //       url: '/pages/gallery',
  //       parentKey: 'pages',
  //     },
  //   ],
  // },
  // {
  //   key: 'page-authentication',
  //   label: 'Authentication',
  //   isTitle: false,
  //   icon: 'iconoir:fingerprint-lock-circle',
  //   children: [
  //     {
  //       key: 'log-in',
  //       label: 'Log In',
  //       url: '/auth/login',
  //       parentKey: 'page-authentication',
  //     },
  //     {
  //       key: 'register',
  //       label: 'Register',
  //       url: '/auth/register',
  //       parentKey: 'page-authentication',
  //     },
  //     {
  //       key: 'reset-pass',
  //       label: 'Re-Password',
  //       url: '/auth/reset-pass',
  //       parentKey: 'page-authentication',
  //     },
  //     {
  //       key: 'lock-screen',
  //       label: 'Lock Screen',
  //       url: '/auth/lock-screen',
  //       parentKey: 'page-authentication',
  //     },
  //     {
  //       key: 'maintenance',
  //       label: 'Maintenance',
  //       url: '/maintenance',
  //       target: '_blank',
  //       parentKey: 'page-authentication',
  //     },
  //     {
  //       key: 'error-404',
  //       label: 'Error 404',
  //       url: '/not-found',
  //       parentKey: 'page-authentication',
  //     },
  //     {
  //       key: 'error-500',
  //       label: 'Error 500',
  //       url: '/error-500',
  //       parentKey: 'page-authentication',
  //     },
  //   ],
  // },
]
