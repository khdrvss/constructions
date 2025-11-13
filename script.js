document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  requestAnimationFrame(() => body.classList.add('is-ready'));

  const cursor = document.querySelector('.cursor');
  const cursorPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const cursorTarget = { ...cursorPos };

  const updateCursor = () => {
    cursorPos.x += (cursorTarget.x - cursorPos.x) * 0.18;
    cursorPos.y += (cursorTarget.y - cursorPos.y) * 0.18;
    cursor.style.left = `${cursorPos.x}px`;
    cursor.style.top = `${cursorPos.y}px`;
    requestAnimationFrame(updateCursor);
  };
  updateCursor();

  document.addEventListener('mousemove', (event) => {
    cursorTarget.x = event.clientX;
    cursorTarget.y = event.clientY;
  });

  document.addEventListener('mousedown', () => cursor.classList.add('cursor-active'));
  document.addEventListener('mouseup', () => cursor.classList.remove('cursor-active'));

  const hero = document.querySelector('.hero');
  const parallaxElements = hero ? hero.querySelectorAll('[data-depth]') : [];

  if (hero) {
    hero.addEventListener('mousemove', (event) => {
      const rect = hero.getBoundingClientRect();
      const relX = event.clientX - rect.left;
      const relY = event.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const moveX = (relX - centerX) / centerX;
      const moveY = (relY - centerY) / centerY;

      parallaxElements.forEach((el) => {
        const depth = parseFloat(el.dataset.depth || '0');
        const translateX = moveX * depth * -20;
        const translateY = moveY * depth * -20;
        el.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
      });
    });

    hero.addEventListener('mouseleave', () => {
      parallaxElements.forEach((el) => {
        el.style.transform = 'translate3d(0, 0, 0)';
      });
    });
  }

  const glitchTargets = document.querySelectorAll('.glitch-trigger');
  const glitchOnHover = document.querySelectorAll('.glitch-on-hover');

  const triggerGlitch = (element, duration = 350) => {
    if (!element) return;
    element.classList.add('is-glitching');
    setTimeout(() => element.classList.remove('is-glitching'), duration);
  };

  glitchTargets.forEach((el, index) => {
    const cycle = () => {
      const delay = 2500 + Math.random() * 2500 + index * 250;
      setTimeout(() => {
        triggerGlitch(el, 400);
        cycle();
      }, delay);
    };
    cycle();
  });

  glitchOnHover.forEach((el) => {
    el.addEventListener('mouseenter', () => triggerGlitch(el, 400));
    el.addEventListener('animationend', () => el.classList.remove('is-glitching'));
  });

  const enterButton = document.querySelector('.enter-void');
  const aboutSection = document.querySelector('#about');
  if (enterButton && aboutSection) {
    enterButton.addEventListener('click', () => {
      aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  const navLinks = document.querySelectorAll('.site-nav a');
  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const target = document.querySelector(targetId);
        if (target) {
          event.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  const form = document.querySelector('.contact-form');
  const emailInput = document.querySelector('#email-input');
  const message = document.querySelector('.form-message');
  const inputWrap = document.querySelector('.input-wrap');

  const setMessage = (text, state) => {
    if (!message) return;
    message.textContent = text;
    message.dataset.state = state || '';
  };

  if (emailInput && inputWrap) {
    const toggleScan = () => {
      if (emailInput === document.activeElement || emailInput.value.trim() !== '') {
        inputWrap.classList.add('active');
      } else {
        inputWrap.classList.remove('active');
      }
    };

    emailInput.addEventListener('focus', toggleScan);
    emailInput.addEventListener('blur', toggleScan);
    emailInput.addEventListener('input', toggleScan);
  }

  if (form && emailInput) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const value = emailInput.value.trim();
      if (!value) {
        setMessage('NO SIGNAL RECEIVED.', 'error');
        triggerGlitch(message, 500);
        return;
      }
      setMessage('SIGNAL ACCEPTED. YOU HAVE BEEN LOGGED.', 'success');
      triggerGlitch(message, 500);
      form.reset();
      if (inputWrap) inputWrap.classList.remove('active');
    });
  }
});
