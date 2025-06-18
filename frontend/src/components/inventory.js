import React from 'react';

export default function Inventory({ inventory, menu }) {
  return (
    <div>
      <h3>📦 Inventory</h3>
      {inventory.map(i => {
        const menuItem = menu.find(m => m.id === i.menu_id);
        return (
          <div key={i.menu_id}>
            {menuItem?.name}: {i.stock} {i.stock < 5 && <span style={{color: 'red'}}> (Low Stock!)</span>}
          </div>
        );
      })}
    </div>
  );
}