import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Card, CardBody, CardHeader, CardTitle, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'react-bootstrap';
import { WorldVectorMap } from '@/components/VectorMap';
import { topCountriesData } from '@/assets/data/other';
import { useState } from 'react';

const WorldTraffic = () => {
  const [selectedRange, setSelecetedRange] = useState("This Month")

  const options = {
    map: 'world',
    mapBgColor: '#F7F8F9',
    zoomOnScroll: false,
    zoomButtons: false,
    markers: [
      { name: 'Greenland', coords: [72, -42] },
      { name: 'Canada', coords: [56.1304, -106.3468] },
      { name: 'Brazil', coords: [-14.235, -51.9253] },
      { name: 'Egypt', coords: [26.8206, 30.8025] },
      { name: 'Russia', coords: [61, 105] },
      { name: 'China', coords: [35.8617, 104.1954] },
      { name: 'United States', coords: [37.0902, -95.7129] },
      { name: 'Norway', coords: [60.472024, 8.468946] },
      { name: 'Ukraine', coords: [48.379433, 31.16558] },
    ],
    lines: [
      { from: 'Canada', to: 'Egypt' },
      { from: 'Russia', to: 'Egypt' },
      { from: 'Greenland', to: 'Egypt' },
      { from: 'Brazil', to: 'Egypt' },
      { from: 'United States', to: 'Egypt' },
      { from: 'China', to: 'Egypt' },
      { from: 'Norway', to: 'Egypt' },
      { from: 'Ukraine', to: 'Egypt' },
    ],
    labels: {
      markers: {
        render: (marker: any) => marker.name,
      },
    },
    lineStyle: {
      animation: true,
      strokeDasharray: '6 3 6',
    },
    regionStyle: {
      initial: {
        fill: 'rgba(13, 110, 253, 0.35)',
        fillOpacity: 1,
      },
    },
    markerStyle: {
      initial: {
        r: 5,
        fill: '#0d6efd',
        fillOpacity: 1,
        stroke: '#FFF',
        strokeWidth: 1,
        strokeOpacity: 0.65,
      },
      hover: {
        stroke: 'black',
        cursor: 'pointer',
        strokeWidth: 2,
      },
      selected: {
        fill: 'blue',
      },
      selectedHover: {
        fill: 'red',
      },
    },
  };


  const handleSelect = (renge: string) => {
    setSelecetedRange(renge)
    
  }

  const filteredData = topCountriesData.filter(item => {
    const matchesDateRange = (range: string) => {
      const today = new Date();
      const transactionDate = new Date(item.createdAt
      );

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
            <CardTitle>Organic Traffic In World</CardTitle>
          </Col>
          <Col xs="auto">
            <Dropdown>
              <DropdownToggle className="btn bt btn-light icons-center">
                <i className="icofont-calendar fs-5 me-1" />
                {selectedRange}
                <IconifyIcon icon="la:angle-down" className="ms-1" />
              </DropdownToggle>
              <DropdownMenu align={'end'}>
                {['Today', 'Last Week','This Month', 'Last Month', 'This Year'].map((renge) => (
                  <DropdownItem key={renge} onClick={() => handleSelect(renge)}>
                    {renge}
                  </DropdownItem>
                ))}

              </DropdownMenu>
            </Dropdown>
          </Col>
        </Row>
      </CardHeader>
      <CardBody className="pt-0">
        <Row>
          <Col lg={8}>
            <WorldVectorMap height="320px" options={options} />
          </Col>
          <Col lg={4} className="align-self-center">
            {filteredData.length > 0 ? (
              filteredData.map((country, idx) => {

                return (
                  <div className="d-flex align-items-center my-3" key={idx}>
                    <img src={country.countryFlag} className="thumb-sm align-self-center rounded-circle" alt="..." />
                    <div className="flex-grow-1 ms-2">
                      <h5 className="mb-1">{country.count}</h5>
                      <p className="text-muted mb-0">
                        {country.name}. Last Month
                        <span className="text-primary"> {country.change}%</span>
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center w-100">
                <p className="text-muted">No data available</p>
              </div>
            )}
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default WorldTraffic;
