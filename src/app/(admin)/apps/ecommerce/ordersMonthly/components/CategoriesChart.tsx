import { Button, Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import type { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';

const CategoriesChart = () => {
  const categoriesData = [1080, 900, 820, 560, 890, 548, 330, 200]; // This is your data array.
  const categoryNames = ['Apple Watch', 'Reebok Shoes', 'Cosco Volleyball', 'Beauty', 'Health', 'Sports', 'Kids', 'Music']; // This is your category names.

  const chartOptions: ApexOptions = {
    series: [
      {
        name: 'Items',
        data: categoriesData
      }
    ],
    chart: {
      type: 'bar',
      height: 275,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        horizontal: true,
        distributed: true,
        barHeight: '85%',
        isFunnel: true,
        isFunnel3d: false
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function (_val, opt) {
        return opt.w.globals.labels[opt.dataPointIndex];
      },
      dropShadow: {
        enabled: false
      },
      style: {
        colors: ['#0d6efd'],
        fontWeight: 400,
        fontSize: '13px'
      }
    },
    xaxis: {
      categories: categoryNames
    },
    colors: [
  'rgba(13, 110, 253, 0.45)',
  'rgba(13, 110, 253, 0.4)',
  'rgba(13, 110, 253, 0.35)',
  'rgba(13, 110, 253, 0.3)',
  'rgba(13, 110, 253, 0.25)',
  'rgba(13, 110, 253, 0.2)',
  'rgba(13, 110, 253, 0.15)',
  'rgba(13, 110, 253, 0.1)',
],
    legend: {
      show: false
    }
  };

  return (
    <Card>
      <CardHeader>
        <Row className="align-items-center">
          <Col>
            <CardTitle>Categories Data</CardTitle>
          </Col>
          <Col xs="auto">
            <div className="text-center">
              <h6 className="text-uppercase text-muted mt-1 m-0">
                <span className="fs-16 fw-semibold">{categoriesData.length > 0 ? `${categoriesData.length}+` : '0+'}</span> Categories
              </h6>
            </div>
          </Col>
        </Row>
      </CardHeader>
      <CardBody className="pt-0">
        {categoriesData.length > 0 ? (
          <>
            <ReactApexChart height={265} options={chartOptions} series={chartOptions.series} type="bar" />
            <div id="categories" className="apex-charts mt-n2" />
          </>
        ) : (
          <div className="text-center">
            <h6 className="text-muted mt-2 m-0">Data not available</h6>
          </div>
        )}
        <div className="text-center">
          <Button type="button" variant="primary" className="mx-auto icons-center gap-1" disabled={categoriesData.length === 0}>
            More Detail <IconifyIcon icon="fa6-solid:arrow-right-long" />{' '}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default CategoriesChart;
