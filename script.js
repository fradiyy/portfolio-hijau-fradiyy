// Script File

// Home Section Starts
var menuBtn = document.querySelector('.menu-btn');
var menu = document.querySelector('.nav-links');
var menuLinks = document.querySelectorAll('.nav-links li a');

menuBtn.addEventListener('click', activeClass);

function activeClass() {
  menuBtn.classList.toggle('active');
  menu.classList.toggle('active');
}

for (i = 0; i < menuLinks.length; i++) {
  menuLinks[i].addEventListener('click', menuItemClicked);
}

function menuItemClicked() {
  menuBtn.classList.remove('active');
  menu.classList.remove('active');
}

var homeSection = document.querySelector('.home');
window.addEventListener('scroll', scrollFunction);
window.addEventListener('load', scrollFunction);

function scrollFunction() {
  if (window.scrollY > 60) {
    homeSection.classList.add('active');
  } else {
    homeSection.classList.remove('active');
  }
}
// Home Section Ends

// Portfolio Section Starts
var $galleryContainer = $('.gallery').isotope({
  itemSelector: '.item',
  layoutMode: 'fitRows',
});

$('.button-group .button').on('click', function () {
  $('.button-group .button').removeClass('active');
  $(this).addClass('active');

  var value = $(this).attr('data-filter');
  $galleryContainer.isotope({
    filter: value,
  });
});

// magnific popup
$('.gallery').magnificPopup({
  delegate: '.overlay a',
  type: 'image',
  gallery: {
    enabled: true,
  },
});
// Portfolio Section Ends

