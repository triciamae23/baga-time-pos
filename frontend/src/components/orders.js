import React from 'react';

export default function Orders({ orders }) {
  return (
    <div>
      <h3>🧾 Order History</h3>
      {orders.map(o => (
        <div key={o.id}>
          Order #{o.id} - ₱{o.total} - {new Date(o.created_at).toLocaleString()}
        </div>
      ))}
    </div>
  );
}