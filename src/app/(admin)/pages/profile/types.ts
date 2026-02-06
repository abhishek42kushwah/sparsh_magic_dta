export type StatType = {
  title: string
  state: number
  icon: string
  total: number
  subTitle: string
  subIcon: string
  variant: string
}

export type CommentType = {
  avatar: string
  name: string
  time: Date
  message: string
  replies?: CommentType[]
}
