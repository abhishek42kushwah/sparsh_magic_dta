import { useState } from 'react';
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'react-bootstrap';
import ReactApexChart from 'react-apexcharts';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import type { ApexOptions } from 'apexcharts';

const TrafficSources = () => {
  const [selectedSource, setSelectedSource] = useState('Direct');
  const [chartData, setChartData] = useState(76); 

  const chartOptions: ApexOptions = {
    series: [chartData],
    chart: {
      height: '325',
      type: 'radialBar',
      offsetY: -20,
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        hollow: {
          size: '75%',
          position: 'front',
        },
        track: {
          background: ['rgba(86, 38, 91, 0.35)'],
          strokeWidth: '80%',
          opacity: 0.5,
          margin: 5,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            offsetY: -2,
            fontSize: '20px',
          },
        },
      },
    },
    stroke: {
      lineCap: 'butt',
    },
    colors: ['#0d6efd'],
    grid: {
      padding: {
        top: -10,
      },
    },
    labels: ['Average Results'],
    responsive: [
      {
        breakpoint: 1150,
        options: {
          chart: {
            height: '150',
          },
        },
      },
    ],
  };

  const handleSourceSelect = (source: string, data: number) => {
    console.log('Selected Source:', source);
    console.log('Updated Chart Data:', data);
    
    setSelectedSource(source);
    setChartData(data); 
  };

  return (
    <Card>
      <CardHeader>
        <Row className="align-items-center">
          <Col>
            <CardTitle>Traffic Sources</CardTitle>
          </Col>
          <Col xs="auto">
            <Dropdown>
              <DropdownToggle className="btn bt btn-light">
                <i className="icofont-search-user fs-5 me-1" />
                {selectedSource}
                <IconifyIcon icon="la:angle-down" className="ms-1" />
              </DropdownToggle>
              <DropdownMenu align={'end'}>
                <DropdownItem onClick={() => handleSourceSelect('Email', 65)}>Email</DropdownItem>
                <DropdownItem onClick={() => handleSourceSelect('Referral', 70)}>Referral</DropdownItem>
                <DropdownItem onClick={() => handleSourceSelect('Direct', 76)}>Direct</DropdownItem>
                <DropdownItem onClick={() => handleSourceSelect('Organic', 80)}>Organic</DropdownItem>
                <DropdownItem onClick={() => handleSourceSelect('Campaign', 85)}>Campaign</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Col>
        </Row>
      </CardHeader>
      <CardBody className="pt-0">
        <div className="position-relative">
          {chartData > 0 ? (
            <ReactApexChart
              height={325}
              options={chartOptions}
              series={[chartData]} 
              className="d-block w-90 mx-auto"
              type="radialBar"
            />
          ) : (
            <div className="text-center position-absolute w-100" style={{ top: '40%' }}>
              <p className="text-muted">No data available</p>
            </div>
          )}
          <hr className="hr-dashed border-secondary w-25 mt-0 mx-auto" />
        </div>
        <div className="text-center">
          <h4>{selectedSource} Visitors</h4>
          <p className="text-muted mt-2">This is a simple hero unit, a simple jumbotron-style component</p>
          <Button variant="outline-primary" type="button" className="px-3 mt-2">
            More details
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default TrafficSources;
