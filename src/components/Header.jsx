import React, { useState } from 'react';
import { 
  Menu, Search, Bell, MessageSquare, Volume2, 
  Moon, Sun, ChevronDown, CheckCircle2 
} from 'lucide-react';

export function Header({ 
  theme, 
  setTheme, 
  onToggleSidebar, 
  onOpenSearchModal,
  selectedBranch,
  branches,
  onSelectBranch 
}) {
  const [showBranchMenu, setShowBranchMenu] = useState(false);

  return (
    <header className="app-header">
      <div className="header-left">
        <button 
          className="btn-icon-ghost" 
          onClick={onToggleSidebar}
          title="Menyuni yashirish/ko'rsatish"
          aria-label="Menyu"
        >
          <Menu size={20} />
        </button>

        <div className="logo-wrapper">
          <div className="logo-text">
            <span>A</span>SK<span>O</span>
          </div>
          <span className="logo-badge">PRO</span>
        </div>
      </div>

      <div className="header-search">
        <div className="search-input-wrapper">
          <Search size={16} className="search-icon" />
          <input 
            type="text" 
            placeholder="Qidiruv (Mijoz, Tovar, Chek ID, Mashina raqami)..." 
            className="global-search-input"
            onClick={onOpenSearchModal}
            readOnly
          />
          <kbd className="search-shortcut-badge">Ctrl K</kbd>
        </div>
      </div>

      <div className="header-right">
        {/* Reyting */}
        <div className="metric-pill" title="Filial xizmat ko'rsatish reytingi">
          <span className="metric-label">Reyting</span>
          <span className="metric-val green">95.36%</span>
        </div>

        {/* Dollar kursi */}
        <div className="metric-pill" title="Markaziy Bank dollar kursi">
          <span className="metric-label">Kurs dollara</span>
          <span className="metric-val">12 100 UZS</span>
        </div>

        {/* Hilal / Oylik reja */}
        <div className="metric-pill" title="Oylik shina va xizmat sotuv rejasi">
          <span className="metric-label">Oylik reja</span>
          <span className="metric-val">850</span>
        </div>

        {/* Kunlik norma */}
        <div className="metric-pill" title="Kunlik minimal sotuv normasi">
          <span className="metric-label">Kunlik norma</span>
          <span className="metric-val">25</span>
        </div>

        {/* Bildirishnomalar */}
        <button className="header-action-btn" title="Bildirishnomalar" aria-label="Bildirishnomalar">
          <Bell size={18} />
          <span className="badge-counter">1</span>
        </button>

        {/* Xabarlar */}
        <button className="header-action-btn" title="Mijozlar murojaatlari" aria-label="Xabarlar">
          <MessageSquare size={18} />
          <span className="badge-counter">99+</span>
        </button>

        {/* E'lonlar */}
        <button className="header-action-btn" title="Ichki e'lonlar" aria-label="E'lonlar">
          <Volume2 size={18} />
        </button>

        {/* Mavzu (Dark/Light) */}
        <button 
          className="header-action-btn" 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          title={theme === 'dark' ? "Yorug' mavzuga o'tish" : "Tungi mavzuga o'tish"}
          aria-label="Mavzuni almashtirish"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Foydalanuvchi profili va filial */}
        <div 
          className="user-profile-badge"
          onClick={() => setShowBranchMenu(!showBranchMenu)}
          title="Filial va foydalanuvchi ma'lumotlari"
        >
          <div className="user-avatar">
            {selectedBranch.id}
          </div>
          <div className="user-info">
            <span className="user-name">Andijon2</span>
            <span className="user-role-label">Kassir / Operator</span>
          </div>
          <ChevronDown size={14} color="var(--text-muted)" />
        </div>
      </div>
    </header>
  );
}
