export function initSpiceParticles() {
  const canvas = document.getElementById('spiceCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  window.addEventListener('mousemove', (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
  });

  const particleCount = window.innerWidth < 768 ? 40 : 80;
  const particles = [];

  class Particle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 25;
      
      const rand = Math.random();
      if (rand < 0.35) {
        this.type = 'saffron';
      } else if (rand < 0.65) {
        this.type = 'goldDust';
      } else if (rand < 0.85) {
        this.type = 'pistaFlake';
      } else {
        this.type = 'steam';
      }
      
      if (this.type === 'saffron') {
        this.size = Math.random() * 10 + 6;
        this.speedY = -(Math.random() * 0.7 + 0.25);
        this.speedX = Math.sin(Math.random() * Math.PI) * 0.45;
        this.angle = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.025;
        this.opacity = Math.random() * 0.7 + 0.25;
        this.color = Math.random() < 0.6 ? '#d9531e' : '#b33917';
      } else if (this.type === 'goldDust') {
        this.size = Math.random() * 2.8 + 1.2;
        this.speedY = -(Math.random() * 0.5 + 0.15);
        this.speedX = (Math.random() - 0.5) * 0.35;
        this.opacity = Math.random() * 0.75 + 0.25;
        this.pulse = Math.random() * Math.PI;
        this.color = '#c99327';
      } else if (this.type === 'pistaFlake') {
        this.size = Math.random() * 4 + 2;
        this.speedY = -(Math.random() * 0.6 + 0.2);
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.angle = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        this.opacity = Math.random() * 0.6 + 0.25;
        this.color = '#1b6b4c';
      } else {
        // Steam wisp
        this.size = Math.random() * 28 + 18;
        this.speedY = -(Math.random() * 0.8 + 0.4);
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.14 + 0.04;
        this.growth = 0.06;
      }
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX;

      // Cursor deflection
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 140) {
        this.x -= (dx / dist) * 0.7;
        this.y -= (dy / dist) * 0.7;
      }

      if (this.type === 'saffron' || this.type === 'pistaFlake') {
        this.angle += this.rotationSpeed;
      } else if (this.type === 'goldDust') {
        this.pulse += 0.045;
        this.currentOpacity = this.opacity * (0.6 + Math.sin(this.pulse) * 0.4);
      } else if (this.type === 'steam') {
        this.size += this.growth;
        this.opacity -= 0.0006;
      }

      if (this.y < -30 || this.x < -30 || this.x > width + 30 || (this.type === 'steam' && this.opacity <= 0)) {
        this.reset(false);
      }
    }

    draw() {
      ctx.save();
      if (this.type === 'saffron') {
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.beginPath();
        ctx.moveTo(-this.size / 2, 0);
        ctx.bezierCurveTo(-this.size / 4, -2.5, this.size / 4, 2.5, this.size / 2, 0);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1.8;
        ctx.globalAlpha = this.opacity;
        ctx.stroke();
      } else if (this.type === 'goldDust') {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.currentOpacity || this.opacity;
        ctx.fill();
      } else if (this.type === 'pistaFlake') {
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size, this.size * 0.5, 0, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
      } else if (this.type === 'steam') {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
        grad.addColorStop(0, 'rgba(215, 200, 180, ' + this.opacity + ')');
        grad.addColorStop(1, 'rgba(215, 200, 180, 0)');
        ctx.fillStyle = grad;
        ctx.fill();
      }
      ctx.restore();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    mouse.x += (mouse.targetX - mouse.x) * 0.08;
    mouse.y += (mouse.targetY - mouse.y) * 0.08;

    particles.forEach((p) => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();
}
