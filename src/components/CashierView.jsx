import React, { useMemo } from 'react';
import { Receipt, Banknote, CreditCard, CalendarClock, TrendingDown, ArrowDownLeft, ArrowUpRight } from 'lucide-react';

export function CashierView({ sales }) {
  const summary = useMemo(() => {
    let cash = 0;
    let card = 0;
    let installments = 0;
    let debt = 0;

    sales.forEach(s => {
      if (s.status === 'Bekor qilindi') return;
      if (s.paymentMethod === 'naqd') {
        cash += s.paidAmount;
      } else if (s.paymentMethod === 'humo' || s.paymentMethod === 'uzcard' || s.paymentMethod === 'click' || s.paymentMethod === 'payme') {
        card += s.paidAmount;
      } else if (s.paymentMethod === 'alif' || s.paymentMethod === 'alifx' || s.paymentMethod === 'uzum') {
        installments += s.paidAmount;
      }
      debt += s.remainingAmount;
    });

    return { cash, card, installments, debt, total: cash + card + installments };
  }, [sales]);

  return (
    <div className="cashier-view">
      <div className="page-top-bar">
        <div className="page-title-area">
          <h1 className="page-title">Kassa hisoboti</h1>
          <span className="page-subtitle">(Kunlik tushumlar, terminal va nasiya mablag'lari balansi)</span>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-left">
            <span className="stat-title">Naqd Pul Kassasi</span>
            <span className="stat-value">{summary.cash.toLocaleString()} UZS</span>
            <span className="stat-sub">Jami qabul qilingan naqd pul</span>
          </div>
          <div className="stat-icon-box green">
            <Banknote size={22} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-left">
            <span className="stat-title">Terminal & Kartalar</span>
            <span className="stat-value">{summary.card.toLocaleString()} UZS</span>
            <span className="stat-sub">Humo, Uzcard va Click</span>
          </div>
          <div className="stat-icon-box blue">
            <CreditCard size={22} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-left">
            <span className="stat-title">Muddatli To'lov (Alif / Uzum)</span>
            <span className="stat-value">{summary.installments.toLocaleString()} UZS</span>
            <span className="stat-sub">Nasiya orqali sotuvlar</span>
          </div>
          <div className="stat-icon-box purple">
            <CalendarClock size={22} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-left">
            <span className="stat-title">Ochiq Qarz Qoldiqlari</span>
            <span className="stat-value" style={{ color: summary.debt > 0 ? 'var(--danger)' : 'var(--text-main)' }}>
              {summary.debt.toLocaleString()} UZS
            </span>
            <span className="stat-sub">Mijozlardan kutilayotgan qarzlar</span>
          </div>
          <div className="stat-icon-box red">
            <ArrowDownLeft size={22} />
          </div>
        </div>
      </div>

      <div className="table-card">
        <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--border-color)', fontWeight: '700' }}>
          So'nggi kassa operatsiyalari ro'yxati
        </div>
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>OPERATSIYA ID</th>
                <th>SANA VA VAQT</th>
                <th>TO'LOV USULI</th>
                <th>MIJOZ</th>
                <th>SUMMA</th>
                <th>MAS'UL XODIM</th>
                <th>KASSA STATUSI</th>
              </tr>
            </thead>
            <tbody>
              {sales.slice(0, 8).map(s => (
                <tr key={s.id}>
                  <td className="table-cell-id">{s.id}</td>
                  <td>{s.date} {s.time}</td>
                  <td>{s.merchant}</td>
                  <td>{s.client}</td>
                  <td style={{ fontWeight: '700', color: s.status === 'Bekor qilindi' ? 'var(--text-light)' : 'var(--success)' }}>
                    {s.paidAmount.toLocaleString()} UZS
                  </td>
                  <td>{s.staffName}</td>
                  <td>
                    {s.status === 'Bekor qilindi' ? (
                      <span className="status-pill cancelled">Bekor qilindi</span>
                    ) : (
                      <span className="status-pill success">Kassaga tushdi</span>
                    )}
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
