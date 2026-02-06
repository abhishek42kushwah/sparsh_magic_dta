import { Button, Card, CardBody, Col, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import logoSm from '@/assets/images/logo-sm.png';
import signature from '@/assets/images/extra/signature.png';
import InvoicePrintButton from './components/InvoicePrintButton';
import { currency } from '@/context/constants';
import PageMetaData from '@/components/PageMetaData';
import { errorToast, successToast } from '@/utils/toastMassage';

const Invoice = () => {
  const location = useLocation();
  const { original } = location.state;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: '',
    productName: '',
    quantity: 1,
    units: '',
    orderAmount: 0,
    coupondiscount: 0,
    phone: '',
  });

  const [subTotal, setSubTotal] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);

  useEffect(() => {
    if (original) {
      setFormData({
        userName: original.userName || '',
        productName: original.productName || '',
        quantity: original.quantity || 1,
        units: original.units || '',
        orderAmount: original.orderAmount || 0,
        coupondiscount: original.coupondiscount || 0,
        phone: original.phone || '',
      });
    }
  }, [original]);

  useEffect(() => {
    const subtotal = formData.quantity * formData.orderAmount;
    const total = subtotal - (subtotal * formData.coupondiscount) / 100;

    setSubTotal(subtotal);
    setFinalTotal(total);
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'quantity' || name === 'orderAmount' || name === 'coupondiscount'
        ? Number(value)
        : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/invoice/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: original?.productId,
          productName: formData.productName,
          itemBuyPrice: formData.orderAmount,
          total: finalTotal,
          userName: formData.userName,
        }),
      });

      const result = await response.json();
      if (response.ok && result.success) {
        successToast('Invoice submitted successfully!');
        navigate(-1);
      } else {
        errorToast(result.message);
      }
    } catch (error: any) {
      errorToast(error.message);
    }
  };

  return (
    <>
      <PageMetaData title="Invoice" />
      <Row>
        <Col xs={12}>
          <Card>
            <CardBody className="bg-black">
              <Row>
                <Col xs={4} className="align-self-center">
                  <img src={logoSm} alt="logo-small" className="logo-sm me-1" height={70} />
                </Col>
                <Col xs={8} className="text-end align-self-center">
                  <h5 className="mb-1 fw-semibold text-white">
                    <span className="text-muted">Invoice:</span> #{original?.orderId}
                  </h5>
                  <h5 className="mb-0 fw-semibold text-white">
                    <span className="text-muted">Issue Date:</span> 20/07/2024
                  </h5>
                </Col>
              </Row>
            </CardBody>

            <CardBody>
              <Row className="row-cols-3 d-flex justify-content-md-between">
                <Col md={3} className="d-print-flex align-self-center">
                  <div>
                    <span className="badge rounded text-dark bg-light">Invoice to</span>
                    <input
                      type="text"
                      name="userName"
                      className="form-control form-control-sm my-1 fw-semibold fs-18"
                      value={formData.userName}
                      onChange={handleChange}
                    />
                    <p className="text-muted">@{formData.userName} | {formData.phone}</p>
                  </div>
                </Col>
                <Col md={3}>
                  <address className="fs-13">
                    <strong className="fs-14">Billed To :</strong>
                    <br />
                    Pharmaryt
                    <br />
                    Noida sector 62
                    <br />
                    <abbr title="Phone">P:</abbr> +91 75030914256
                  </address>
                </Col>
                <Col md={3}>
                  <address className="fs-13">
                    <strong className="fs-14">Shipped To:</strong>
                    <br />
                    Gwalior, MP
                    <br />
                    Noida sector 4
                    <br />
                    <abbr title="Phone">P:</abbr> {formData.phone}
                  </address>
                </Col>
              </Row>

              <Row>
                <Col lg={12}>
                  <div className="table-responsive project-invoice">
                    <table className="table table-bordered mb-0">
                      <thead className="table-light">
                        <tr>
                          <th>Items</th>
                          <th>Units</th>
                          <th>Qty.</th>
                          <th>MRP</th>
                          <th>Sell Price</th>
                          <th>Subtotal</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <input
                              type="text"
                              name="productName"
                              className="form-control form-control-sm"
                              value={formData.productName}
                              onChange={handleChange}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              name="units"
                              className="form-control form-control-sm"
                              value={formData.units}
                              onChange={handleChange}
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              name="quantity"
                              className="form-control form-control-sm"
                              value={formData.quantity}
                              onChange={handleChange}
                              min="1"
                            />
                          </td>
                          <td>{currency}{formData.orderAmount}</td>
                          <td>
                            <input
                              type="number"
                              name="orderAmount"
                              className="form-control form-control-sm"
                              value={formData.orderAmount}
                              onChange={handleChange}
                            />
                          </td>
                          <td>{currency}{subTotal.toFixed(2)}</td>
                        </tr>
                        <tr>
                          <td colSpan={1} className="border-0" />
                          <td colSpan={2} className="border-0 fs-14 text-dark"><b>Sub Total</b></td>
                          <td className="border-0 fs-14 text-dark"><b>{currency}{subTotal.toFixed(2)}</b></td>
                        </tr>
                        <tr>
                          <th colSpan={1} className="border-0" />
                          <td colSpan={2} className="border-0 fs-14 text-dark"><b>Coupon Discount</b></td>
                          <td className="border-0 fs-14 text-dark">
                            <input
                              type="number"
                              name="coupondiscount"
                              className="form-control form-control-sm"
                              value={formData.coupondiscount}
                              onChange={handleChange}
                              min="0"
                              max="100"
                            />%
                          </td>
                        </tr>
                        <tr>
                          <th colSpan={1} className="border-0" />
                          <td colSpan={2} className="border-0 fs-14"><b>Total</b></td>
                          <td className="border-0 fs-14"><b>{currency}{finalTotal.toFixed(2)}</b></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col lg={6}>
                  <h5 className="mt-4">Terms And Condition :</h5>
                  <ul className="ps-3">
                    <li><small className="fs-12">All accounts are to be paid within 7 days from receipt of invoice.</small></li>
                    <li><small className="fs-12">To be paid by cheque or credit card or direct payment online.</small></li>
                    <li>
                      <small className="fs-12">
                        If account is not paid within 7 days, the credit details supplied will be charged the agreed quoted fee noted above.
                      </small>
                    </li>
                  </ul>
                </Col>
                <Col lg={6} className="align-self-center">
                  <div className="float-none float-md-end" style={{ width: '30%' }}>
                    <small>Account Manager</small>
                    <img src={signature} alt="signature" className="mt-2 mb-1" height={24} />
                    <p className="border-top">Signature</p>
                  </div>
                </Col>
              </Row>
              <hr />
              <Row className="d-flex justify-content-center">
                <Col lg={12} xl={4} className="ms-auto align-self-center">
                  <div className="text-center">
                    <small className="fs-12">Thank you very much for doing business with us.</small>
                  </div>
                </Col>
                <Col lg={12} xl={4}>
                  <div className="float-end d-flex d-print-none mt-2 mt-md-0 gap-1">
                    <InvoicePrintButton />
                    <Button variant="primary" onClick={handleSubmit}>
                      Submit
                    </Button>
                    <Button variant="danger" onClick={() => navigate(-1)}>
                      Cancel
                    </Button>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Invoice;
