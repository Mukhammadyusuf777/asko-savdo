import React, { useState, useMemo } from 'react';
import { 
  History, Search, Calendar, FileSpreadsheet, Printer, 
  Eye, UserCheck, ShieldCheck, Wrench, Filter 
} from 'lucide-react';
import * as XLSX from 'xlsx';

export function SalesHistoryView({ sales, onPrintReceipt, onViewDetails }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [periodFilter, setPeriodFilter] = useState('all'); // 'all', 'today', 'week', 'month'
  const [roleFilter, setRoleFilter] = useState('all');

  const filteredHistory = useMemo(() => {
    return sales.filter(s => {
      if (roleFilter !== 'all' && s.role !== roleFilter) return false;
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        return (
          s.id.toLowerCase().includes(query) ||
          s.client.toLowerCase().includes(query) ||
          s.phone.includes(query) ||
          (s.carNumber || '').toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [sales, roleFilter, searchTerm]);

  const handleExportExcel = () => {
    const exportData = filteredHistory.map(s => ({
      'Chek №': s.id,
      'Sana': `${s.date} ${s.time || ''}`,
      'Mijoz': s.client,
      'Telefon': s.phone,
      'Mashina Raqami': s.carNumber || '-',
      'To\'lov Usuli': s.merchant,
      'Jami (UZS)': s.totalAmount,
      'To\'landi (UZS)': s.paidAmount,
      'Qarz (UZS)': s.remainingAmount,
      'Holati': s.status,
      'Mas\'ul Xodim': s.staffName || s.role
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sotuvlar_Tarixi');
    XLSX.writeFile(workbook, `ASKO_Sotuvlar_Tarixi_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  return (
    <div className="sales-history-view">
      <div className="page-top-bar">
        <div className="page-title-area">
          <h1 className="page-title">Sotuvlar tarixi</h1>
          <span className="page-subtitle">(Barcha amalga oshirilgan savdolar arxivi)</span>
        </div>

        <div className="page-controls">
          <div className="table-search-wrapper">
            <Search size={15} className="table-search-icon" />
            <input 
              type="text" 
              placeholder="Arxivdan qidirish..." 
              className="table-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button className="btn-excel" onClick={handleExportExcel}>
            <FileSpreadsheet size={16} />
            <span>Excel arxiv</span>
          </button>
        </div>
      </div>

      {/* Role filter bar */}
      <div className="role-filter-bar">
        <span className="filter-bar-label">Xodim roli bo'yicha:</span>
        <button 
          className={`role-tab-btn ${roleFilter === 'all' ? 'active' : ''}`}
          onClick={() => setRoleFilter('all')}
        >
          <span>Barchasi ({sales.length})</span>
        </button>
        <button 
          className={`role-tab-btn seller ${roleFilter === 'sotuvchi' ? 'active' : ''}`}
          onClick={() => setRoleFilter('sotuvchi')}
        >
          <UserCheck size={14} />
          <span>Sotuvchi</span>
        </button>
        <button 
          className={`role-tab-btn admin ${roleFilter === 'administrator' ? 'active' : ''}`}
          onClick={() => setRoleFilter('administrator')}
        >
          <ShieldCheck size={14} />
          <span>Administrator</span>
        </button>
        <button 
          className={`role-tab-btn tire ${roleFilter === 'vulkanizator' ? 'active' : ''}`}
          onClick={() => setRoleFilter('vulkanizator')}
        >
          <Wrench size={14} />
          <span>Vulkanizator</span>
        </button>
      </div>

      {/* Table */}
      <div className="table-card">
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>CHEK №</th>
                <th>SANA VA VAQT</th>
                <th>MIJOZ</th>
                <th>MASHINA RAQAMI</th>
                <th>MERCHANT</th>
                <th>JAMI SUMMA</th>
                <th>TO'LANDI</th>
                <th>HOLAT</th>
                <th>MAS'UL ROL</th>
                <th style={{ textAlign: 'center' }}>CHEK</th>
              </tr>
            </thead>
            <tbody>
              {filteredHistory.map((s) => (
                <tr key={s.id}>
                  <td className="table-cell-id">{s.id}</td>
                  <td style={{ fontFamily: 'var(--font-mono)' }}>{s.date} {s.time}</td>
                  <td>
                    <div style={{ fontWeight: '600' }}>{s.client}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>+{s.phone}</div>
                  </td>
                  <td>
                    {s.carNumber ? <span className="plate-badge">{s.carNumber}</span> : '-'}
                  </td>
                  <td>{s.merchant}</td>
                  <td style={{ fontWeight: '700' }}>{s.totalAmount.toLocaleString()} UZS</td>
                  <td style={{ fontWeight: '600', color: 'var(--success)' }}>{s.paidAmount.toLocaleString()} UZS</td>
                  <td>
                    <span className={`status-pill ${s.status === 'To\'landi' ? 'success' : s.status === 'Bekor qilindi' ? 'cancelled' : 'warning'}`}>
                      {s.status}
                    </span>
                  </td>
                  <td>
                    <span className={`role-badge ${s.role}`}>
                      {s.role === 'sotuvchi' ? 'Sotuvchi' : s.role === 'administrator' ? 'Administrator' : 'Vulkanizator'}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <div className="action-buttons-group" style={{ justifyContent: 'center' }}>
                      <button 
                        className="btn-table-action print" 
                        onClick={() => onPrintReceipt(s)}
                        title="Chekni chop etish"
                      >
                        <Printer size={15} />
                      </button>
                      <button 
                        className="btn-table-action view" 
                        onClick={() => onViewDetails(s)}
                        title="Ko'rish"
                      >
                        <Eye size={15} />
                      </button>
                    </div>
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
