import React, { useState, useEffect, useRef } from 'react';
import { 
  X, UserCheck, ShieldCheck, Wrench, Plus, Trash2, 
  ShoppingCart, Car, Phone, User, CreditCard, Check, 
  AlertCircle, Sparkles, Printer
} from 'lucide-react';
import { STAFF_ROLES, STAFF_MEMBERS, PAYMENT_METHODS } from '../data/initialData';

export function NewSaleModal({ 
  isOpen, 
  onClose, 
  onSaveSale, 
  products, 
  services,
  selectedBranch 
}) {
  const dialogRef = useRef(null);

  // Form states
  const [selectedRole, setSelectedRole] = useState('sotuvchi'); // 'sotuvchi', 'administrator', 'vulkanizator'
  const [selectedStaffId, setSelectedStaffId] = useState('st1');
  
  const [clientName, setClientName] = useState('');
  const [phone, setPhone] = useState('998');
  const [carNumber, setCarNumber] = useState('');
  const [carModel, setCarModel] = useState('');

  const [cartItems, setCartItems] = useState([]);

  const [selectedPayment, setSelectedPayment] = useState('naqd');
  const [paidAmount, setPaidAmount] = useState(0);
  const [notes, setNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Sync staff member when role changes
  useEffect(() => {
    const availableStaff = STAFF_MEMBERS.filter(s => s.role === selectedRole);
    if (availableStaff.length > 0) {
      setSelectedStaffId(availableStaff[0].id);
    }
  }, [selectedRole]);

  // Calculate totals
  const totalAmount = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Auto-sync paid amount when total changes
  useEffect(() => {
    setPaidAmount(totalAmount);
  }, [totalAmount]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
      setErrorMsg('');
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  const handleDialogClick = (e) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  const handleAddProduct = (prodId) => {
    const prod = products.find(p => p.id === prodId);
    if (!prod) return;

    const existingIndex = cartItems.findIndex(item => item.id === prod.id);
    if (existingIndex >= 0) {
      const updated = [...cartItems];
      if (updated[existingIndex].quantity < prod.quantity) {
        updated[existingIndex].quantity += 1;
        setCartItems(updated);
      } else {
        setErrorMsg(`Omborda ${prod.name} mahsulotidan faqat ${prod.quantity} dona mavjud!`);
      }
    } else {
      setCartItems([
        ...cartItems,
        {
          id: prod.id,
          code: prod.code,
          name: prod.name,
          price: prod.price,
          quantity: 1,
          isService: false,
          maxStock: prod.quantity
        }
      ]);
    }
  };

  const handleAddService = (srvId) => {
    const srv = services.find(s => s.id === srvId);
    if (!srv) return;

    const existingIndex = cartItems.findIndex(item => item.id === srv.id);
    if (existingIndex >= 0) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += 1;
      setCartItems(updated);
    } else {
      setCartItems([
        ...cartItems,
        {
          id: srv.id,
          code: srv.code,
          name: srv.name,
          price: srv.price,
          quantity: 1,
          isService: true,
          maxStock: 999
        }
      ]);
    }
  };

  const handleUpdateQty = (idx, delta) => {
    const item = cartItems[idx];
    const newQty = item.quantity + delta;

    if (newQty <= 0) {
      handleRemoveItem(idx);
      return;
    }

    if (!item.isService && newQty > item.maxStock) {
      setErrorMsg(`Omborda faqat ${item.maxStock} dona mavjud!`);
      return;
    }

    const updated = [...cartItems];
    updated[idx].quantity = newQty;
    setCartItems(updated);
    setErrorMsg('');
  };

  const handleRemoveItem = (idx) => {
    setCartItems(cartItems.filter((_, i) => i !== idx));
  };

  const handleSubmit = (printAfter = false) => {
    if (!clientName.trim()) {
      setErrorMsg('Iltimos, mijoz ismini kiriting!');
      return;
    }

    if (cartItems.length === 0) {
      setErrorMsg('Iltimos, kamida bitta tovar yoki xizmat tanlang!');
      return;
    }

    const staffObj = STAFF_MEMBERS.find(s => s.id === selectedStaffId);
    const paymentObj = PAYMENT_METHODS.find(p => p.id === selectedPayment);

    // Format new sale
    const now = new Date();
    const dateFormatted = `${String(now.getDate()).padStart(2, '0')}.${String(now.getMonth() + 1).padStart(2, '0')}.${now.getFullYear()}`;
    const timeFormatted = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const saleId = `${selectedBranch?.id || 'AN2'}-${Math.floor(237000 + Math.random() * 5000)}`;

    const newSale = {
      id: saleId,
      client: clientName,
      phone: phone.replace(/\D/g, ''),
      carNumber: carNumber.toUpperCase().replace(/\s+/g, ''),
      carModel: carModel || 'Avtomobil',
      merchant: paymentObj?.name || 'Naqd - 0%',
      paymentMethod: selectedPayment,
      date: dateFormatted,
      time: timeFormatted,
      totalAmount,
      paidAmount: Number(paidAmount) || 0,
      remainingAmount: Math.max(0, totalAmount - (Number(paidAmount) || 0)),
      status: Number(paidAmount) >= totalAmount ? 'To\'landi' : 'Qisman',
      role: selectedRole, // REQUIRED: 'sotuvchi', 'administrator', 'vulkanizator'
      staffName: staffObj ? `${staffObj.name} (${selectedRole === 'vulkanizator' ? 'Vulkanizator' : selectedRole === 'administrator' ? 'Administrator' : 'Sotuvchi'})` : selectedRole,
      items: cartItems.map(item => ({
        id: item.id,
        code: item.code,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        total: item.price * item.quantity,
        isService: item.isService
      })),
      notes: notes || `${staffObj?.name || 'Xodim'} tomonidan rasmiylashtirildi`
    };

    onSaveSale(newSale, printAfter);
    onClose();
  };

  const filteredStaff = STAFF_MEMBERS.filter(s => s.role === selectedRole);

  return (
    <dialog 
      ref={dialogRef} 
      onClick={handleDialogClick} 
      closedby="any"
      aria-labelledby="newSaleModalTitle"
    >
      <div className="modal-card" style={{ maxWidth: '820px', width: '94vw' }}>
        <div className="modal-header">
          <div className="modal-title" id="newSaleModalTitle">
            <ShoppingCart size={20} color="var(--asko-red)" />
            <span>Yangi Sotuv Rasmiylashtirish</span>
            <span className="badge-counter" style={{ position: 'static', backgroundColor: 'var(--info)' }}>
              {selectedBranch?.id || 'AN2'}
            </span>
          </div>
          <button 
            type="button" 
            className="btn-icon-ghost" 
            onClick={onClose}
            aria-label="Yopish"
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {errorMsg && (
            <div style={{ backgroundColor: '#fee2e2', border: '1px solid #fecaca', color: '#dc2626', padding: '10px 14px', borderRadius: '8px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertCircle size={18} />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* 1. SOTUVNI KIM AMALGA OSHIRDI (TALAB QILINGAN ASOSIY MAYDON) */}
          <div className="role-selector-container">
            <div className="section-label">
              <span>1. Sotuvni kim amalga oshirdi?</span>
              <span className="req">* Majburiy tanlov</span>
            </div>

            <div className="role-cards-grid">
              {/* SOTUVCHI */}
              <div 
                className={`role-choice-card sotuvchi ${selectedRole === 'sotuvchi' ? 'selected' : ''}`}
                onClick={() => setSelectedRole('sotuvchi')}
              >
                {selectedRole === 'sotuvchi' && (
                  <div className="role-selected-check">
                    <Check size={12} strokeWidth={3} />
                  </div>
                )}
                <div className="role-icon-circle">
                  <UserCheck size={22} />
                </div>
                <div className="role-name">Sotuvchi</div>
                <div className="role-desc">Savdo zali konsultanti va tovar savdosi bo'yicha mas'ul</div>
              </div>

              {/* ADMINISTRATOR */}
              <div 
                className={`role-choice-card administrator ${selectedRole === 'administrator' ? 'selected' : ''}`}
                onClick={() => setSelectedRole('administrator')}
              >
                {selectedRole === 'administrator' && (
                  <div className="role-selected-check">
                    <Check size={12} strokeWidth={3} />
                  </div>
                )}
                <div className="role-icon-circle">
                  <ShieldCheck size={22} />
                </div>
                <div className="role-name">Administrator</div>
                <div className="role-desc">Boshqaruvchi, kassir va filial ma'muri</div>
              </div>

              {/* VULKANIZATOR */}
              <div 
                className={`role-choice-card vulkanizator ${selectedRole === 'vulkanizator' ? 'selected' : ''}`}
                onClick={() => setSelectedRole('vulkanizator')}
              >
                {selectedRole === 'vulkanizator' && (
                  <div className="role-selected-check">
                    <Check size={12} strokeWidth={3} />
                  </div>
                )}
                <div className="role-icon-circle">
                  <Wrench size={22} />
                </div>
                <div className="role-name">Vulkanizator</div>
                <div className="role-desc">Shina montaj ustasi, yamoq qo'yish va ta'mirlash xizmatlari</div>
              </div>
            </div>

            {/* Xodimni tanlash */}
            <div className="form-group" style={{ marginTop: '0.4rem' }}>
              <label className="form-label">Mas'ul xodimning ismi-sharifi:</label>
              <select 
                className="select-input" 
                value={selectedStaffId} 
                onChange={(e) => setSelectedStaffId(e.target.value)}
                style={{ width: '100%' }}
              >
                {filteredStaff.map((staff) => (
                  <option key={staff.id} value={staff.id}>
                    {staff.name} — {staff.phone}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 2. MIJOZ VA AVTOMOBIL MA'LUMOTLARI */}
          <div className="form-group">
            <div className="section-label">
              <span>2. Mijoz va avtomobil ma'lumotlari</span>
            </div>
            <div className="form-grid-3">
              <div className="form-group">
                <label className="form-label">Mijoz F.I.Sh <span style={{ color: 'var(--asko-red)' }}>*</span></label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Masalan: Shokirov Xurshid" 
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Telefon raqami</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="998901234567" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Mashina davlat raqami</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="60 L 387 HB" 
                  value={carNumber}
                  onChange={(e) => setCarNumber(e.target.value)}
                  style={{ textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}
                />
              </div>
            </div>
          </div>

          {/* 3. TOVARLAR VA XIZMATLAR TANLASH */}
          <div className="form-group">
            <div className="section-label">
              <span>3. Tovarlar va Xizmatlar (Savatcha)</span>
            </div>

            {/* Tezkor qo'shish tugmalari */}
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '0.6rem' }}>
              <div style={{ flex: '1', minWidth: '220px' }}>
                <select 
                  className="select-input" 
                  style={{ width: '100%' }}
                  onChange={(e) => {
                    if (e.target.value) {
                      handleAddProduct(e.target.value);
                      e.target.value = '';
                    }
                  }}
                  defaultValue=""
                >
                  <option value="" disabled>+ Ombordan shina yoki tovar qo'shish...</option>
                  {products.map(p => (
                    <option key={p.id} value={p.id} disabled={p.quantity <= 0}>
                      {p.name} ({p.code}) — {p.price.toLocaleString()} UZS (Qoldiq: {p.quantity} {p.unit})
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ flex: '1', minWidth: '220px' }}>
                <select 
                  className="select-input" 
                  style={{ width: '100%' }}
                  onChange={(e) => {
                    if (e.target.value) {
                      handleAddService(e.target.value);
                      e.target.value = '';
                    }
                  }}
                  defaultValue=""
                >
                  <option value="" disabled>+ Vulkanizatsiya / Servis xizmati qo'shish...</option>
                  {services.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.name} — {s.price.toLocaleString()} UZS
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Savatcha jadvali */}
            <div className="cart-items-box">
              <table className="cart-table">
                <thead>
                  <tr>
                    <th>Nomi</th>
                    <th style={{ width: '110px' }}>Narxi</th>
                    <th style={{ width: '110px', textAlign: 'center' }}>Soni</th>
                    <th style={{ width: '130px', textAlign: 'right' }}>Jami</th>
                    <th style={{ width: '40px' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.length > 0 ? (
                    cartItems.map((item, idx) => (
                      <tr key={idx}>
                        <td>
                          <div style={{ fontWeight: '600' }}>{item.name}</div>
                          <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                            Kod: {item.code} {item.isService ? '(Xizmat)' : `(Omborda: ${item.maxStock} dona)`}
                          </div>
                        </td>
                        <td>{item.price.toLocaleString()} UZS</td>
                        <td>
                          <div className="cart-qty-control" style={{ justifyContent: 'center' }}>
                            <button 
                              type="button" 
                              className="cart-qty-btn"
                              onClick={() => handleUpdateQty(idx, -1)}
                            >
                              -
                            </button>
                            <span style={{ fontWeight: '600', minWidth: '20px', textAlign: 'center' }}>
                              {item.quantity}
                            </span>
                            <button 
                              type="button" 
                              className="cart-qty-btn"
                              onClick={() => handleUpdateQty(idx, 1)}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td style={{ textAlign: 'right', fontWeight: '700' }}>
                          {(item.price * item.quantity).toLocaleString()} UZS
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <button 
                            type="button" 
                            className="btn-icon-ghost" 
                            style={{ width: '28px', height: '28px', color: 'var(--danger)' }}
                            onClick={() => handleRemoveItem(idx)}
                          >
                            <Trash2 size={15} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} style={{ textAlign: 'center', padding: '1.25rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                        Savatcha bo'sh. Yuqoridagi ro'yxatdan tovar yoki xizmat tanlang.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              <div className="cart-total-bar">
                <span>JAMI TO'LOV:</span>
                <span style={{ color: 'var(--asko-red)', fontSize: '1.2rem' }}>
                  {totalAmount.toLocaleString()} UZS
                </span>
              </div>
            </div>
          </div>

          {/* 4. TO'LOV TURI VA HISOB-KITOB */}
          <div className="form-group">
            <div className="section-label">
              <span>4. To'lov turi va summasi</span>
            </div>
            <div className="form-grid-3">
              <div className="form-group">
                <label className="form-label">To'lov usuli (Merchant)</label>
                <select 
                  className="select-input" 
                  value={selectedPayment} 
                  onChange={(e) => setSelectedPayment(e.target.value)}
                  style={{ width: '100%' }}
                >
                  {PAYMENT_METHODS.map(m => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">To'langan summa (UZS)</label>
                <input 
                  type="number" 
                  className="form-input" 
                  value={paidAmount} 
                  onChange={(e) => setPaidAmount(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Qarz (Nasiya qoldig'i)</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={`${Math.max(0, totalAmount - (Number(paidAmount) || 0)).toLocaleString()} UZS`}
                  readOnly 
                  style={{ backgroundColor: 'var(--bg-hover)', color: totalAmount - paidAmount > 0 ? 'var(--danger)' : 'var(--text-muted)' }}
                />
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
            Bekor qilish
          </button>
          
          <button 
            type="button" 
            className="btn-primary" 
            onClick={() => handleSubmit(false)}
          >
            <Check size={16} />
            <span>Sotuvni saqlash</span>
          </button>

          <button 
            type="button" 
            className="btn-primary" 
            style={{ backgroundColor: '#107c41' }}
            onClick={() => handleSubmit(true)}
          >
            <Printer size={16} />
            <span>Saqlash va Chek chiqarish</span>
          </button>
        </div>
      </div>
    </dialog>
  );
}
