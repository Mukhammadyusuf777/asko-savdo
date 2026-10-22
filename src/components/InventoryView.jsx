import React, { useState, useMemo, useRef } from 'react';
import { 
  FileSpreadsheet, Search, Filter, ChevronLeft, ChevronRight, 
  Plus, Package, Image as ImageIcon, AlertTriangle, ArrowUpDown, 
  CheckCircle2, Edit2, Archive, DollarSign, X, Check, RefreshCw
} from 'lucide-react';
import * as XLSX from 'xlsx';

export function InventoryView({ 
  products, 
  onAddStock, 
  branches, 
  selectedBranch, 
  onSelectBranch 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  // Stock add modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalTab, setModalTab] = useState('new'); // 'new' | 'restock'

  // New product form
  const [newCode, setNewCode] = useState('');
  const [newName, setNewName] = useState('');
  const [newBrand, setNewBrand] = useState('');
  const [newMera, setNewMera] = useState('');
  const [newQty, setNewQty] = useState(20);
  const [newCostPrice, setNewCostPrice] = useState(380000);
  const [newPrice, setNewPrice] = useState(480000);
  const [newCategory, setNewCategory] = useState('Shinalar');
  const [newBranch, setNewBranch] = useState(selectedBranch?.id || 'AN2');
  const [newMinStock, setNewMinStock] = useState(6);

  // Restock existing product form
  const [restockProdId, setRestockProdId] = useState(products[0]?.id || '');
  const [restockQty, setRestockQty] = useState(10);
  const [restockPrice, setRestockPrice] = useState('');

  // Quick edit product
  const [editingProduct, setEditingProduct] = useState(null);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      if (categoryFilter !== 'all' && p.category !== categoryFilter) {
        return false;
      }
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchCode = (p.code || '').toLowerCase().includes(query);
        const matchName = (p.name || '').toLowerCase().includes(query);
        const matchBrand = (p.brand || '').toLowerCase().includes(query);
        const matchMera = (p.mera || '').toLowerCase().includes(query);
        return matchCode || matchName || matchBrand || matchMera;
      }
      return true;
    });
  }, [products, categoryFilter, searchTerm]);

  // Selected product for restock info
  const selectedRestockItem = useMemo(() => {
    return products.find(p => p.id === restockProdId) || products[0];
  }, [products, restockProdId]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / pageSize) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredProducts.slice(start, start + pageSize);
  }, [filteredProducts, currentPage, pageSize]);

  // Excel Export
  const handleExportExcel = () => {
    const exportData = filteredProducts.map(p => ({
      'Ombor': p.branch || selectedBranch?.id || 'AN2',
      'Mahsulot Kodi': p.code,
      'Mahsulot Nomi': p.name,
      'Kategoriya': p.category,
      'Brend': p.brand,
      'O\'lchami (Mera)': p.mera,
      'Qoldiq Soni': `${p.quantity} ${p.unit || 'dona'}`,
      'Sotish Narxi (UZS)': p.price,
      'Tannarxi (UZS)': p.costPrice || 0
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Ombor_Qoldiqlari');
    XLSX.writeFile(workbook, `ASKO_Ombor_Qoldiqlari_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  // Submit New Product
  const handleCreateNewProduct = (e) => {
    e.preventDefault();
    if (!newName.trim() || !newCode.trim()) return;

    const item = {
      id: `prod_${Date.now()}`,
      code: newCode.trim().toUpperCase(),
      name: newName.trim(),
      category: newCategory,
      brand: newBrand.trim() || 'ASKO',
      mera: newMera.trim() || '-',
      quantity: Number(newQty) || 0,
      costPrice: Number(newCostPrice) || Math.round(Number(newPrice) * 0.8),
      price: Number(newPrice) || 0,
      unit: 'dona',
      branch: newBranch || selectedBranch?.id || 'AN2',
      minStock: Number(newMinStock) || 6
    };

    onAddStock(item);
    setShowAddModal(false);

    // Reset form
    setNewName('');
    setNewCode('');
    setNewBrand('');
    setNewMera('');
    setNewQty(20);
  };

  // Submit Restock of Existing Product
  const handleRestockExisting = (e) => {
    e.preventDefault();
    if (!selectedRestockItem) return;

    const updatedQty = selectedRestockItem.quantity + (Number(restockQty) || 0);
    const updatedPrice = restockPrice ? Number(restockPrice) : selectedRestockItem.price;

    const updatedItem = {
      ...selectedRestockItem,
      quantity: updatedQty,
      price: updatedPrice
    };

    onAddStock(updatedItem);
    setShowAddModal(false);
    setRestockQty(10);
    setRestockPrice('');
  };

  // Quick Inline Restock
  const handleQuickAdd = (prod, addCount) => {
    const updated = {
      ...prod,
      quantity: prod.quantity + addCount
    };
    onAddStock(updated);
  };

  // Save Edit
  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingProduct) return;
    onAddStock(editingProduct);
    setEditingProduct(null);
  };

  return (
    <div className="inventory-view-container">
      {/* Top Bar matching Screenshot 1 */}
      <div className="page-top-bar">
        <div className="page-title-area">
          <h1 className="page-title">Ombor qoldiqlari hisoboti</h1>
          <span className="page-subtitle">(Jami {products.length} turdagi tovar bazada)</span>
        </div>

        <div className="page-controls">
          {/* Excel yuklab olish (Download as Excel) */}
          <button className="btn-excel" onClick={handleExportExcel}>
            <FileSpreadsheet size={16} />
            <span>Excel yuklab olish</span>
          </button>

          {/* Filial tanlash dropdown (Screenshot 1: AN2 - ...) */}
          <select 
            className="select-input" 
            value={selectedBranch?.id || 'AN2'}
            onChange={(e) => {
              const b = branches.find(item => item.id === e.target.value);
              if (b) onSelectBranch(b);
            }}
            style={{ minWidth: '160px' }}
          >
            {branches.map(b => (
              <option key={b.id} value={b.id}>
                {b.id} - {b.name.split('-')[1]?.trim() || b.name}
              </option>
            ))}
          </select>

          {/* Pagination Counter */}
          <div className="pagination-top">
            <span>
              {filteredProducts.length === 0 
                ? '0-0 of 0' 
                : `${(currentPage - 1) * pageSize + 1}-${Math.min(currentPage * pageSize, filteredProducts.length)} of ${filteredProducts.length}`}
            </span>
            <button 
              className="pagination-btn"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              aria-label="Oldingi sahifa"
            >
              <ChevronLeft size={16} />
            </button>
            <button 
              className="pagination-btn"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              aria-label="Keyingi sahifa"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Search Table */}
          <div className="table-search-wrapper">
            <Search size={15} className="table-search-icon" />
            <input 
              type="text" 
              placeholder="Qidiruv..." 
              className="table-search-input"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          {/* Filter button */}
          <button 
            className="btn-secondary" 
            style={{ width: '38px', padding: 0, justifyContent: 'center' }}
            title="Kategoriya filtrlari"
          >
            <Filter size={16} />
          </button>

          {/* Rows per page selector */}
          <select 
            className="select-input" 
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            style={{ width: '70px', paddingRight: '1.5rem' }}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>

          {/* Asosiy Qizil Tugma: + Tovar kirim qilish */}
          <button 
            className="btn-primary" 
            onClick={() => setShowAddModal(true)}
          >
            <Plus size={17} strokeWidth={2.5} />
            <span>Tovar qo'shish / Kirim</span>
          </button>
        </div>
      </div>

      {/* Stock Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-left">
            <span className="stat-title">Jami Mahsulot Qoldig'i</span>
            <span className="stat-value">
              {products.reduce((acc, p) => acc + (Number(p.quantity) || 0), 0).toLocaleString()} dona
            </span>
            <span className="stat-sub">Barcha toifalar bo'yicha</span>
          </div>
          <div className="stat-icon-box blue">
            <Archive size={22} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-left">
            <span className="stat-title">Ombor Umumiy Qiymati</span>
            <span className="stat-value">
              {products.reduce((acc, p) => acc + ((Number(p.quantity) || 0) * (Number(p.price) || 0)), 0).toLocaleString()} UZS
            </span>
            <span className="stat-sub">Sotish narxlari bo'yicha</span>
          </div>
          <div className="stat-icon-box green">
            <DollarSign size={22} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-left">
            <span className="stat-title">Shinalar Qoldig'i</span>
            <span className="stat-value">
              {products.filter(p => p.category === 'Shinalar').reduce((acc, p) => acc + (Number(p.quantity) || 0), 0)} dona
            </span>
            <span className="stat-sub">Yallama, DIDAR, Fortuna, Michelin</span>
          </div>
          <div className="stat-icon-box amber">
            <Package size={22} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-left">
            <span className="stat-title">Kam Qolgan Mahsulotlar</span>
            <span className="stat-value" style={{ color: 'var(--danger)' }}>
              {products.filter(p => Number(p.quantity) <= (Number(p.minStock) || 6)).length} ta
            </span>
            <span className="stat-sub">Tezkor kirim talab qilinadi</span>
          </div>
          <div className="stat-icon-box red">
            <AlertTriangle size={22} />
          </div>
        </div>
      </div>

      {/* Category selector */}
      <div className="role-filter-bar" style={{ marginBottom: '1.25rem' }}>
        <span className="filter-bar-label">Kategoriyalar:</span>
        <button 
          className={`role-tab-btn ${categoryFilter === 'all' ? 'active' : ''}`}
          onClick={() => { setCategoryFilter('all'); setCurrentPage(1); }}
        >
          <span>Barchasi</span>
        </button>
        <button 
          className={`role-tab-btn ${categoryFilter === 'Shinalar' ? 'active' : ''}`}
          onClick={() => { setCategoryFilter('Shinalar'); setCurrentPage(1); }}
        >
          <span>🚗 Shinalar</span>
        </button>
        <button 
          className={`role-tab-btn ${categoryFilter === 'Avtokimyo' ? 'active' : ''}`}
          onClick={() => { setCategoryFilter('Avtokimyo'); setCurrentPage(1); }}
        >
          <span>🧪 Avtokimyo & Antifriz</span>
        </button>
        <button 
          className={`role-tab-btn ${categoryFilter === 'Moylar' ? 'active' : ''}`}
          onClick={() => { setCategoryFilter('Moylar'); setCurrentPage(1); }}
        >
          <span>🛢️ Motor moylari</span>
        </button>
      </div>

      {/* Table matching Screenshot 1 */}
      <div className="table-card">
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>OMBOR</th>
                <th>KOD</th>
                <th>MAHSULOT (PRODUKTSIYA)</th>
                <th>BREND</th>
                <th>O'LCHAMI (MERA)</th>
                <th>QOLDIQ</th>
                <th>NARX</th>
                <th style={{ textAlign: 'center' }}>FOTO</th>
                <th style={{ textAlign: 'center' }}>TEZKOR KIRIM & AMALLAR</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((prod) => (
                  <tr key={prod.id}>
                    {/* Ombor */}
                    <td style={{ fontWeight: '600' }}>
                      {prod.branch || selectedBranch?.id || 'AN2'}
                    </td>

                    {/* Kod */}
                    <td className="table-cell-id">
                      {prod.code}
                    </td>

                    {/* Mahsulot */}
                    <td>
                      <div style={{ fontWeight: '600' }}>{prod.name}</div>
                      <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                        {prod.category}
                      </div>
                    </td>

                    {/* Brend */}
                    <td>
                      {prod.brand || '-'}
                    </td>

                    {/* O'lchami (Mera) */}
                    <td style={{ fontFamily: 'var(--font-mono)' }}>
                      {prod.mera || '-'}
                    </td>

                    {/* Qoldiq */}
                    <td>
                      <span style={{ 
                        fontWeight: '700', 
                        color: Number(prod.quantity) <= (Number(prod.minStock) || 6) ? 'var(--danger)' : 'var(--text-main)' 
                      }}>
                        {prod.quantity} {prod.unit || 'dona'}
                      </span>
                      {Number(prod.quantity) <= (Number(prod.minStock) || 6) && (
                        <span style={{ marginLeft: '6px', fontSize: '0.65rem', backgroundColor: '#fee2e2', color: '#dc2626', padding: '1px 5px', borderRadius: '4px', fontWeight: 'bold' }}>
                          Kam
                        </span>
                      )}
                    </td>

                    {/* Narxi */}
                    <td style={{ fontWeight: '700' }}>
                      {Number(prod.price).toLocaleString()} UZS
                    </td>

                    {/* Foto */}
                    <td style={{ textAlign: 'center' }}>
                      <div className="product-thumb" style={{ margin: '0 auto' }}>
                        <ImageIcon size={18} />
                      </div>
                    </td>

                    {/* Tezkor Kirim va Amallar */}
                    <td>
                      <div className="action-buttons-group" style={{ justifyContent: 'center' }}>
                        {/* Tezkor +4 shina qo'shish tugmasi */}
                        <button 
                          className="btn-secondary" 
                          style={{ height: '28px', padding: '0 7px', fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--success)' }}
                          title="+4 dona kirim qilish"
                          onClick={() => handleQuickAdd(prod, 4)}
                        >
                          +4
                        </button>

                        {/* Tezkor +10 dona qo'shish */}
                        <button 
                          className="btn-secondary" 
                          style={{ height: '28px', padding: '0 7px', fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--info)' }}
                          title="+10 dona kirim qilish"
                          onClick={() => handleQuickAdd(prod, 10)}
                        >
                          +10
                        </button>

                        {/* Tahrirlash */}
                        <button 
                          className="btn-table-action view" 
                          title="Mahsulotni tahrirlash"
                          onClick={() => setEditingProduct({ ...prod })}
                        >
                          <Edit2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9}>
                    <div className="empty-state">
                      <div className="empty-state-icon">
                        <Package size={28} />
                      </div>
                      <div style={{ fontWeight: '600' }}>Mahsulotlar topilmadi</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                        Ushbu parametrlar bo'yicha omborda tovar mavjud emas
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* =========================================================
          TOVAR QO'SHISH VA KIRIM QILISH MODAL OYNASI
          ========================================================= */}
      {showAddModal && (
        <dialog open closedby="any" style={{ display: 'block' }}>
          <div className="modal-card" style={{ maxWidth: '640px', width: '94vw' }}>
            <div className="modal-header">
              <div className="modal-title">
                <Plus size={20} color="var(--asko-red)" />
                <span>Omborga Tovar Qo'shish & Kirim</span>
              </div>
              <button 
                type="button" 
                className="btn-icon-ghost" 
                onClick={() => setShowAddModal(false)}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal ichidagi Tablar */}
            <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-surface-alt)' }}>
              <button
                type="button"
                onClick={() => setModalTab('new')}
                style={{
                  flex: 1,
                  padding: '12px',
                  border: 'none',
                  borderBottom: modalTab === 'new' ? '3px solid var(--asko-red)' : '3px solid transparent',
                  backgroundColor: modalTab === 'new' ? 'var(--bg-surface)' : 'transparent',
                  fontWeight: modalTab === 'new' ? '700' : '500',
                  color: modalTab === 'new' ? 'var(--text-main)' : 'var(--text-muted)',
                  cursor: 'pointer',
                  fontSize: '0.875rem'
                }}
              >
                ✨ Yangi mahsulot kiritish
              </button>
              <button
                type="button"
                onClick={() => setModalTab('restock')}
                style={{
                  flex: 1,
                  padding: '12px',
                  border: 'none',
                  borderBottom: modalTab === 'restock' ? '3px solid var(--info)' : '3px solid transparent',
                  backgroundColor: modalTab === 'restock' ? 'var(--bg-surface)' : 'transparent',
                  fontWeight: modalTab === 'restock' ? '700' : '500',
                  color: modalTab === 'restock' ? 'var(--text-main)' : 'var(--text-muted)',
                  cursor: 'pointer',
                  fontSize: '0.875rem'
                }}
              >
                📦 Ombordagi mavjud tovar qoldig'ini to'ldirish
              </button>
            </div>

            {/* 1-TAB: YANGI MAHSULOT */}
            {modalTab === 'new' && (
              <form onSubmit={handleCreateNewProduct}>
                <div className="modal-body">
                  <div className="form-grid-2">
                    <div className="form-group">
                      <label className="form-label">Mahsulot kodi (Artikul) <span style={{ color: 'var(--asko-red)' }}>*</span></label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="Masalan: SHN1299" 
                        value={newCode}
                        onChange={(e) => setNewCode(e.target.value)}
                        required
                        style={{ fontFamily: 'var(--font-mono)' }}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Kategoriya</label>
                      <select 
                        className="select-input" 
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        style={{ width: '100%' }}
                      >
                        <option value="Shinalar">🚗 Shinalar</option>
                        <option value="Avtokimyo">🧪 Avtokimyo & Antifriz</option>
                        <option value="Moylar">🛢️ Motor moylari</option>
                        <option value="Aksessuarlar">⚙️ Aksessuarlar</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Mahsulot to'liq nomi <span style={{ color: 'var(--asko-red)' }}>*</span></label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="Masalan: Michelin Primacy 4 205/55/16" 
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-grid-3">
                    <div className="form-group">
                      <label className="form-label">Brend</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="Masalan: Michelin" 
                        value={newBrand}
                        onChange={(e) => setNewBrand(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">O'lchami (Mera)</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="205/55/16" 
                        value={newMera}
                        onChange={(e) => setNewMera(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Qabul qiluvchi ombor</label>
                      <select 
                        className="select-input"
                        value={newBranch}
                        onChange={(e) => setNewBranch(e.target.value)}
                        style={{ width: '100%' }}
                      >
                        {branches.map(b => (
                          <option key={b.id} value={b.id}>{b.id} - {b.name.split('-')[1]?.trim() || b.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-grid-3">
                    <div className="form-group">
                      <label className="form-label">Kirim miqdori (dona) <span style={{ color: 'var(--asko-red)' }}>*</span></label>
                      <input 
                        type="number" 
                        className="form-input" 
                        value={newQty}
                        onChange={(e) => setNewQty(e.target.value)}
                        min="1"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Tannarxi (Kirim narx, UZS)</label>
                      <input 
                        type="number" 
                        className="form-input" 
                        value={newCostPrice}
                        onChange={(e) => setNewCostPrice(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Sotish narxi (UZS) <span style={{ color: 'var(--asko-red)' }}>*</span></label>
                      <input 
                        type="number" 
                        className="form-input" 
                        value={newPrice}
                        onChange={(e) => setNewPrice(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn-secondary" 
                    onClick={() => setShowAddModal(false)}
                  >
                    Bekor qilish
                  </button>
                  <button 
                    type="submit" 
                    className="btn-primary"
                  >
                    <Check size={16} />
                    <span>Omborga kiritish</span>
                  </button>
                </div>
              </form>
            )}

            {/* 2-TAB: MAVJUD TOVAR QOLDIG'INI TO'LDIRISH */}
            {modalTab === 'restock' && (
              <form onSubmit={handleRestockExisting}>
                <div className="modal-body">
                  <div className="form-group">
                    <label className="form-label">To'ldiriladigan tovarni tanlang</label>
                    <select 
                      className="select-input" 
                      value={restockProdId}
                      onChange={(e) => setRestockProdId(e.target.value)}
                      style={{ width: '100%' }}
                    >
                      {products.map(p => (
                        <option key={p.id} value={p.id}>
                          {p.name} ({p.code}) — Hozirgi qoldiq: {p.quantity} {p.unit || 'dona'}
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedRestockItem && (
                    <div style={{ backgroundColor: 'var(--bg-hover)', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: '700' }}>{selectedRestockItem.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          Kodi: {selectedRestockItem.code} • Brend: {selectedRestockItem.brand} • Mera: {selectedRestockItem.mera}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Hozirgi qoldiq:</div>
                        <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--info)' }}>
                          {selectedRestockItem.quantity} {selectedRestockItem.unit || 'dona'}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="form-grid-2">
                    <div className="form-group">
                      <label className="form-label">Qo'shiladigan miqdor (dona) <span style={{ color: 'var(--asko-red)' }}>*</span></label>
                      <input 
                        type="number" 
                        className="form-input" 
                        value={restockQty}
                        onChange={(e) => setRestockQty(e.target.value)}
                        min="1"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Yangi sotish narxi (ixtiyoriy)</label>
                      <input 
                        type="number" 
                        className="form-input" 
                        placeholder={selectedRestockItem ? `${selectedRestockItem.price} UZS` : 'Narx'}
                        value={restockPrice}
                        onChange={(e) => setRestockPrice(e.target.value)}
                      />
                    </div>
                  </div>

                  {selectedRestockItem && (
                    <div style={{ padding: '8px 12px', backgroundColor: '#dcfce7', color: '#16a34a', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '600' }}>
                      ✓ Yangi jami qoldiq: {selectedRestockItem.quantity + (Number(restockQty) || 0)} dona bo'ladi
                    </div>
                  )}
                </div>

                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn-secondary" 
                    onClick={() => setShowAddModal(false)}
                  >
                    Bekor qilish
                  </button>
                  <button 
                    type="submit" 
                    className="btn-primary"
                    style={{ backgroundColor: 'var(--info)' }}
                  >
                    <Plus size={16} />
                    <span>Qoldiqni oshirish (+{restockQty})</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </dialog>
      )}

      {/* =========================================================
          MAHSULOTNI TAHRIRLASH MODAL OYNASI
          ========================================================= */}
      {editingProduct && (
        <dialog open closedby="any" style={{ display: 'block' }}>
          <div className="modal-card" style={{ maxWidth: '540px', width: '92vw' }}>
            <div className="modal-header">
              <div className="modal-title">
                <Edit2 size={18} color="var(--info)" />
                <span>Mahsulotni Tahrirlash ({editingProduct.code})</span>
              </div>
              <button 
                type="button" 
                className="btn-icon-ghost" 
                onClick={() => setEditingProduct(null)}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Mahsulot nomi</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label">Brend</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={editingProduct.brand || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, brand: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">O'lchami (Mera)</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={editingProduct.mera || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, mera: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label">Qoldiq soni (dona)</label>
                    <input 
                      type="number" 
                      className="form-input" 
                      value={editingProduct.quantity}
                      onChange={(e) => setEditingProduct({ ...editingProduct, quantity: Number(e.target.value) })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Sotish narxi (UZS)</label>
                    <input 
                      type="number" 
                      className="form-input" 
                      value={editingProduct.price}
                      onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn-secondary" 
                  onClick={() => setEditingProduct(null)}
                >
                  Bekor qilish
                </button>
                <button 
                  type="submit" 
                  className="btn-primary"
                >
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
}
