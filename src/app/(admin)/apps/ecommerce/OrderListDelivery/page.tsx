import IconifyIcon from '@/components/wrappers/IconifyIcon'
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  Row,
  Spinner,
} from 'react-bootstrap'
import OrderListDataTable from './OrderList'
import { useEffect, useState } from 'react'
import PageMetaData from '@/components/PageMetaData'
import { successToast } from '@/utils/toastMassage'
import { BASE_URL } from '@/types/validationSchema'
import { useAuthContext } from '@/context/useAuthContext'
import type { OrderListDeliveryType } from '@/types/data'
import { DateItem, getDateRange } from '@/types/DateFilterItems'
import clsx from 'clsx'

type RangeOption = typeof DateItem[number]

const Page = () => {
  const { user } = useAuthContext()
  const Token = user?.token

  const [orderListData, setOrderListData] = useState<OrderListDeliveryType[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedRange, setSelectedRange] = useState<RangeOption>('Today')
  const [selectedStatus, setSelectedStatus] = useState('PENDING')

  const statusArray = ['PACKED', 'SHIPPED', 'DELIVERED', 'CANCELLED','PENDING']

  const handleSelect = (range: RangeOption) => setSelectedRange(range)
  const handleSelectStatus = (status: string) => setSelectedStatus(status)

  const fetchOrderList = async (search = '') => {
    setLoading(true)
    try {
      const { startDate, endDate } = getDateRange(selectedRange)
      const params = new URLSearchParams()
      if (selectedRange !== 'All') {
        params.append('startDate', startDate)
        params.append('endDate', endDate)
      }
      if (selectedStatus !== 'All') params.append('status', selectedStatus)
      if (search) params.append('name', search)

      const response = await fetch(`${BASE_URL}orders/delivery/orders?${params.toString()}`, {
        headers: { Authorization: `Bearer ${Token}` },
      })
      const data = await response.json()
      setOrderListData(data.result || [])
    } catch (error) {
      successToast('Error fetching orders')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrderList()
  }, [selectedRange, selectedStatus])

  return (
    <>
      <PageMetaData title="Order List" />
      <Row>
        <Col lg={12}>
          <Card>
            <CardHeader>
              <Row className="align-items-center">
                <Col>
                  <CardTitle as="h4">Order List</CardTitle>
                </Col>

               
                <Col xs="auto">
                  <Dropdown>
                    <Dropdown.Toggle className="btn btn-light">
                      <i className="icofont-calendar fs-5" /> {selectedRange}{' '}
                      <IconifyIcon icon="la:angle-down" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu align="start">
                      {DateItem.map((range) => (
                        <Dropdown.Item
                          key={range}
                          active={selectedRange === range}
                          onClick={() => handleSelect(range as RangeOption)}
                        >
                          {range}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>

                {/* Status Filter Dropdown */}
                <Col xs="auto">
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="link"
                      className="btn bg-primary-subtle text-primary d-flex align-items-center arrow-none"
                    >
                      <IconifyIcon icon="iconoir:filter-alt" /> Status: {selectedStatus}
                    </Dropdown.Toggle>
                    <Dropdown.Menu align="start">
                      <div className="p-1">
                        {['All', ...statusArray].map((filter, idx) => (
                          <Dropdown.Item
                            key={idx}
                            onClick={() => handleSelectStatus(filter)}
                            className={clsx({ 'mb-2': statusArray.length - 1 !== idx })}
                          >
                            {filter}
                          </Dropdown.Item>
                        ))}
                      </div>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
              </Row>
            </CardHeader>

            <CardBody className="pt-0">
              {loading ? (
                <div className="text-center pt-5">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              ) : orderListData.length > 0 ? (
                <OrderListDataTable
                  orderListData={orderListData}
                  setOrderListData={setOrderListData}
                />
              ) : (
                <div className="text-center pt-5">No Data Found</div>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Page
