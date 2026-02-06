import { Card, CardBody, CardHeader, CardTitle, Col, Row, Spinner } from 'react-bootstrap';
import type { SettingsType } from '@/types/data';
import { useEffect, useState } from 'react';
import PageMetaData from '@/components/PageMetaData';
import SettingTable from './components/SettingTable';
import { errorToast } from '@/utils/toastMassage';
import { BASE_URL } from '@/types/validationSchema';
const Setting = () => {
  const [data, setData] = useState<SettingsType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSetting = async () => {
      setLoading(true)
      try {
        const response = await fetch(`${BASE_URL}setting`);
        const data = await response.json();
        if (data.success) {
          setData([data.result?.setting]);
        } else {
          errorToast('Something went wrong, please try again later')
        }
      } catch (error) {
        errorToast('Something went wrong, please try again later')
      }
      finally {
        setLoading(false);
      }

    };

    fetchSetting();
  }, []);


  return (
    <>
      <PageMetaData title="Settings" />
      <Row>
        <Col lg={12}>
          <Card>
            <CardHeader>
              <Row className="align-items-center">
                <Col>
                  <CardTitle as="h4">Settings</CardTitle>
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
              ) : data && data.length > 0 ? (
                <SettingTable data={data} />
              ) : (
                <div>No settings found.</div>
              )}

            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Setting;
