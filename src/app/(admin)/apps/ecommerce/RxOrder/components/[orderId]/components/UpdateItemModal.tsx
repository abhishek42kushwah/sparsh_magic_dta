import React, { useEffect, useState } from 'react';
import { Modal, Button, FormSelect, FormLabel, Row, Col, FormControl, Image } from 'react-bootstrap';
import { errorToast, successToast } from '@/utils/toastMassage';
import type { ItemListType } from '@/types/data';
import { BASE_URL } from '@/types/validationSchema';
import Select from 'react-select';
interface ItemProps {
  show: boolean;
  onClose: () => void;
  setOrderItems: React.Dispatch<React.SetStateAction<ItemListType[]>>;
  data: ItemListType | null;
  products?: any[];
}

const ItemUpdateModal: React.FC<ItemProps> = ({ show, products, onClose, setOrderItems, data }) => {
  const [selectedItemValue, setSelectedItemValue] = useState<string>('');
  const [sellPrice, setSellPrice] = useState<number>(0);
  const [buyPrice, setBuyPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [packingType, setPackingType] = useState<string>('Bottle');
  const [thumbnail, setThumbnail] = useState<string>('');

  useEffect(() => {
    if (data) {
      setSelectedItemValue(data.productName || '');
      setSellPrice(Number(data?.itemSellPriceCopy) || 0);
      setBuyPrice(Number(data?.itemBuyPrice) || 0);
      setQuantity(Number(data?.quantity) || 1);
      setPackingType(data?.packingType || 'Bottle');
      const selectedProduct = products?.find((item) => item.name === data.productName);
      if (selectedProduct?.thumbnail) setThumbnail(selectedProduct.thumbnail);
    }
  }, [data]);

  const handleItemChange = (value: string) => {
    setSelectedItemValue(value);

    const selectedProduct = products?.find((item) => item.name === value);
    if (selectedProduct) {
      setSellPrice(selectedProduct.sellPrice || 0);
      setThumbnail(selectedProduct.thumbnail || '');
    }
  };

  const handleUpdateItem = async () => {
    if (!data || !selectedItemValue) return;

    const updatedData = {
      name: selectedItemValue,
      sellPrice,
      buyPrice,
      quantity,
      packingType
    };

    try {
      const response = await fetch(`${BASE_URL}order/${data.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });

      const resData = await response.json();
      if (response.ok && resData.success) {
        successToast('Item updated successfully');
        setOrderItems((prev) =>
          prev.map((item) =>
            item.id === data.id
              ? {
                  ...item,
                  productName: selectedItemValue,
                  itemSellPriceCopy: String(sellPrice),
                  itemBuyPrice: String(buyPrice),
                  quantity: String(quantity),
                  packingType
                }
              : item
          )
        );
        onClose();
      } else {
        errorToast(resData.message || 'Something went wrong');
      }
    } catch (error: any) {
      errorToast(error.message || 'Something went wrong, please try again later');
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="mb-3">
          <FormLabel className="col-sm-3 col-form-label">Item Name</FormLabel>
          <Col sm={9}>
            <Select
              placeholder="Select an Item"
              value={(products ?? []).find((p) => p.name === selectedItemValue) || null}
              options={(products ?? []).map((p) => ({
                value: p.name,
                label: p.name
              }))}
              onChange={(selected) => handleItemChange(selected?.value || '')}
              isClearable
              isSearchable
            />
          </Col>
        </Row>

        {thumbnail && (
          <Row className="mb-3">
            <FormLabel className="col-sm-3 col-form-label">Thumbnail</FormLabel>
            <Col sm={9}>
              <Image src={thumbnail} alt="Product Thumbnail" fluid rounded style={{ maxHeight: '100px' }} />
            </Col>
          </Row>
        )}

        <Row className="mb-3">
          <FormLabel className="col-sm-3 col-form-label">Packing Type</FormLabel>
          <Col sm={9}>
            <FormSelect value={packingType} onChange={(e) => setPackingType(e.target.value)}>
              <option value="Bottle">Bottle</option>
              <option value="Strip">Strip</option>
              <option value="Sachet">Sachet</option>
            </FormSelect>
          </Col>
        </Row>

        <Row className="mb-3">
          <FormLabel className="col-sm-3 col-form-label">Sell Price</FormLabel>
          <Col sm={9}>
            <FormControl value={sellPrice} readOnly />
          </Col>
        </Row>

        <Row className="mb-3">
          <FormLabel className="col-sm-3 col-form-label">Buy Price</FormLabel>
          <Col sm={9}>
            <FormControl type="number" value={buyPrice} onChange={(e) => setBuyPrice(Number(e.target.value))} />
          </Col>
        </Row>

        <Row className="mb-3">
          <FormLabel className="col-sm-3 col-form-label">Quantity</FormLabel>
          <Col sm={9}>
            <FormControl type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleUpdateItem}>
          Update Item
        </Button>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ItemUpdateModal;
