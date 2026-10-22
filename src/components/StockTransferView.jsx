import React, { useState } from 'react';
import { ArrowLeftRight, Plus, CheckCircle, Clock, Truck, Package, X } from 'lucide-react';

export function StockTransferView({ products, branches }) {
  const [transfers, setTransfers] = useState([
    {
      id: 'TR-9042',
      fromBranch: 'AN2 - Andijon',
      toBranch: 'AN1 - Asaka ombori',
      productName: 'Didar TOURING 771 185/65/14',
      productCode: 'SHN0955',
      quantity: 12,
      driver: 'Qodirov Botir (Yuk mashinasi 60 414 AAA)',
      date: '21.10.2026 15:00',
      status: 'Yo\'lda'
    },
    {
      id: 'TR-9038',
      fromBranch: 'AN1 - Asaka ombori',
      toBranch: 'AN2 - Andijon',
      productName: 'Yallama 195/60/15',
      productCode: 'SHN0613',
      quantity: 24,
      driver: 'Mirzayev Said (Labo 60 782 BAA)',
      date: '20.10.2026 11:30',
      status: 'Yetkazildi'
    },
    {
      id: 'TR-9031',
      fromBranch: 'AN2 - Andijon',
      toBranch: 'TSH1 - Toshkent Sergeli',
      productName: 'CARASCO DIVORNIY SUV 20 KO\'K',
      productCode: 'AF0007',
      quantity: 10,
      driver: 'Iskandarov Otabek',
      date: '19.10.2026 09:20',
      status: 'Yetkazildi'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [fromBranch, setFromBranch] = useState('AN2');
  const [toBranch, setToBranch] = useState('AN1');
  const [selectedProd, setSelectedProd] = useState(products[0]?.code || 'SHN0613');
  const [quantity, setQuantity] = useState(10);
  const [driver, setDriver] = useState('');

  const handleCreateTransfer = (e) => {
    e.preventDefault();
    const prod = products.find(p => p.code === selectedProd);
    const newTr = {
      id: `TR-${Math.floor(9100 + Math.random() * 800)}`,
      fromBranch: fromBranch === 'AN2' ? 'AN2 - Andijon' : fromBranch === 'AN1' ? 'AN1 - Asaka' : 'TSH1 - Toshkent',
      toBranch: toBranch === 'AN1' ? 'AN1 - Asaka ombori' : toBranch === 'AN2' ? 'AN2 - Andijon' : 'TSH1 - Toshkent Sergeli',
      productName: prod ? prod.name : 'Shina',
      productCode: selectedProd,
      quantity: Number(quantity),
      driver: driver || 'Haydovchi tayinlandi',
      date: new Date().toLocaleDateString('uz-UZ') + ' ' + new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' }),
      status: 'Yo\'lda'
    };

    setTransfers([newTr, ...transfers]);
    setShowModal(false);
    setDriver('');
  };

  return (
    <div className="stock-transfer-view">
      <div className="page-top-bar">
        <div className="page-title-area">
          <h1 className="page-title">Zaxiralarni ko'chirish</h1>
          <span className="page-subtitle">(Filiallar va omborlar o'rtasida tovar harakati)</span>
        </div>

        <div className="page-controls">
          <button className="btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={16} />
            <span>Yangi ko'chirish</span>
          </button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-left">
            <span className="stat-title">Yo'ldagi Zaxiralar</span>
            <span className="stat-value" style={{ color: 'var(--info)' }}>
              {transfers.filter(t => t.status === 'Yo\'lda').length} ta jo'natma
            </span>
            <span className="stat-sub">Yetkazib berilishi kutilmoqda</span>
          </div>
          <div className="stat-icon-box blue">
            <Truck size={22} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-left">
            <span className="stat-title">Muvaffaqiyatli Yetkazildi</span>
            <span className="stat-value" style={{ color: 'var(--success)' }}>
              {transfers.filter(t => t.status === 'Yetkazildi').length} ta jo'natma
            </span>
            <span className="stat-sub">Qabul qilingan partiyalar</span>
          </div>
          <div className="stat-icon-box green">
            <CheckCircle size={22} />
          </div>
        </div>
      </div>

      <div className="table-card">
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>JO'NATMA №</th>
                <th>QAYERDAN</th>
                <th>QAYERGA</th>
                <th>MAHSULOT NOMI</th>
                <th>MIQDORI</th>
                <th>HAYDOVCHI / TRANSPORT</th>
                <th>SANA</th>
                <th>HOLAT</th>
                <th style={{ textAlign: 'center' }}>AMAL</th>
              </tr>
            </thead>
            <tbody>
              {transfers.map((t) => (
                <tr key={t.id}>
                  <td className="table-cell-id">{t.id}</td>
                  <td style={{ fontWeight: '600' }}>{t.fromBranch}</td>
                  <td style={{ fontWeight: '600', color: 'var(--info)' }}>{t.toBranch}</td>
                  <td>
                    <div style={{ fontWeight: '600' }}>{t.productName}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Kodi: {t.productCode}</div>
                  </td>
                  <td style={{ fontWeight: '700' }}>{t.quantity} dona</td>
                  <td>{t.driver}</td>
                  <td style={{ fontFamily: 'var(--font-mono)' }}>{t.date}</td>
                  <td>
                    <span className={`status-pill ${t.status === 'Yetkazildi' ? 'success' : 'warning'}`}>
                      {t.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {t.status === 'Yo\'lda' ? (
                      <button 
                        className="btn-secondary" 
                        style={{ height: '30px', padding: '0 8px', fontSize: '0.75rem' }}
                        onClick={() => {
                          setTransfers(transfers.map(tr => tr.id === t.id ? { ...tr, status: 'Yetkazildi' } : tr));
                        }}
                      >
                        Qabul qilish
                      </button>
                    ) : (
                      <span style={{ fontSize: '0.75rem', color: 'var(--success)' }}>✓ Qabul qilingan</span>
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
                <ArrowLeftRight size={18} color="var(--info)" />
                <span>Zaxirani Boshqa Filialga Ko'chirish</span>
              </div>
              <button type="button" className="btn-icon-ghost" onClick={() => setShowModal(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateTransfer}>
              <div className="modal-body">
                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label">Jo'natuvchi Ombor</label>
                    <select className="select-input" value={fromBranch} onChange={e => setFromBranch(e.target.value)}>
                      <option value="AN2">AN2 - Andijon</option>
                      <option value="AN1">AN1 - Asaka</option>
                      <option value="TSH1">TSH1 - Toshkent</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Qabul Qiluvchi Ombor</label>
                    <select className="select-input" value={toBranch} onChange={e => setToBranch(e.target.value)}>
                      <option value="AN1">AN1 - Asaka ombori</option>
                      <option value="AN2">AN2 - Andijon shahar</option>
                      <option value="TSH1">TSH1 - Toshkent Sergeli</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Ko'chiriladigan Mahsulot</label>
                  <select 
                    className="select-input" 
                    value={selectedProd} 
                    onChange={e => setSelectedProd(e.target.value)}
                    style={{ width: '100%' }}
                  >
                    {products.map(p => (
                      <option key={p.id} value={p.code}>
                        {p.name} ({p.code}) — Omborda: {p.quantity} {p.unit}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label">Miqdori (dona)</label>
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
                    <label className="form-label">Haydovchi / Mashina</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="Masalan: Botir (60 414 AAA)"
                      value={driver}
                      onChange={e => setDriver(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>
                  Bekor qilish
                </button>
                <button type="submit" className="btn-primary">
                  Ko'chirishni tasdiqlash
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
}
