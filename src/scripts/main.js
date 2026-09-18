import confetti from 'canvas-confetti';
import { initSmoothScroll } from './lenis-smooth.js';
import { initSpiceParticles } from './spice-particles.js';
import { init3DCardTilt, initCustomCursor } from './3d-card-tilt.js';
import { initGSAPAnimations } from './gsap-animations.js';
import { cart, PRODUCTS, CURRENCIES } from './cart-state.js';

// ==========================================================================
// 1. WEB AUDIO SYNTH AMBIENCE (Subtle Royal Sitar & Warm Kitchen Harmony)
// ==========================================================================
class RoyalAmbienceSynth {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.oscillators = [];
    this.gainNode = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }

  toggle() {
    this.init();
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isPlaying) {
      this.stop();
    } else {
      this.start();
    }
    return this.isPlaying;
  }

  start() {
    if (this.isPlaying) return;
    this.isPlaying = true;

    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(0.01, this.ctx.currentTime);
    this.gainNode.gain.exponentialRampToValueAtTime(0.08, this.ctx.currentTime + 3);
    this.gainNode.connect(this.ctx.destination);

    // Pentatonic Indian Drone: Sa, Pa, Sa' (C#3, G#3, C#4)
    const freqs = [138.59, 207.65, 277.18, 415.3];

    freqs.forEach((f) => {
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, this.ctx.currentTime);

      // Subtle vibrato
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(4.5, this.ctx.currentTime);
      lfoGain.gain.setValueAtTime(2.0, this.ctx.currentTime);
      lfo.connect(osc.frequency);
      lfo.start();

      oscGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      osc.connect(oscGain);
      oscGain.connect(this.gainNode);
      osc.start();

      this.oscillators.push(osc, lfo);
    });
  }

  stop() {
    if (!this.isPlaying) return;
    this.isPlaying = false;
    if (this.gainNode) {
      this.gainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.5);
      setTimeout(() => {
        this.oscillators.forEach((o) => {
          try { o.stop(); } catch(e) {}
        });
        this.oscillators = [];
      }, 1600);
    }
  }
}

const ambience = new RoyalAmbienceSynth();

// ==========================================================================
// 2. PRODUCT CATALOG RENDERER
// ==========================================================================
function renderProducts(filter = 'all') {
  const container = document.getElementById('productsGrid');
  if (!container) return;

  const filtered = filter === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter);

  container.innerHTML = filtered
    .map(
      (p) => `
    <div class="product-card tilt-card" data-id="${p.id}">
      <div class="product-img-wrap">
        <span class="badge-royal badge-${p.badgeType} product-badge-overlay">${p.badge}</span>
        <img src="${p.image}" alt="${p.name}" class="product-img" loading="lazy" />
      </div>
      <div class="product-category">${p.weight}</div>
      <h3 class="product-name">${p.name}</h3>
      <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 1rem; line-height: 1.4;">${p.description}</p>
      <div class="product-card-footer">
        <div class="product-price">${cart.formatPrice(p.priceINR)}</div>
        <button class="btn-add-tray" data-add-id="${p.id}">
          <span>+ Add to Tray</span>
        </button>
      </div>
    </div>
  `
    )
    .join('');

  // Re-bind click events for newly rendered cards
  container.querySelectorAll('[data-add-id]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const pid = btn.getAttribute('data-add-id');
      cart.addItem(pid);
      btn.innerHTML = '<span>✓ Added!</span>';
      setTimeout(() => {
        btn.innerHTML = '<span>+ Add to Tray</span>';
      }, 1200);
    });
  });

  // Re-init 3D tilt for newly rendered cards
  init3DCardTilt();
}

// ==========================================================================
// 3. CART DRAWER UI HANDLER
// ==========================================================================
function updateCartUI() {
  const countBadge = document.querySelector('.cart-count-badge');
  const itemsContainer = document.querySelector('.cart-drawer-body');
  const totalPriceEl = document.querySelector('.cart-total-price');
  const whatsappBtn = document.querySelector('.whatsapp-order-btn');

  const totalCount = cart.getTotalCount();
  if (countBadge) countBadge.textContent = totalCount;

  if (itemsContainer) {
    if (cart.items.length === 0) {
      itemsContainer.innerHTML = `
        <div style="text-align: center; padding: 3rem 1rem; color: var(--text-dim);">
          <div style="font-size: 3rem; margin-bottom: 1rem;">🥘</div>
          <h4 style="color: var(--text-cream); margin-bottom: 0.5rem;">Your Royal Tray is Empty</h4>
          <p style="font-size: 0.85rem;">Select authentic Hyderabadi Haleem, Zafrani Biryani, or Osmania Biscuits to begin.</p>
        </div>
      `;
    } else {
      itemsContainer.innerHTML = cart.items
        .map(
          ({ product, qty }) => `
        <div class="cart-item">
          <img src="${product.image}" alt="${product.name}" class="cart-item-img" />
          <div class="cart-item-info">
            <div class="cart-item-title">${product.name}</div>
            <div class="cart-item-price">${cart.formatPrice(product.priceINR * qty)}</div>
          </div>
          <div class="cart-item-qty">
            <button class="btn-qty" data-qty-id="${product.id}" data-delta="-1">-</button>
            <span style="font-weight: 700; font-size: 0.85rem;">${qty}</span>
            <button class="btn-qty" data-qty-id="${product.id}" data-delta="1">+</button>
          </div>
        </div>
      `
        )
        .join('');

      itemsContainer.querySelectorAll('.btn-qty').forEach((btn) => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-qty-id');
          const delta = parseInt(btn.getAttribute('data-delta'));
          cart.updateQty(id, delta);
        });
      });
    }
  }

  if (totalPriceEl) {
    totalPriceEl.textContent = cart.formatPrice(cart.getTotalINR());
  }

  if (whatsappBtn) {
    whatsappBtn.href = cart.getWhatsAppOrderLink();
  }
}

