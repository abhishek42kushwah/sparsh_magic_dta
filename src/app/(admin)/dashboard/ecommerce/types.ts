import type { IdType } from '@/types/data'
export type StatType = {
  title: string
  icon: string
  stat: string
  change: number
  subTitle: string
  buttonVariant: string
}

export type IncomeStatType = {
  title: string
  stat: string
}

export type CountrySellingType = {
  flagImage: string
  name: string
  progress: number
  amount: number
  createdAt:Date
}

export type RecentOrderType = {
  id: IdType
  name: string
  image: string
  amount: number
  createdAt:Date
}
