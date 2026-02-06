import type { KanbanSectionType, CustomerType, KanbanTaskTag, PriorityType, ProductType,CrmCallerListType } from '@/types/data'

export const getProductStatusVariant = (stock: ProductType['stock']) => {
  let statusVariant = 'primary'
  if (stock === false) statusVariant = 'danger'
  if (typeof stock === 'string') statusVariant = 'success'
  return statusVariant
}

export const getCustomerStatusVariant = (status: CustomerType['status']) => {
  let statusVariant = 'info'
  if (status === 'Inactive') statusVariant = 'danger'
  else if (status === 'Repeat') statusVariant = 'blue'
  return statusVariant
}

export const getProductStatusIcon = (stock: ProductType['stock']) => {
  let statusIcon = 'fa-solid:check'
  if (stock === true) statusIcon = 'fa6-solid:check'
  else if (stock === false) statusIcon = 'fa6-solid:xmark'
 
  return statusIcon
}
export const getCrmCallerListStatusIcon = (status: CrmCallerListType['status']) => {
  let statusIcon = 'fa-solid:check'
  if (status === 'OFF') statusIcon = 'fa6-solid:xmark'
  else if (status === 'ACTIVE') statusIcon = 'fa6-solid:xmark'
  else if (status === 'RESIGN') statusIcon = 'fa6-solid:box-archive'
  return statusIcon
}
export const getCrmCallerStatusVariant = (status: CrmCallerListType['status']) => {
  let statusVariant = 'primary'
  if (status === 'OFF') statusVariant = 'danger'
  else if (status === 'RESIGN') statusVariant = 'warning'
  else if (status === 'ACTIVE') statusVariant = 'info'
  return statusVariant
}

export const getKanbanSectionVariant = (title: KanbanSectionType['title']) => {
  let variant = 'primary'
  if (title === 'To Do') variant = 'pink'
  else if (title === 'In Progress') variant = 'warning'
  else if (title === 'Review') variant = 'success'
  else if (title === 'Done') variant = 'info'
  return variant
}

export const getKanbanTaskPriorityVariant = (priority: PriorityType) => {
  let variant = 'warning'
  if (priority === 'High') variant = 'danger'
  else if (priority === 'Medium') variant = 'info'
  return variant
}

export const getKanbanTaskTagVariant = (tag: KanbanTaskTag) => {
  let variant = 'primary'
  if (tag === 'API') variant = 'primary'
  else if (tag === 'Form Submit') variant = 'info'
  else if (tag === 'Responsive') variant = 'danger'
  return variant
}
