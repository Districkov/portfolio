(function () {
  var themeToggle = document.querySelector('.theme-toggle');
  var html = document.documentElement;
  var hamburger = document.querySelector('.hamburger');
  var mobileNav = document.querySelector('.mobile-nav');
  var backToTop = document.querySelector('.back-to-top');
  var filterBtns = document.querySelectorAll('.filter-btn');
  var projectCards = document.querySelectorAll('.project-card');
  var navLinks = document.querySelectorAll('nav a');
  var sections = document.querySelectorAll('section[id]');
  var canvas = document.getElementById('particles-canvas');
  var ctx = canvas ? canvas.getContext('2d') : null;
  var header = document.querySelector('header');
  var mouseGlow = document.querySelector('.mouse-glow');
  var statNumbers = document.querySelectorAll('.stat-number');

  var savedTheme = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);
  updateThemeIcon();

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var current = html.getAttribute('data-theme');
      var next = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      updateThemeIcon();
      themeToggle.style.transform = 'rotate(360deg)';
      setTimeout(function () {
        themeToggle.style.transform = '';
      }, 500);
    });
  }

  function updateThemeIcon() {
    if (!themeToggle) return;
    var isDark = html.getAttribute('data-theme') === 'dark';
    themeToggle.textContent = isDark ? '\u2600' : '\u263E';
  }

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      mobileNav.classList.toggle('open');
      hamburger.textContent = mobileNav.classList.contains('open') ? '\u2715' : '\u2630';
    });

    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        hamburger.textContent = '\u2630';
      });
    });
  }

  var lastScroll = 0;
  window.addEventListener('scroll', function () {
    var currentScroll = window.scrollY;

    if (backToTop) {
      backToTop.classList.toggle('visible', currentScroll > 400);
    }

    if (header) {
      header.classList.toggle('scrolled', currentScroll > 50);
    }

    var current = '';
    sections.forEach(function (section) {
      var top = section.offsetTop - 100;
      if (currentScroll >= top) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });

    lastScroll = currentScroll;
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
      btn.style.transform = 'scale(1.1)';
      setTimeout(function () { btn.style.transform = ''; }, 200);
      var filter = btn.getAttribute('data-filter');

      projectCards.forEach(function (card, index) {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.classList.remove('hidden');
          card.style.opacity = '0';
          card.style.transform = 'translateY(30px) scale(0.95)';
          setTimeout(function () {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, index * 80);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.9)';
          setTimeout(function () {
            card.classList.add('hidden');
          }, 300);
        }
      });
    });
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var delay = 0;
        var siblings = entry.target.parentElement.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .fade-in-scale');
        for (var i = 0; i < siblings.length; i++) {
          if (siblings[i] === entry.target) {
            delay = i * 100;
            break;
          }
        }
        setTimeout(function () {
          entry.target.classList.add('visible');
        }, delay);

        var bars = entry.target.querySelectorAll('.skill-bar-fill');
        bars.forEach(function (bar, i) {
          setTimeout(function () {
            var percent = bar.getAttribute('data-percent');
            bar.style.width = percent + '%';
          }, i * 120 + 300);
        });
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .fade-in-scale').forEach(function (el) {
    observer.observe(el);
  });

  if (mouseGlow) {
    var glowX = 0, glowY = 0, targetX = 0, targetY = 0;
    document.addEventListener('mousemove', function (e) {
      targetX = e.clientX;
      targetY = e.clientY;
    });
    function updateGlow() {
      glowX += (targetX - glowX) * 0.08;
      glowY += (targetY - glowY) * 0.08;
      mouseGlow.style.left = glowX + 'px';
      mouseGlow.style.top = glowY + 'px';
      requestAnimationFrame(updateGlow);
    }
    updateGlow();
  }

  var typingElement = document.querySelector('.typing-text');
  if (typingElement) {
    var phrases = [
      'Fullstack-разработчик',
      'React-энтузиаст',
      'Node.js-разработчик',
      'Open-source контрибьютор',
      'Люблю чистый код'
    ];
    var phraseIndex = 0;
    var charIndex = 0;
    var isDeleting = false;
    var typingSpeed = 80;

    function typeEffect() {
      var currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 40;
      } else {
        typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 80;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        typingSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 300;
      }

      setTimeout(typeEffect, typingSpeed);
    }

    setTimeout(typeEffect, 1200);
  }

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 2000;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.floor(eased * target);
      el.textContent = current + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target + suffix;
      }
    }

    requestAnimationFrame(step);
  }

  if (statNumbers.length) {
    var statsObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(function (num) {
      statsObserver.observe(num);
    });
  }

  if (canvas && ctx) {
    var particles = [];
    var particleCount = 70;
    var mouseX = -1000;
    var mouseY = -1000;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function createParticle() {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2.5 + 0.5,
        opacity: Math.random() * 0.3 + 0.1,
        baseOpacity: Math.random() * 0.3 + 0.1,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulsePhase: Math.random() * Math.PI * 2
      };
    }

    for (var i = 0; i < particleCount; i++) {
      particles.push(createParticle());
    }

    var time = 0;
    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.016;

      var isDark = html.getAttribute('data-theme') === 'dark';
      var baseColor = isDark ? '100, 255, 218' : '10, 158, 128';

      particles.forEach(function (p) {
        var dx = mouseX - p.x;
        var dy = mouseY - p.y;
        var dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 200) {
          p.opacity = p.baseOpacity + (0.4 * (1 - dist / 200));
          var angle = Math.atan2(dy, dx);
          p.x -= Math.cos(angle) * 0.5;
          p.y -= Math.sin(angle) * 0.5;
        } else {
          var pulse = Math.sin(time * p.pulseSpeed * 60 + p.pulsePhase) * 0.1;
          p.opacity += ((p.baseOpacity + pulse) - p.opacity) * 0.05;
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;

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

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            var lineOpacity = 0.12 * (1 - dist / 130);
            ctx.strokeStyle = 'rgba(' + baseColor + ',' + lineOpacity + ')';
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animateParticles);
    }

    animateParticles();
  }

  var codeWindow = document.querySelector('.code-window');
  var heroInteractive = document.getElementById('hero-interactive');
  var badges = document.querySelectorAll('.floating-badge');

  if (codeWindow && heroInteractive) {
    heroInteractive.addEventListener('mousemove', function (e) {
      var rect = heroInteractive.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      var centerX = rect.width / 2;
      var centerY = rect.height / 2;
      var rotateX = (y - centerY) / centerY * -8;
      var rotateY = (x - centerX) / centerX * 8;
      codeWindow.style.transform = 'perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';

      badges.forEach(function (badge, i) {
        var factor = (i + 1) * 8;
        var bx = (x - centerX) / centerX * factor;
        var by = (y - centerY) / centerY * factor;
        badge.style.transform = 'translate(' + bx + 'px, ' + by + 'px)';
      });
    });

    heroInteractive.addEventListener('mouseleave', function () {
      codeWindow.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
      codeWindow.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      badges.forEach(function (badge) {
        badge.style.transform = 'translate(0, 0)';
        badge.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      });
    });

    heroInteractive.addEventListener('mouseenter', function () {
      codeWindow.style.transition = 'transform 0.1s ease-out';
      badges.forEach(function (badge) {
        badge.style.transition = 'transform 0.1s ease-out';
      });
    });

    var codeLines = document.querySelectorAll('.code-line:not(.code-line-cursor)');
    codeLines.forEach(function (line, i) {
      line.style.opacity = '0';
      line.style.transform = 'translateX(-20px)';
      line.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      setTimeout(function () {
        line.style.opacity = '1';
        line.style.transform = 'translateX(0)';
      }, 300 + i * 100);
    });

    var cursorLine = document.querySelector('.code-line-cursor');
    if (cursorLine) {
      cursorLine.style.opacity = '0';
      setTimeout(function () {
        cursorLine.style.opacity = '1';
        cursorLine.style.transition = 'opacity 0.4s ease';
      }, 300 + codeLines.length * 100);
    }
  }

  var tiltCards = document.querySelectorAll('[data-tilt]');
  tiltCards.forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      var centerX = rect.width / 2;
      var centerY = rect.height / 2;
      var rotateX = (y - centerY) / centerY * -6;
      var rotateY = (x - centerX) / centerX * 6;
      card.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
      card.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    });

    card.addEventListener('mouseenter', function () {
      card.style.transition = 'transform 0.1s ease-out';
    });
  });

  document.querySelectorAll('.contact-form input, .contact-form textarea').forEach(function (el) {
    el.addEventListener('focus', function () {
      this.style.borderColor = 'var(--accent)';
      this.style.boxShadow = '0 0 0 3px rgba(100, 255, 218, 0.1)';
    });
    el.addEventListener('blur', function () {
      this.style.borderColor = '';
      this.style.boxShadow = '';
    });
  });

  var contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = contactForm.querySelector('.btn-primary');
      var originalText = btn.textContent;
      btn.textContent = '\u2713 Отправлено!';
      btn.style.background = 'linear-gradient(135deg, var(--accent-alt), #a78bfa)';
      btn.style.transform = 'scale(1.05)';
      setTimeout(function () {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.style.transform = '';
        contactForm.reset();
      }, 2500);
    });
  }

  var scrollTimeout;
  window.addEventListener('scroll', function () {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(function () {
      document.querySelectorAll('.timeline-item').forEach(function (item) {
        var rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
          item.style.opacity = '1';
          item.style.transform = 'translateX(0)';
        }
      });
    }, 50);
  });

  document.querySelectorAll('.timeline-item').forEach(function (item) {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  window.dispatchEvent(new Event('scroll'));
})();