// ==========================================================================
// 4. TRANSIT CALCULATOR CITIES
// ==========================================================================
const TRANSIT_DATA = {
  hyderabad: { time: 'Same-Day Express (3-4 Hours)', carrier: 'Direct City Dispatch', note: 'Fresh hot handi or vacuum-sealed box.' },
  mumbai: { time: '24 Hours Next-Flight', carrier: 'Air Cargo Priority', note: 'Dry ice packed 45-day freshness guarantee.' },
  dubai: { time: '36 Hours Direct Air', carrier: 'Emirates Air Freight', note: 'Direct delivery across Dubai, Abu Dhabi & Sharjah.' },
  usa: { time: '48 Hours Global Express', carrier: 'DHL Express Courier', note: 'Shipped to Dallas, New York, Bay Area & Chicago.' },
  london: { time: '48 Hours Express Courier', carrier: 'British Airways World Cargo', note: 'Delivered direct to your residence in UK & Europe.' }
};

function initTransitCalculator() {
  const pills = document.querySelectorAll('.transit-pill');
  const timeVal = document.querySelector('.transit-time-val');
  const carrierEl = document.querySelector('.transit-carrier-desc');

  pills.forEach((pill) => {
    pill.addEventListener('click', () => {
      pills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');

      const cityKey = pill.getAttribute('data-city');
      const data = TRANSIT_DATA[cityKey];
      if (data && timeVal && carrierEl) {
        timeVal.textContent = data.time;
        carrierEl.textContent = `${data.carrier} • ${data.note}`;
      }
    });
  });
}

