import React, { useMemo } from 'react';
import { 
  BarChart3, UserCheck, ShieldCheck, Wrench, 
  TrendingUp, Award, Calendar, DollarSign, PieChart, Users
} from 'lucide-react';

export function AnalyticsView({ sales }) {
  const analytics = useMemo(() => {
    let sellerRevenue = 0, sellerCount = 0;
    let adminRevenue = 0, adminCount = 0;
    let tireRevenue = 0, tireCount = 0;

    sales.forEach(s => {
      if (s.status === 'Bekor qilindi') return;
      if (s.role === 'sotuvchi') {
        sellerRevenue += s.totalAmount;
        sellerCount++;
      } else if (s.role === 'administrator') {
        adminRevenue += s.totalAmount;
        adminCount++;
      } else if (s.role === 'vulkanizator') {
        tireRevenue += s.totalAmount;
        tireCount++;
      }
    });

    const totalRevenue = sellerRevenue + adminRevenue + tireRevenue || 1;
    const totalCount = sellerCount + adminCount + tireCount || 1;

    return {
      totalRevenue,
      totalCount,
      seller: { revenue: sellerRevenue, count: sellerCount, pct: Math.round((sellerRevenue / totalRevenue) * 100) },
      admin: { revenue: adminRevenue, count: adminCount, pct: Math.round((adminRevenue / totalRevenue) * 100) },
      tire: { revenue: tireRevenue, count: tireCount, pct: Math.round((tireRevenue / totalRevenue) * 100) }
    };
  }, [sales]);

  return (
    <div className="analytics-view">
      <div className="page-top-bar">
        <div className="page-title-area">
          <h1 className="page-title">Sotuvlar va Xodimlar Tahlili</h1>
          <span className="page-subtitle">(Sotuvchi, Administrator va Vulkanizator faoliyati ko'rsatkichlari)</span>
        </div>
      </div>

      {/* Role comparison cards */}
      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: '1.5rem' }}>
        {/* Sotuvchilar */}
        <div className="stat-card" style={{ borderTop: '4px solid #0284c7' }}>
          <div className="stat-card-left">
            <span className="stat-title" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <UserCheck size={16} color="#0284c7" />
              <span>Sotuvchilar Savdosi</span>
            </span>
            <span className="stat-value" style={{ color: '#0284c7' }}>
              {analytics.seller.revenue.toLocaleString()} UZS
            </span>
            <span className="stat-sub">
              {analytics.seller.count} ta bitim ({analytics.seller.pct}% umumiy tushumdan)
            </span>
          </div>
          <div className="stat-icon-box blue">
            <UserCheck size={24} />
          </div>
        </div>

        {/* Administratorlar */}
        <div className="stat-card" style={{ borderTop: '4px solid #7c3aed' }}>
          <div className="stat-card-left">
            <span className="stat-title" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={16} color="#7c3aed" />
              <span>Administratorlar Savdosi</span>
            </span>
            <span className="stat-value" style={{ color: '#7c3aed' }}>
              {analytics.admin.revenue.toLocaleString()} UZS
            </span>
            <span className="stat-sub">
              {analytics.admin.count} ta bitim ({analytics.admin.pct}% umumiy tushumdan)
            </span>
          </div>
          <div className="stat-icon-box purple">
            <ShieldCheck size={24} />
          </div>
        </div>

        {/* Vulkanizatorlar */}
        <div className="stat-card" style={{ borderTop: '4px solid #d97706' }}>
          <div className="stat-card-left">
            <span className="stat-title" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Wrench size={16} color="#d97706" />
              <span>Vulkanizatorlar Savdosi (Ustalar)</span>
            </span>
            <span className="stat-value" style={{ color: '#d97706' }}>
              {analytics.tire.revenue.toLocaleString()} UZS
            </span>
            <span className="stat-sub">
              {analytics.tire.count} ta bitim ({analytics.tire.pct}% umumiy tushumdan)
            </span>
          </div>
          <div className="stat-icon-box amber">
            <Wrench size={24} />
          </div>
        </div>
      </div>

      {/* Progress Bars for Market Share */}
      <div className="table-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1rem' }}>
          Savdo Ulushining Taqsimlanishi (Foizlarda)
        </h3>

        <div style={{ height: '24px', width: '100%', borderRadius: '12px', overflow: 'hidden', display: 'flex', marginBottom: '1rem', backgroundColor: '#e2e8f0' }}>
          <div 
            style={{ width: `${analytics.seller.pct}%`, backgroundColor: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.75rem', fontWeight: 'bold' }}
            title={`Sotuvchilar: ${analytics.seller.pct}%`}
          >
            {analytics.seller.pct > 8 ? `Sotuvchi ${analytics.seller.pct}%` : ''}
          </div>
          <div 
            style={{ width: `${analytics.admin.pct}%`, backgroundColor: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.75rem', fontWeight: 'bold' }}
            title={`Administratorlar: ${analytics.admin.pct}%`}
          >
            {analytics.admin.pct > 8 ? `Admin ${analytics.admin.pct}%` : ''}
          </div>
          <div 
            style={{ width: `${analytics.tire.pct}%`, backgroundColor: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.75rem', fontWeight: 'bold' }}
            title={`Vulkanizatorlar: ${analytics.tire.pct}%`}
          >
            {analytics.tire.pct > 8 ? `Vulkanizator ${analytics.tire.pct}%` : ''}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '14px', height: '14px', borderRadius: '4px', backgroundColor: '#0284c7' }} />
            <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>
              Sotuvchilar ulushi: {analytics.seller.revenue.toLocaleString()} UZS ({analytics.seller.pct}%)
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '14px', height: '14px', borderRadius: '4px', backgroundColor: '#7c3aed' }} />
            <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>
              Administratorlar ulushi: {analytics.admin.revenue.toLocaleString()} UZS ({analytics.admin.pct}%)
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '14px', height: '14px', borderRadius: '4px', backgroundColor: '#d97706' }} />
            <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>
              Vulkanizatorlar ulushi: {analytics.tire.revenue.toLocaleString()} UZS ({analytics.tire.pct}%)
            </span>
          </div>
        </div>
      </div>

      {/* Staff individual performance */}
      <div className="table-card">
        <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--border-color)', fontWeight: '700' }}>
          Xodimlar kesimida shaxsiy hisobot
        </div>
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>XODIM</th>
                <th>LAVOZIM / ROL</th>
                <th>SOTUVLAR SONI</th>
                <th>UMUMIY SAVDO HAJMI</th>
                <th>O'RTACHA CHEK</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: '700' }}>Alisher Qodirov</td>
                <td>
                  <span className="role-badge sotuvchi">Sotuvchi</span>
                </td>
                <td>4 ta</td>
                <td style={{ fontWeight: '700' }}>5 878 000 UZS</td>
                <td>1 469 500 UZS</td>
                <td><span className="status-pill success">Reja bajarilyapti</span></td>
              </tr>
              <tr>
                <td style={{ fontWeight: '700' }}>Jamshid Jo'rayev</td>
                <td>
                  <span className="role-badge administrator">Administrator</span>
                </td>
                <td>2 ta</td>
                <td style={{ fontWeight: '700' }}>5 560 000 UZS</td>
                <td>2 780 000 UZS</td>
                <td><span className="status-pill success">A'lo darajada</span></td>
              </tr>
              <tr>
                <td style={{ fontWeight: '700' }}>Sardor Usta</td>
                <td>
                  <span className="role-badge vulkanizator">Vulkanizator</span>
                </td>
                <td>2 ta</td>
                <td style={{ fontWeight: '700' }}>3 066 000 UZS</td>
                <td>1 533 000 UZS</td>
                <td><span className="status-pill success">Norma ustida</span></td>
              </tr>
              <tr>
                <td style={{ fontWeight: '700' }}>Rustam Usta</td>
                <td>
                  <span className="role-badge vulkanizator">Vulkanizator</span>
                </td>
                <td>1 ta</td>
                <td style={{ fontWeight: '700' }}>36 000 UZS</td>
                <td>36 000 UZS</td>
                <td><span className="status-pill warning">Servis navbati</span></td>
              </tr>
              <tr>
                <td style={{ fontWeight: '700' }}>Bobur Mirzayev</td>
                <td>
                  <span className="role-badge administrator">Administrator</span>
                </td>
                <td>1 ta</td>
                <td style={{ fontWeight: '700' }}>2 276 000 UZS</td>
                <td>2 276 000 UZS</td>
                <td><span className="status-pill success">Normada</span></td>
              </tr>
              <tr>
                <td style={{ fontWeight: '700' }}>Javohir Saidov</td>
                <td>
                  <span className="role-badge sotuvchi">Sotuvchi</span>
                </td>
                <td>1 ta</td>
                <td style={{ fontWeight: '700' }}>1 147 000 UZS</td>
                <td>1 147 000 UZS</td>
                <td><span className="status-pill success">Faol</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
