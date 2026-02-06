import { Card, CardBody, CardHeader, CardTitle, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { currency } from '@/context/constants';
import { recentOrders } from '../data';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const RecentOrders = () => {
  const [dropdownLabel, setDropdownLabel] = useState('This Month');

  const handleDropdownSelect = (label:any) => {
    console.log(`Selected: ${label}`);
    setDropdownLabel(label);
  };

  return (
    <Card>
      <CardHeader>
        <Row className="align-items-center">
          <Col>
            <CardTitle>Recent Orders</CardTitle>
          </Col>
          <Col xs="auto">
            <Dropdown>
              <DropdownToggle className="btn bt btn-light">
                <i className="icofont-calendar fs-5 me-1" />
                {dropdownLabel}
                <IconifyIcon icon="la:angle-down" className="ms-1" />
              </DropdownToggle>
              <DropdownMenu align={'end'}>
                <DropdownItem onClick={() => handleDropdownSelect('Today')}>Today</DropdownItem>
                <DropdownItem onClick={() => handleDropdownSelect('Last Week')}>Last Week</DropdownItem>
                <DropdownItem onClick={() => handleDropdownSelect('Last Month')}>Last Month</DropdownItem>
                <DropdownItem onClick={() => handleDropdownSelect('This Year')}>This Year</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Col>
        </Row>
      </CardHeader>
      <CardBody className="pt-0">
        <div className="table-responsive">
          {recentOrders.length > 0 ? (
            <table className="table mb-0">
              <tbody>
                {recentOrders.map((order, idx) => (
                  <tr key={idx}>
                    <td className="px-0">
                      <div className="d-flex align-items-center">
                        <img src={order.image} height={36} className="me-2 align-self-center rounded" alt="..." />
                        <div className="flex-grow-1 text-truncate">
                          <h6 className="m-0 text-truncate">{order.name}</h6>
                          <Link to="" className="font-12 text-muted text-decoration-underline">
                            {order.id}
                          </Link>
                        </div>
                      </div>
                    </td>
                    <td className="px-0 text-end">
                      <span className="text-primary ps-2 align-self-center text-end">
                        {currency}
                        {order.amount.toFixed(2)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-5">
              <h5 className="text-muted">No Data Found</h5>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default RecentOrders;
