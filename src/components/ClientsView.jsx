import React from 'react';
import { Users, Phone, Car, ShoppingCart, Calendar } from 'lucide-react';

export function ClientsView({ sales }) {
  // Extract unique clients
  const clientsMap = {};
  sales.forEach(s => {
    if (!clientsMap[s.phone]) {
      clientsMap[s.phone] = {
        name: s.client,
        phone: s.phone,
        carNumber: s.carNumber,
        carModel: s.carModel,
        ordersCount: 0,
        totalSpent: 0,
        lastOrderDate: s.date
      };
    }
    clientsMap[s.phone].ordersCount += 1;
    if (s.status !== 'Bekor qilindi') {
      clientsMap[s.phone].totalSpent += s.totalAmount;
    }
  });

  const clientsList = Object.values(clientsMap);

  return (
    <div className="clients-view">
      <div className="page-top-bar">
        <div className="page-title-area">
          <h1 className="page-title">Mijozlar bazasi</h1>
          <span className="page-subtitle">(Jami {clientsList.length} ta doimiy mijoz)</span>
        </div>
      </div>

      <div className="table-card">
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>MIJOZ F.I.SH</th>
                <th>TELEFON</th>
                <th>AVTOMOBIL</th>
                <th>XARIDLAR SONI</th>
                <th>JAMI XARID SUMMASI</th>
                <th>SO'NGGI TASHRIF</th>
              </tr>
            </thead>
            <tbody>
              {clientsList.map((client, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: '700' }}>{client.name}</td>
                  <td style={{ fontFamily: 'var(--font-mono)' }}>+{client.phone}</td>
                  <td>
                    {client.carNumber ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span className="plate-badge">{client.carNumber}</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{client.carModel}</span>
                      </div>
                    ) : '-'}
                  </td>
                  <td>
                    <span style={{ fontWeight: '600' }}>{client.ordersCount} ta chek</span>
                  </td>
                  <td style={{ fontWeight: '700', color: 'var(--info)' }}>
                    {client.totalSpent.toLocaleString()} UZS
                  </td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                    {client.lastOrderDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
