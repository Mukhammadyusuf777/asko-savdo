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

// Ombor qoldiqlari (Screenshot 1 dagi haqiqiy ma'lumotlar asosida)
export const INITIAL_PRODUCTS = [
  {
    id: 'p1',
    code: 'SHN0613',
    name: 'Yallama 195/60/15',
    category: 'Shinalar',
    brand: 'Shina Yallama',
    mera: '195/60/15',
    quantity: 44,
    costPrice: 420000,
    price: 510000,
    unit: 'dona',
    branch: 'AN2',
    image: 'tire1',
    minStock: 8
  },
  {
    id: 'p2',
    code: 'AF0007',
    name: 'CARASCO DIVORNIY SUV 20 KO\'K',
    category: 'Avtokimyo',
    brand: 'CAR ASKO',
    mera: '-',
    quantity: 30,
    costPrice: 32000,
    price: 45000,
    unit: 'dona',
    branch: 'AN2',
    image: 'chem1',
    minStock: 10
  },
  {
    id: 'p3',
    code: 'SHN0955',
    name: 'Didar TOURING 771 185/65/14',
    category: 'Shinalar',
    brand: 'DIDAR',
    mera: '185/65/14',
    quantity: 24,
    costPrice: 340000,
    price: 410000,
    unit: 'dona',
    branch: 'AN2',
    image: 'tire2',
    minStock: 8
  },
  {
    id: 'p4',
    code: 'SHN0798',
    name: 'Yallama 185/65/14',
    category: 'Shinalar',
    brand: 'Shina Yallama',
    mera: '185/65/14',
    quantity: 20,
    costPrice: 350000,
    price: 420000,
    unit: 'dona',
    branch: 'AN2',
    image: 'tire1',
    minStock: 8
  },
  {
    id: 'p5',
    code: 'SHN0206',
    name: 'Fortuna ECOPLUS2 4S 205/70/14',
    category: 'Shinalar',
    brand: 'Fortuna',
    mera: '205/70/14',
    quantity: 20,
    costPrice: 430000,
    price: 520000,
    unit: 'dona',
    branch: 'AN2',
    image: 'tire3',
    minStock: 4
  },
  {
    id: 'p6',
    code: 'SHN1181',
    name: 'Altaire CROSSCLIMATE 195/60/15',
    category: 'Shinalar',
    brand: 'Altaire',
    mera: '195/60/15',
    quantity: 20,
    costPrice: 400000,
    price: 490000,
    unit: 'dona',
    branch: 'AN2',
    image: 'tire2',
    minStock: 6
  },
  {
    id: 'p7',
    code: 'SHN0956',
    name: 'Didar TOURING 771 195/60/15',
    category: 'Shinalar',
    brand: 'DIDAR',
    mera: '195/60/15',
    quantity: 20,
    costPrice: 390000,
    price: 470000,
    unit: 'dona',
    branch: 'AN2',
    image: 'tire2',
    minStock: 8
  },
  {
    id: 'p8',
    code: 'SHN0951',
    name: 'Didar TOURING 771 205/65/15',
    category: 'Shinalar',
    brand: 'DIDAR',
    mera: '205/65/15',
    quantity: 20,
    costPrice: 450000,
    price: 550000,
    unit: 'dona',
    branch: 'AN2',
    image: 'tire3',
    minStock: 6
  },
  {
    id: 'p9',
    code: 'AF0003',
    name: 'ANTIFRIZ 1KG ko\'k -40',
    category: 'Avtokimyo',
    brand: 'CAR ASKO',
    mera: 'ko\'k -40',
    quantity: 18,
    costPrice: 19000,
    price: 28000,
    unit: 'dona',
    branch: 'AN2',
    image: 'chem2',
    minStock: 12
  },
  {
    id: 'p10',
    code: 'SHN0949',
    name: 'Didar TOURING 771 195/65/15',
    category: 'Shinalar',
    brand: 'DIDAR',
    mera: '195/65/15',
    quantity: 18,
    costPrice: 400000,
    price: 485000,
    unit: 'dona',
    branch: 'AN2',
    image: 'tire2',
    minStock: 6
  },
  {
    id: 'p11',
    code: 'SHN2034',
    name: 'Michelin Energy Saver+ 195/65/15',
    category: 'Shinalar',
    brand: 'Michelin',
    mera: '195/65/15',
    quantity: 12,
    costPrice: 650000,
    price: 780000,
    unit: 'dona',
    branch: 'AN2',
    image: 'tire1',
    minStock: 4
  },
  {
    id: 'p12',
    code: 'OIL004',
    name: 'Castrol Magnatec 5W-40 4L',
    category: 'Moylar',
    brand: 'Castrol',
    mera: '4L',
    quantity: 15,
    costPrice: 310000,
    price: 380000,
    unit: 'dona',
    branch: 'AN2',
    image: 'oil1',
    minStock: 5
  }
];

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
