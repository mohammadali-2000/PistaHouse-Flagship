import confetti from 'canvas-confetti';

export const CURRENCIES = {
  INR: { symbol: '₹', rate: 1.0, label: 'INR (₹)' },
  USD: { symbol: '$', rate: 0.012, label: 'USD ($)' },
  AED: { symbol: 'AED ', rate: 0.044, label: 'AED (د.إ)' },
  SAR: { symbol: 'SAR ', rate: 0.045, label: 'SAR (﷼)' },
  GBP: { symbol: '£', rate: 0.0094, label: 'GBP (£)' }
};

export const PRODUCTS = [
  // 1. Biryani
  {
    id: 'ph-mutton-biryani',
    name: 'Zafrani Mutton Biryani (Heat & Eat Travel Pack)',
    category: 'biryani',
    weight: '850g (Serves 2-3)',
    priceINR: 949,
    badge: 'Best Seller',
    badgeType: 'zafran',
    image: './assets/travel_pack_box.jpg',
    description: 'Authentic Hyderabadi Dum Biryani with tender succulent mutton & Iranian saffron, retort sealed for 45-day fresh travel.'
  },
  {
    id: 'ph-chicken-biryani',
    name: 'Zafrani Chicken Biryani (Heat & Eat Travel Pack)',
    category: 'biryani',
    weight: '850g (Serves 2-3)',
    priceINR: 799,
    badge: 'Most Popular',
    badgeType: 'zafran',
    image: './assets/biryani_cutout.png',
    description: 'Royal Zafrani marinated chicken and aromatic long-grain Basmati rice, microwave-ready in 3 minutes.'
  },

  // 2. Haleem
  {
    id: 'ph-haleem-1kg',
    name: 'World-Famous GI Hyderabadi Haleem (1kg)',
    category: 'haleem',
    weight: '1kg Royal Tin',
    priceINR: 850,
    badge: 'GI Tagged',
    badgeType: 'gi',
    image: './assets/haleem_cutout.png',
    description: '12-hour wood bhatti slow-cooked mutton, broken wheat, pure desi ghee, and Iranian saffron garnish.'
  },

  // 3. Dum Ke Roat
  {
    id: 'ph-roat-1kg',
    name: 'Zafrani Dum Ke Roat (1kg)',
    category: 'roat',
    weight: '1kg Heritage Box',
    priceINR: 880,
    badge: 'Muharram Special',
    badgeType: 'royal',
    image: './assets/chai_osmania_roat.jpg',
    description: 'Iconic baked confection with crunchy golden edges, rich almond meal, saffron, and pure pistachios.'
  },
  {
    id: 'ph-roat-500g',
    name: 'Zafrani Dum Ke Roat (500g)',
    category: 'roat',
    weight: '500g Heritage Box',
    priceINR: 440,
    badge: 'Heritage',
    badgeType: 'royal',
    image: 'https://cdn.shopify.com/s/files/1/0856/2720/7967/files/P1477777.jpg?v=1750773883',
    description: 'Authentic Hyderabadi sweet baked delicacy crafted with toasted dry fruits and desi ghee.'
  },

  // 4. Biscuits & Cookies
  {
    id: 'ph-osmania-250g',
    name: 'Premium Osmania Biscuits Box',
    category: 'biscuits',
    weight: '250g Classic Pack',
    priceINR: 130,
    badge: 'Legendary',
    badgeType: 'royal',
    image: 'https://cdn.shopify.com/s/files/1/0856/2720/7967/files/Gemini_Generated_Image_9xgnct9xgnct9xgn.png?v=1788601443',
    description: 'The world-famous melt-in-mouth sweet & salty biscuit born in the kitchens of the Last Nizam.'
  },
  {
    id: 'ph-salt-biscuits',
    name: 'Premium Salt Biscuits (250g)',
    category: 'biscuits',
    weight: '250g Pack',
    priceINR: 120,
    badge: 'Teatime Favorite',
    badgeType: 'royal',
    image: 'https://cdn.shopify.com/s/files/1/0856/2720/7967/files/Gemini_Generated_Image_m3vkjwm3vkjwm3vk.png?v=1788604134',
    description: 'Light, crunchy, and delicately salted biscuits baked to golden perfection for afternoon chai.'
  },
  {
    id: 'ph-ragi-biscuits',
    name: 'Ragi Biscuits (Sugar-Free 250g)',
    category: 'biscuits',
    weight: '250g Health Pack',
    priceINR: 199,
    badge: 'Sugar Free',
    badgeType: 'gi',
    image: 'https://cdn.shopify.com/s/files/1/0856/2720/7967/files/1_211ec2e2-2e75-4f62-be74-9525d1fac06b.png?v=1788606922',
    description: 'Wholesome finger millet ragi baked without refined sugar, rich in dietary fiber and nutrients.'
  },
  {
    id: 'ph-fruit-cookies',
    name: 'Fruit Cookies Premium (400g)',
    category: 'biscuits',
    weight: '400g Box',
    priceINR: 160,
    badge: 'Classic Snack',
    badgeType: 'royal',
    image: 'https://cdn.shopify.com/s/files/1/0856/2720/7967/files/DSC0369_12.jpg?v=1755343487',
    description: 'Crisp buttery cookies studded with colorful candied fruits and subtle cardamom aroma.'
  },
  {
    id: 'ph-deccan-cookies',
    name: 'Premium Deccan Cookies Luxury Box',
    category: 'biscuits',
    weight: '400g Luxury Box',
    priceINR: 445,
    badge: 'Artisanal',
    badgeType: 'royal',
    image: 'https://cdn.shopify.com/s/files/1/0856/2720/7967/files/AssortedCookies3.jpg?v=1755588636',
    description: 'Artisanal baked cookies infused with roasted almonds, cashew butter, and royal spices.'
  },
  {
    id: 'ph-butter-almond',
    name: 'Butter Almond Cookies Premium (250g)',
    category: 'biscuits',
    weight: '250g Box',
    priceINR: 220,
    badge: 'Pure Butter',
    badgeType: 'royal',
    image: 'https://cdn.shopify.com/s/files/1/0856/2720/7967/files/9.jpg?v=1776672090',
    description: 'Decadent slow-baked butter cookies generously topped with crushed Californian almonds.'
  },
  {
    id: 'ph-dark-choco',
    name: 'Dark Choco Cookies Premium (250g)',
    category: 'biscuits',
    weight: '250g Box',
    priceINR: 220,
    badge: 'Rich Cocoa',
    badgeType: 'royal',
    image: 'https://cdn.shopify.com/s/files/1/0856/2720/7967/files/14.jpg?v=1733904596',
    description: 'Indulgent dark cocoa cookies baked with rich chocolate chips and buttery crunch.'
  },
  {
    id: 'ph-multigrain',
    name: 'Multigrain Cookies Premium (250g)',
    category: 'biscuits',
    weight: '250g Box',
    priceINR: 175,
    badge: 'Nutritious',
    badgeType: 'gi',
    image: 'https://cdn.shopify.com/s/files/1/0856/2720/7967/files/18.jpg?v=1733903387',
    description: 'Nutritious blend of five healthy grains, oats, and whole seeds baked for mindful indulgence.'
  },

  // 5. Sticks & Savories
  {
    id: 'ph-sticks-combo',
    name: 'Premium Biscuit Sticks (Pack of 4)',
    category: 'sticks',
    weight: '4x 150g Assorted',
    priceINR: 445,
    badge: 'Value Pack',
    badgeType: 'zafran',
    image: 'https://cdn.shopify.com/s/files/1/0856/2720/7967/files/DSC0369_16.jpg?v=1720185828',
    description: 'Assorted set of crispy Pista Sticks, Almond Sticks, Cashew Sticks, and Choco Sticks.'
  },
  {
    id: 'ph-pista-sticks',
    name: 'Pista Sticks Premium (150g)',
    category: 'sticks',
    weight: '150g Box',
    priceINR: 170,
    badge: 'Signatures',
    badgeType: 'royal',
    image: 'https://cdn.shopify.com/s/files/1/0856/2720/7967/files/DSC0369_16.jpg?v=1720185828',
    description: 'Golden crunchy puff pastry fingers baked with roasted Iranian pistachios.'
  },
  {
    id: 'ph-almond-sticks',
    name: 'Almond Sticks (150g)',
    category: 'sticks',
    weight: '150g Box',
    priceINR: 140,
    badge: 'Crispy Snack',
    badgeType: 'royal',
    image: 'https://cdn.shopify.com/s/files/1/0856/2720/7967/files/DSC0369_12.jpg?v=1755343487',
    description: 'Crispy delicate pastry fingers crusted with sliced toasted almonds.'
  },

  // 6. Hampers & Traditional Sweets
  {
    id: 'ph-signature-hamper',
    name: 'Signature Assorted Biscuits Royal Hamper',
    category: 'hampers',
    weight: 'Royal Gift Collection',
    priceINR: 890,
    badge: 'Luxury Gift',
    badgeType: 'royal',
    image: 'https://cdn.shopify.com/s/files/1/0856/2720/7967/files/TastofC1.jpg?v=1734338957',
    description: 'Curated royal presentation box featuring Osmania, Fruit Biscuits, Chand Biscuits, and Pista Sticks.'
  },
  {
    id: 'ph-motichur-laddu',
    name: 'Pure Desi Ghee Motichur Laddu (1kg)',
    category: 'hampers',
    weight: '1kg Traditional Box',
    priceINR: 640,
    badge: 'Fresh Mithai',
    badgeType: 'zafran',
    image: 'https://cdn.shopify.com/s/files/1/0856/2720/7967/files/AssortedCookies1.jpg?v=1755588483',
    description: 'Melt-in-mouth golden tiny pearls made with gram flour, pure desi ghee, saffron, and melon seeds.'
  }
];

