import type { OrdersDataType,
  // socialStatData
 } from './types'

export const updateData = (range: string): OrdersDataType[] => {
  switch (range) {
    case 'Today':
      return [
        { title: 'Total Rx Orders ', stat: '1,234' },
        { title: 'New Rx Orders ', stat: '56' },
        { title: 'Returning Rx Orders ', stat: '65.2%' },
        { title: 'Bounce Rate', stat: '1.8%' },
      ];
    case 'This Week':
      return [
        { title: 'Total Rx Orders ', stat: '38,321' },
        { title: 'New Rx Orders ', stat: '946' },
        { title: 'Returning Rx Orders ', stat: '70.8%' },
        { title: 'Bounce Rate', stat: '1.5%' },
      ];
    case 'Last Month':
      return [
        { title: 'Total Rx Orders ', stat: '125,000' },
        { title: 'New Rx Orders ', stat: '2,100' },
        { title: 'Returning Rx Orders ', stat: '67.5%' },
        { title: 'Bounce Rate', stat: '2.0%' },
      ];
    case 'This Year':
      return [
        { title: 'Total Rx Orders ', stat: '1,200,000' },
        { title: 'New Rx Orders ', stat: '25,400' },
        { title: 'Returning Rx Orders ', stat: '72.3%' },
        { title: 'Bounce Rate', stat: '1.3%' },
      ];
    default:
      return [];
  }
};

// export const socialStatData: SocialStatType[] = [
//   {
//     name: 'Twitter',
//     clickCount: 2215,
//     icon: 'icofont-twitter',
//     audience: {
//       count: 214,
//       change: 1.9,
//     },
//     commission: {
//       count: 3251,
//       change: 0.5,
//     },
//     variant: 'bg-blue',
//   },
//   {
//     name: 'Google',
//     clickCount: 2154,
//     icon: 'icofont-google-plus',
//     audience: {
//       count: 159,
//       change: 2.5,
//     },
//     commission: {
//       count: 1245,
//       change: 0.7,
//     },
//     variant: 'bg-danger',
//   },
//   {
//     name: 'Instagram',
//     clickCount: 3251,
//     icon: 'icofont-instagram',
//     audience: {
//       count: 124,
//       change: 1.7,
//     },
//     commission: {
//       count: 2514,
//       change: 0.2,
//     },
//     variant: 'bg-warning',
//   },
// ]
