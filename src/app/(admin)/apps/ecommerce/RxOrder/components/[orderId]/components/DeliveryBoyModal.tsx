import React, { useEffect, useState } from 'react';
import { Modal, Button, Row, Col, FormLabel, Spinner } from 'react-bootstrap';
import Select from 'react-select';
import { errorToast, successToast } from '@/utils/toastMassage';
import { BASE_URL } from '@/types/validationSchema';
import type { OrderDetailsType } from '@/types/data';
import { useAuthContext } from '@/context/useAuthContext';
interface ItemProps {
  show: boolean;
  onClose: () => void;
  setOrderDetail: React.Dispatch<React.SetStateAction<any[]>>;
  originalData: OrderDetailsType | null;
}

interface DeliveryBoy {
  id: number;
  name: string;
  mobile: string;
}

const DeliveryBoyModal: React.FC<ItemProps> = ({
  show,
  onClose,
  originalData,
  setOrderDetail
}) => {
  const [deliveryBoys, setDeliveryBoys] = useState<DeliveryBoy[]>([]);
  const [selectedDeliveryBoy, setSelectedDeliveryBoy] = useState<DeliveryBoy | null>(null);
  const [loading, setLoading] = useState(false);
  const [assigning, setAssigning] = useState(false);
  const { user } = useAuthContext()
  const Token = user?.token;
  
  useEffect(() => {
    if (show) fetchDeliveryBoys();
  }, [show]);

  const fetchDeliveryBoys = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}delivery-auth/list`);
      if (!response.ok) throw new Error('Failed to fetch delivery boys');

      const data = await response.json();
      setDeliveryBoys(data.result?.deliveryBoys || []);
    } catch (error: any) {
      errorToast(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle assigning delivery boy
  const handleAssign = async () => {
    if (!selectedDeliveryBoy) {
      return errorToast('Please select a delivery boy');
    }

    setAssigning(true);
    try {
      const payload = {
        orderId: originalData?.orderId,
        deliveryBoyId: selectedDeliveryBoy.id
      };

      const response = await fetch(`${BASE_URL}store/assign-delivery`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json',  Authorization: `Bearer ${Token}`},
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Failed to assign delivery boy');
      // const result = await response.json();

      successToast('Delivery boy assigned successfully');
      setOrderDetail((prev) =>
        prev.map((order) =>
          order.orderId === originalData?.orderId
            ? { ...order, deliveryPartner: selectedDeliveryBoy.name }
            : order
        )
      );
      onClose();
    } catch (error: any) {
      errorToast(error.message || 'Assignment failed');
    } finally {
      setAssigning(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Assign Delivery Boy</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row className="mb-3">
          <FormLabel className="col-sm-3 col-form-label">Delivery Boy</FormLabel>
          <Col sm={9}>
            {loading ? (
              <div className="d-flex align-items-center gap-2">
                <Spinner animation="border" size="sm" />
                <span>Loading delivery boys...</span>
              </div>
            ) : (
              <Select
                placeholder="Search or select delivery boy"
                options={deliveryBoys.map((boy) => ({
                  value: boy.id,
                  label: `${boy.name} (${boy.mobile})`
                }))}
                value={
                  selectedDeliveryBoy
                    ? {
                        value: selectedDeliveryBoy.id,
                        label: `${selectedDeliveryBoy.name} (${selectedDeliveryBoy.mobile})`
                      }
                    : null
                }
                onChange={(selectedOption) => {
                  const boy = deliveryBoys.find((b) => b.id === selectedOption?.value);
                  setSelectedDeliveryBoy(boy || null);
                }}
                isClearable
                isSearchable
                styles={{
                  control: (base) => ({
                    ...base,
                    minHeight: '36px',
                    fontSize: '14px'
                  }),
                  menu: (base) => ({
                    ...base,
                    zIndex: 9999
                  })
                }}
              />
            )}
          </Col>
        </Row>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={handleAssign} disabled={assigning}>
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

export default DeliveryBoyModal;