// ==========================================================================
// 5. MASTER INITIALIZATION
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lenis Smooth Scroll
  initSmoothScroll();

  // 2. Initialize Canvas Particle Engine
  initSpiceParticles();

  // 3. Initialize Custom Magnetic Cursor
  initCustomCursor();

  // 4. Initialize GSAP & ScrollTrigger Timelines
  initGSAPAnimations();

  // 5. Render Catalog
  renderProducts('all');

  // 6. Category Filter Tabs
  document.querySelectorAll('.filter-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.filter-tab').forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.getAttribute('data-filter');
      renderProducts(cat);
    });
  });

  // 7. Currency Switcher Listener
  const currSelect = document.getElementById('currencySelect');
  if (currSelect) {
    currSelect.addEventListener('change', (e) => {
      cart.setCurrency(e.target.value);
      renderProducts(document.querySelector('.filter-tab.active')?.getAttribute('data-filter') || 'all');
    });
  }

  // 8. Sound Ambience Toggle
  const soundBtn = document.getElementById('soundToggleBtn');
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      const active = ambience.toggle();
      soundBtn.innerHTML = active
        ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>'
        : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>';
    });
  }

  // 9. Cart Drawer Open / Close
  const cartDrawer = document.getElementById('cartDrawer');
  const cartOverlay = document.getElementById('cartDrawerOverlay');
  const cartToggleBtns = document.querySelectorAll('[data-toggle-cart]');
  const closeCartBtn = document.getElementById('closeCartBtn');

  function openCart() {
    cartDrawer.classList.add('active');
    cartOverlay.classList.add('active');
  }

  function closeCart() {
    cartDrawer.classList.remove('active');
    cartOverlay.classList.remove('active');
  }

  cartToggleBtns.forEach((btn) => btn.addEventListener('click', openCart));
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

  // Subscribe cart updates to UI
  cart.subscribe(updateCartUI);
  updateCartUI();

  // 10. Transit Calculator
  initTransitCalculator();

  // 11. Pitch Deck Modal Toggle
  const pitchOverlay = document.getElementById('pitchModalOverlay');
  const openPitchBtn = document.getElementById('openPitchBtn');
  const closePitchBtn = document.getElementById('closePitchBtn');

  if (openPitchBtn && pitchOverlay) {
    openPitchBtn.addEventListener('click', () => pitchOverlay.classList.add('active'));
  }
  if (closePitchBtn && pitchOverlay) {
    closePitchBtn.addEventListener('click', () => pitchOverlay.classList.remove('active'));
  }
  if (pitchOverlay) {
    pitchOverlay.addEventListener('click', (e) => {
      if (e.target === pitchOverlay) pitchOverlay.classList.remove('active');
    });
  }

  // 12. Prep Step Tabs in 3D Travel Section
  document.querySelectorAll('.prep-step-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.prep-step-tab').forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

  // 13. Static Section Add-To-Tray Buttons (Featured Roat, Haleem, Travel Pack, Chai sections)
  document.querySelectorAll('section [data-add-id]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const pid = btn.getAttribute('data-add-id');
      cart.addItem(pid);
      const originalText = btn.innerHTML;
      btn.innerHTML = '<span>✓ Added to Royal Tray!</span>';
      setTimeout(() => {
        btn.innerHTML = originalText;
      }, 1500);
    });
  });

  // 14. FAQ Accordion Toggle
  document.querySelectorAll('.faq-item').forEach((item) => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const wasActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach((other) => other.classList.remove('active'));
        if (!wasActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // 15. Franchise Inquiry Modal & Form
  const franchiseOverlay = document.getElementById('franchiseModalOverlay');
  const openFranchiseBtn = document.getElementById('openFranchiseBtn');
  const closeFranchiseBtn = document.getElementById('closeFranchiseBtn');
  const franchiseForm = document.getElementById('franchiseForm');
  const franchiseSuccessMsg = document.getElementById('franchiseSuccessMsg');

  if (openFranchiseBtn && franchiseOverlay) {
    openFranchiseBtn.addEventListener('click', () => franchiseOverlay.classList.add('active'));
  }
  if (closeFranchiseBtn && franchiseOverlay) {
    closeFranchiseBtn.addEventListener('click', () => franchiseOverlay.classList.remove('active'));
  }
  if (franchiseOverlay) {
    franchiseOverlay.addEventListener('click', (e) => {
      if (e.target === franchiseOverlay) franchiseOverlay.classList.remove('active');
    });
  }

  window.handleFranchiseSubmit = () => {
    if (franchiseForm) franchiseForm.style.display = 'none';
    if (franchiseSuccessMsg) franchiseSuccessMsg.style.display = 'block';

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#b88628', '#165b40', '#f7d070', '#ffffff']
    });

    setTimeout(() => {
      if (franchiseOverlay) franchiseOverlay.classList.remove('active');
      if (franchiseForm) franchiseForm.reset();
      if (franchiseForm) franchiseForm.style.display = 'block';
      if (franchiseSuccessMsg) franchiseSuccessMsg.style.display = 'none';
    }, 4000);
  };

  // 16. Policy Modals (Shipping & Refund)
  const shippingOverlay = document.getElementById('shippingPolicyOverlay');
  const openShippingBtn = document.getElementById('openShippingPolicyBtn');
  const closeShippingBtn = document.getElementById('closeShippingPolicyBtn');

  if (openShippingBtn && shippingOverlay) {
    openShippingBtn.addEventListener('click', () => shippingOverlay.classList.add('active'));
  }
  if (closeShippingBtn && shippingOverlay) {
    closeShippingBtn.addEventListener('click', () => shippingOverlay.classList.remove('active'));
  }
  if (shippingOverlay) {
    shippingOverlay.addEventListener('click', (e) => {
      if (e.target === shippingOverlay) shippingOverlay.classList.remove('active');
    });
  }

  const refundOverlay = document.getElementById('refundPolicyOverlay');
  const openRefundBtn = document.getElementById('openRefundPolicyBtn');
  const closeRefundBtn = document.getElementById('closeRefundPolicyBtn');

  if (openRefundBtn && refundOverlay) {
    openRefundBtn.addEventListener('click', () => refundOverlay.classList.add('active'));
  }
  if (closeRefundBtn && refundOverlay) {
    closeRefundBtn.addEventListener('click', () => refundOverlay.classList.remove('active'));
  }
  if (refundOverlay) {
    refundOverlay.addEventListener('click', (e) => {
      if (e.target === refundOverlay) refundOverlay.classList.remove('active');
    });
  }

  // 17. Newsletter Subscription Form
  window.handleNewsletter = () => {
    const emailInput = document.getElementById('newsletterEmail');
    const successEl = document.getElementById('newsletterSuccess');
    if (emailInput && successEl) {
      emailInput.value = '';
      successEl.style.display = 'block';
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#f7d070', '#b88628']
      });
      setTimeout(() => {
        successEl.style.display = 'none';
      }, 4000);
    }
  };

  // 18. Irani Chai Dunk Interactive Animation
  const chaiWrapper = document.querySelector('.chai-interactive-wrapper');
  if (chaiWrapper) {
    chaiWrapper.addEventListener('click', () => {
      const img = chaiWrapper.querySelector('.chai-img');
      if (img) {
        img.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
        img.style.transform = 'scale(1.06) rotate(-2deg)';
        setTimeout(() => {
          img.style.transform = 'scale(1) rotate(0deg)';
        }, 500);
      }
    });
  }
});
