import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initGSAPAnimations() {
  // 1. Royal Preloader Animation
  const preloader = document.querySelector('.royal-preloader');
  const countEl = document.querySelector('.preloader-count');
  const barEl = document.querySelector('.preloader-bar');

  if (preloader && countEl && barEl) {
    let progress = { value: 0 };
    gsap.to(progress, {
      value: 100,
      duration: 1.5,
      ease: 'power2.inOut',
      onUpdate: () => {
        countEl.textContent = `${Math.floor(progress.value)}%`;
        barEl.style.width = `${progress.value}%`;
      },
      onComplete: () => {
        gsap.to(preloader, {
          yPercent: -100,
          duration: 0.85,
          ease: 'power4.inOut',
          onComplete: () => {
            preloader.classList.add('loaded');
            animateHeroEntry();
          }
        });
      }
    });
  } else {
    animateHeroEntry();
  }

  // 2. Header Scroll Transition
  const header = document.querySelector('.royal-header');
  if (header) {
    ScrollTrigger.create({
      start: 'top -40',
      end: 99999,
      toggleClass: { className: 'scrolled', targets: header }
    });
  }

  // 3. Continuous Gentle Floating Motion for Biryani Handi (Outer layer)
  gsap.to('.dish-float-wrapper', {
    y: -16,
    duration: 3.4,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });

  // 4. Scroll-Driven Biryani Motion (Biryani Going Down / Flying Across Hero on Scroll)
  const heroDishStage = document.querySelector('.hero-dish-stage');
  if (heroDishStage) {
    gsap.to(heroDishStage, {
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2
      },
      y: 180,
      scale: 0.9,
      rotateX: 14,
      ease: 'none'
    });

    // Floating callouts fade and drift out on scroll
    gsap.to('.dish-callout', {
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: '65% top',
        scrub: 1
      },
      opacity: 0,
      scale: 0.8,
      y: -35,
      stagger: 0.05
    });

    // Parallax Spices Moving in Opposing Directions on Scroll
    gsap.to('.spice-star-1', {
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5
      },
      y: -140,
      x: -60,
      rotate: 90,
      ease: 'none'
    });

    gsap.to('.spice-cardamom', {
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5
      },
      y: 200,
      x: 80,
      rotate: -120,
      ease: 'none'
    });

    // Giant Watermark Behind Product Parallax
    gsap.to('.hero-bg-text', {
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      },
      y: 150,
      scale: 1.12,
      opacity: 0.03,
      ease: 'none'
    });
  }

  // 5. Stats Number Counter Animation on Scroll
  const statsSection = document.querySelector('.hero-stats-row');
  if (statsSection) {
    ScrollTrigger.create({
      trigger: statsSection,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        animateCounter('.stat-legacy', 25, '+');
        animateCounter('.stat-outlets', 85, '+');
        animateCounter('.stat-patrons', 25, 'M+');
        animateCounter('.stat-shelf', 45, '-Day');
      }
    });
  }

  // 6. Pinned Culinary Deconstruction Section
  const deconstructSection = document.querySelector('.pinned-deconstruction-section');
  const layerCards = document.querySelectorAll('.layer-card');
  const visualImg = document.querySelector('.deconstruct-visual-img');

  if (deconstructSection && layerCards.length > 0) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: deconstructSection,
        start: 'top 30%',
        end: 'bottom 80%',
        scrub: 1
      }
    });

    layerCards.forEach((card, index) => {
      tl.to(
        card,
        {
          x: 12,
          borderColor: '#b88628',
          boxShadow: '0 15px 35px rgba(184, 134, 40, 0.2)',
          duration: 0.8,
          onStart: () => {
            layerCards.forEach((c) => c.classList.remove('active'));
            card.classList.add('active');
          }
        },
        index * 0.9
      );

      if (visualImg) {
        tl.to(visualImg, { scale: 1.02 + index * 0.02, rotate: (index % 2 === 0 ? 1 : -1) * 1.5, duration: 0.8 }, index * 0.9);
      }
    });
  }

  // 7. GI Haleem Chamber Cinematic Entry
  const haleemSection = document.querySelector('.haleem-chamber-section');
  if (haleemSection) {
    gsap.from('.haleem-main-img', {
      scrollTrigger: {
        trigger: haleemSection,
        start: 'top 75%',
        end: 'top 25%',
        scrub: 1
      },
      scale: 0.9,
      y: 40,
      opacity: 0.8,
      ease: 'power3.out'
    });

    gsap.from('.haleem-spec-item', {
      scrollTrigger: {
        trigger: haleemSection,
        start: 'top 65%',
        toggleActions: 'play none none none'
      },
      y: 25,
      opacity: 0,
      stagger: 0.12,
      duration: 0.6,
      ease: 'power2.out'
    });
  }

  // 8. Travel Pack 3D Box Parallax Scroll
  const travelBox = document.querySelector('.travel-box-card');
  if (travelBox) {
    gsap.to(travelBox, {
      scrollTrigger: {
        trigger: '.travel-pack-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2
      },
      rotateX: 10,
      rotateY: -12,
      y: -25,
      ease: 'none'
    });
  }

  // 9. Interactive Chai & Osmania Dunk Ritual
  const chaiWrapper = document.querySelector('.chai-interactive-wrapper');
  if (chaiWrapper) {
    const dunkPrompt = chaiWrapper.querySelector('.dunk-prompt-pill');
    const chaiImg = chaiWrapper.querySelector('.chai-img');

    chaiWrapper.addEventListener('mouseenter', () => {
      gsap.to(chaiImg, { scale: 1.04, duration: 0.4 });
      if (dunkPrompt) {
        dunkPrompt.innerHTML = '☕ Savoring Irani Chai & Crisp Melt-in-Mouth Osmania';
        dunkPrompt.style.borderColor = '#d95a1e';
        dunkPrompt.style.color = '#d95a1e';
      }
    });

    chaiWrapper.addEventListener('mouseleave', () => {
      gsap.to(chaiImg, { scale: 1, duration: 0.4 });
      if (dunkPrompt) {
        dunkPrompt.innerHTML = '✨ Click or Hover to Dunk Biscuit in Irani Chai';
        dunkPrompt.style.borderColor = '#b88628';
        dunkPrompt.style.color = '#165b40';
      }
    });

    chaiWrapper.addEventListener('click', () => {
      gsap.timeline()
        .to(chaiImg, { y: 15, scale: 0.98, duration: 0.25, ease: 'power2.in' })
        .to(chaiImg, { y: 0, scale: 1.02, duration: 0.45, ease: 'elastic.out(1.2, 0.4)' });
    });
  }

  // 10. Product Cards Stagger Reveal on Scroll
  gsap.utils.toArray('.product-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 90%',
        toggleActions: 'play none none none'
      },
      y: 35,
      opacity: 0,
      duration: 0.6,
      delay: (i % 4) * 0.08,
      ease: 'power2.out'
    });
  });
}

