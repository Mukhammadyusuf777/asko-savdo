import React from 'react';
import { Wrench, Plus, CheckCircle2, DollarSign, Clock, Settings } from 'lucide-react';

export function ServicesView({ services }) {
  return (
    <div className="services-view">
      <div className="page-top-bar">
        <div className="page-title-area">
          <h1 className="page-title">Xizmatlar (Vulkanizatsiya & Montaj)</h1>
          <span className="page-subtitle">(Avtoservis va shina montaj xizmatlari tarifi)</span>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-left">
            <span className="stat-title">Xizmat Turlari</span>
            <span className="stat-value">{services.length} ta xizmat</span>
            <span className="stat-sub">Vulkanizatsiya va ta'mirlash</span>
          </div>
          <div className="stat-icon-box amber">
            <Wrench size={22} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-left">
            <span className="stat-title">Bajaruvchi Ustalar</span>
            <span className="stat-value">2 nafar usta</span>
            <span className="stat-sub">Sardor Usta, Rustam Usta</span>
          </div>
          <div className="stat-icon-box blue">
            <Settings size={22} />
          </div>
        </div>
      </div>

      <div className="table-card">
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>KODI</th>
                <th>XIZMAT NOMI</th>
                <th>KATEGORIYA</th>
                <th>NARXI (UZS)</th>
                <th>USTA ULUSHI</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {services.map(s => (
                <tr key={s.id}>
                  <td className="table-cell-id">{s.code}</td>
                  <td style={{ fontWeight: '600' }}>{s.name}</td>
                  <td>
                    <span className="role-badge vulkanizator">
                      <Wrench size={12} />
                      <span>{s.category}</span>
                    </span>
                  </td>
                  <td style={{ fontWeight: '700' }}>{s.price.toLocaleString()} UZS</td>
                  <td style={{ color: 'var(--success)', fontWeight: '600' }}>
                    {(s.price * 0.4).toLocaleString()} UZS (40%)
                  </td>
                  <td>
                    <span className="status-pill success">Faol</span>
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
