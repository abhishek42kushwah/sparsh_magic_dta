import React, { useEffect, useState } from 'react';
import { Modal, Button, Row, Col, FormLabel, Spinner } from 'react-bootstrap';
import Select, { SingleValue } from 'react-select';
import { errorToast, successToast } from '@/utils/toastMassage';
import { BASE_URL } from '@/types/validationSchema';
import type { OrderDetailsType } from '@/types/data';
import { useAuthContext } from '@/context/useAuthContext';

interface ItemProps {
  show: boolean;
  onClose: () => void;
  setOrders: React.Dispatch<React.SetStateAction<OrderDetailsType[]>>;
  order: OrderDetailsType | null;
}

interface StoreType {
  id: number;
  name: string;
}

interface SelectOption {
  value: number;
  label: string;
}

const AssignToStoreModal: React.FC<ItemProps> = ({
  show,
  onClose,
  order,
  setOrders,
}) => {
  const [stores, setStores] = useState<StoreType[]>([]);
  const [selectedStore, setSelectedStore] = useState<StoreType | null>(null);
  const [loading, setLoading] = useState(false);
  const [assigning, setAssigning] = useState(false);
  const { user } = useAuthContext();
  const Token = user?.token;

  const fetchStores = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}store`, {
        headers: {
          Authorization: `Bearer ${Token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStores(data.result?.stores || []);
      } else {
        errorToast(data.message || 'Failed to fetch stores');
      }
    } catch (error) {
      errorToast(error instanceof Error ? error.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (show) fetchStores();
  }, [show]);

  useEffect(() => {
    if (order && stores.length > 0) {
      const matchedStore = stores.find(s => s.id === Number(order.storeId));
      setSelectedStore(matchedStore || null);
    }
  }, [order, stores]);

  const handleAssign = async () => {
    if (!selectedStore) return errorToast('Please select a store');
    if (!order?.orderId) return errorToast('Order ID not found');

    try {
      setAssigning(true);

      const payload = {
        orderId: order.orderId,
        storeId: selectedStore.id,
      };

      const res = await fetch(`${BASE_URL}orders/transfer`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        successToast(data.message);
        setOrders(prev =>
          prev.map(o =>
            o.orderId === order.orderId
              ? { ...o, storeId: String(selectedStore.id), storeName: selectedStore.name }
              : o
          )
        );
        onClose();
      } else {
        errorToast(data.message || 'Failed to assign order');
      }
    } catch (error) {
      errorToast(error instanceof Error ? error.message : 'Unknown error occurred');
    } finally {
      setAssigning(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Assign To Store</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row className="mb-3">
          <FormLabel className="col-sm-3 col-form-label">Select Store</FormLabel>
          <Col sm={9}>
            {loading ? (
              <div className="d-flex align-items-center gap-2">
                <Spinner animation="border" size="sm" />
                <span>Loading stores...</span>
              </div>
            ) : (
              <Select
                placeholder="Search or select store"
                options={stores.map(store => ({
                  value: store.id,
                  label: store.name,
                }))}
                value={
                  selectedStore
                    ? { value: selectedStore.id, label: selectedStore.name }
                    : null
                }
                onChange={(option: SingleValue<SelectOption>) => {
                  const store = stores.find(s => s.id === option?.value);
                  setSelectedStore(store || null);
                }}
                isClearable
                isSearchable
              />
            )}
          </Col>
        </Row>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="primary"
          onClick={handleAssign}
          disabled={assigning || !selectedStore}
        >
          {assigning ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
              Assigning...
            </>
          ) : (
            'Assign'
          )}
        </Button>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AssignToStoreModal;
