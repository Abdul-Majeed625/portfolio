/* ═══════════════════════════════════════════
   PREMIUM PORTFOLIO LOGIC
   ═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── AOS Initialization ───
  AOS.init({
    duration: 1000,
    once: false, // Allow animations to repeat for dynamic feel
    offset: 120,
    easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)'
  });

  // ─── Sticky & Glass Navigation ───
  const nav = document.querySelector('.nav');
  const navToggle = document.querySelector('.nav__toggle');
  const navLinks = document.querySelector('.nav__links');
  
  const updateNav = () => {
    if (window.scrollY > 50) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  };
  window.addEventListener('scroll', updateNav);
  updateNav();

  // ─── Mobile Toggle Logic ───
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('nav__toggle--active');
      navLinks.classList.toggle('nav__links--open');
      document.body.style.overflow = navLinks.classList.contains('nav__links--open') ? 'hidden' : '';
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav__link, .nav__cta').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('nav__toggle--active');
        navLinks.classList.remove('nav__links--open');
        document.body.style.overflow = '';
      });
    });
  }

  // ─── Typing Effect ───
  const typeTarget = document.querySelector('.type-text');
  if (typeTarget) {
    const phrases = ["Flutter Apps.", "Mobile Experiences.", "Modern UI/UX.", "Cross-Platform Tech."];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    const type = () => {
      const currentPhrase = phrases[phraseIndex];
      if (isDeleting) {
        typeTarget.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
      } else {
        typeTarget.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 150;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
      }

      setTimeout(type, typeSpeed);
    };
    type();
  }

  // ─── Custom Premium Cursor ───
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);
  
  const cursorStyle = document.createElement('style');
  cursorStyle.textContent = `
    .custom-cursor {
      width: 40px; height: 40px; border: 2px solid var(--blue); border-radius: 50%;
      position: fixed; pointer-events: none; z-index: 9999;
      transition: transform 0.1s ease, background 0.3s ease;
      transform: translate(-50%, -50%); display: none;
    }
    @media (pointer: fine) { .custom-cursor { display: block; } }
    .cursor-hover { transform: translate(-50%, -50%) scale(1.5); background: rgba(59, 130, 246, 0.1); }
  `;
  document.head.appendChild(cursorStyle);

  window.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  document.querySelectorAll('a, button, .project-card-premium').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
  });

  // ─── Parallax Mouse Effect ───
  document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
    
    const blobs = document.querySelectorAll('.hero__blob');
    blobs.forEach((blob, index) => {
      const depth = (index + 1) * 2;
      blob.style.transform = `translate(${moveX * depth}px, ${moveY * depth}px)`;
    });
    
    const mockup = document.querySelector('.hero__mockup');
    if (mockup) {
      mockup.style.transform = `rotateY(${-20 + moveX * 0.5}deg) rotateX(${10 - moveY * 0.5}deg)`;
    }
  });

  // ─── Skills Progress Animation ───
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fills = entry.target.querySelectorAll('.progress-fill');
        fills.forEach(fill => {
          fill.style.width = fill.getAttribute('data-width');
        });
      }
    });
  }, { threshold: 0.5 });

  const skillSection = document.querySelector('.skills-container');
  if (skillSection) skillObserver.observe(skillSection);

  // ─── Count Up Stats ───
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        const target = parseInt(entry.target.getAttribute('data-count'));
        let current = 0;
        const duration = 2000;
        const stepTime = Math.abs(Math.floor(duration / target));
        
        const timer = setInterval(() => {
          current += 1;
          entry.target.textContent = current + (entry.target.dataset.plus ? '+' : '');
          if (current === target) {
            clearInterval(timer);
            entry.target.dataset.animated = "true";
          }
        }, stepTime);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-num').forEach(num => statsObserver.observe(num));

});
