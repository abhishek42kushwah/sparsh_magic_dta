// // Invoice.tsx
// import { Button, Card, CardBody, Col, Row } from 'react-bootstrap';
// import { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import logoSm from '@/assets/images/dava-Logo.png';
// import signature from '@/assets/images/extra/signature.png';
// import { currency } from '@/context/constants';
// import PageMetaData from '@/components/PageMetaData';
// import { errorToast, successToast } from '@/utils/toastMassage';
// import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
// import pdfWorkerSrc from 'pdfjs-dist/legacy/build/pdf.worker.js?url';
// pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerSrc;

// const Invoice = () => {
//   const location = useLocation();
//   const  original  = location.state?.original || {};
//   const navigate = useNavigate();

//   const [userName, setUserName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [couponDiscount, setCouponDiscount] = useState(0);
//   const [products, setProducts] = useState<any[]>([
//     {
//       productName: '',
//       units: '',
//       quantity: 1,
//       orderAmount: 0,
//       discount: 0,
//       gst: 0,
//     },
//   ]);

//   const [subTotal, setSubTotal] = useState(0);
//   const [finalTotal, setFinalTotal] = useState(0);
//   const [totalGST, setTotalGST] = useState(0);

//   useEffect(() => {
//     if (original) {
//       setUserName(original.userName || '');
//       setPhone(original.phone || '');
//       setCouponDiscount(original.coupondiscount || 0);
//       setProducts([
//         {
//           productName: original.productName || '',
//           units: original.units || '',
//           quantity: original.quantity || 1,
//           orderAmount: original.orderAmount || 0,
//           discount: original.discount || 0,
//           gst: original.gst || 0,
//         },
//       ]);
//     }
//   }, [original]);

//   useEffect(() => {
//     let subtotal = 0;
//     let gstAmount = 0;

//     products.forEach((item) => {
//       const baseAmount = item.quantity * item.orderAmount;
//       const discountAmount = (baseAmount * item.discount) / 100;
//       const afterDiscount = baseAmount - discountAmount;
//       const gst = (afterDiscount * item.gst) / 100;

//       subtotal += afterDiscount;
//       gstAmount += gst;
//     });

//     const discounted = subtotal - (subtotal * couponDiscount) / 100;
//     const total = discounted + gstAmount;

//     setSubTotal(subtotal);
//     setTotalGST(gstAmount);
//     setFinalTotal(total);
//   }, [products, couponDiscount]);

//   const handleProductChange = (index: number, field: string, value: string | number) => {
//     const updated = [...products];
//     updated[index][field] =
//       ['quantity', 'orderAmount', 'discount', 'gst'].includes(field) ? Number(value) : String(value);
//     setProducts(updated);
//   };

//   const addProduct = () => {
//     setProducts([
//       ...products,
//       { productName: '', units: '', quantity: 1, orderAmount: 0, discount: 0, gst: 0 },
//     ]);
//   };

//   const removeProduct = (index: number) => {
//     if (products.length > 1) {
//       setProducts(products.filter((_, i) => i !== index));
//     }
//   };

//   // === PDF Upload ===
//   const handlePDFUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file || file.type !== 'application/pdf') {
//       errorToast('Please upload a valid PDF');
//       return;
//     }

//     const fileReader = new FileReader();
//     fileReader.onload = async () => {
//       const typedarray = new Uint8Array(fileReader.result as ArrayBuffer);
//       const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;

//       let fullText = '';
//       for (let i = 1; i <= pdf.numPages; i++) {
//         const page = await pdf.getPage(i);
//         const content = await page.getTextContent();
//         const pageText = content.items.map((item: any) => item.str).join(' ');
//         fullText += pageText + '\n';
//       }

//       parsePDFText(fullText);
//     };
//     fileReader.readAsArrayBuffer(file);
//   };

//   const parsePDFText = (text: string) => {
//     const combinedText = text.replace(/\s+/g, ' ');
//     const tableStartIndex = combinedText.indexOf('Description Qty Gross Amount');
//     if (tableStartIndex === -1) {
//       alert('Invoice table not found in PDF');
//       return;
//     }

