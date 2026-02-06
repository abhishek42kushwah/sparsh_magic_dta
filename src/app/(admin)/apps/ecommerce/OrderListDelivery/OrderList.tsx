import React, { useState } from 'react'
import { Card, Row, Col, Button } from 'react-bootstrap'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import type { OrderListDeliveryType } from '@/types/data'
import OtpModal from './OtpModal'

interface Props {
  orderListData: OrderListDeliveryType[]
  setOrderListData: React.Dispatch<React.SetStateAction<OrderListDeliveryType[]>>
}

const OrderListCards: React.FC<Props> = ({ orderListData, setOrderListData }) => {
  const [selectedOrder, setSelectedOrder] = useState<OrderListDeliveryType | null>(null)
  const [showOtpModal, setShowOtpModal] = useState(false)

  const handleOpenModal = (order: OrderListDeliveryType) => {
    setSelectedOrder(order)
    setShowOtpModal(true)
  }

  const handleCloseModal = () => {
    setSelectedOrder(null)
    setShowOtpModal(false)
  }

  return (
    <>
      <Row className="g-3">
        {orderListData.map((order) => (
          <Col key={order.orderId} xs={12} sm={6} lg={4}>
            <Card className="shadow-sm h-100">
              <Card.Body>
                <Card.Title>Order #{order.orderId}</Card.Title>
                <Card.Text>
                  <strong>Name:</strong> {order.userName} <br />
                  <strong>Mobile:</strong> {order.userMobile} <br />
                  <strong>Status:</strong> {order.status} <br />
                  <strong>Payment:</strong> {order.isPaid ? 'Paid' : 'Pending'} <br />
                  <strong>Total:</strong> ₹{order.total} <br />
                  <strong>Address:</strong> {order.address} <br />
                  {order.prescription && (
                    <>
                      <strong>Prescription:</strong> {order.prescription} <br />
                    </>
                  )}
                </Card.Text>
              </Card.Body>
              <Card.Footer className="d-flex justify-content-end">
                <Button variant="light" size="sm" onClick={() => handleOpenModal(order)}>
                  <IconifyIcon icon="la:pen" className="fs-18" /> Send OTP
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>

      {selectedOrder && (
        <OtpModal
          show={showOtpModal}
          onClose={handleCloseModal}
          order={selectedOrder}
          setOrderListData={setOrderListData}
        />
      )}
    </>
  )
}

export default OrderListCards
