// Dark Mode Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// Check for saved theme preference
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
  body.classList.add(currentTheme);
  updateIcon();
}

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-theme');
  localStorage.setItem('theme', body.classList.contains('dark-theme') ? 'dark-theme' : '');
  updateIcon();
});

// Update moon/sun icon
function updateIcon() {
  const isDark = body.classList.contains('dark-theme');
  themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}

// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  cursorFollower.style.left = e.clientX + 'px';
  cursorFollower.style.top = e.clientY + 'px';
});

// Cursor effects for interactive elements
document.querySelectorAll('a, button, .project-card').forEach(element => {
  element.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
    cursor.style.background = 'var(--primary-color)';
    cursor.style.borderColor = 'transparent';

    if (element.classList.contains('project-card')) {
      cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.8)';
      cursorFollower.style.background = 'rgba(124, 77, 255, 0.4)';
    }
  });

  element.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    cursor.style.background = 'transparent';
    cursor.style.borderColor = 'var(--primary-color)';
    cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
    cursorFollower.style.background = 'rgba(124, 77, 255, 0.2)';
  });
});

// Scroll Animation Observer
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.animate');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(element => {
    observer.observe(element);
  });
};

// Back to top button
const backToTop = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTop.classList.add('active');
  } else {
    backToTop.classList.remove('active');
  }
});

// Smooth scroll for navigation
document.querySelectorAll('a').forEach(anchor => {
    const href = anchor.getAttribute('href');
  
    // Only apply smooth scroll to real anchors, like #about, #contact, etc.
    if (href && href.startsWith('#') && href.length > 1) {
      anchor.addEventListener('click', function (e) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          window.scrollTo({
            top: target.offsetTop,
            behavior: 'smooth'
          });
        }
      });
    }
  });
  
  
// Contact form handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value || 'Contact from Portfolio';
    const message = document.getElementById('message').value;

    const mailtoLink = `mailto:aditya.iche@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage: ${message}`
    )}`;

    window.location.href = mailtoLink;
  });
}

// Typing animation
const typingText = document.querySelector('.typing-text');
const words = ["Software Engineer", "AI Enthusiast", "Future Dev", "Guitar Player", "Music Enthusiast"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const currentWord = words[wordIndex];
  const currentChar = currentWord.substring(0, charIndex);
  typingText.textContent = currentChar;

  if (!isDeleting && charIndex < currentWord.length) {
    charIndex++;
    setTimeout(type, 100);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(type, 50);
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) {
      wordIndex = (wordIndex + 1) % words.length;
    }
    setTimeout(type, 1000);
  }
}

// Initialize everything when DOM loads
document.addEventListener('DOMContentLoaded', () => {
  animateOnScroll();
  setTimeout(type, 1000);
});
