// ASKO Savdo va Ombor Tizimi - Boshlang'ich Ma'lumotlar Bazasi

export const INITIAL_BRANCHES = [
  { id: 'AN2', name: 'AN2 - Andijon shahar filiali', address: 'Andijon sh., Amir Temur shox ko\'chasi, 45-uy' },
  { id: 'AN1', name: 'AN1 - Asaka markaziy ombori', address: 'Asaka sh., Avtomobilchilar ko\'chasi, 12' },
  { id: 'TSH1', name: 'TSH1 - Toshkent Sergeli filiali', address: 'Toshkent sh., Sergeli mashina bozori, 7-do\'kon' }
];

export const STAFF_ROLES = [
  {
    id: 'sotuvchi',
    label: 'Sotuvchi',
    desc: 'Savdo zali mas\'uli / Tovar sotuvi',
    badgeClass: 'badge-seller',
    color: '#0284c7',
    icon: 'UserCheck'
  },
  {
    id: 'administrator',
    label: 'Administrator',
    desc: 'Filial ma\'muri / Kassa boshqaruvchisi',
    badgeClass: 'badge-admin',
    color: '#7c3aed',
    icon: 'ShieldCheck'
  },
  {
    id: 'vulkanizator',
    label: 'Vulkanizator',
    desc: 'Usta / Shina montaj & ta\'mirlash',
    badgeClass: 'badge-tire',
    color: '#d97706',
    icon: 'Wrench'
  }
];

export const STAFF_MEMBERS = [
  { id: 'st1', name: 'Alisher Qodirov', role: 'sotuvchi', phone: '+998 90 123 45 67', branch: 'AN2' },
  { id: 'st2', name: 'Javohir Saidov', role: 'sotuvchi', phone: '+998 91 234 56 78', branch: 'AN2' },
  { id: 'st3', name: 'Jamshid Jo\'rayev', role: 'administrator', phone: '+998 93 345 67 89', branch: 'AN2' },
  { id: 'st4', name: 'Bobur Mirzayev', role: 'administrator', phone: '+998 94 456 78 90', branch: 'AN2' },
  { id: 'st5', name: 'Sardor Usta (Vulkanizator)', role: 'vulkanizator', phone: '+998 97 567 89 01', branch: 'AN2' },
  { id: 'st6', name: 'Rustam Usta (Vulkanizator)', role: 'vulkanizator', phone: '+998 98 678 90 12', branch: 'AN2' }
];

export const PAYMENT_METHODS = [
  { id: 'naqd', name: 'Naqd - 0%', group: 'naqd', icon: 'Banknote' },
  { id: 'humo', name: 'Terminal HUMO - 0%', group: 'terminal', icon: 'CreditCard' },
  { id: 'uzcard', name: 'Terminal UZCARD - 0%', group: 'terminal', icon: 'CreditCard' },
  { id: 'click', name: 'CLICK - 0%', group: 'online', icon: 'Smartphone' },
  { id: 'payme', name: 'Payme - 0%', group: 'online', icon: 'Smartphone' },
  { id: 'alif', name: 'AKSIYA 0-0-4 (ALIF) - 0%', group: 'nasiya', icon: 'CalendarClock' },
  { id: 'alifx', name: 'ALIFX - 12%', group: 'nasiya', icon: 'CalendarClock' },
  { id: 'uzum', name: 'AKSIYA 0-0-4 (UZUM) - 0%', group: 'nasiya', icon: 'ShoppingBag' }
];

// Ombor qoldiqlari - Boshlang'ich toza holat (Yangi tovarlar foydalanuvchi tomonidan kiritiladi)
export const INITIAL_PRODUCTS = [];


// Xizmatlar (Vulkanizatsiya va Shina montaj)
export const INITIAL_SERVICES = [
  { id: 'SRV001', code: 'XIZ-01', name: 'Shina montaj va balansirovka (1 dona)', price: 25000, category: 'Montaj' },
  { id: 'SRV002', code: 'XIZ-02', name: 'Disk to\'g\'rilash (R13-R16)', price: 70000, category: 'Ta\'mirlash' },
  { id: 'SRV003', code: 'XIZ-03', name: 'Vulkanizatsiya termoyamoq (Shina yamash)', price: 36000, category: 'Vulkanizatsiya' },
  { id: 'SRV004', code: 'XIZ-04', name: 'Ventel (soska) almashtirish (Germaniya)', price: 15000, category: 'Aksessuar' },
  { id: 'SRV005', code: 'XIZ-05', name: 'Azot bilan shina damlash (4 ta g\'ildirak)', price: 30000, category: 'Servis' }
];

// Sotuvlar (Screenshot 2 dagi haqiqiy ro'yxat va rollar)
export const INITIAL_SALES = [];
