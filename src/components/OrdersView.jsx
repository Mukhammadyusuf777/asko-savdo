import React, { useState } from 'react';
import { ShoppingBag, Plus, Clock, CheckCircle2, AlertCircle, X } from 'lucide-react';

export function OrdersView({ products }) {
  const [orders, setOrders] = useState([
    {
      id: 'BUY-401',
      productName: 'Didar TOURING 771 195/65/15',
      code: 'SHN0949',
      quantity: 50,
      supplier: 'DIDAR Shina Zavodi (Qozog\'iston)',
      expectedDate: '26.10.2026',
      totalCost: 20000000,
      status: 'Kutilmoqda'
    },
    {
      id: 'BUY-398',
      productName: 'ANTIFRIZ 1KG ko\'k -40',
      code: 'AF0003',
      quantity: 100,
      supplier: 'CAR ASKO Kimyo MCHJ',
      expectedDate: '24.10.2026',
      totalCost: 1900000,
      status: 'Kutilmoqda'
    },
    {
      id: 'BUY-389',
      productName: 'Fortuna ECOPLUS2 4S 205/70/14',
      code: 'SHN0206',
      quantity: 40,
      supplier: 'Fortuna Tires Distribyutor',
      expectedDate: '18.10.2026',
      totalCost: 17200000,
      status: 'Qabul qilindi'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedProd, setSelectedProd] = useState(products[0]?.code || 'SHN0613');
  const [quantity, setQuantity] = useState(40);
  const [supplier, setSupplier] = useState('');
  const [expectedDate, setExpectedDate] = useState('28.10.2026');

  const handleCreateOrder = (e) => {
    e.preventDefault();
    const prod = products.find(p => p.code === selectedProd);
    const newOrder = {
      id: `BUY-${Math.floor(410 + Math.random() * 90)}`,
      productName: prod ? prod.name : 'Shina',
      code: selectedProd,
      quantity: Number(quantity),
      supplier: supplier || 'Rasmiy ta\'minotchi',
      expectedDate,
      totalCost: (prod?.costPrice || 350000) * Number(quantity),
      status: 'Kutilmoqda'
    };

    setOrders([newOrder, ...orders]);
    setShowModal(false);
    setSupplier('');
  };

  return (
    <div className="orders-view">
      <div className="page-top-bar">
        <div className="page-title-area">
          <h1 className="page-title">Tovarga buyurtma</h1>
          <span className="page-subtitle">(Zavodlar va distribyutorlarga berilgan shina va ehtiyot qismlar buyurtmalari)</span>
        </div>

        <div className="page-controls">
          <button className="btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={16} />
            <span>Yangi buyurtma</span>
          </button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-left">
            <span className="stat-title">Kutilayotgan Buyurtmalar</span>
            <span className="stat-value" style={{ color: 'var(--info)' }}>
              {orders.filter(o => o.status === 'Kutilmoqda').length} ta partiya
            </span>
            <span className="stat-sub">Yetkazib berish jarayonida</span>
          </div>
          <div className="stat-icon-box blue">
            <Clock size={22} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-left">
            <span className="stat-title">Qabul Qilingan Mahsulotlar</span>
            <span className="stat-value" style={{ color: 'var(--success)' }}>
              {orders.filter(o => o.status === 'Qabul qilindi').length} ta partiya
            </span>
            <span className="stat-sub">Omborga kirim qilingan</span>
          </div>
          <div className="stat-icon-box green">
            <CheckCircle2 size={22} />
          </div>
        </div>
      </div>

      <div className="table-card">
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>BUYURTMA №</th>
                <th>MAHSULOT NOMI</th>
                <th>KODI</th>
                <th>BUYURTMA SONI</th>
                <th>TA'MINOTCHI KORXONA</th>
                <th>SUMMA</th>
                <th>KUTILAYOTGAN SANA</th>
                <th>HOLAT</th>
                <th style={{ textAlign: 'center' }}>AMALLAR</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id}>
                  <td className="table-cell-id">{o.id}</td>
                  <td style={{ fontWeight: '600' }}>{o.productName}</td>
                  <td>{o.code}</td>
                  <td style={{ fontWeight: '700' }}>{o.quantity} dona</td>
                  <td>{o.supplier}</td>
                  <td style={{ fontWeight: '700' }}>{o.totalCost.toLocaleString()} UZS</td>
                  <td style={{ fontFamily: 'var(--font-mono)' }}>{o.expectedDate}</td>
                  <td>
                    <span className={`status-pill ${o.status === 'Qabul qilindi' ? 'success' : 'warning'}`}>
                      {o.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {o.status === 'Kutilmoqda' ? (
                      <button 
                        className="btn-secondary" 
                        style={{ height: '30px', padding: '0 8px', fontSize: '0.75rem' }}
                        onClick={() => {
                          setOrders(orders.map(item => item.id === o.id ? { ...item, status: 'Qabul qilindi' } : item));
                        }}
                      >
                        Qabul qildim
                      </button>
                    ) : (
                      <span style={{ fontSize: '0.75rem', color: 'var(--success)' }}>✓ Omborga kirdi</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <dialog open closedby="any" style={{ display: 'block' }}>
          <div className="modal-card" style={{ maxWidth: '500px', width: '92vw' }}>
            <div className="modal-header">
              <div className="modal-title">
                <ShoppingBag size={18} color="var(--info)" />
                <span>Zavodga Tovarga Buyurtma Berish</span>
              </div>
              <button type="button" className="btn-icon-ghost" onClick={() => setShowModal(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateOrder}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Mahsulotni tanlang</label>
                  <select 
                    className="select-input" 
                    value={selectedProd} 
                    onChange={e => setSelectedProd(e.target.value)}
                    style={{ width: '100%' }}
                  >
                    {products.map(p => (
                      <option key={p.id} value={p.code}>
                        {p.name} ({p.code}) — Hozirgi qoldiq: {p.quantity} {p.unit}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label">Buyurtma miqdori (dona)</label>
                    <input 
                      type="number" 
                      className="form-input" 
                      value={quantity} 
                      onChange={e => setQuantity(e.target.value)}
                      min="1"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Kutilayotgan sana</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={expectedDate} 
                      onChange={e => setExpectedDate(e.target.value)}
                      placeholder="28.10.2026"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Ta'minotchi / Zavod nomi</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Masalan: Yallama Shina Zavodi"
                    value={supplier}
                    onChange={e => setSupplier(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>
                  Bekor qilish
                </button>
                <button type="submit" className="btn-primary">
                  Buyurtmani yuborish
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
}
