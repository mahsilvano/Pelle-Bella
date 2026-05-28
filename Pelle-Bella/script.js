// ===== Mobile Menu Toggle =====
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    
    // Update icon
    const isOpen = mobileMenu.classList.contains('active');
    mobileMenuBtn.innerHTML = isOpen
      ? '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>'
      : '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>';
  });

  // Close menu when clicking a link
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      mobileMenuBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>';
    });
  });
}

// ===== Carousel =====
const carousel = document.querySelector('.carousel');
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.carousel-dot');
const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');
const slidesContainer = document.querySelector('.carousel-slides');

let currentSlide = 0;
let autoplayInterval;
const autoplayDelay = 5000;

function goToSlide(index) {
  // Handle wrap-around
  if (index >= slides.length) index = 0;
  if (index < 0) index = slides.length - 1;
  
  currentSlide = index;
  
  // Move slides
  slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
  
  // Update dots
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlide);
  });
}

function nextSlide() {
  goToSlide(currentSlide + 1);
}

function prevSlide() {
  goToSlide(currentSlide - 1);
}

function startAutoplay() {
  stopAutoplay();
  autoplayInterval = setInterval(nextSlide, autoplayDelay);
}

function stopAutoplay() {
  if (autoplayInterval) {
    clearInterval(autoplayInterval);
  }
}

// Event listeners
if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    nextSlide();
    startAutoplay();
  });
}

if (prevBtn) {
  prevBtn.addEventListener('click', () => {
    prevSlide();
    startAutoplay();
  });
}

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    goToSlide(i);
    startAutoplay();
  });
});

// Pause on hover
if (carousel) {
  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('mouseleave', startAutoplay);
}

// Touch support for carousel
let touchStartX = 0;
let touchEndX = 0;

if (slidesContainer) {
  slidesContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    stopAutoplay();
  }, { passive: true });

  slidesContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    startAutoplay();
  }, { passive: true });
}

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;
  
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  }
}

// Start autoplay
startAutoplay();

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ===== Header Scroll Effect =====
const header = document.querySelector('.header');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  
  // Add shadow when scrolled
  if (currentScrollY > 10) {
    header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
  } else {
    header.style.boxShadow = 'none';
  }
  
  lastScrollY = currentScrollY;
}, { passive: true });

// ===== Intersection Observer for Animations =====
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Animate sections on scroll
document.querySelectorAll('.service-card, .result-card, .about-content, .about-images').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Stagger animation for service cards
document.querySelectorAll('.service-card').forEach((card, index) => {
  card.style.transitionDelay = `${index * 0.1}s`;
});

document.querySelectorAll('.result-card').forEach((card, index) => {
  card.style.transitionDelay = `${index * 0.1}s`;
});
