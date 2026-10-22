import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ShoppingCart, Archive, User, ArrowRight } from 'lucide-react';

export function GlobalSearchModal({ isOpen, onClose, sales, products, onSelectSale, onSelectProduct }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) dialog.showModal();
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      if (dialog.open) dialog.close();
      setQuery('');
    }
  }, [isOpen]);

  const filteredSales = query.trim() ? sales.filter(s => 
    s.id.toLowerCase().includes(query.toLowerCase()) ||
    s.client.toLowerCase().includes(query.toLowerCase()) ||
    s.phone.includes(query) ||
    (s.carNumber || '').toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5) : [];

  const filteredProducts = query.trim() ? products.filter(p =>
    p.code.toLowerCase().includes(query.toLowerCase()) ||
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    (p.mera || '').toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5) : [];

  return (
    <dialog 
      ref={dialogRef} 
      onClick={(e) => { if (e.target === dialogRef.current) onClose(); }}
      closedby="any"
      aria-labelledby="globalSearchTitle"
    >
      <div className="modal-card" style={{ maxWidth: '600px', width: '92vw' }}>
        <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Search size={20} color="var(--text-light)" />
          <input 
            ref={inputRef}
            type="text" 
            placeholder="Mijoz, shina o'lchami (195/60/15), avto raqami yoki chek ID..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ 
              border: 'none', 
              outline: 'none', 
              fontSize: '1rem', 
              width: '100%', 
              backgroundColor: 'transparent',
              color: 'var(--text-main)'
            }}
          />
          <button type="button" className="btn-icon-ghost" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body" style={{ maxHeight: '420px', padding: '1rem' }}>
          {!query.trim() ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Qidirish uchun matn kiriting (masalan: <b>60L387HB</b>, <b>Yallama</b>, <b>Shokirov</b>, <b>SHN0613</b>)
            </div>
          ) : (
            <div>
              {/* Sotuvlar natijalari */}
              {filteredSales.length > 0 && (
                <div style={{ marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    Sotuvlar ({filteredSales.length})
                  </div>
                  {filteredSales.map(s => (
                    <div 
                      key={s.id} 
                      onClick={() => { onSelectSale(s); onClose(); }}
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        padding: '8px 12px', 
                        borderRadius: '6px', 
                        cursor: 'pointer',
                        transition: 'background-color 0.1s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-hover)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <div>
                        <div style={{ fontWeight: '600', fontSize: '0.875rem' }}>{s.client} ({s.id})</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {s.carNumber} • {s.merchant} • {s.totalAmount.toLocaleString()} UZS
                        </div>
                      </div>
                      <ArrowRight size={14} color="var(--text-light)" />
                    </div>
                  ))}
                </div>
              )}

              {/* Tovar natijalari */}
              {filteredProducts.length > 0 && (
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    Ombordagi Mahsulotlar ({filteredProducts.length})
                  </div>
                  {filteredProducts.map(p => (
                    <div 
                      key={p.id} 
                      onClick={() => { onSelectProduct(p); onClose(); }}
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        padding: '8px 12px', 
                        borderRadius: '6px', 
                        cursor: 'pointer',
                        transition: 'background-color 0.1s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-hover)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <div>
                        <div style={{ fontWeight: '600', fontSize: '0.875rem' }}>{p.name} ({p.code})</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          O'lcham: {p.mera} • Qoldiq: {p.quantity} {p.unit} • {p.price.toLocaleString()} UZS
                        </div>
                      </div>
                      <ArrowRight size={14} color="var(--text-light)" />
                    </div>
                  ))}
                </div>
              )}

              {filteredSales.length === 0 && filteredProducts.length === 0 && (
                <div style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--text-muted)' }}>
                  "{query}" bo'yicha hech narsa topilmadi
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </dialog>
  );
}
