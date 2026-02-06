import { Card, CardBody, CardHeader, CardTitle, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { currency } from '@/context/constants';
import { recentOrders } from '../data';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const RecentOrders = () => {
  const [selectedRange, setSelectedRange] = useState("This Month");

  const handleSelect = (range: string) => {
    setSelectedRange(range);
    console.log(range);
  };

  const filteredData = recentOrders.filter((item) => {
    const matchesDateRange = (range: string) => {
      const today = new Date();
      const transactionDate = new Date(item.createdAt);

      switch (range) {
        case 'Today':
          return transactionDate.toDateString() === today.toDateString();
        case 'Last Week':
          const startOfLastWeek = new Date(today);
          startOfLastWeek.setDate(today.getDate() - today.getDay() - 7);
          const endOfLastWeek = new Date(today);
          endOfLastWeek.setDate(today.getDate() - today.getDay());
          return transactionDate >= startOfLastWeek && transactionDate < endOfLastWeek;
        case 'This Month':
          const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
          return transactionDate >= startOfMonth && transactionDate <= today;
        case 'Last Month':
          const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
          const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
          return transactionDate >= startOfLastMonth && transactionDate <= endOfLastMonth;
        case 'This Year':
          return transactionDate.getFullYear() === today.getFullYear();
        default:
          return true;
      }
    };

    return matchesDateRange(selectedRange);
  });

 

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
                {selectedRange}
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
          {filteredData.length > 0 ? (
            <table className="table mb-0">
              <tbody>
                {filteredData.map((order, idx) => (
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
