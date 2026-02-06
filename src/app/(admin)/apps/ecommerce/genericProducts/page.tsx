import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Card, CardBody, CardHeader, CardTitle, Col, FormControl, Row, Spinner } from 'react-bootstrap';
import GenericProductsTable from './components/GenericProductsTable';
import type { GenericProductType } from '@/types/data';
import { useEffect, useState, useCallback } from 'react';
import PageMetaData from '@/components/PageMetaData';
import { BASE_URL } from '@/types/validationSchema';
import { useDebounce } from '@/hooks/useDebounce';

const GenericProducts = () => {
  const [genericProducts, setGenericProducts] = useState<GenericProductType[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const fetchGenericProducts = useCallback(async () => {
    setLoading(true);
    try {
      const url = debouncedSearchTerm
        ? `${BASE_URL}genericproducts/product/${debouncedSearchTerm}/generic`
        : `${BASE_URL}genericproducts/list`;

      const response = await fetch(url);
      const data = await response.json();``

      if (data?.success) {
        let products = [];

        if (debouncedSearchTerm) {
          // API returns result.genericProducts when searching
          products = data.result?.genericProducts || [];
        } else {
          // API returns array of products directly
          products = data.result || [];
        }

        setGenericProducts(products);
      } else {
        setGenericProducts([]);
       
      }
    } catch (error) {
      
      setGenericProducts([]);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    fetchGenericProducts();
  }, [fetchGenericProducts]);

  return (
    <>
      <PageMetaData title="Generic Products" />
      <Row>
        <Col xs={12}>
          <Card>
            <CardHeader>
              <Row className="align-items-center">
                <Col>
                  <CardTitle as="h4">Generic Products</CardTitle>
                </Col>
                <Col xs="auto" className="position-relative">
                  <FormControl
                    type="text"
                    placeholder="Search by Product ID"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {searchTerm && (
                    <IconifyIcon
                      icon="mdi:close-circle"
                      className="position-absolute end-0 top-50 translate-middle-y me-3 text-muted"
                      role="button"
                      onClick={() => setSearchTerm('')}
                    />
                  )}
                </Col>
                {/* <Col xs="auto">
                  <Button variant="primary" type="button" className="d-flex align-items-center">
                    <IconifyIcon icon="fa6-solid:plus" className="me-1" /> Add Generic Product
                  </Button>
                </Col> */}
              </Row>
            </CardHeader>
            <CardBody className="pt-0">
              {loading ? (
                <div className="text-center pt-5">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              ) : genericProducts.length > 0 ? (
                <GenericProductsTable genericProducts={genericProducts}  />
              ) : (
                <div className="text-center py-5">No Generic Products found.</div>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default GenericProducts;