//     const tableText = combinedText.slice(tableStartIndex);
//     const rowRegex = /(\d+)\s+([\d.-]+\s+){5}/g;

//     const matches = [];
//     let match;
//     while ((match = rowRegex.exec(tableText)) !== null) {
//       matches.push({ index: match.index, text: match[0] });
//     }

//     const parsedItems: typeof products = [];

//     for (let i = 0; i < matches.length; i++) {
//       const currentMatch = matches[i];
//       const descStart = i === 0 ? 0 : matches[i - 1].index + matches[i - 1].text.length;
//       const descEnd = currentMatch.index;

//       let description = tableText.substring(descStart, descEnd).trim();
//       description = description.replace(
//         /(Description|Qty|Gross Amount|Discount|Taxable value|IGST|Total|SAC|Platform Fee|Payment Handling Charges|18.0 % IGST|Total items: 1|:|₹)/gi,
//         ''
//       ).trim();

//       const parts = currentMatch.text.trim().split(/\s+/);
//       const qty = Number(parts[0]);
//       const gross = Number(parts[1]);
//       const discount = Number(parts[2]);
//       const taxable = Number(parts[3]);
//       const igst = Number(parts[4]);
//       const gstPercent = taxable > 0 ? Math.round((igst / taxable) * 100) : 0;

//       parsedItems.push({
//         productName: description,
//         units: '',
//         quantity: qty,
//         orderAmount: gross,
//         discount,
//         gst: gstPercent,
//       });
//     }

//     setProducts(parsedItems);
//   };

//   const handleSubmit = async () => {
//     try {
//       const response = await fetch('/api/invoice/submit', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ userName, phone, products, subTotal, finalTotal, couponDiscount }),
//       });

//       const result = await response.json();
//       if (response.ok && result.success) {
//         successToast('Invoice submitted successfully!');
//         navigate(-1);
//       } else {
//         errorToast(result.message);
//       }
//     } catch (error: any) {
//       errorToast(error.message);
//     }
//   };

//   return (
//     <>
//       <PageMetaData title="Invoice" />
//       <Row>
//         <Col xs={12}>
//           <Card>
//             <CardBody className="">
//               <Row>
//                 <Col xs={2}>
//                   <img src={logoSm} alt="logo"  width={150} height={80} />
//                 </Col>
//                 <Col xs={10} className="text-end">
//                   <h5 className="text-black"><span className="text-muted">Invoice:</span> #{original?.orderId}</h5>
//                   <h5 className="text-black"><span className="text-muted">Issue Date:</span> 20/07/2024</h5>
//                 </Col>
//               </Row>
//             </CardBody>

//             <CardBody>
//               <Row className="mb-3">
//                 <Col md={4}>
//                   <label>Invoice to:</label>
//                   <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} className="form-control form-control-sm" />
//                 </Col>
//                 <Col md={4}>
//                   <label>Phone:</label>
//                   <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control form-control-sm" />
//                 </Col>

//                  <Col md={4}>
//                   <small className="text-muted">Upload invoice PDF to auto-fill products</small>
//                   <input type="file" accept="application/pdf" onChange={handlePDFUpload} className="form-control form-control-sm" />
//                 </Col>
//               </Row>

              

//               <Row>
//                 <Col>
//                   <div className="table-responsive">
//                     <table className="table table-bordered">
//                       <thead className="table-light">
//                         <tr>
//                           <th>Product</th>
//                           <th>Units</th>
//                           <th>Qty.</th>
//                           <th>Price</th>
//                           <th>Discount (%)</th>
//                           <th>GST (%)</th>
//                           <th>Subtotal (incl. GST)</th>
//                           <th>Action</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {products.map((item, index) => {
//                           const baseAmount = item.quantity * item.orderAmount;
//                           const discountAmount = (baseAmount * item.discount) / 100;
//                           const afterDiscount = baseAmount - discountAmount;
//                           const gstAmount = (afterDiscount * item.gst) / 100;
//                           const finalAmount = afterDiscount + gstAmount;

