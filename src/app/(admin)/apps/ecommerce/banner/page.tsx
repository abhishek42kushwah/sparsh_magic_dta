import IconifyIcon from '@/components/wrappers/IconifyIcon';
import {
  Card, CardBody, CardHeader, CardTitle,
  Col, Row, Spinner, Dropdown, DropdownToggle,
  DropdownMenu, DropdownItem
} from 'react-bootstrap';
import BannerTable from './bannerHome';
import type { HomeBannerType } from '@/types/data';
import { useEffect, useState } from 'react';
import PageMetaData from '@/components/PageMetaData';
import { useNavigate } from 'react-router-dom';
import { errorToast } from '@/utils/toastMassage';
import { BASE_URL } from '@/types/validationSchema';
import clsx from 'clsx';

const Banner = () => {
  const [banner, setBanner] = useState<HomeBannerType[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedSection, setSelectedSection] = useState('ALL');
  const navigate = useNavigate();
  const sections = ['ALL', 'TOP', 'BOTTOM'];

  const fetchBanner = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedSection !== 'ALL') {
        params.append('section', selectedSection);
      }

      const response = await fetch(`${BASE_URL}homebanner?${params.toString()}`);
      const data = await response.json();
      setBanner(data.result?.homeBanners || []);
    } catch (error) {
      errorToast('Error fetching banner');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanner();
  }, [selectedSection]);

  return (
    <>
      <PageMetaData title="Banner" />
      <Row>
        <Col lg={12}>
          <Card>
            <CardHeader>
              <Row className="align-items-center">
                <Col>
                  <CardTitle as="h4">Banner</CardTitle>
                </Col>

                <Col xs="auto">
                  <Dropdown>
                    <DropdownToggle
                      variant="link"
                      className="btn bg-primary-subtle text-primary d-flex align-items-center arrow-none"
                    >
                      <IconifyIcon icon="iconoir:filter-alt" className="me-1" />
                      Section: {selectedSection}
                    </DropdownToggle>
                    <DropdownMenu align="start" className="p-2">
                      {sections.map((section, idx) => (
                        <DropdownItem
                          key={section}
                          onClick={() => setSelectedSection(section)}
                          className={clsx({ 'mb-2': idx !== sections.length - 1 })}
                        >
                          {section}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                </Col>

                <Col xs="auto">
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate('/app/ecommerce/addbanner')}
                  >
                    <IconifyIcon icon="fa6-solid:plus" className="me-1" />
                    Add Banner
                  </button>
                </Col>
              </Row>
            </CardHeader>

            <CardBody className="pt-0">
              {loading ? (
                <div className="text-center pt-5">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              ) : banner.length > 0 ? (
                <BannerTable banner={banner} setBanner={setBanner} />
              ) : (
                <div className="text-center pt-5">No banners found.</div>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Banner;
