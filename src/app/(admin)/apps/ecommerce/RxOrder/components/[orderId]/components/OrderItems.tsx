import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { currency } from '@/context/constants';
import type { ItemListType } from '@/types/data';
import { BASE_URL } from '@/types/validationSchema';
import { errorToast, successToast } from '@/utils/toastMassage';
import { useState } from 'react';
import { Card, CardBody, CardHeader, CardTitle, Col, FormControl, Row } from 'react-bootstrap';
import UpdateItemModal from './UpdateItemModal';
import Select from 'react-select';

const OrderItems = ({
  orderItems,
  setOrderItems,
  id,
  products,
  searchOrderItems,
  setSearchOrderItems,
  newItems,
  setNewItems
}: {
  id: any;
  newItems: ItemListType[];
  setNewItems: React.Dispatch<React.SetStateAction<ItemListType[]>>;
  products: any[];
  searchOrderItems: string;
  setSearchOrderItems: React.Dispatch<React.SetStateAction<string>>;
  orderItems: ItemListType[];
  setOrderItems: React.Dispatch<React.SetStateAction<ItemListType[]>>;
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState<ItemListType | null>(null);

  
  const handleQuantityChange = (index: number, value: number) => {
    const updatedItems = [...orderItems];
    const item = updatedItems[index];
    updatedItems[index] = {
      ...item,
      quantity: value,
      total: Number(value) * Number(item.itemSellPriceCopy || 0),
    };
    setOrderItems(updatedItems);
  };

  
  const handleAddClick = () => {
    setNewItems((prev) => [
      ...prev,
      {
        productId: '',
        productName: '',
        packingType: '',
        itemSellPriceCopy: '',
        itemBuyPrice: '',
        quantity: '',
        total: '',
      },
    ]);
  };

  
  const handleRemoveNewItem = (index: number) => {
    const updated = [...newItems];
    updated.splice(index, 1);
    setNewItems(updated);
  };


  const handleNewInputChange = (index: number, field: string, value: string) => {
    const updated = [...newItems];
    const item = { ...updated[index], [field]: value };

    if (field === 'itemSellPriceCopy' || field === 'quantity') {
      const price = parseFloat(field === 'itemSellPriceCopy' ? value : item.itemSellPriceCopy) || 0;
      const qty = parseFloat(field === 'quantity' ? value : item.quantity) || 0;
      item.total = (price * qty).toFixed(2);
    }

    updated[index] = item;
    setNewItems(updated);
  };

 
  const handleSaveAll = async () => {
    if (newItems.length === 0) return;
    try {
      const response = await fetch(`${BASE_URL}order-items/bulk-create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItems),
      });

      if (!response.ok) throw new Error('Failed to save items');
      const saved = await response.json();

     
      setOrderItems([...orderItems, ...(saved.result || saved)]);
      setNewItems([]);
      successToast('Items added successfully');
    } catch (error: any) {
      errorToast(error.message || 'Failed to save items');
    }
  };

  
  const handleUpdateQuantity = async (item: any) => {
    try {
      const response = await fetch(`${BASE_URL}order-items/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: item.quantity }),
      });

      if (!response.ok) throw new Error('Failed to update quantity');
      successToast('Quantity updated successfully');
    } catch (error: any) {
      errorToast(error.message || 'Update failed');
    }
  };


  const handleDeleteItem = async (itemId: number | string) => {
    try {
      const response = await fetch(`${BASE_URL}order-items/${itemId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) throw new Error('Failed to delete item');
      setOrderItems((prev) => prev.filter((item) => item.id !== itemId));
      successToast('Item deleted successfully');
    } catch (error: any) {
      errorToast(error.message || 'Delete failed');
    }
  };

  return (
    <Card>
      <CardHeader>
        <Row className="align-items-center">
          <Col>
            <CardTitle as="h4">Order #{id}</CardTitle>
            <p className="mb-0 text-muted mt-1">Order details and items</p>
          </Col>
          <Col xs="auto" className="position-relative">
            <FormControl
              type="text"
              placeholder="Search product..."
              value={searchOrderItems}
              onChange={(e) => setSearchOrderItems(e.target.value)}
            />
            {searchOrderItems && (
              <IconifyIcon
                icon="mdi:close-circle"
                className="position-absolute end-0 top-50 translate-middle-y me-3 text-muted"
                role="button"
                onClick={() => setSearchOrderItems('')}
              />
            )}
          </Col>
          <Col xs="auto">
            <button className="btn btn-primary" onClick={handleAddClick}>
              <IconifyIcon icon="fa6-solid:plus" className="me-1" /> Add Item
            </button>
          </Col>
        </Row>
      </CardHeader>

      <CardBody className="pt-0">
        <div className="table-responsive">
          <table className="table mb-0">
            <thead className="table-light">
              <tr>
                <th>Order ID</th>
                <th>Product ID</th>
                <th>Item Name</th>
                <th>Packing Type</th>
                <th className="text-end">Sell Price</th>
                <th className="text-end">Buy Price</th>
                <th className="text-end">Quantity</th>
                <th className="text-end">Total</th>
                <th className="text-end">Action</th>
              </tr>
            </thead>
            <tbody>
           
              {orderItems.map((item: any, index) => (
                <tr key={item.id || index}>
                  <td>{item.orderId}</td>
                  <td>{item.productId}</td>
                  <td>{item.productName}</td>
                  <td>{item.packingType || '-'}</td>
                  <td className="text-end">
                    {currency}
                    {item.itemSellPriceCopy || item.itemBuyPrice || 0}
                  </td>
                  <td className="text-end">
                    {currency}
                    {item.itemBuyPrice || 0}
                  </td>
                  <td className="text-center">
                    <input
                      type="number"
                      className="form-control form-control-sm text-center"
                      value={item.quantity || 1}
                      min={1}
                      onChange={(e) => handleQuantityChange(index, Number(e.target.value))}
                      onBlur={() => handleUpdateQuantity(item)}
                      style={{ width: 90 }}
                    />
                  </td>
                  <td className="text-end">
                    {currency}
                    {item.total || item.quantity * (item.itemSellPriceCopy || 0)}
                  </td>
                  <td className="text-end">
                    <button
                      className="text-danger fs-18 btn btn-sm"
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      <IconifyIcon icon="mdi:trash-can" />
                    </button>
                    <button
                      className="btn btn-sm fs-18 text-secondary"
                      onClick={() => {
                        setModalData(item);
                        setOpenModal(true);
                      }}
                    >
                      <IconifyIcon icon="mdi:pen" />
                    </button>
                  </td>
                </tr>
              ))}

              
              {newItems.map((item, index) => (
                <tr key={`new-${index}`}>
                  <td>-</td>
                  <td>
                    <FormControl value={item.productId} readOnly />
                  </td>
                  <td>
                    <Select
                      value={item.productName ? { label: item.productName, value: item.productName } : null}
                      onChange={(selected) => {
                        const selectedName = selected?.value || '';
                        const selectedProduct = products.find((p) => p.name === selectedName);
                        handleNewInputChange(index, 'productName', selectedName);
                        handleNewInputChange(index, 'productId', selectedProduct?.sku || '');
                        handleNewInputChange(index, 'itemSellPriceCopy', selectedProduct?.sellPrice?.toString() || '');
                      }}
                      options={products.map((p) => ({
                        label: p.name,
                        value: p.name,
                      }))}
                      placeholder="Select Product"
                      isClearable
                      isSearchable
                    />
                  </td>
                  <td>
                    <select
                      className="form-select form-select-sm"
                      value={item.packingType}
                      onChange={(e) => handleNewInputChange(index, 'packingType', e.target.value)}
                    >
                      <option value="">Select</option>
                      <option value="Bottle">Bottle</option>
                      <option value="Strip">Strip</option>
                      <option value="Sachet">Sachet</option>
                    </select>
                  </td>
                  <td>
                    <input
                      className="form-control form-control-sm text-end"
                      type="number"
                      value={item.itemSellPriceCopy}
                      readOnly
                    />
                  </td>
                  <td>
                    <input
                      className="form-control form-control-sm text-end"
                      type="number"
                      value={item.itemBuyPrice}
                      onChange={(e) => handleNewInputChange(index, 'itemBuyPrice', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      className="form-control form-control-sm text-end"
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleNewInputChange(index, 'quantity', e.target.value)}
                    />
                  </td>
                  <td className="text-end">
                    {currency}
                    {item.total}
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleRemoveNewItem(index)}
                    >
                      <IconifyIcon icon="mdi:close" />
                    </button>
                  </td>
                </tr>
              ))}

              {/* ✅ Save All button row */}
              {newItems.length > 0 && (
                <tr>
                  <td colSpan={9} className="text-center">
                    <button className="btn btn-success btn-sm" onClick={handleSaveAll}>
                      <IconifyIcon icon="fa6-solid:check" className="me-1" /> Save All Items
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardBody>

      <UpdateItemModal
        show={openModal}
        products={products}
        setOrderItems={setOrderItems}
        onClose={() => {
          setModalData(null);
          setOpenModal(false);
        }}
        data={modalData}
      />
    </Card>
  );
};

export default OrderItems;