function animateHeroEntry() {
  const heroTL = gsap.timeline({ defaults: { ease: 'power3.out' } });

  heroTL
    .from('.hero-top-badge', { opacity: 0, y: -25, scale: 0.9, duration: 0.7 })
    .from('.hero-cinematic-title span', { y: 60, opacity: 0, stagger: 0.14, duration: 1 }, '-=0.4')
    .from('.hero-center-desc', { opacity: 0, y: 30, duration: 0.8 }, '-=0.6')
    .from('.hero-dish-stage', { scale: 0.7, opacity: 0, y: 60, duration: 1.2, ease: 'back.out(1.5)' }, '-=0.7')
    .from('.dish-callout', { scale: 0, opacity: 0, stagger: 0.15, duration: 0.7, ease: 'back.out(1.8)' }, '-=0.6')
    .from('.hero-action-buttons', { opacity: 0, y: 20, duration: 0.6 }, '-=0.4')
    .from('.stat-item', { opacity: 0, y: 20, stagger: 0.1, duration: 0.5 }, '-=0.3');
}

function animateCounter(selector, target, suffix = '') {
  const el = document.querySelector(selector);
  if (!el) return;
  let counter = { val: 0 };
  gsap.to(counter, {
    val: target,
    duration: 2,
    ease: 'power2.out',
    onUpdate: () => {
      el.textContent = `${Math.floor(counter.val)}${suffix}`;
    }
  });
}
