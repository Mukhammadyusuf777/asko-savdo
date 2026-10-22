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
export const INITIAL_SALES = [
  {
    id: 'AN2-237241',
    client: 'Shokirov Xurshidbek',
    phone: '998932141003',
    carNumber: '60L387HB',
    carModel: 'Chevrolet Cobalt',
    merchant: 'AKSIYA 0-0-4 (ALIF) - 0%',
    paymentMethod: 'alif',
    date: '21.10.2026',
    time: '14:32',
    totalAmount: 2040000,
    paidAmount: 2040000,
    remainingAmount: 0,
    status: 'To\'landi',
    role: 'sotuvchi',
    staffName: 'Alisher Qodirov (Sotuvchi)',
    items: [
      { id: 'p1', code: 'SHN0613', name: 'Yallama 195/60/15', quantity: 4, price: 510000, total: 2040000 }
    ],
    notes: 'Alif 0-0-4 muddatli to\'lov orqali'
  },
  {
    id: 'AN2-237105',
    client: 'Xamidov Nurmuhammad',
    phone: '998882595700',
    carNumber: '60M557LB',
    carModel: 'Chevrolet Lacetti',
    merchant: 'Naqd - 0%',
    paymentMethod: 'naqd',
    date: '21.10.2026',
    time: '13:15',
    totalAmount: 2504000,
    paidAmount: 2504000,
    remainingAmount: 0,
    status: 'To\'landi',
    role: 'vulkanizator',
    staffName: 'Sardor Usta (Vulkanizator)',
    items: [
      { id: 'p5', code: 'SHN0206', name: 'Fortuna ECOPLUS2 4S 205/70/14', quantity: 4, price: 520000, total: 2080000 },
      { id: 'SRV001', code: 'XIZ-01', name: 'Shina montaj va balansirovka', quantity: 4, price: 25000, total: 100000 },
      { id: 'p2', code: 'AF0007', name: 'CARASCO DIVORNIY SUV 20 KO\'K', quantity: 1, price: 45000, total: 45000 },
      { id: 'SRV002', code: 'XIZ-02', name: 'Disk to\'g\'rilash', quantity: 4, price: 69750, total: 279000 }
    ],
    notes: 'Vulkanizatsiya xizmati to\'liq bajarildi'
  },
  {
    id: 'AN2-237026',
    client: 'Quvonov Tursunboy',
    phone: '998993120505',
    carNumber: '60R504DB',
    carModel: 'Tracker 2',
    merchant: 'Terminal HUMO - 0%',
    paymentMethod: 'humo',
    date: '21.10.2026',
    time: '12:40',
    totalAmount: 3104000,
    paidAmount: 3104000,
    remainingAmount: 0,
    status: 'Bekor qilindi',
    role: 'administrator',
    staffName: 'Jamshid Jo\'rayev (Administrator)',
    items: [
      { id: 'p8', code: 'SHN0951', name: 'Didar TOURING 771 205/65/15', quantity: 4, price: 550000, total: 2200000 }
    ],
    notes: 'Mijoz to\'lov kartasini almashtirish sababli bekor qilindi'
  },
  {
    id: 'AN2-237018',
    client: 'Quvonov Tursunboy',
    phone: '998993120505',
    carNumber: '60R504DB',
    carModel: 'Tracker 2',
    merchant: 'Terminal HUMO - 0%',
    paymentMethod: 'humo',
    date: '21.10.2026',
    time: '12:35',
    totalAmount: 3104000,
    paidAmount: 3104000,
    remainingAmount: 0,
    status: 'To\'landi',
    role: 'sotuvchi',
    staffName: 'Alisher Qodirov (Sotuvchi)',
    items: [
      { id: 'p8', code: 'SHN0951', name: 'Didar TOURING 771 205/65/15', quantity: 4, price: 550000, total: 2200000 },
      { id: 'p11', code: 'SHN2034', name: 'Michelin Energy Saver+ 195/65/15', quantity: 1, price: 780000, total: 780000 },
      { id: 'SRV001', code: 'XIZ-01', name: 'Shina montaj', quantity: 4, price: 31000, total: 124000 }
    ],
    notes: 'HUMO terminali orqali to\'liq yopildi'
  },
  {
    id: 'AN2-237017',
    client: 'Xamidov Nurmuhammad',
    phone: '998882595700',
    carNumber: '60M557LB',
    carModel: 'Gentra',
    merchant: 'Naqd - 0%',
    paymentMethod: 'naqd',
    date: '21.10.2026',
    time: '12:10',
    totalAmount: 36000,
    paidAmount: 36000,
    remainingAmount: 0,
    status: 'To\'landi',
    role: 'vulkanizator',
    staffName: 'Rustam Usta (Vulkanizator)',
    items: [
      { id: 'SRV003', code: 'XIZ-03', name: 'Vulkanizatsiya termoyamoq (Shina yamash)', quantity: 1, price: 36000, total: 36000 }
    ],
    notes: 'Orqa o\'ng g\'ildirak mix teshigi yamaldi'
  },
  {
    id: 'AN2-236873',
    client: 'Nazirov Eldorbek',
    phone: '998916091940',
    carNumber: '60Q021UA',
    carModel: 'Damas',
    merchant: 'AKSIYA 0-0-4 (UZUM) - 0%',
    paymentMethod: 'uzum',
    date: '21.10.2026',
    time: '11:45',
    totalAmount: 2276000,
    paidAmount: 2276000,
    remainingAmount: 0,
    status: 'To\'landi',
    role: 'administrator',
    staffName: 'Bobur Mirzayev (Administrator)',
    items: [
      { id: 'p7', code: 'SHN0956', name: 'Didar TOURING 771 195/60/15', quantity: 4, price: 470000, total: 1880000 },
      { id: 'OIL004', code: 'OIL004', name: 'Castrol Magnatec 5W-40 4L', quantity: 1, price: 380000, total: 380000 },
      { id: 'SRV004', code: 'XIZ-04', name: 'Ventel (soska)', quantity: 1, price: 16000, total: 16000 }
    ],
    notes: 'Uzum nasiya tasdiqlandi'
  },
  {
    id: 'AN2-236834',
    client: 'Qosimjonov Izzatulloh',
    phone: '998937898848',
    carNumber: '60B333CA',
    carModel: 'Nexia 3',
    merchant: 'ALIFX - 12%',
    paymentMethod: 'alifx',
    date: '21.10.2026',
    time: '11:20',
    totalAmount: 1147000,
    paidAmount: 1147000,
    remainingAmount: 0,
    status: 'To\'landi',
    role: 'sotuvchi',
    staffName: 'Javohir Saidov (Sotuvchi)',
    items: [
      { id: 'p4', code: 'SHN0798', name: 'Yallama 185/65/14', quantity: 2, price: 420000, total: 840000 },
      { id: 'p2', code: 'AF0007', name: 'CARASCO DIVORNIY SUV 20 KO\'K', quantity: 2, price: 45000, total: 90000 },
      { id: 'SRV001', code: 'XIZ-01', name: 'Shina montaj', quantity: 2, price: 25000, total: 50000 },
      { id: 'SRV005', code: 'XIZ-05', name: 'Azot damlash', quantity: 1, price: 167000, total: 167000 }
    ],
    notes: 'AlifX 12 oylik muddatli to\'lov'
  },
  {
    id: 'AN2-236776',
    client: 'G\'aniyev Umidjon',
    phone: '998941023313',
    carNumber: '60Q021UA',
    carModel: 'Matiz',
    merchant: 'Naqd - 0%',
    paymentMethod: 'naqd',
    date: '21.10.2026',
    time: '10:55',
    totalAmount: 562000,
    paidAmount: 562000,
    remainingAmount: 0,
    status: 'To\'landi',
    role: 'vulkanizator',
    staffName: 'Sardor Usta (Vulkanizator)',
    items: [
      { id: 'SRV002', code: 'XIZ-02', name: 'Disk to\'g\'rilash (R13-R16)', quantity: 4, price: 70000, total: 280000 },
      { id: 'SRV001', code: 'XIZ-01', name: 'Shina montaj va balansirovka', quantity: 4, price: 25000, total: 100000 },
      { id: 'p9', code: 'AF0003', name: 'ANTIFRIZ 1KG ko\'k -40', quantity: 4, price: 28000, total: 112000 },
      { id: 'SRV004', code: 'XIZ-04', name: 'Ventel almashtirish', quantity: 4, price: 17500, total: 70000 }
    ],
    notes: 'To\'liq disk to\'g\'rilash va qishki tayyorgarlik'
  },
  {
    id: 'AN2-236720',
    client: 'Abdullayev Sherzod',
    phone: '998911281608',
    carNumber: '60EB24WA',
    carModel: 'Spark',
    merchant: 'CLICK - 0%',
    paymentMethod: 'click',
    date: '21.10.2026',
    time: '10:12',
    totalAmount: 618000,
    paidAmount: 618000,
    remainingAmount: 0,
    status: 'To\'landi',
    role: 'sotuvchi',
    staffName: 'Alisher Qodirov (Sotuvchi)',
    items: [
      { id: 'p3', code: 'SHN0955', name: 'Didar TOURING 771 185/65/14', quantity: 1, price: 410000, total: 410000 },
      { id: 'SRV001', code: 'XIZ-01', name: 'Shina montaj va balansirovka', quantity: 1, price: 25000, total: 25000 },
      { id: 'OIL004', code: 'OIL004', name: 'Castrol Magnatec 5W-40 4L', quantity: 1, price: 183000, total: 183000 }
    ],
    notes: 'Click orqali to\'landi'
  },
  {
    id: 'AN2-236629',
    client: 'Azamat aka remont',
    phone: '998977752790',
    carNumber: '90',
    carModel: 'Bongo 3',
    merchant: 'Naqd - 0%',
    paymentMethod: 'naqd',
    date: '20.10.2026',
    time: '18:40',
    totalAmount: 2456000,
    paidAmount: 2456000,
    remainingAmount: 0,
    status: 'To\'landi',
    role: 'administrator',
    staffName: 'Jamshid Jo\'rayev (Administrator)',
    items: [
      { id: 'p6', code: 'SHN1181', name: 'Altaire CROSSCLIMATE 195/60/15', quantity: 4, price: 490000, total: 1960000 },
      { id: 'p9', code: 'AF0003', name: 'ANTIFRIZ 1KG ko\'k -40', quantity: 8, price: 28000, total: 224000 },
      { id: 'SRV001', code: 'XIZ-01', name: 'Shina montaj', quantity: 4, price: 25000, total: 100000 },
      { id: 'SRV005', code: 'XIZ-05', name: 'Azot damlash', quantity: 4, price: 43000, total: 172000 }
    ],
    notes: 'Katta partiya sotildi'
  }
];
