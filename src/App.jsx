import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { SalesView } from './components/SalesView';
import { SalesHistoryView } from './components/SalesHistoryView';
import { AnalyticsView } from './components/AnalyticsView';
import { CashierView } from './components/CashierView';
import { StockTransferView } from './components/StockTransferView';
import { InventoryView } from './components/InventoryView';
import { OrdersView } from './components/OrdersView';
import { NewSaleModal } from './components/NewSaleModal';
import { ReceiptModal } from './components/ReceiptModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';

import { 
  INITIAL_BRANCHES, 
  INITIAL_PRODUCTS, 
  INITIAL_SERVICES, 
  INITIAL_SALES 
} from './data/initialData';

export function App() {
  // Theme state
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('asko_theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('asko_theme', theme);
  }, [theme]);

  // Sidebar toggle
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Active view - FAQAT 7 TA SO'RALGAN BO'LIM:
  // 1. 'sotuv' - Sotuv
  // 2. 'tarix' - Sotuvlar tarixi
  // 3. 'tahlil' - Sotuvlar tahlili
  // 4. 'kassa' - Kassa hisoboti
  // 5. 'kochirish' - Zaxiralarni ko'chirish
  // 6. 'ombor' - Ombor qoldiqlari
  // 7. 'buyurtma-tovar' - Tovarga buyurtma
  const [currentView, setCurrentView] = useState('sotuv');

  // Branches
  const [branches] = useState(INITIAL_BRANCHES);
  const [selectedBranch, setSelectedBranch] = useState(INITIAL_BRANCHES[0]);

  // Products (Ombor qoldiqlari)
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('asko_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  // Services
  const [services] = useState(INITIAL_SERVICES);

  // Sales (Sotuvlar)
  const [sales, setSales] = useState(() => {
    const saved = localStorage.getItem('asko_sales');
    return saved ? JSON.parse(saved) : INITIAL_SALES;
  });

  // Modals state
  const [isNewSaleOpen, setIsNewSaleOpen] = useState(false);
  const [receiptSale, setReceiptSale] = useState(null);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  // Sync with Cloudflare D1 API if available
  useEffect(() => {
    fetch('/api/products')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        }
      })
      .catch(() => {});

    fetch('/api/sales')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (Array.isArray(data)) {
          setSales(data);
        }
      })
      .catch(() => {});
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('asko_sales', JSON.stringify(sales));
  }, [sales]);

  useEffect(() => {
    localStorage.setItem('asko_products', JSON.stringify(products));
  }, [products]);

  // Handle Ctrl+K shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Save new sale & deduct stock
  const handleSaveSale = (newSale, printAfter = false) => {
    // 1. Add to sales list (at top)
    setSales(prev => [newSale, ...prev]);

    // 2. Automatically deduct products from inventory
    if (newSale.items && newSale.items.length > 0) {
      setProducts(prevProducts => {
        return prevProducts.map(prod => {
          const purchasedItem = newSale.items.find(item => item.id === prod.id && !item.isService);
          if (purchasedItem) {
            const updatedQty = Math.max(0, prod.quantity - purchasedItem.quantity);
            return { ...prod, quantity: updatedQty };
          }
          return prod;
        });
      });
    }

    // 3. Post to Cloudflare D1 API
    fetch('/api/sales', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSale)
    }).catch(() => {});

    const roleName = newSale.role === 'vulkanizator' ? 'Vulkanizator' : newSale.role === 'administrator' ? 'Administrator' : 'Sotuvchi';
    addToast(`Yangi sotuv rasmiylashtirildi! Mas'ul: ${roleName} (${newSale.id})`, 'success');

    if (printAfter) {
      setReceiptSale(newSale);
      setIsReceiptOpen(true);
    }
  };

  // Add stock or restock item
  const handleAddStock = (item) => {
    setProducts(prev => {
      const existsIndex = prev.findIndex(p => p.id === item.id);
      if (existsIndex >= 0) {
        const updated = [...prev];
        updated[existsIndex] = item;
        return updated;
      } else {
        return [item, ...prev];
      }
    });

    // Post to Cloudflare D1 API
    fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    }).catch(() => {});

    addToast(`${item.name} omborga muvaffaqiyatli kiritildi!`, 'success');
  };

  // Refresh single sale simulation
  const handleRefreshSale = (saleId) => {
    addToast(`Chek № ${saleId} ma'lumotlari yangilandi!`, 'success');
  };

  // Print receipt modal trigger
  const handlePrintReceipt = (sale) => {
    setReceiptSale(sale);
    setIsReceiptOpen(true);
  };

  // View details
  const handleViewDetails = (sale) => {
    setReceiptSale(sale);
    setIsReceiptOpen(true);
  };

  return (
    <div className="app-container">
      {/* Top Header */}
      <Header 
        theme={theme}
        setTheme={setTheme}
        onToggleSidebar={() => setIsSidebarCollapsed(prev => !prev)}
        onOpenSearchModal={() => setIsSearchOpen(true)}
        selectedBranch={selectedBranch}
        branches={branches}
        onSelectBranch={setSelectedBranch}
      />

      <div className="app-layout">
        {/* Left Sidebar (Only 7 Items) */}
        <Sidebar 
          currentView={currentView}
          setCurrentView={setCurrentView}
          isCollapsed={isSidebarCollapsed}
        />

        {/* Main Content Area */}
        <main className="app-main">
          {/* 1. SOTUV */}
          {currentView === 'sotuv' && (
            <SalesView 
              sales={sales}
              onOpenNewSale={() => setIsNewSaleOpen(true)}
              onPrintReceipt={handlePrintReceipt}
              onViewDetails={handleViewDetails}
              onRefreshSale={handleRefreshSale}
            />
          )}

          {/* 2. SOTUVLAR TARIXI */}
          {currentView === 'tarix' && (
            <SalesHistoryView 
              sales={sales}
              onPrintReceipt={handlePrintReceipt}
              onViewDetails={handleViewDetails}
            />
          )}

          {/* 3. SOTUVLAR TAHLILI */}
          {currentView === 'tahlil' && (
            <AnalyticsView sales={sales} />
          )}

          {/* 4. KASSA HISOBOTI */}
          {currentView === 'kassa' && (
            <CashierView sales={sales} />
          )}

          {/* 5. ZAXIRALARNI KO'CHIRISH */}
          {currentView === 'kochirish' && (
            <StockTransferView 
              products={products}
              branches={branches}
            />
          )}

          {/* 6. OMBOR QOLDIQLARI */}
          {currentView === 'ombor' && (
            <InventoryView 
              products={products}
              onAddStock={handleAddStock}
              branches={branches}
              selectedBranch={selectedBranch}
              onSelectBranch={setSelectedBranch}
            />
          )}

          {/* 7. TOVARGA BUYURTMA */}
          {currentView === 'buyurtma-tovar' && (
            <OrdersView products={products} />
          )}
        </main>
      </div>

      {/* New Sale Modal (With the Mandatory Sotuvchi / Administrator / Vulkanizator Selector) */}
      <NewSaleModal 
        isOpen={isNewSaleOpen}
        onClose={() => setIsNewSaleOpen(false)}
        onSaveSale={handleSaveSale}
        products={products}
        services={services}
        selectedBranch={selectedBranch}
      />

      {/* Printable Receipt Modal */}
      <ReceiptModal 
        sale={receiptSale}
        isOpen={isReceiptOpen}
        onClose={() => setIsReceiptOpen(false)}
      />

      {/* Global Search Modal (Ctrl+K) */}
      <GlobalSearchModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        sales={sales}
        products={products}
        onSelectSale={(sale) => {
          setCurrentView('sotuv');
          handlePrintReceipt(sale);
        }}
        onSelectProduct={() => {
          setCurrentView('ombor');
        }}
      />

      {/* Toast Notifications */}
      <div className="toast-container">
        {toasts.map(toast => (
          <div key={toast.id} className={`toast ${toast.type}`}>
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
