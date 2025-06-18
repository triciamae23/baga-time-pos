import React, { useEffect, useState } from 'react';
import API from '../api';
import Inventory from './inventory';
import Orders from './orders';

export default function Dashboard() {
  const [menu, setMenu] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const [menuRes, invRes, orderRes] = await Promise.all([
        API.get('/menu'),
        API.get('/inventory'),
        API.get('/orders'),
      ]);
      setMenu(menuRes.data);
      setInventory(invRes.data);
      setOrders(orderRes.data);
    }
    fetchData();
  }, []);

  const addItem = (menuId) => {
    const existing = selectedItems.find(i => i.menuId === menuId);
    if (existing) {
      setSelectedItems(selectedItems.map(i => i.menuId === menuId ? { ...i, quantity: i.quantity + 1 } : i));
    } else {
      setSelectedItems([...selectedItems, { menuId, quantity: 1 }]);
    }
  };

  const placeOrder = async () => {
    const total = selectedItems.reduce((sum, item) => {
      const price = menu.find(m => m.id === item.menuId)?.price || 0;
      return sum + price * item.quantity;
    }, 0);

    await API.post('/orders', { items: selectedItems, total });
    alert("Order placed!");
    window.location.reload();
  };

  return (
    <div>
      <h2>📋 BAGA TIME Dashboard</h2>

      <h3>Menu</h3>
      {menu.map(item => (
        <div key={item.id}>
          {item.name} - ₱{item.price}
          <button onClick={() => addItem(item.id)}>Add</button>
        </div>
      ))}

      <h3>Selected Items</h3>
      {selectedItems.map(item => {
        const menuItem = menu.find(m => m.id === item.menuId);
        return (
          <div key={item.menuId}>{menuItem?.name} x {item.quantity}</div>
        );
      })}
      <button onClick={placeOrder}>🛒 Place Order</button>

      <Inventory inventory={inventory} menu={menu} />
      <Orders orders={orders} />
    </div>
  );
}