import IconifyIcon from '@/components/wrappers/IconifyIcon';
import type { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import { Card, CardBody, CardHeader, CardTitle, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'react-bootstrap';
import { useState } from 'react';

const GrowthChart = () => {

  const updateChartData = (range: string) => {
    switch (range) {
      case 'Today':
        return [
          { name: 'New Rx Orders Crm', data: [5, 10, 8, 12, 7, 13, 9] },
          { name: 'Returning Rx Orders Crm', data: [2, 5, 3, 6, 8, 4, 7] },
        ];
      case 'This Week':
        return [
          { name: 'New Rx Orders ', data: [0, 20, 15, 19, 14, 25, 30] },
          { name: 'Returning Rx Orders ', data: [0, 8, 7, 13, 26, 16, 25] },
        ];
      case 'Last Month':
        return [
          { name: 'New Rx Orders ', data: [10, 30, 25, 40, 35, 45, 50] },
          { name: 'Returning Rx Orders', data: [5, 15, 10, 20, 25, 35, 30] },
        ];
      case 'This Year':
        return [
          { name: 'New Rx Orders ', data: [50, 70, 60, 90, 100, 110, 130] },
          { name: 'Returning Rx Orders ', data: [30, 40, 50, 60, 70, 80, 90] },
        ];
      case 'This Month':
        return [
          { name: 'New Rx Orders ', data: [15, 25, 20, 30, 35, 40, 45] },
          { name: 'Returning Rx Orders ', data: [8, 18, 10, 15, 20, 25, 30] },
        ];
      case 'Last Three Months':
        return [
          { name: 'New Rx Orders ', data: [30, 45, 40, 60, 55, 65, 70] },
          { name: 'Returning Rx Orders ', data: [20, 30, 25, 40, 35, 50, 45] },
        ];
      default:
        return [
          { name: 'New Rx Orders ', data: [] },
          { name: 'Returning Rx Orders ', data: [] },
        ];
    }
  };


  const [selectedRange, setSelectedRange] = useState('This Week');
  const [chartData, setChartData] = useState(updateChartData('This Week'));


  const handleSelect = (range: string) => {
    setSelectedRange(range);
    setChartData(updateChartData(range));
    console.log('Rx Order ', range);
  };

  const hasData = chartData.some(series => series.data.some(value => value > 0));

  const chartOptions: ApexOptions = {
    series: chartData,
    chart: {
      fontFamily: 'inherit',
      height: 233,
      type: 'line',
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    colors: ['var(--bs-primary)', 'var(--bs-primary-bg-subtle)'],
    grid: {
      show: true,
      strokeDashArray: 3,
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    markers: {
      strokeColors: 'transparent',
    },
    tooltip: {
      x: {
        show: false,
      },
      followCursor: true,
    },
  };

  return (
    <Card>
      <CardHeader>
        <Row className="align-items-center">
          <Col>
            <CardTitle>Rx Order Growth</CardTitle>
          </Col>
          <Col xs="auto">
            <Dropdown>
              <DropdownToggle className="btn btn-light">
                <i className="icofont-calendar fs-5" />
                {selectedRange}
                <IconifyIcon icon="la:angle-down" />
              </DropdownToggle>
              <DropdownMenu align="end">
                {['Today', 'This Week', 'Last Month', 'This Year', 'This Month', 'Last Three Months'].map((range) => (
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
        {hasData ? (
          <ReactApexChart height={233} options={chartOptions} series={chartOptions.series} type="line" />
        ) : (
          <div className="text-center">
            <h5 className="text-muted">No Data Available</h5>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default GrowthChart;
