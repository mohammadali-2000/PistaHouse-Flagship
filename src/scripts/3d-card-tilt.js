import gsap from 'gsap';

export function init3DCardTilt() {
  const cards = document.querySelectorAll('.tilt-card, .travel-box-card');

  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate tilt (-8deg to +8deg)
      const rotateX = ((y - centerY) / centerY) * -9;
      const rotateY = ((x - centerX) / centerX) * 9;

      // Silky-smooth GPU-accelerated interpolation
      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        transformPerspective: 1000,
        scale: 1.02,
        duration: 0.5,
        ease: 'power2.out',
        overwrite: 'auto'
      });

      card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
      card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
        overwrite: 'auto'
      });
    });
  });

  // Hero Centered Dish 3D Mouse Parallax (Silky smooth GSAP physics)
  const heroStage = document.querySelector('.hero-dish-stage');
  const heroDishImg = document.querySelector('.hero-dish-img');
  if (heroStage && heroDishImg) {
    heroStage.addEventListener('mousemove', (e) => {
      const rect = heroStage.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const rotX = (y / (rect.height / 2)) * -12;
      const rotY = (x / (rect.width / 2)) * 12;

      gsap.to(heroDishImg, {
        rotateX: rotX,
        rotateY: rotY,
        scale: 1.04,
        transformPerspective: 1200,
        duration: 0.6,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    });

    heroStage.addEventListener('mouseleave', () => {
      gsap.to(heroDishImg, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.9,
        ease: 'power3.out',
        overwrite: 'auto'
      });
    });
  }
}

export function initCustomCursor() {
  const dot = document.querySelector('.custom-cursor-dot');
  const follower = document.querySelector('.custom-cursor-follower');
  if (!dot || !follower || window.innerWidth < 1024) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let followerX = mouseX;
  let followerY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  });

  function renderFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
    requestAnimationFrame(renderFollower);
  }
  renderFollower();

  // Hover state on links, buttons, and cards
  document.querySelectorAll('a, button, .product-card, .filter-tab, .prep-step-tab, .dish-callout').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      gsap.to(follower, {
        width: 60,
        height: 60,
        borderColor: '#165b40',
        backgroundColor: 'rgba(22, 91, 64, 0.08)',
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(follower, {
        width: 38,
        height: 38,
        borderColor: '#b88628',
        backgroundColor: 'transparent',
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });
}
