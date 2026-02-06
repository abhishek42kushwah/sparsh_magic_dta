import type { ApexOptions } from 'apexcharts';
import { Button, Card, CardBody, Col, Row } from 'react-bootstrap';
import clsx from 'clsx';
import type { StatType } from './types';
import ReactApexChart from 'react-apexcharts';

const StatCard = ({ buttonVariant, change, icon, stat, subTitle, title }: StatType) => {
  const chartOptions: ApexOptions = {
    series: [
      {
        data: [55, 76, 41, 89, 63, 21, 10, 12, 36, 9, 54], 
      },
    ],
    chart: {
      type: 'line',
      width: 120,
      height: 35,
      sparkline: {
        enabled: true,
      },
      dropShadow: {
        enabled: true,
        top: 4,
        left: 0,
        blur: 2,
        color: 'rgba(132, 145, 183, 0.3)',
        opacity: 0.35,
      },
    },
    colors: ['#95a0c5'],
    stroke: {
      show: true,
      curve: 'smooth',
      width: [3],
      lineCap: 'round',
    },
    tooltip: {
      fixed: {
        enabled: false,
      },
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: function () {
            return '';
          },
        },
      },
      marker: {
        show: false,
      },
    },
  };

  // Check if data exists
  const hasChartData = 
    typeof chartOptions.series?.[0] === 'object' && 
    'data' in chartOptions.series[0] && 
    (chartOptions.series[0].data?.length ?? 0) > 0;
  const hasStat = stat !== undefined && stat !== null;
  const hasSubTitle = subTitle !== undefined && subTitle !== null;

  return (
    <Card>
      <CardBody className="border-dashed-bottom pb-3">
        <Row className="d-flex justify-content-between">
          <Col xs="auto">
            <div className="d-flex justify-content-center align-items-center thumb-xl border border-secondary rounded-circle">
              <i className={clsx('h1 align-self-center mb-0 text-secondary', icon)} />
            </div>
            <h5 className="mt-2 mb-0 fs-14">{title}</h5>
          </Col>
          <Col className="align-self-center">
            {hasChartData ? (
              <ReactApexChart height={35} options={chartOptions} series={chartOptions.series} type="line" width={120} className="float-end" />
            ) : (
              <div className="text-muted text-end">No Data Available</div>
            )}
          </Col>
        </Row>
      </CardBody>
      <CardBody>
        <Row className="d-flex justify-content-center">
          <Col xs={12} md={6}>
            {hasStat ? (
              <h2 className="fs-22 mt-0 mb-1 fw-bold">{stat}</h2>
            ) : (
              <div className="text-muted">No Stat Available</div>
            )}
            {hasSubTitle ? (
              <p className="mb-0 text-truncate text-muted">
                <span className="text-success">{change}%</span> {subTitle}
              </p>
            ) : (
              <div className="text-muted">No Subtitle Available</div>
            )}
          </Col>
          <Col xs={12} md={6} className="align-self-center text-start text-md-end">
            <Button variant={buttonVariant} size="sm" className="px-2 mt-2 mt-md-0">
              View Report
            </Button>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default StatCard;
