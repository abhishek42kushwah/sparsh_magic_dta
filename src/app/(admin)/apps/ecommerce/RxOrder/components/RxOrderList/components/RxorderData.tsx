import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Card, CardBody, CardHeader, CardTitle, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'react-bootstrap';
import { useState } from 'react';
import type { OrdersDataType } from './types';
import { updateData } from "./data"
const RxorderData = () => {

  const [selectedRange, setSelectedRange] = useState('This Week');
  const [ordersData, setOrdersData] = useState<OrdersDataType[]>(() => updateData('This Week'));

  const handleSelect = (range: string) => {
    setSelectedRange(range);
    setOrdersData(updateData(range));
  };

  return (
    <Card>
      <CardHeader>
        <Row className="align-items-center">
          <Col>
            <CardTitle>Rx Orders Data</CardTitle>
          </Col>
          <Col xs="auto">
            <Dropdown>
              <DropdownToggle className="btn btn-light">
                <i className="icofont-calendar fs-5" />
                {selectedRange}
                <IconifyIcon icon="la:angle-down" />
              </DropdownToggle>
              <DropdownMenu align="end">
                {['Today', 'This Week', 'Last Month', 'This Year'].map((range) => (
                  <DropdownItem key={range} active={selectedRange === range} onClick={() => handleSelect(range)}>
                    {range}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </Col>
        </Row>
      </CardHeader>
      <CardBody className="pt-0">
        <Row className="g-3">
          {ordersData.length > 0 ? (
            ordersData.map((stat, idx) => (
              <Col md={6} key={idx}>
                <Card className="shadow-none border mb-3 mb-lg-0">
                  <CardBody className="text-center">
                    {stat.stat ? (
                      <span className="fs-18 fw-semibold">{stat.stat}</span>
                    ) : (
                      <h5 className="text-muted">No Stat Data Available</h5>
                    )}
                    {stat.title ? (
                      <h6 className="text-uppercase text-muted mt-2">{stat.title}</h6>
                    ) : (
                      <h5 className="text-muted">No Title Data Available</h5>
                    )}
                  </CardBody>
                </Card>
              </Col>
            ))
          ) : (
            <Col md={12}>
              <Card className="shadow-none border mb-3 mb-lg-0 text-center">
                <CardBody>
                  <Row className="align-items-center">
                    <Col>
                      <span className="fs-18 fw-semibold">0</span>
                      <h6 className="text-uppercase text-muted mt-2 m-0">No Data Available</h6>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          )}
        </Row>
      </CardBody>
    </Card>
  );
};

export default RxorderData;
