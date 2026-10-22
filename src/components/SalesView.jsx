import React, { useState, useMemo } from 'react';
import { 
  Plus, FileSpreadsheet, Search, Filter, ChevronLeft, ChevronRight, 
  Printer, Eye, RotateCw, UserCheck, ShieldCheck, Wrench, 
  Calendar, DollarSign, CheckCircle2, AlertCircle, ShoppingBag, 
  TrendingUp, Wallet
} from 'lucide-react';
import * as XLSX from 'xlsx';

export function SalesView({ 
  sales, 
  onOpenNewSale, 
  onPrintReceipt, 
  onViewDetails,
  onRefreshSale 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all'); // 'all', 'sotuvchi', 'administrator', 'vulkanizator'
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Filtered sales
  const filteredSales = useMemo(() => {
    return sales.filter(sale => {
      // Role filter
      if (roleFilter !== 'all' && sale.role !== roleFilter) {
        return false;
      }
      // Status filter
      if (statusFilter !== 'all' && sale.status !== statusFilter) {
        return false;
      }
      // Search term
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchId = sale.id.toLowerCase().includes(query);
        const matchClient = sale.client.toLowerCase().includes(query);
        const matchPhone = sale.phone.includes(query);
        const matchPlate = (sale.carNumber || '').toLowerCase().includes(query);
        const matchStaff = (sale.staffName || '').toLowerCase().includes(query);
        const matchMerchant = (sale.merchant || '').toLowerCase().includes(query);
        return matchId || matchClient || matchPhone || matchPlate || matchStaff || matchMerchant;
      }
      return true;
    });
  }, [sales, roleFilter, statusFilter, searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredSales.length / pageSize) || 1;
  const paginatedSales = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredSales.slice(start, start + pageSize);
  }, [filteredSales, currentPage, pageSize]);

  // Statistics
  const stats = useMemo(() => {
    const totalRevenue = sales
      .filter(s => s.status !== 'Bekor qilindi')
      .reduce((sum, s) => sum + s.totalAmount, 0);

    const sellerTotal = sales
      .filter(s => s.role === 'sotuvchi' && s.status !== 'Bekor qilindi')
      .reduce((sum, s) => sum + s.totalAmount, 0);

    const adminTotal = sales
      .filter(s => s.role === 'administrator' && s.status !== 'Bekor qilindi')
      .reduce((sum, s) => sum + s.totalAmount, 0);

    const tireTotal = sales
      .filter(s => s.role === 'vulkanizator' && s.status !== 'Bekor qilindi')
      .reduce((sum, s) => sum + s.totalAmount, 0);

    return { totalRevenue, sellerTotal, adminTotal, tireTotal };
  }, [sales]);

  // Excel Export
  const handleExportExcel = () => {
    const exportData = filteredSales.map(s => ({
      'Chek ID': s.id,
      'Mijoz': s.client,
      'Telefon': s.phone,
      'Mashina Raqami': s.carNumber || '-',
      'To\'lov Usuli': s.merchant,
      'Sana': `${s.date} ${s.time || ''}`,
      'Jami Summa (UZS)': s.totalAmount,
      'To\'langan Summa (UZS)': s.paidAmount,
      'Qarz Qoldig\'i (UZS)': s.remainingAmount,
      'Holat': s.status,
      'Mas\'ul Rol': s.role === 'sotuvchi' ? 'Sotuvchi' : s.role === 'administrator' ? 'Administrator' : 'Vulkanizator',
      'Xodim': s.staffName
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sotuvlar');
    XLSX.writeFile(workbook, `ASKO_Sotuvlar_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  const getRoleBadge = (role, staffName) => {
    switch (role) {
      case 'sotuvchi':
        return (
          <span className="role-badge sotuvchi" title={staffName}>
            <UserCheck size={13} />
            <span>Sotuvchi</span>
          </span>
        );
      case 'administrator':
        return (
          <span className="role-badge administrator" title={staffName}>
            <ShieldCheck size={13} />
            <span>Administrator</span>
          </span>
        );
      case 'vulkanizator':
        return (
          <span className="role-badge vulkanizator" title={staffName}>
            <Wrench size={13} />
            <span>Vulkanizator</span>
          </span>
        );
      default:
        return <span className="role-badge">{role}</span>;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'To\'landi':
        return <span className="status-pill success">To'landi</span>;
      case 'Bekor qilindi':
        return <span className="status-pill cancelled">Bekor qilindi</span>;
      case 'Qisman':
      case 'Kutilmoqda':
        return <span className="status-pill warning">{status}</span>;
      default:
        return <span className="status-pill">{status}</span>;
    }
  };

  return (
    <div className="sales-view-container">
      {/* Page Top Bar */}
      <div className="page-top-bar">
        <div className="page-title-area">
          <h1 className="page-title">Sotuvlar</h1>
          <span className="page-subtitle">({sales.length} ta operatsiya ro'yxati)</span>
        </div>

        <div className="page-controls">
          {/* Pagination Counter */}
          <div className="pagination-top">
            <span>
              {filteredSales.length === 0 
                ? '0-0' 
                : `${(currentPage - 1) * pageSize + 1}-${Math.min(currentPage * pageSize, filteredSales.length)}`} dan {filteredSales.length}
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

          {/* Filter Icon button */}
          <button 
            className="btn-secondary" 
            style={{ width: '38px', padding: 0, justifyContent: 'center' }}
            title="Qo'shimcha filtrlar"
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

          {/* Excel Button */}
          <button className="btn-excel" onClick={handleExportExcel}>
            <FileSpreadsheet size={16} />
            <span>Excel</span>
          </button>

          {/* + Qo'shish Red Button */}
          <button className="btn-primary" onClick={onOpenNewSale}>
            <Plus size={16} />
            <span>Qo'shish</span>
          </button>
        </div>
      </div>

      {/* Role & Revenue Summary Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-left">
            <span className="stat-title">Bugungi Jami Tushum</span>
            <span className="stat-value">{stats.totalRevenue.toLocaleString()} UZS</span>
            <span className="stat-sub">Barcha to'lovlar bilan</span>
          </div>
          <div className="stat-icon-box green">
            <DollarSign size={22} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-left">
            <span className="stat-title">Sotuvchilar Savdosi</span>
            <span className="stat-value">{stats.sellerTotal.toLocaleString()} UZS</span>
            <span className="stat-sub">Shina va tovar savdosi</span>
          </div>
          <div className="stat-icon-box blue">
            <UserCheck size={22} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-left">
            <span className="stat-title">Administratorlar Savdosi</span>
            <span className="stat-value">{stats.adminTotal.toLocaleString()} UZS</span>
            <span className="stat-sub">Kassa va boshqaruv savdosi</span>
          </div>
          <div className="stat-icon-box purple">
            <ShieldCheck size={22} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-left">
            <span className="stat-title">Vulkanizatorlar Savdosi</span>
            <span className="stat-value">{stats.tireTotal.toLocaleString()} UZS</span>
            <span className="stat-sub">Usta xizmatlari va montaj</span>
          </div>
          <div className="stat-icon-box amber">
            <Wrench size={22} />
          </div>
        </div>
      </div>

      {/* Role Filter Tabs (Sotuvchi / Administrator / Vulkanizator) */}
      <div className="role-filter-bar">
        <span className="filter-bar-label">Mas'ul xodim bo'yicha saralash:</span>

        <button 
          className={`role-tab-btn ${roleFilter === 'all' ? 'active' : ''}`}
          onClick={() => { setRoleFilter('all'); setCurrentPage(1); }}
        >
          <span>Barchasi</span>
          <span className="role-count-pill">{sales.length}</span>
        </button>

        <button 
          className={`role-tab-btn seller ${roleFilter === 'sotuvchi' ? 'active' : ''}`}
          onClick={() => { setRoleFilter('sotuvchi'); setCurrentPage(1); }}
        >
          <UserCheck size={14} />
          <span>Sotuvchi</span>
          <span className="role-count-pill">{sales.filter(s => s.role === 'sotuvchi').length}</span>
        </button>

        <button 
          className={`role-tab-btn admin ${roleFilter === 'administrator' ? 'active' : ''}`}
          onClick={() => { setRoleFilter('administrator'); setCurrentPage(1); }}
        >
          <ShieldCheck size={14} />
          <span>Administrator</span>
          <span className="role-count-pill">{sales.filter(s => s.role === 'administrator').length}</span>
        </button>

        <button 
          className={`role-tab-btn tire ${roleFilter === 'vulkanizator' ? 'active' : ''}`}
          onClick={() => { setRoleFilter('vulkanizator'); setCurrentPage(1); }}
        >
          <Wrench size={14} />
          <span>Vulkanizator</span>
          <span className="role-count-pill">{sales.filter(s => s.role === 'vulkanizator').length}</span>
        </button>

        <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>Holati:</span>
          <select 
            className="select-input" 
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
            style={{ height: '32px', fontSize: '0.775rem', paddingRight: '1.8rem' }}
          >
            <option value="all">Barcha holatlar</option>
            <option value="To'landi">To'landi</option>
            <option value="Bekor qilindi">Bekor qilindi</option>
            <option value="Qisman">Qisman</option>
          </select>
        </div>
      </div>

      {/* Main Sales Table Matching Screenshot 2 */}
      <div className="table-card">
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>MIJOZ</th>
                <th>TELEFON</th>
                <th>NOMER MASHINI</th>
                <th>MERCHANT</th>
                <th>SANA</th>
                <th>JAMI (VSYEGO)</th>
                <th>TO'LANDI</th>
                <th>QARZ (OCHIQ)</th>
                <th>HOLAT</th>
                <th>MAS'UL XODIM</th>
                <th style={{ textAlign: 'center' }}>CHEK</th>
              </tr>
            </thead>
            <tbody>
              {paginatedSales.length > 0 ? (
                paginatedSales.map((sale) => (
                  <tr key={sale.id}>
                    {/* ID */}
                    <td className="table-cell-id">{sale.id}</td>

                    {/* Mijoz */}
                    <td>
                      <div className="table-cell-client">{sale.client}</div>
                      {sale.carModel && (
                        <div className="table-cell-sub">{sale.carModel}</div>
                      )}
                    </td>

                    {/* Telefon */}
                    <td style={{ fontFamily: 'var(--font-mono)' }}>
                      {sale.phone}
                    </td>

                    {/* Nomer mashini */}
                    <td>
                      {sale.carNumber ? (
                        <span className="plate-badge">{sale.carNumber}</span>
                      ) : (
                        <span style={{ color: 'var(--text-light)' }}>-</span>
                      )}
                    </td>

                    {/* Merchant */}
                    <td>
                      <div style={{ fontSize: '0.8rem', fontWeight: '500' }}>{sale.merchant}</div>
                    </td>

                    {/* Sana */}
                    <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                      {sale.date}
                    </td>

                    {/* Jami */}
                    <td style={{ fontWeight: '700' }}>
                      {sale.totalAmount.toLocaleString()} UZS
                    </td>

                    {/* Yopilgan summa */}
                    <td style={{ fontWeight: '600', color: 'var(--success)' }}>
                      {sale.paidAmount.toLocaleString()} UZS
                    </td>

                    {/* Ochiq summa */}
                    <td style={{ fontWeight: '600', color: sale.remainingAmount > 0 ? 'var(--danger)' : 'var(--text-muted)' }}>
                      {sale.remainingAmount.toLocaleString()} UZS
                    </td>

                    {/* Holat */}
                    <td>
                      {getStatusBadge(sale.status)}
                    </td>

                    {/* Mas'ul Xodim (Sotuvchi, Admin, Vulkanizator) */}
                    <td>
                      <div>
                        {getRoleBadge(sale.role, sale.staffName)}
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                          {sale.staffName ? sale.staffName.split(' ')[0] : ''}
                        </div>
                      </div>
                    </td>

                    {/* Chek & Amallar */}
                    <td>
                      <div className="action-buttons-group" style={{ justifyContent: 'center' }}>
                        {/* Green Print Button */}
                        <button 
                          type="button"
                          className="btn-table-action print" 
                          onClick={() => onPrintReceipt(sale)}
                          title="Chekni chop etish"
                          aria-label="Chek"
                        >
                          <Printer size={15} />
                        </button>

                        {/* Blue View Details Button */}
                        <button 
                          type="button"
                          className="btn-table-action view" 
                          onClick={() => onViewDetails(sale)}
                          title="Tafsilotlarni ko'rish"
                          aria-label="Ko'rish"
                        >
                          <Eye size={15} />
                        </button>

                        {/* Blue Refresh Button */}
                        <button 
                          type="button"
                          className="btn-table-action refresh" 
                          onClick={() => onRefreshSale(sale.id)}
                          title="Qayta yuklash / yangilash"
                          aria-label="Yangilash"
                        >
                          <RotateCw size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={12}>
                    <div className="empty-state">
                      <div className="empty-state-icon">
                        <ShoppingBag size={28} />
                      </div>
                      <div style={{ fontWeight: '600', fontSize: '1rem' }}>Sotuvlar topilmadi</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                        Qidiruv mezonlariga mos keladigan ma'lumotlar mavjud emas
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
