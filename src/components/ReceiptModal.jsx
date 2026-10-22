import React, { useEffect, useRef } from 'react';
import { X, Printer, CheckCircle, Car, User, Clock, CreditCard } from 'lucide-react';

export function ReceiptModal({ sale, isOpen, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  // Handle click outside fallback for modern web guidance
  const handleDialogClick = (e) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  if (!sale) return null;

  const handlePrint = () => {
    window.print();
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case 'sotuvchi': return 'Sotuvchi (Konsultant)';
      case 'administrator': return 'Administrator';
      case 'vulkanizator': return 'Vulkanizator (Usta)';
      default: return role;
    }
  };

  return (
    <dialog 
      ref={dialogRef} 
      onClick={handleDialogClick} 
      closedby="any"
      aria-labelledby="receiptModalTitle"
    >
      <div className="modal-card" style={{ maxWidth: '440px', width: '92vw' }}>
        <div className="modal-header">
          <div className="modal-title" id="receiptModalTitle">
            <Printer size={18} color="var(--info)" />
            <span>Kassa Cheki ({sale.id})</span>
          </div>
          <button 
            className="btn-icon-ghost" 
            onClick={onClose}
            aria-label="Yopish"
          >
            <X size={18} />
          </button>
        </div>

        <div className="modal-body" style={{ backgroundColor: '#f1f5f9', padding: '1.25rem' }}>
          <div className="receipt-wrapper" id="printableReceipt">
            <div className="receipt-header">
              <div className="receipt-title">ASKO AVTO MARKET</div>
              <div className="receipt-branch">Andijon sh., Amir Temur shox ko'chasi 45</div>
              <div className="receipt-branch">Tel: +998 (74) 222-00-22</div>
            </div>

            <div className="receipt-divider" />

            <div className="receipt-row">
              <span>Chek №:</span>
              <span className="receipt-bold">{sale.id}</span>
            </div>
            <div className="receipt-row">
              <span>Sana / Vaqt:</span>
              <span>{sale.date} {sale.time || '12:00'}</span>
            </div>
            <div className="receipt-row">
              <span>Kassir:</span>
              <span>Andijon2 (Operator)</span>
            </div>

            {/* MAS'UL XODIM (Sotuvchi / Administrator / Vulkanizator) */}
            <div className="receipt-row" style={{ marginTop: '4px', backgroundColor: '#f8fafc', padding: '4px 6px', borderRadius: '4px', border: '1px solid #e2e8f0' }}>
              <span className="receipt-bold">Sotuvni amalga oshirdi:</span>
              <span className="receipt-role-tag">
                {sale.staffName || getRoleLabel(sale.role)}
              </span>
            </div>

            <div className="receipt-divider" />

            <div className="receipt-row">
              <span>Mijoz:</span>
              <span className="receipt-bold">{sale.client}</span>
            </div>
            <div className="receipt-row">
              <span>Telefon:</span>
              <span>+{sale.phone}</span>
            </div>
            {sale.carNumber && (
              <div className="receipt-row">
                <span>Avtomobil raqami:</span>
                <span className="plate-badge">{sale.carNumber}</span>
              </div>
            )}

            <div className="receipt-divider" />

            <div style={{ margin: '8px 0' }}>
              <div className="receipt-row receipt-bold" style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '3px', marginBottom: '6px' }}>
                <span style={{ width: '55%' }}>Tovar / Xizmat</span>
                <span style={{ width: '15%', textAlign: 'center' }}>Soni</span>
                <span style={{ width: '30%', textAlign: 'right' }}>Summa</span>
              </div>

              {sale.items && sale.items.map((item, idx) => (
                <div key={idx} className="receipt-row" style={{ fontSize: '11px', marginBottom: '4px' }}>
                  <div style={{ width: '55%' }}>
                    <div>{item.name}</div>
                    <div style={{ fontSize: '10px', color: '#6b7280' }}>{item.price.toLocaleString()} UZS/dona</div>
                  </div>
                  <div style={{ width: '15%', textAlign: 'center' }}>{item.quantity}</div>
                  <div style={{ width: '30%', textAlign: 'right', fontWeight: '600' }}>
                    {(item.total || item.quantity * item.price).toLocaleString()} UZS
                  </div>
                </div>
              ))}
            </div>

            <div className="receipt-divider" />

            <div className="receipt-row" style={{ fontSize: '14px', fontWeight: '800', margin: '8px 0' }}>
              <span>JAMI SUMMA:</span>
              <span>{sale.totalAmount.toLocaleString()} UZS</span>
            </div>

            <div className="receipt-row">
              <span>To'lov usuli:</span>
              <span>{sale.merchant}</span>
            </div>
            <div className="receipt-row">
              <span>To'landi:</span>
              <span style={{ color: '#16a34a', fontWeight: 'bold' }}>{sale.paidAmount.toLocaleString()} UZS</span>
            </div>
            {sale.remainingAmount > 0 ? (
              <div className="receipt-row">
                <span>Qarz (Nasiya):</span>
                <span style={{ color: '#dc2626', fontWeight: 'bold' }}>{sale.remainingAmount.toLocaleString()} UZS</span>
              </div>
            ) : (
              <div className="receipt-row">
                <span>Qarz qoldig'i:</span>
                <span>0 UZS (To'liq yopildi)</span>
              </div>
            )}

            <div className="receipt-divider" />

            <div style={{ textAlign: 'center', margin: '12px 0 6px 0', fontSize: '11px', color: '#4b5563' }}>
              <div>*** XARIDINGIZ UCHUN RAHMAT! ***</div>
              <div>Xizmat sifati bo'yicha: +998 74 222-00-22</div>
              <div style={{ marginTop: '8px', fontSize: '9px', color: '#9ca3af' }}>
                Fiskal belgi: ASKO-FD-8921498102
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button 
            type="button" 
            className="btn-secondary" 
            onClick={onClose}
          >
            Yopish
          </button>
          <button 
            type="button" 
            className="btn-primary" 
            onClick={handlePrint}
          >
            <Printer size={16} />
            <span>Chekni chop etish</span>
          </button>
        </div>
      </div>
    </dialog>
  );
}
