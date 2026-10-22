import React from 'react';
import { 
  ShoppingCart, History, BarChart3, 
  Receipt, ArrowLeftRight, Archive, 
  ShoppingBag 
} from 'lucide-react';

export function Sidebar({ currentView, setCurrentView, isCollapsed }) {
  if (isCollapsed) return null;

  // Foydalanuvchi talabi bo'yicha FAQAT 7 ta bo'lim qoldirildi:
  // 1. sotuv
  // 2. sotuvlar tarixi
  // 3. sotuvlar tahlili
  // 4. kassa hisoboti
  // 5. zaxiralarni ko'chirish
  // 6. ombor qoldiqlari
  // 7. tovarga buyurtma
  const menuSections = [
    {
      title: 'SOTUVLAR',
      items: [
        { id: 'sotuv', label: 'Sotuv', icon: ShoppingCart },
        { id: 'tarix', label: 'Sotuvlar tarixi', icon: History },
        { id: 'tahlil', label: 'Sotuvlar tahlili', icon: BarChart3 }
      ]
    },
    {
      title: 'MOLIYA',
      items: [
        { id: 'kassa', label: 'Kassa hisoboti', icon: Receipt }
      ]
    },
    {
      title: 'OMBOR',
      items: [
        { id: 'kochirish', label: 'Zaxiralarni ko\'chirish', icon: ArrowLeftRight, badge: '1' },
        { id: 'ombor', label: 'Ombor qoldiqlari', icon: Archive }
      ]
    },
    {
      title: 'BUYURTMALAR',
      items: [
        { id: 'buyurtma-tovar', label: 'Tovarga buyurtma', icon: ShoppingBag }
      ]
    }
  ];

  return (
    <aside className="app-sidebar">
      {menuSections.map((section, idx) => (
        <div key={idx} className="sidebar-group">
          <div className="sidebar-group-title">{section.title}</div>
          {section.items.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => setCurrentView(item.id)}
              >
                <div className="sidebar-nav-label">
                  <Icon size={17} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="sidebar-badge">{item.badge}</span>
                )}
              </button>
            );
          })}
        </div>
      ))}
    </aside>
  );
}
