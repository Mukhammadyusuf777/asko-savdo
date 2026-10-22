import React, { useState, useMemo, useRef } from 'react';
import { 
  FileSpreadsheet, Search, Filter, ChevronLeft, ChevronRight, 
  Plus, Package, Image as ImageIcon, AlertTriangle, ArrowUpDown, 
  CheckCircle2, Edit2, Archive, DollarSign
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
  const [newCode, setNewCode] = useState('');
  const [newName, setNewName] = useState('');
  const [newBrand, setNewBrand] = useState('');
  const [newMera, setNewMera] = useState('');
  const [newQty, setNewQty] = useState(20);
  const [newPrice, setNewPrice] = useState(450000);
  const [newCategory, setNewCategory] = useState('Shinalar');

  const addModalRef = useRef(null);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      if (categoryFilter !== 'all' && p.category !== categoryFilter) {
        return false;
      }
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchCode = p.code.toLowerCase().includes(query);
        const matchName = p.name.toLowerCase().includes(query);
        const matchBrand = (p.brand || '').toLowerCase().includes(query);
        const matchMera = (p.mera || '').toLowerCase().includes(query);
        return matchCode || matchName || matchBrand || matchMera;
      }
      return true;
    });
  }, [products, categoryFilter, searchTerm]);

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
      'Qoldiq Soni': `${p.quantity} ${p.unit}`,
      'Sotish Narxi (UZS)': p.price,
      'Tannarxi (UZS)': p.costPrice || 0
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Ombor_Qoldiqlari');
    XLSX.writeFile(workbook, `ASKO_Ombor_Qoldiqlari_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  const handleCreateProduct = (e) => {
    e.preventDefault();
    if (!newName.trim() || !newCode.trim()) return;

    const item = {
      id: `prod_${Date.now()}`,
      code: newCode.toUpperCase(),
      name: newName,
      category: newCategory,
      brand: newBrand || 'ASKO',
      mera: newMera || '-',
      quantity: Number(newQty) || 0,
      price: Number(newPrice) || 0,
      costPrice: Math.round(Number(newPrice) * 0.8),
      unit: 'dona',
      branch: selectedBranch?.id || 'AN2',
      minStock: 6
    };

    onAddStock(item);
    setShowAddModal(false);
    setNewName('');
    setNewCode('');
    setNewBrand('');
    setNewMera('');
  };

  return (
    <div className="inventory-view-container">
      {/* Top Bar matching Screenshot 1 */}
      <div className="page-top-bar">
        <div className="page-title-area">
          <h1 className="page-title">Ombor qoldiqlari hisoboti</h1>
          <span className="page-subtitle">(Jami {products.length} turdagi tovar)</span>
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

          {/* Kirim qilish button */}
          <button 
            className="btn-primary" 
            onClick={() => setShowAddModal(true)}
            style={{ backgroundColor: 'var(--info)' }}
          >
            <Plus size={16} />
            <span>Kirim qilish</span>
          </button>
        </div>
      </div>

      {/* Stock Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-left">
            <span className="stat-title">Jami Mahsulot Qoldig'i</span>
            <span className="stat-value">
              {products.reduce((acc, p) => acc + p.quantity, 0).toLocaleString()} dona
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
              {products.reduce((acc, p) => acc + (p.quantity * p.price), 0).toLocaleString()} UZS
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
              {products.filter(p => p.category === 'Shinalar').reduce((acc, p) => acc + p.quantity, 0)} dona
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
              {products.filter(p => p.quantity <= (p.minStock || 8)).length} ta
            </span>
            <span className="stat-sub">Tezkor buyurtma talab qilinadi</span>
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
                <th style={{ textAlign: 'center' }}>AMALLAR</th>
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
                        color: prod.quantity <= (prod.minStock || 6) ? 'var(--danger)' : 'var(--text-main)' 
                      }}>
                        {prod.quantity} {prod.unit || 'dona'}
                      </span>
                      {prod.quantity <= (prod.minStock || 6) && (
                        <span style={{ marginLeft: '6px', fontSize: '0.65rem', backgroundColor: '#fee2e2', color: '#dc2626', padding: '1px 5px', borderRadius: '4px', fontWeight: 'bold' }}>
                          Kam
                        </span>
                      )}
                    </td>

                    {/* Narxi */}
                    <td style={{ fontWeight: '700' }}>
                      {prod.price.toLocaleString()} UZS
                    </td>

                    {/* Foto */}
                    <td style={{ textAlign: 'center' }}>
                      <div className="product-thumb" style={{ margin: '0 auto' }}>
                        <ImageIcon size={18} />
                      </div>
                    </td>

                    {/* Amallar */}
                    <td>
                      <div className="action-buttons-group" style={{ justifyContent: 'center' }}>
                        <button 
                          className="btn-table-action view" 
                          title="Tahrirlash / Kirim qilish"
                          onClick={() => {
                            const addAmount = prompt(`${prod.name} uchun qancha miqdor qo'shmoqchisiz?`, '10');
                            if (addAmount && !isNaN(Number(addAmount))) {
                              prod.quantity += Number(addAmount);
                              onAddStock({ ...prod });
                            }
                          }}
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

      {/* Kirim qilish modal */}
      {showAddModal && (
        <dialog 
          ref={addModalRef} 
          open 
          closedby="any"
          aria-labelledby="stockModalTitle"
          style={{ display: 'block' }}
        >
          <div className="modal-card" style={{ maxWidth: '540px', width: '92vw' }}>
            <div className="modal-header">
              <div className="modal-title" id="stockModalTitle">
                <Plus size={18} color="var(--info)" />
                <span>Omborga Yangi Tovar Kirim Qilish</span>
              </div>
              <button 
                type="button" 
                className="btn-icon-ghost" 
                onClick={() => setShowAddModal(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProduct}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Mahsulot kodi (Artikul) *</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Masalan: SHN1299" 
                    value={newCode}
                    onChange={(e) => setNewCode(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Mahsulot to'liq nomi *</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Masalan: Continental UltraContact 195/65/15" 
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label">Brend</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="Masalan: Continental" 
                      value={newBrand}
                      onChange={(e) => setNewBrand(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">O'lchami (Mera)</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="195/65/15" 
                      value={newMera}
                      onChange={(e) => setNewMera(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-grid-3">
                  <div className="form-group">
                    <label className="form-label">Kategoriya</label>
                    <select 
                      className="select-input" 
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      style={{ width: '100%' }}
                    >
                      <option value="Shinalar">Shinalar</option>
                      <option value="Avtokimyo">Avtokimyo</option>
                      <option value="Moylar">Moylar</option>
                      <option value="Aksessuarlar">Aksessuarlar</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Miqdori (dona)</label>
                    <input 
                      type="number" 
                      className="form-input" 
                      value={newQty}
                      onChange={(e) => setNewQty(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Sotish narxi (UZS)</label>
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
                  style={{ backgroundColor: 'var(--info)' }}
                >
                  Kirim qilish
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
}