export class CartState {
  constructor() {
    this.items = [];
    this.currency = 'INR';
    this.listeners = [];
  }

  setCurrency(curr) {
    if (CURRENCIES[curr]) {
      this.currency = curr;
      this.notify();
    }
  }

  formatPrice(inrAmount) {
    const { symbol, rate } = CURRENCIES[this.currency];
    const converted = inrAmount * rate;
    return `${symbol}${this.currency === 'INR' ? converted.toFixed(0) : converted.toFixed(2)}`;
  }

  addItem(productId, qty = 1) {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return;

    const existing = this.items.find((item) => item.product.id === productId);
    if (existing) {
      existing.qty += qty;
    } else {
      this.items.push({ product, qty });
    }

    // Trigger golden celebration confetti on add
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#b88628', '#d4a03e', '#165b40']
    });

    this.notify();
  }

  removeItem(productId) {
    this.items = this.items.filter((item) => item.product.id !== productId);
    this.notify();
  }

  updateQty(productId, delta) {
    const item = this.items.find((item) => item.product.id === productId);
    if (!item) return;

    item.qty += delta;
    if (item.qty <= 0) {
      this.removeItem(productId);
    } else {
      this.notify();
    }
  }

  getTotalINR() {
    return this.items.reduce((sum, item) => sum + item.product.priceINR * item.qty, 0);
  }

  getTotalCount() {
    return this.items.reduce((sum, item) => sum + item.qty, 0);
  }

  getWhatsAppOrderLink() {
    if (this.items.length === 0) return '#';
    const totalStr = this.formatPrice(this.getTotalINR());
    let msg = `*Royal Order from Pista House Digital Flagship*\n\n`;
    this.items.forEach((item, idx) => {
      msg += `${idx + 1}. ${item.product.name} (x${item.qty}) - ${this.formatPrice(item.product.priceINR * item.qty)}\n`;
    });
    msg += `\n*Estimated Total:* ${totalStr}\n`;
    msg += `*Packaging:* Vacuum Sealed Freshness Guarantee\n`;
    msg += `\nPlease confirm delivery availability & express courier dispatch.`;

    const encoded = encodeURIComponent(msg);
    return `https://wa.me/919396500786?text=${encoded}`;
  }

  subscribe(listener) {
    this.listeners.push(listener);
  }

  notify() {
    this.listeners.forEach((l) => l(this));
  }
}

export const cart = new CartState();
