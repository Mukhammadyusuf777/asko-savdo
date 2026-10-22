import React, { useState } from 'react';
import { 
  Menu, Search, Moon, Sun, ChevronDown, CheckCircle2 
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
