import { useState, useEffect } from 'react';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { currency } from '@/context/constants';
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  OverlayTrigger,
  Row,
  Spinner,
  Tooltip
} from 'react-bootstrap';
import { getProductStatusVariant } from '@/utils/variants-icons';
import { errorToast } from '@/utils/toastMassage';
import { BASE_URL } from '@/types/validationSchema';
import { Link } from 'react-router-dom';

const PopularProducts = () => {
  const [selectedRange, setSelectedRange] = useState(null);
  const [loading, setLoading] = useState(false);
  const [popularProduct, setPopularProduct] = useState([]);

  const calculateDateRange = (range: any) => {
    const today = new Date();
    let startDate, endDate;

    switch (range) {
      case 'Today':
        startDate = endDate = today;
        break;
      case 'Last Week':
        startDate = new Date(today);
        startDate.setDate(today.getDate() - 7);
        endDate = today;
        break;
      case 'This Month':
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        endDate = today;
        break;
      case 'Last Month':
        startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        endDate = new Date(today.getFullYear(), today.getMonth(), 0);
        break;
      case 'This Year':
        startDate = new Date(today.getFullYear(), 0, 1);
        endDate = today;
        break;
      default:
        startDate = endDate = today;
    }
    return {
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0]
    };
  };

  const fetchPopularProduct = async (range = null) => {
    setLoading(true);
    const url = range
      ? `${BASE_URL}admin/popular?startDate=${calculateDateRange(range).startDate}&endDate=${calculateDateRange(range).endDate}`
      : `${BASE_URL}admin/popular`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      setPopularProduct(data.result);
    } catch (error) {
      errorToast('Error fetching popular products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPopularProduct();
  }, []);

  const handleSelect = (range: any) => {
    setSelectedRange(range);
    fetchPopularProduct(range);
  };

  return (
    <Card>
      <CardHeader>
        <Row className="align-items-center">
          <Col>
            <CardTitle>Most Ordered Products</CardTitle>
          </Col>
          <Col xs="auto">
            <Dropdown>
              <DropdownToggle className="btn btn-light icons-center">
                <i className="icofont-calendar fs-5 me-1" />
                {selectedRange || 'Select Date'}
                <IconifyIcon icon="la:angle-down" className="ms-1" />
              </DropdownToggle>
              <DropdownMenu align={'end'}>
                {['Today', 'Last Week', 'This Month', 'Last Month', 'This Year'].map((range) => (
                  <DropdownItem key={range} onClick={() => handleSelect(range)}>
                    {range}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </Col>
        </Row>
      </CardHeader>
      <CardBody className="pt-0">
        <div className="table-responsive">
          <table className="table mb-0">
            <thead className="table-light">
              <tr>
                <th className="border-top-0">Product</th>
                <th className="border-top-0">Price</th>
                <th className="border-top-0">Sell</th>
                <th className="border-top-0">Status</th>
                <th className="border-top-0">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center">
                    <Spinner animation="border" size="sm" /> Loading...
                  </td>
                </tr>
              ) : popularProduct.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center">
                    <p className="m-0">No Data Found</p>
                  </td>
                </tr>
              ) : (
                popularProduct.slice(0, 5).map((product: any) => (
                  <tr key={product.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <img src={product.image} height={40} className="me-3 align-self-center rounded" alt={product.name} />
                        <div className="flex-grow-1 text-truncate">
                          <h6 className="m-0">{product.name}</h6>
                          <a href="#" className="fs-12 text-primary">
                            ID: {product.id}
                          </a>
                        </div>
                      </div>
                    </td>
                    <td>
                      {currency}
                      {product.sellPrice}{' '}
                      <del className="text-muted fs-10">
                        {currency}
                        {product.BuyPrice}
                      </del>
                    </td>
                    <td>{product.quantitySold}</td>
                    <td>
                      <span
                        className={`badge bg-${getProductStatusVariant(product.status)}-subtle px-2 text-${getProductStatusVariant(product.status)}`}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td>
                      <OverlayTrigger placement="top" overlay={<Tooltip id={`tooltip-edit-${product.id}`}>Details Order</Tooltip>}>
                        <Link
                          to={`/apps/ecommerce/orders/orders-details/${product.id}`}
                          aria-label={`Edit product ${product.id}`}
                          className="d-inline-flex align-items-center text-secondary fs-18"
                        >
                          <IconifyIcon icon="mdi:file-eye" />
                        </Link>
                      </OverlayTrigger>

                      {/* <span role="button" aria-label={`Delete product ${product.id}`}  className="ms-2">
                        <IconifyIcon icon="la:trash-alt" className="text-secondary fs-18" />
                      </span> */}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
};

export default PopularProducts;
