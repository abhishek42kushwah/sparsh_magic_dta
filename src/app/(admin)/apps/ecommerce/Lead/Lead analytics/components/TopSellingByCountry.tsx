import { useState } from 'react';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Card, CardBody, CardHeader, CardTitle, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, ProgressBar, Row } from 'react-bootstrap';
import { topCountriesSellingData } from '../data';
import { currency } from '@/context/constants';

const TopSellingByCountry = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('This Month');

  const handleSelect = (period:any) => {
    setSelectedPeriod(period);
    console.log('Selected Period:', period);
  };

  const hasData = topCountriesSellingData && topCountriesSellingData.length > 0;

  return (
    <Card>
      <CardHeader>
        <Row className="align-items-center">
          <Col>
            <CardTitle>Top Selling by Country</CardTitle>
          </Col>
          <Col xs="auto">
            <Dropdown>
              <DropdownToggle className="btn bt btn-light">
                <i className="icofont-calendar fs-5 me-1" />
                {selectedPeriod}
                <IconifyIcon icon="la:angle-down" className="ms-1" />
              </DropdownToggle>
              <DropdownMenu align={'end'}>
                {['Today', 'Last Week', 'Last Month', 'This Year'].map((period) => (
                  <DropdownItem key={period} onClick={() => handleSelect(period)}>
                    {period}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </Col>
        </Row>
      </CardHeader>
      <CardBody className="pt-0">
        {hasData ? (
          <div className="table-responsive">
            <table className="table mb-0">
              <tbody>
                {topCountriesSellingData.map((country, idx) => (
                  <tr key={idx}>
                    <td className="px-0">
                      <div className="d-flex align-items-center">
                        <img src={country.flagImage} className="me-2 align-self-center thumb-md rounded-circle" alt={country.name} />
                        <div className="flex-grow-1 text-truncate">
                          <h6 className="m-0 text-truncate">{country.name}</h6>
                          <div className="d-flex align-items-center">
                            <ProgressBar variant="primary" now={country.progress} className="w-100" style={{ height: 5 }} />
                            <small className="flex-shrink-1 ms-1">{country.progress}%</small>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-0 text-end">
                      <span className="text-body ps-2 align-self-center text-end">
                        {currency}
                        {country.amount.toFixed(2)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-5">
            <h5 className="text-muted">No Data Found</h5>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default TopSellingByCountry;
