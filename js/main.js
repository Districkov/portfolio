(function () {
  const themeToggle = document.querySelector('.theme-toggle');
  const html = document.documentElement;
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const backToTop = document.querySelector('.back-to-top');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const navLinks = document.querySelectorAll('nav a');
  const sections = document.querySelectorAll('section[id]');
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas ? canvas.getContext('2d') : null;

  const savedTheme = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);
  updateThemeIcon();

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const current = html.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      updateThemeIcon();
    });
  }

  function updateThemeIcon() {
    if (!themeToggle) return;
    const isDark = html.getAttribute('data-theme') === 'dark';
    themeToggle.textContent = isDark ? '☀' : '☾';
  }

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      mobileNav.classList.toggle('open');
      hamburger.textContent = mobileNav.classList.contains('open') ? '✕' : '☰';
    });

    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        hamburger.textContent = '☰';
      });
    });
  }

  window.addEventListener('scroll', function () {
    if (backToTop) {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    }

    let current = '';
    sections.forEach(function (section) {
      const top = section.offsetTop - 100;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });

  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(function (card) {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        var bars = entry.target.querySelectorAll('.skill-bar-fill');
        bars.forEach(function (bar) {
          var percent = bar.getAttribute('data-percent');
          bar.style.width = percent + '%';
        });
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.fade-in').forEach(function (el) {
    observer.observe(el);
  });

  if (canvas && ctx) {
    var particles = [];
    var particleCount = 50;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function createParticle() {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.3 + 0.1
      };
    }

    for (var i = 0; i < particleCount; i++) {
      particles.push(createParticle());
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      var isDark = html.getAttribute('data-theme') === 'dark';
      var baseColor = isDark ? '100, 255, 218' : '10, 158, 128';

      particles.forEach(function (p) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + baseColor + ',' + p.opacity + ')';
        ctx.fill();
      });

      for (var i = 0; i < particles.length; i++) {
        for (var j = i + 1; j < particles.length; j++) {
          var dx = particles[i].x - particles[j].x;
          var dy = particles[i].y - particles[j].y;
          var dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = 'rgba(' + baseColor + ',' + (0.08 * (1 - dist / 150)) + ')';
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animateParticles);
    }

    animateParticles();
  }
})();
