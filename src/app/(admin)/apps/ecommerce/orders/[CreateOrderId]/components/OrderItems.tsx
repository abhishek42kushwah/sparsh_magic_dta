import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { currency } from '@/context/constants';
import type { ItemListType } from '@/types/data';
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap';
import { useState } from 'react';
import { successToast } from '@/utils/toastMassage';
import Select from 'react-select';

const OrderItems = ({
  products,
  orderItems: initialItems,
  setNewItems,
  newItems
}: {
  newItems: ItemListType[];
  setNewItems: (items: ItemListType[]) => void;
  products: any[];
  orderItems: ItemListType[];
}) => {
  const [items, setItems] = useState(initialItems);

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

  const handleRemoveNewItem = (index: number) => {
    const updated = [...newItems];
    updated.splice(index, 1);
    setNewItems(updated);
  };

  type ItemField =
    | 'productId'
    | 'productName'
    | 'packingType'
    | 'itemSellPriceCopy'
    | 'itemBuyPrice'
    | 'quantity'
    | 'total';

  const handleInputChange = (index: number, field: ItemField, value: string) => {
    const updatedItems = [...newItems];
    const item = { ...updatedItems[index] };

    if (field === 'productName') {
      const selectedProduct = products.find((p) => p.name === value);
      item.productName = selectedProduct?.name || '';
      item.productId = selectedProduct?.sku || '';
      item.itemSellPriceCopy = selectedProduct?.sellPrice || '';
    } else {
      item[field] = value;
    }

    // Auto-calc total
    const price = parseFloat(item.itemSellPriceCopy) || 0;
    const qty = parseFloat(item.quantity) || 0;
    item.total = (price * qty).toFixed(2);

    updatedItems[index] = item;
    setNewItems(updatedItems);
  };

  const handleSaveAll = async () => {
    try {
      const res = await fetch('/api/add-multiple-order-items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItems)
      });

      if (!res.ok) throw new Error('Failed to save items');
      const savedItems = await res.json();
      successToast('Items saved successfully');
      setItems([...items, ...savedItems]);
      setNewItems([]);
    } catch (error) {
      console.error('Error saving items:', error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <Row className="align-items-center">
          <Col>
            <CardTitle as="h4">Orders</CardTitle>
            <p className="mb-0 text-muted mt-1">15 March 2024 at 09:45 am from draft orders</p>
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
              {/* Existing items */}
              {items.map((item: any, idx) => (
                <tr key={item._id || idx}>
                  <td>{item.productId}</td>
                  <td>{item.productName}</td>
                  <td>{item.packingType}</td>
                  <td className="text-end">
                    {currency}
                    {item.itemSellPriceCopy}
                  </td>
                  <td className="text-end">
                    {currency}
                    {item.itemBuyPrice}
                  </td>
                  <td className="text-end">{item.quantity}</td>
                  <td className="text-end">
                    {currency}
                    {item.total}
                  </td>
                  <td></td>
                </tr>
              ))}

              {/* New items */}
              {newItems.map((item: any, index: number) => {
                const productOptions = products.map((p) => ({
                  value: p.name,
                  label: p.name
                }));

                const selectedValue =
                  item.productName !== ''
                    ? { value: item.productName, label: item.productName }
                    : null;

                return (
                  <tr key={`new-${index}`}>
                    <td>{item.productId}</td>
                    <td style={{ minWidth: '250px' }}>
                      <Select
                        placeholder="Select Product"
                        value={selectedValue}
                        options={productOptions}
                        onChange={(selected) =>
                          handleInputChange(index, 'productName', selected?.value || '')
                        }
                        isClearable
                        isSearchable
                        styles={{
                          control: (base) => ({
                            ...base,
                            minHeight: '34px',
                            fontSize: '14px'
                          }),
                          menu: (base) => ({
                            ...base,
                            zIndex: 9999,
                            fontSize: '14px'
                          })
                        }}
                      />
                    </td>
                    <td>
                      <select
                        className="form-select"
                        value={item.packingType}
                        onChange={(e) => handleInputChange(index, 'packingType', e.target.value)}
                      >
                        <option value="">Select</option>
                        <option value="Bottle">Bottle</option>
                        <option value="Strip">Strip</option>
                        <option value="Sachet">Sachet</option>
                      </select>
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control text-end"
                        value={item.itemSellPriceCopy}
                        readOnly
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control text-end"
                        value={item.itemBuyPrice}
                        onChange={(e) => handleInputChange(index, 'itemBuyPrice', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control text-end"
                        value={item.quantity}
                        onChange={(e) => handleInputChange(index, 'quantity', e.target.value)}
                      />
                    </td>
                    <td className="text-end">
                      {currency}
                      {item.total}
                    </td>
                    <td className="text-end">
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleRemoveNewItem(index)}
                      >
                        <IconifyIcon icon="mdi:close" />
                      </button>
                    </td>
                  </tr>
                );
              })}

              {/* Save All */}
              {newItems.length > 0 && (
                <tr>
                  <td colSpan={8}>
                    <button className="btn btn-success" onClick={handleSaveAll}>
                      <IconifyIcon icon="fa6-solid:check" className="me-1" /> Save All Items
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
};

export default OrderItems;
