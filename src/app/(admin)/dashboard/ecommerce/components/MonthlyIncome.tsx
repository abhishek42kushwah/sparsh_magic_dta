
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap';
import { incomeStatData } from '../data';
import type { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import { useState } from 'react';

const MonthlyIncome = () => {


  const [incomeChartData] = useState([
    {
      name: 'Inflation',
      data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2],
    },
  ]);



  // const incomeData = [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]; 

  const incomeChartOpts: ApexOptions = {
    chart: {
      height: 270,
      type: 'bar',
      toolbar: {
        show: false,
      },
      dropShadow: {
        enabled: true,
        top: 0,
        left: 5,
        blur: 5,
        color: '#45404a2e',
        opacity: 0.35,
      },
    },
    colors: ['#95a0c5', '#0d6efd', '#95a0c5', '#95a0c5', '#95a0c5', '#95a0c5', '#95a0c5', '#95a0c5', '#95a0c5', '#95a0c5', '#95a0c5', '#95a0c5'],
    plotOptions: {
      bar: {
        borderRadius: 6,
        dataLabels: {
          position: 'top',
        },
        columnWidth: '20',
        distributed: true,
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val + '%';
      },
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ['#8997bd'],
      },
    },
    xaxis: {
      categories: ['11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
      position: 'top',
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        fill: {
          type: 'gradient',
          gradient: {
            colorFrom: '#D8E3F0',
            colorTo: '#BED1E6',
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    yaxis: {
      labels: {
        show: true,
        formatter: function (val: number): string {
          return String(val);
        },
      },
    },
    grid: {
      strokeDashArray: 2.5,
    },
    legend: {
      show: false,
    },
  };



  return (
    <Card>
      <CardHeader>
        <Row className="align-items-center">
          <Col>
            <CardTitle>Last 10 Days Orders</CardTitle>
          </Col>
     
        </Row>
      </CardHeader>
      <CardBody className="pt-0">
        <ReactApexChart height={270} options={incomeChartOpts} series={incomeChartData} type="bar" />
        <Row>
          {incomeStatData.map((item, idx) => (
            <Col md={6} lg={3} key={idx}>
              <Card className="shadow-none border mb-3 mb-lg-0">
                <CardBody>
                  <Row className="align-items-center">
                    <Col className="text-center">
                      <span className="fs-18 fw-semibold">{item.stat}</span>
                      <h6 className="text-uppercase text-muted mt-2 m-0">{item.title}</h6>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </CardBody>
    </Card>
  );
};

export default MonthlyIncome;
