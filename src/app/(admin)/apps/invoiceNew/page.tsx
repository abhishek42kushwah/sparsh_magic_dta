import { useEffect, useState, useRef } from 'react';
import { Row, Col, Card, Button, Table } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import logoSm from '@/assets/images/dava-Logo.png';
import { BASE_URL } from '@/types/validationSchema';
import html2canvas from 'html2canvas';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import jsPDF from 'jspdf';
import PageMetaData from '@/components/PageMetaData';
import { errorToast } from '@/utils/toastMassage';
import { formatDateTimeIST } from '@/types/DateFilterItems';
import './components/invoice.css';

const Invoice = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const invoiceRef = useRef<HTMLDivElement>(null);

  const original =
    location.state?.original || (sessionStorage.getItem('invoiceOrderData') ? JSON.parse(sessionStorage.getItem('invoiceOrderData')!) : {});

  const orderId = original?.orderId || '';
  const [orderData, setOrderData] = useState<any>(null);

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(`${BASE_URL}orders/detail?orderId=${orderId}`);
      if (!response.ok) throw new Error('Failed to fetch order details');
      const data = await response.json();
      const order = data?.result?.orderInfo?.[0];
      setOrderData(order);
    } catch (error: any) {
      errorToast(error.message);
    }
  };

  useEffect(() => {
    if (orderId) fetchOrderDetails();
  }, [orderId]);

  const handleDownloadPDF = async () => {
    if (!invoiceRef.current) return;
    const canvas = await html2canvas(invoiceRef.current, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfHeight = (imgProps.height * pageWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pdfHeight);
    pdf.save(`Invoice_${orderId}.pdf`);
  };

  if (!orderData) return null;

  const shipping = orderData.shippingCharge || 0;
  const cod = orderData.codCharge || 0;

  const grossAmount = orderData.orderItems.reduce((sum: number, item: any) => sum + (item.total || item.itemBuyPrice * item.quantity), 0);

  const discountPercent = orderData.coupondiscount || 0;
  const discount = (grossAmount * discountPercent) / 100;

  const taxableValue = grossAmount - discount;

  const sgst = parseFloat((taxableValue * 0.025).toFixed(2));
  const cgst = parseFloat((taxableValue * 0.025).toFixed(2));

  const total = taxableValue + sgst + cgst + shipping + cod;

  const round2 = (n: number) => n.toFixed(2);

  return (
    <>
      <PageMetaData title="Invoice" />
      <Row>
        <Col xs={12}>
          <Card>
            <Card.Body ref={invoiceRef} style={{ padding: '30px', fontFamily: 'Arial, sans-serif', color: '#000' }}>
              {/* ===== HEADER ===== */}
              <Row className="align-items-center">
                <Col md={6}>
                  <img src={logoSm} alt="logo" height={60} />
                </Col>
                <Col md={6} className="text-end">
                  <h6 className="mb-0 fw-bold">Tax Invoice #{orderData.orderId}</h6>
                  <small>Date: {formatDateTimeIST(orderData.createdAt)}</small>
                </Col>
              </Row>

              <hr />

              {/* ===== ADDRESSES ===== */}
              <Row className="mt-3 invoice-address-row">
                <Col md={4}>
                  <h6 className="fw-bold mb-1">From :</h6>
                  <p className="mb-0 fw-semibold">Sparsh Megic Private Limited</p>
                  <small>
                    Govindpuri, City Center, Gwalior (MP), India
                    <br />
                    GSTIN : 09ABCGS900B1ZV
                    <br />
                    Mobile : 88894 88836
                  </small>
                </Col>

                <Col md={4}>
                  <h6 className="fw-bold mb-1">Shipped To :</h6>
                  <p className="mb-0 fw-semibold">{orderData.userName}</p>
                  <small>
                    {orderData.address}
                    <br />
                    Mobile: {orderData.userMobile}
                    <br />
                    INDIA
                  </small>
                </Col>

                <Col md={4}>
                  <h6 className="fw-bold mb-1">Billed :</h6>
                  <p className="mb-0 fw-semibold">{orderData.userName}</p>
                  <small>
                    {orderData.address}
                    <br />
                    Mobile: {orderData.userMobile}
                    <br />
                    INDIA
                  </small>
                </Col>
              </Row>

              {/* ===== PRODUCT TABLE ===== */}
              <div className="mt-4">
                <Table bordered size="sm" className="align-middle text-center">
                  <thead style={{ background: '#f8f9fa' }}>
                    <tr>
                      <th>HSN/SAC Code</th>
                      <th>SKU</th>
                      <th>Product Description</th>
                      <th>Selling Price</th>
                      <th>Qty</th>
                      <th>Discount</th>
                      <th>Net Amount</th>
                      <th>Taxable Value</th>
                      <th>SGST</th>
                      <th>CGST</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderData.orderItems.map((item: any, index: number) => {
                      const netAmount = item.itemBuyPrice * item.quantity;
                      const taxableVal = netAmount;
                      const sgstVal = taxableVal * 0.025;
                      const cgstVal = taxableVal * 0.025;
                      const totalVal = taxableVal + sgstVal + cgstVal;

                      return (
                        <tr key={item.id || index}>
                          <td>30049014</td>
                          <td>{item.productId}</td>
                          <td className="text-start">{item.productName}</td>
                          <td>₹ {round2(item.itemBuyPrice)}</td>
                          <td>{item.quantity}</td>

                          {/* SHOW % NOT VALUE */}
                          <td>{discountPercent}%</td>

                          <td>₹ {round2(netAmount)}</td>
                          <td>₹ {round2(taxableVal)}</td>
                          <td>₹ {round2(sgstVal)}</td>
                          <td>₹ {round2(cgstVal)}</td>
                          <td>₹ {round2(totalVal)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>

              {/* ===== SUMMARY ===== */}
              <Row className="mt-4">
                <Col md={6}>
                  <Table bordered size="sm" className="text-center">
                    <tbody>
                      <tr>
                        <td>Product SGST</td>
                        <td>Product CGST</td>
                        <td>AMOUNT</td>
                      </tr>
                      <tr>
                        <td>2.5%</td>
                        <td>2.5%</td>
                        <td>₹ {round2(sgst + cgst)}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>

                <Col md={6}>
                  <Table bordered size="sm">
                    <tbody>
                      <tr>
                        <td>
                          <strong>Gross Amount</strong>
                        </td>
                        <td>₹ {round2(grossAmount)}</td>
                      </tr>

                      {/* SHOW % + VALUE */}
                      <tr>
                        <td>
                          <strong>Discount ({discountPercent}%)</strong>
                        </td>
                        <td>₹ {round2(discount)}</td>
                      </tr>

                      <tr>
                        <td>
                          <strong>Shipping / Handling</strong>
                        </td>
                        <td>₹ {round2(shipping)}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>COD Charges</strong>
                        </td>
                        <td>₹ {round2(cod)}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>SGST (2.5%)</strong>
                        </td>
                        <td>₹ {round2(sgst)}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>CGST (2.5%)</strong>
                        </td>
                        <td>₹ {round2(cgst)}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Grand Total</strong>
                        </td>
                        <td>
                          <strong>₹ {round2(total)}</strong>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Paid Amount</strong>
                        </td>
                        <td>₹ {round2(total)}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>

              {/* ===== FOOTER ===== */}
              <hr />
              <Row>
                <Col>
                  <small>
                    Davagwalior.com, Govindpuri, City Center, Gwalior (MP)
                    <br />
                    <strong>Mobile :</strong> 88894 88836
                  </small>
                </Col>
              </Row>
            </Card.Body>

            {/* ===== ACTION BUTTONS ===== */}
            <Card.Body className="text-end d-print-none">
              <Button onClick={() => window.print()} className="flex items-center me-1">
                <IconifyIcon icon="solar:printer-bold-duotone" className="mr-2" />
                Print
              </Button>

              <Button variant="success" onClick={handleDownloadPDF}>
                Download PDF
              </Button>

              <Button variant="secondary" className="ms-2" onClick={() => navigate(-1)}>
                Back
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Invoice;
