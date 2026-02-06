export type CustomerStatType = {
  title: string
  stat: string
}

export type SocialStatType = {
  name: string
  clickCount: number
  icon: string
  audience: {
    count: number
    change: number
  }
  commission: {
    count: number
    change: number
  }
  variant: string
}
