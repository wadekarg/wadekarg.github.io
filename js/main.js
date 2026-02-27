/* ===== Typing Effect ===== */
(function () {
  var roles = ['Software Engineer', 'Backend Engineer', 'Data Engineer', 'Problem Solver'];
  var el = document.getElementById('typingText');
  var roleIndex = 0;
  var charIndex = 0;
  var isDeleting = false;
  var typeSpeed = 80;
  var deleteSpeed = 40;
  var pauseAfterType = 2000;
  var pauseAfterDelete = 500;

  function type() {
    var current = roles[roleIndex];

    if (isDeleting) {
      charIndex--;
      el.textContent = current.substring(0, charIndex);
      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(type, pauseAfterDelete);
        return;
      }
      setTimeout(type, deleteSpeed);
    } else {
      charIndex++;
      el.textContent = current.substring(0, charIndex);
      if (charIndex === current.length) {
        isDeleting = true;
        setTimeout(type, pauseAfterType);
        return;
      }
      setTimeout(type, typeSpeed);
    }
  }

  type();
})();

/* ===== Scroll-Triggered Reveal Animations ===== */
(function () {
  var reveals = document.querySelectorAll('.reveal');

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(function (el) {
    observer.observe(el);
  });
})();

/* ===== Active Nav Link Tracking ===== */
(function () {
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-links a');

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var id = entry.target.getAttribute('id');
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '-72px 0px -50% 0px'
  });

  sections.forEach(function (section) {
    observer.observe(section);
  });
})();

/* ===== Nav Scroll Effect ===== */
(function () {
  var nav = document.getElementById('nav');
  var scrollThreshold = 50;

  function onScroll() {
    if (window.scrollY > scrollThreshold) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ===== Smooth Scroll for Nav Links ===== */
(function () {
  var links = document.querySelectorAll('a[href^="#"]');

  links.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#') return;

      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
})();

/* ===== Mobile Hamburger Menu ===== */
(function () {
  var hamburger = document.getElementById('hamburger');
  var mobileNav = document.getElementById('mobileNav');
  var mobileLinks = mobileNav.querySelectorAll('a');

  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });

  mobileLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      hamburger.classList.remove('active');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();

/* ===== Cursor Glow (Desktop Only) ===== */
(function () {
  var glow = document.getElementById('cursorGlow');

  if (window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', function (e) {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
      glow.style.opacity = '1';
    });

    document.addEventListener('mouseleave', function () {
      glow.style.opacity = '0';
    });
  } else {
    glow.style.display = 'none';
  }
})();

/* ===== Theme Switcher ===== */
(function () {
  var switcher = document.getElementById('themeSwitcher');
  var toggleBtn = document.getElementById('themeToggleBtn');
  var dots = switcher.querySelectorAll('.theme-dot');

  // Load saved theme
  var saved = localStorage.getItem('portfolio-theme');
  if (saved && saved !== 'cyber') {
    document.documentElement.setAttribute('data-theme', saved);
    dots.forEach(function (d) {
      d.classList.toggle('active', d.getAttribute('data-theme') === saved);
    });
  }

  // Toggle panel open/close
  toggleBtn.addEventListener('click', function () {
    switcher.classList.toggle('open');
  });

  // Theme selection
  dots.forEach(function (dot) {
    dot.addEventListener('click', function () {
      var theme = this.getAttribute('data-theme');

      dots.forEach(function (d) { d.classList.remove('active'); });
      this.classList.add('active');

      if (theme === 'cyber') {
        document.documentElement.removeAttribute('data-theme');
      } else {
        document.documentElement.setAttribute('data-theme', theme);
      }

      localStorage.setItem('portfolio-theme', theme);
      switcher.classList.remove('open');
    });
  });

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (!switcher.contains(e.target)) {
      switcher.classList.remove('open');
    }
  });
})();
