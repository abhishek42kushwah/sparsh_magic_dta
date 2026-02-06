import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { currency } from '@/context/constants';
import type { ItemListType } from '@/types/data';
import { BASE_URL } from '@/types/validationSchema';
import { errorToast, successToast } from '@/utils/toastMassage';
import { useState } from 'react';
import { Card, CardBody, CardHeader, CardTitle, Col, FormControl, Row } from 'react-bootstrap';
import UpdateItemModal from './UpdateItemModal';
import Select from 'react-select';
import { useLocation } from 'react-router-dom';
import { useAuthContext } from '@/context/useAuthContext';
const OrderItems = ({
  id,
  orderItems,
  setOrderItems,
  products,
  searchOrderItems,
  setSearchOrderItems,
  newItems,
  setNewItems
}: {
  id: number | string;
  orderItems: ItemListType[];
  setOrderItems: React.Dispatch<React.SetStateAction<ItemListType[]>>;
  products: any[];
  searchOrderItems: string;
  setSearchOrderItems: React.Dispatch<React.SetStateAction<string>>;
  newItems: ItemListType[];
  setNewItems: React.Dispatch<React.SetStateAction<ItemListType[]>>;
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState<ItemListType | null>(null);
  const location = useLocation();
  const { original } = location.state || {};

  const { user } = useAuthContext();
  const token = user?.token;
  const handleQuantityChange = (index: number, value: number) => {
    const updated = [...orderItems];
    updated[index].quantity = value;
    updated[index].total = value * (updated[index].itemSellPriceCopy || 0);
    setOrderItems(updated);
  };

  const handleUpdateQuantity = async (item: any) => {
    try {
      const response = await fetch(`${BASE_URL}order/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: item.quantity })
      });

      if (!response.ok) throw new Error('Failed to update quantity');
      successToast('Quantity updated successfully');
    } catch (error: any) {
      errorToast(error.message || 'Update failed');
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    try {
      const response = await fetch(`${BASE_URL}order/${itemId}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete item');
      setOrderItems((prev) => prev.filter((item) => item.id !== itemId));
      successToast('Item deleted successfully');
    } catch (error: any) {
      errorToast(error.message || 'Delete failed');
    }
  };

  const handleAddClick = () => {
    setNewItems([
      ...newItems,
      {
        productId: '',
        productName: '',
        packingType: '',
        itemSellPriceCopy: '',
        itemBuyPrice: '',
        quantity: '',
        total: ''
      }
    ]);
  };

  const handleSaveAll = async () => {
    try {
      if (!id) {
        errorToast('❌ Order ID is missing');
        return;
      }

      if (!token) {
        errorToast('⚠️ Authentication token missing. Please log in again.');
        return;
      }

      const payload = {
        addressId: original?.addressId || '',
        userId: original?.userId || '',
        shipMode: original?.shipMode || '',
        paymentMod: original?.paymentMod || '',
        couponCode: original?.couponCode || '',
        shippingCharge: original?.shippingCharge || 0,
        codCharge: original?.codCharge || 0,
        orderItems: newItems.map((item) => ({
          productId: item.productId,
          productName: item.productName,
          packingType: item.packingType,
          sellPrice: Number(item.itemSellPriceCopy) || 0,
          buyPrice: Number(item.itemBuyPrice) || 0,
          quantity: Number(item.quantity) || 0,
          total: Number(item.total) || 0
        }))
      };

      const response = await fetch(`${BASE_URL}orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok && data.success) {
        const errorMsg = data?.message || data?.error || `❌ Server Error (${response.status}): ${response.statusText}`;
        throw new Error(errorMsg);
      }

      successToast(data?.message || '✅ Order saved successfully');

    
      setNewItems([]);
      setOrderItems([...orderItems, ...(data.result?.orderData?.orderItems|| [])]);
    } catch (error: any) {
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        errorToast('🌐 Network error: Please check your connection.');
      } else {
        errorToast(error.message || '❌ Something went wrong while saving items.');
      }
      console.error('handleSaveAll error:', error);
    }
  };   

  return (
    <Card>
      <CardHeader>
        <Row className="align-items-center">
          <Col>
            <CardTitle as="h4">Order #{id}</CardTitle>
          </Col>

          <Col xs="auto">
            <FormControl
              type="text"
              placeholder="Search product..."
              value={searchOrderItems}
              onChange={(e) => setSearchOrderItems(e.target.value)}
            />
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
                <th>Quantity</th>
                <th className="text-end">Total</th>
                <th className="text-end">Action</th>
              </tr>
            </thead>
            <tbody>
              {orderItems.map((item, index) => (
                <tr key={item.id}>
                  <td>{id}</td>
                  <td>{item.productId}</td>
                  <td>{item.productName}</td>
                  <td>
                    <input
                      type="number"
                      value={item.quantity}
                      className="form-control form-control-sm"
                      style={{ width: 80 }}
                      min={1}
                      onChange={(e) => handleQuantityChange(index, Number(e.target.value))}
                      onBlur={() => handleUpdateQuantity(item)}
                    />
                  </td>
                  <td className="text-end">
                    {currency}
                    {item.total}
                  </td>
                  <td className="text-end">
                    <button
                      className="btn  text-secondary"
                      onClick={() => {
                        setModalData(item);
                        setOpenModal(true);
                      }}
                    >
                      <IconifyIcon icon="mdi:pen" className="fs-18" />
                    </button>
                    <button className="btn  text-danger" onClick={() => handleDeleteItem(item.id)}>
                      <IconifyIcon className="fs-18" icon="mdi:trash-can" />
                    </button>
                  </td>
                </tr>
              ))}

              {newItems.map((item, index) => (
                <tr key={`new-${index}`}>
                  <td>{id}</td>
                  <td>
                    <FormControl value={item.productId} readOnly />
                  </td>
                  <td>
                    <Select
                      value={item.productName ? { label: item.productName, value: item.productName } : null}
                      onChange={(option) => {
                        const selectedName = option?.value || '';
                        const selectedProduct = products.find((p) => p.name === selectedName);

                        if (!selectedProduct) return; // safety check

                        const updated = [...newItems];
                        updated[index] = {
                          ...updated[index],
                          productName: selectedName,
                          productId: selectedProduct.sku || '',
                          itemSellPriceCopy: selectedProduct.sellPrice || 0,
                          total: (Number(updated[index].quantity || 0) * Number(selectedProduct.sellPrice || 0)).toFixed(2)
                        };

                        setNewItems(updated);
                      }}
                      options={products.map((p) => ({
                        label: p.name,
                        value: p.name
                      }))}
                      menuPortalTarget={document.body}
                      styles={{
                        control: (base) => ({
                          ...base,
                          minHeight: '35px',
                          fontSize: '14px',
                          cursor: 'pointer'
                        }),
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                        menu: (base) => ({ ...base, zIndex: 9999 })
                      }}
                      placeholder="Select Product"
                      isSearchable
                    />
                  </td>

                  <td>
                    <input
                      type="number"
                      className="form-control form-control-sm text-end"
                      value={item.quantity}
                      onChange={(e) => {
                        const updated = [...newItems];
                        updated[index].quantity = e.target.value;
                        updated[index].total = (Number(e.target.value) * Number(updated[index].itemSellPriceCopy || 0)).toFixed(2);
                        setNewItems(updated);
                      }}
                    />
                  </td>
                  <td className="text-end">
                    {currency}
                    {item.total}
                  </td>
                  <td className="text-end">
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => {
                        const updated = [...newItems];
                        updated.splice(index, 1);
                        setNewItems(updated);
                      }}
                    >
                      <IconifyIcon icon="mdi:close" />
                    </button>
                  </td>
                </tr>
              ))}

              {newItems.length > 0 && (
                <tr>
                  <td colSpan={6} className="text-end">
                    <button className="btn btn-success btn-sm" onClick={handleSaveAll}>
                      <IconifyIcon icon="fa6-solid:check" className="me-1" /> Save All Items
                    </button>
                  </td>
                </tr>
              )}

              {orderItems.length === 0 && newItems.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center text-muted">
                    No order items found
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