//                           return (
//                             <tr key={index}>
//                               <td><input type="text" value={item.productName} onChange={(e) => handleProductChange(index, 'productName', e.target.value)} className="form-control form-control-sm" /></td>
//                               <td><input type="text" value={item.units} onChange={(e) => handleProductChange(index, 'units', e.target.value)} className="form-control form-control-sm" /></td>
//                               <td><input type="number" min={1} value={item.quantity} onChange={(e) => handleProductChange(index, 'quantity', e.target.value)} className="form-control form-control-sm" /></td>
//                               <td><input type="number" min={0} value={item.orderAmount} onChange={(e) => handleProductChange(index, 'orderAmount', e.target.value)} className="form-control form-control-sm" /></td>
//                               <td><input type="number" min={0} max={100} value={item.discount} onChange={(e) => handleProductChange(index, 'discount', e.target.value)} className="form-control form-control-sm" /></td>
//                               <td><input type="number" min={0} max={100} value={item.gst} onChange={(e) => handleProductChange(index, 'gst', e.target.value)} className="form-control form-control-sm" /></td>
//                               <td>{currency}{finalAmount.toFixed(2)}</td>
//                               <td><Button variant="danger" size="sm" onClick={() => removeProduct(index)} disabled={products.length === 1}>Remove</Button></td>
//                             </tr>
//                           );
//                         })}
//                         <tr>
//                           <td colSpan={8}><Button variant="success" size="sm" onClick={addProduct}>+ Add Product</Button></td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </div>
//                 </Col>
//               </Row>

//               <Row>
//                 <Col md={4}></Col>
//                 <Col md={4}>
//                   <label>Discount (%)</label>
//                   <input type="number" value={couponDiscount} min={0} max={100} onChange={(e) => setCouponDiscount(Number(e.target.value))} className="form-control form-control-sm" />
//                 </Col>
//                 <Col md={4}>
//                   <table className="table mb-0">
//                     <tbody>
//                       <tr><td><strong>Subtotal:</strong></td><td>{currency}{subTotal.toFixed(2)}</td></tr>
//                       <tr><td><strong>GST Total:</strong></td><td>{currency}{totalGST.toFixed(2)}</td></tr>
//                       <tr><td><strong>Discount:</strong></td><td>{couponDiscount}%</td></tr>
//                       <tr><td><strong>Total:</strong></td><td>{currency}{finalTotal.toFixed(2)}</td></tr>
//                     </tbody>
//                   </table>
//                 </Col>
//               </Row>

//               <Row>
//                 <Col lg={6}>
//                   <h5 className="mt-4">Terms And Conditions:</h5>
//                   <ul className="ps-3">
//                     <li><small>All invoices are due within 7 days.</small></li>
//                     <li><small>Payment can be made via cheque or direct transfer.</small></li>
//                     <li><small>Late payments will incur fees as agreed.</small></li>
//                   </ul>
//                 </Col>
//                 <Col lg={6} className="text-end align-self-center">
//                   <small>Account Manager</small>
//                   <img src={signature} alt="signature" height={24} />
//                   <p className="border-top">Signature</p>
//                 </Col>
//               </Row>

//               <hr />
//               <Row className="d-print-none">
//                 <Col md={6}><small>Thank you for your business!</small></Col>
//                 <Col md={6} className="text-end">
//                    <Button variant="info" onClick={() => window.print()}>
//                          Print
//                       </Button>
//                   <Button variant="primary" className="ms-1" onClick={handleSubmit}>Submit</Button>
//                   <Button variant="danger" className="ms-1" onClick={() => navigate(-1)}>Cancel</Button>
//                 </Col>
//               </Row>
//             </CardBody>
//           </Card>
//         </Col>
//       </Row>
//     </>
//   );
// };

// export default Invoice;