document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('accessibility-toggle-btn');
  const panel = document.getElementById('accessibility-panel');
  const closeBtn = document.getElementById('acc-close-btn');

  // Toggle Accessibility Panel (Menu remains open when options are clicked)
  toggleBtn.addEventListener('click', () => {
    const isHidden = panel.classList.contains('accessibility-panel-hidden');
    if (isHidden) {
      panel.classList.remove('accessibility-panel-hidden');
      panel.setAttribute('aria-hidden', 'false');
    } else {
      panel.classList.add('accessibility-panel-hidden');
      panel.setAttribute('aria-hidden', 'true');
    }
  });

  closeBtn.addEventListener('click', () => {
    panel.classList.add('accessibility-panel-hidden');
    panel.setAttribute('aria-hidden', 'true');
  });

  // Toggle Action Helper Function
  function bindToggleAction(buttonId, className) {
    const btn = document.getElementById(buttonId);
    if (!btn) return;
    btn.addEventListener('click', () => {
      document.body.classList.toggle(className);
      btn.classList.toggle('active');
    });
  }

  // 1. Font Size Scaling
  const scaleSlider = document.getElementById('font-scale-slider');
  const scaleValueText = document.getElementById('font-scale-value');
  scaleSlider.addEventListener('input', (e) => {
    const val = e.target.value;
    scaleValueText.textContent = `${val}%`;
    document.body.style.fontSize = `${val}%`;
  });

  // 2. Text & Display Adjustments
  bindToggleAction('btn-font-weight', 'acc-font-weight-bold');
  bindToggleAction('btn-dyslexia-font', 'acc-dyslexia-font');
  bindToggleAction('btn-highlight-links', 'acc-highlight-links');

  // Letter Spacing Selection
  const spacingSelect = document.getElementById('letter-spacing-select');
  spacingSelect.addEventListener('change', (e) => {
    document.body.classList.remove('acc-letter-wide', 'acc-letter-wider');
    if (e.target.value === 'wide') document.body.classList.add('acc-letter-wide');
    if (e.target.value === 'wider') document.body.classList.add('acc-letter-wider');
  });

  // 3. Color, Contrast, Dark Mode & Color Swap
  bindToggleAction('btn-dark-mode', 'acc-dark-mode');
  bindToggleAction('btn-dark-contrast', 'acc-dark-contrast');
  bindToggleAction('btn-light-contrast', 'acc-light-contrast');
  bindToggleAction('btn-grayscale', 'acc-grayscale');
  bindToggleAction('btn-reverse-color', 'theme-reverse-green');

  // Color Blindness Selection
  const colorBlindSelect = document.getElementById('color-blind-select');
  colorBlindSelect.addEventListener('change', (e) => {
    document.body.classList.remove('acc-color-protanopia', 'acc-color-deuteranopia', 'acc-color-tritanopia');
    if (e.target.value !== 'normal') {
      document.body.classList.add(`acc-color-${e.target.value}`);
    }
  });

  // 4. Screen Reader Simulation (Web Speech API)
  let screenReaderActive = false;
  const screenReaderBtn = document.getElementById('btn-screen-reader');

  screenReaderBtn.addEventListener('click', () => {
    screenReaderActive = !screenReaderActive;
    screenReaderBtn.classList.toggle('active', screenReaderActive);

    if (screenReaderActive) {
      alert('Screen Reader Active: Hover or click on text to hear it read aloud.');
      document.addEventListener('mouseover', speakTextOnHover);
    } else {
      document.removeEventListener('mouseover', speakTextOnHover);
      window.speechSynthesis.cancel();
    }
  });

  function speakTextOnHover(e) {
    if (!screenReaderActive) return;
    const text = e.target.innerText;
    if (text && text.trim().length > 0 && text.length < 150) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  }

  // 5. Auto Scroll Feature (Scrolls down to footer and back up automatically)
  let autoScrollInterval = null;
  const autoScrollBtn = document.getElementById('btn-auto-scroll');

  autoScrollBtn.addEventListener('click', () => {
    if (autoScrollInterval) {
      stopAutoScroll();
    } else {
      startAutoScroll();
    }
  });

  function startAutoScroll() {
    autoScrollBtn.classList.add('active');
    autoScrollBtn.textContent = 'Stop Auto Scroll';

    let direction = 'down'; // Initial direction: down

    autoScrollInterval = setInterval(() => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      // Reached the bottom (footer) -> reverse to top
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        direction = 'up';
      }
      // Reached the top -> reverse to bottom
      else if (scrollTop <= 0) {
        direction = 'down';
      }

      if (direction === 'down') {
        window.scrollBy({ top: 3, behavior: 'smooth' });
      } else {
        window.scrollBy({ top: -3, behavior: 'smooth' });
      }
    }, 20);
  }

  function stopAutoScroll() {
    clearInterval(autoScrollInterval);
    autoScrollInterval = null;
    autoScrollBtn.classList.remove('active');
    autoScrollBtn.textContent = 'Auto Scroll';
  }

  // 6. Reset All Settings
  document.getElementById('btn-reset').addEventListener('click', () => {
    scaleSlider.value = 100;
    scaleValueText.textContent = '100%';
    document.body.style.fontSize = '';

    spacingSelect.value = 'normal';
    colorBlindSelect.value = 'normal';

    document.body.className = '';

    if (screenReaderActive) {
      screenReaderActive = false;
      document.removeEventListener('mouseover', speakTextOnHover);
      window.speechSynthesis.cancel();
    }

    if (autoScrollInterval) {
      stopAutoScroll();
    }

    document.querySelectorAll('.acc-btn').forEach((btn) => btn.classList.remove('active'));
  });
});

// Testimonials Section Starts
$('.testimonials-container').owlCarousel({
  loop: true,
  autoplay: true,
  autoplayTime: 6000,
  margin: 10,
  nav: true,
  navText: ["<i class='fa-solid fa-arrow-left'></i>", "<i class='fa-solid fa-arrow-right'></i>"],
  responsive: {
    0: {
      items: 1,
      nav: false,
    },
    600: {
      items: 1,
      nav: true,
    },
    768: {
      items: 2,
    },
  },
});
