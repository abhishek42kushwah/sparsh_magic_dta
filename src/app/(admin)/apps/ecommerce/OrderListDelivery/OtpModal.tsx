import React, { useState } from 'react'
import { Modal, Button, Row, Col, FormControl, FormLabel } from 'react-bootstrap'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { successToast, errorToast } from '@/utils/toastMassage'
import type { OrderListDeliveryType } from '@/types/data'

type OtpModalProps = {
  show: boolean
  onClose: () => void
  order: OrderListDeliveryType
  setOrderListData: React.Dispatch<React.SetStateAction<OrderListDeliveryType[]>>
}

// ✅ Demo version without backend APIs
const OtpModal: React.FC<OtpModalProps> = ({ show, onClose, order, setOrderListData }) => {
  const [sending, setSending] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [demoOtp, setDemoOtp] = useState<number | null>(null)
  const [resendCount, setResendCount] = useState(0)

  const validationSchema = Yup.object({
    customerOtp: Yup.number()
      .required('OTP is required')
      .typeError('OTP must be a number'),
  })

  // 🔹 Simulate sending OTP
  const handleSendOtp = async () => {
    try {
      setSending(true)
      const fakeOtp = Math.floor(1000 + Math.random() * 9000) // generate 4-digit OTP
      await new Promise((resolve) => setTimeout(resolve, 1000)) // simulate delay
      setOtpSent(true)
      setDemoOtp(fakeOtp)
      successToast(`Demo OTP sent successfully! (Your OTP: ${fakeOtp})`)
    } catch (error: any) {
      errorToast('Something went wrong while sending OTP')
    } finally {
      setSending(false)
    }
  }

  // 🔹 Simulate verifying OTP
  const handleVerifyOtp = async (values: { customerOtp: number }) => {
    try {
      setSending(true)
      await new Promise((resolve) => setTimeout(resolve, 1000)) // simulate delay

      if (parseInt(values.customerOtp.toString()) === demoOtp) {
        setOrderListData((prev) =>
          prev.map((o) =>
            o.orderId === order.orderId ? { ...o, status: 'DELIVERED' } : o
          )
        )
        successToast('✅ OTP verified successfully! Order marked as DELIVERED.')
        onClose()
      } else {
        throw new Error('❌ Invalid OTP entered!')
      }
    } catch (error: any) {
      errorToast(error.message || 'OTP verification failed')
    } finally {
      setSending(false)
    }
  }

  // 🔹 Simulate resending OTP
  const handleResendOtp = async () => {
    try {
      setSending(true)
      const newOtp = Math.floor(1000 + Math.random() * 9000)
      await new Promise((resolve) => setTimeout(resolve, 1000)) // simulate delay
      setDemoOtp(newOtp)
      setResendCount((prev) => prev + 1)
      successToast(`OTP resent successfully! (Your new OTP: ${newOtp})`)
    } catch (error: any) {
      errorToast('Something went wrong while resending OTP')
    } finally {
      setSending(false)
    }
  }

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Order #{order.orderId} - OTP Verification (Demo)</Modal.Title>
      </Modal.Header>

      <Formik
        initialValues={{ customerOtp: '' }}
        validationSchema={validationSchema}
        onSubmit={async (values:any, { setSubmitting }) => {
          await handleVerifyOtp(values)
          setSubmitting(false)
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Modal.Body>
              <Row className="mb-3">
                <FormLabel className="col-sm-3 col-form-label">OTP *</FormLabel>
                <Col sm={9}>
                  <Field
                    as={FormControl}
                    name="customerOtp"
                    placeholder="Enter OTP"
                    disabled={!otpSent}
                  />
                  <ErrorMessage name="customerOtp" component="div" className="text-danger small" />
                </Col>
              </Row>

              {!otpSent ? (
                <div className="text-muted small">
                  Click <strong>Send OTP</strong> to receive a demo code.
                </div>
              ) : (
                <div className="text-success small">
                  Demo OTP Sent (check toast message)
                  {resendCount > 0 && (
                    <div className="text-muted">
                      Resent <strong>{resendCount}</strong> {resendCount === 1 ? 'time' : 'times'}
                    </div>
                  )}
                </div>
              )}
            </Modal.Body>

            <Modal.Footer>
              {!otpSent ? (
                <Button variant="primary" onClick={handleSendOtp} disabled={sending}>
                  {sending ? 'Sending...' : 'Send OTP'}
                </Button>
              ) : (
                <>
                  <Button variant="success" type="submit" disabled={isSubmitting || sending}>
                    {sending ? 'Verifying...' : 'Verify OTP'}
                  </Button>
                  <Button
                    variant="outline-primary"
                    type="button"
                    disabled={sending}
                    onClick={handleResendOtp}
                  >
                    {sending ? 'Resending...' : 'Resend OTP'}
                  </Button>
                </>
              )}

              <Button variant="secondary" onClick={onClose}>
                Close
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default OtpModal
