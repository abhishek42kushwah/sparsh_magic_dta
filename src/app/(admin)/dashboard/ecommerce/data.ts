import { currency } from '@/context/constants'
import type { CountrySellingType, IncomeStatType, RecentOrderType, StatType } from './types'

import usFlag from '@/assets/images/flags/us_flag.jpg'
import spainFlag from '@/assets/images/flags/spain_flag.jpg'
import germanyFlag from '@/assets/images/flags/germany_flag.jpg'
import bahaFlag from '@/assets/images/flags/baha_flag.jpg'
import frenchFlag from '@/assets/images/flags/french_flag.jpg'

import avatar1 from '@/assets/images/users/avatar-1.jpg'
import avatar2 from '@/assets/images/users/avatar-2.jpg'
import avatar3 from '@/assets/images/users/avatar-3.jpg'
import avatar4 from '@/assets/images/users/avatar-4.jpg'
import avatar5 from '@/assets/images/users/avatar-5.jpg'
import { addOrSubtractDaysFromDate } from '@/utils/date'

export const statData: StatType[] = [
  {
    title: 'Total This Month Revenue',
    icon: 'icofont-money-bag',
    stat: `${currency}105.00`,
    change: 4,
    subTitle: 'Total Orders',
    buttonVariant: 'primary',
  },
  {
    title: 'Today Order',
    icon: 'icofont-opencart',
    stat: `${currency}15.00`,
    change: 5,
    subTitle: 'Total Orders',
    buttonVariant: 'outline-secondary',
  },
]

export const incomeStatData: IncomeStatType[] = [
  {
    title: "Total Users",
    stat: "150",
  },
  {
    title: 'Conversion Rate',
    stat: '63.8%',
  },
  {
    title: 'Total Orders',
    stat: `545`,
  },
  {
    title: 'total Revenue',
    stat: "1562000",
  },
]

export const topCountriesSellingData: CountrySellingType[] = [
  {
    flagImage: usFlag,
    name: 'USA',
    progress: 85,
    amount: 5860.0,
    createdAt: addOrSubtractDaysFromDate(0),
  },
  {
    flagImage: spainFlag,
    name: 'Spain',
    progress: 78,
    amount: 5422.0,
    createdAt: addOrSubtractDaysFromDate(0),

  },
  {
    flagImage: frenchFlag,
    name: 'French',
    progress: 71,
    amount: 4587.0,
    createdAt: addOrSubtractDaysFromDate(8),

  },
  {
    flagImage: germanyFlag,
    name: 'Germany',
    progress: 65,
    amount: 3655.0,
    createdAt: addOrSubtractDaysFromDate(15),

  },
  {
    flagImage: bahaFlag,
    name: 'Bahamas',
    progress: 48,
    amount: 3325.0,
    createdAt: addOrSubtractDaysFromDate(38),

  },
]

export const recentOrders: RecentOrderType[] = [
  {
    id: '#3652',
    name: 'Scott Holland',
    image: avatar1,
    amount: 3325.0,
    createdAt: addOrSubtractDaysFromDate(38),

  },
  {
    id: '#4789',
    name: 'Karen Savage',
    image: avatar2,
    amount: 2548.0,
    createdAt: addOrSubtractDaysFromDate(0),

  },
  {
    id: '#4521',
    name: 'Steven Sharp',
    image: avatar3,
    amount: 2985.0,
    createdAt: addOrSubtractDaysFromDate(7),

  },
  {
    id: '#3269',
    name: 'Teresa Himes',
    image: avatar4,
    amount: 1845.0,
    createdAt: addOrSubtractDaysFromDate(0),

  },
  {
    id: '#4521',
    name: 'Ralph Denton',
    image: avatar5,
    amount: 1422.0,
    createdAt: addOrSubtractDaysFromDate(0),

  },
]
