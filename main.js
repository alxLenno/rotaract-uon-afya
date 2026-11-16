// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-links');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('is-active');
    mobileMenu.setAttribute('aria-expanded', mobileMenu.classList.contains('is-active'));
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('is-active');
        navMenu.classList.remove('active');
        mobileMenu.setAttribute('aria-expanded', 'false');
    });
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active Link highlighting on scroll
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// ============================================================
// EmailJS Setup — Replace these with your actual EmailJS IDs
// ============================================================
// 1. Sign up at https://www.emailjs.com (free: 200 emails/month)
// 2. Add an Email Service (e.g. Gmail) → copy the Service ID
// 3. Create an Email Template → copy the Template ID
// 4. Go to Account → copy your Public Key
// 5. Replace the three values below:
const EMAILJS_PUBLIC_KEY = 'Pgt-FPNPhJko82jWM';
const EMAILJS_SERVICE_ID = 'service_ozh9tbe';
const EMAILJS_TEMPLATE_ID = 'template_ut9rro7';

// Initialize EmailJS
if (window.emailjs) emailjs.init(EMAILJS_PUBLIC_KEY);

// Contact Form Submission via EmailJS
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerText;
        submitBtn.innerText = 'Sending...';
        submitBtn.disabled = true;

        if (!window.emailjs) {
            submitBtn.innerText = 'Please email racafyauon@gmail.com';
            submitBtn.disabled = false;
            return;
        }
        emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, contactForm)
            .then(() => {
                submitBtn.innerText = 'Message Sent! ✓';
                submitBtn.style.backgroundColor = '#008080';
                contactForm.reset();

                setTimeout(() => {
                    submitBtn.innerText = originalText;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.disabled = false;
                }, 3000);
            })
            .catch((error) => {
                console.error('EmailJS Error:', error);
                submitBtn.innerText = 'Failed — Try Again';
                submitBtn.style.backgroundColor = '#e74c3c';
                submitBtn.disabled = false;

                setTimeout(() => {
                    submitBtn.innerText = originalText;
                    submitBtn.style.backgroundColor = '';
                }, 3000);
            });
    });
}

// Lightbox Gallery Logic
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.lightbox-close');
const prevBtn = document.querySelector('.lightbox-prev');
const nextBtn = document.querySelector('.lightbox-next');
const coverItems = document.querySelectorAll('.cover-item');

let currentImages = [];
let currentIndex = 0;

coverItems.forEach(item => {
    item.addEventListener('click', () => {
        const imagesStr = item.getAttribute('data-images');
        if (imagesStr) {
            currentImages = JSON.parse(imagesStr);
            currentIndex = 0;
            showLightboxImage();
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        }
    });
});

function showLightboxImage() {
    if (currentImages.length > 0) {
        lightboxImg.src = currentImages[currentIndex];
    }
}

closeBtn.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    showLightboxImage();
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % currentImages.length;
    showLightboxImage();
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'flex') {
        if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
            showLightboxImage();
        } else if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % currentImages.length;
            showLightboxImage();
        } else if (e.key === 'Escape') {
            closeLightbox();
        }
    }
});


coverItems.forEach(item => {
    item.tabIndex = 0;
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', 'Open ' + item.querySelector('img').alt + ' gallery');
    item.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); item.click(); }
    });
});

const themeToggle = document.getElementById('theme-toggle');
const systemTheme = matchMedia('(prefers-color-scheme: dark)');
function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    const dark = theme === 'dark';
    themeToggle.setAttribute('aria-pressed', String(dark));
    themeToggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    themeToggle.title = dark ? 'Switch to light mode' : 'Switch to dark mode';
    themeToggle.querySelector('.theme-label').textContent = dark ? 'Light' : 'Dark';
}
applyTheme(document.documentElement.dataset.theme || 'light');
themeToggle.addEventListener('click', () => {
    const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(theme);
    try { localStorage.setItem('afya-theme', theme); } catch (_) {}
});
systemTheme.addEventListener('change', event => {
    try { if (localStorage.getItem('afya-theme')) return; } catch (_) {}
    applyTheme(event.matches ? 'dark' : 'light');
});

// Hero photo sequence; pauses explicitly or while the tab is hidden.
const heroPhoto = document.querySelector('.hero-photo');
const heroImage = heroPhoto.querySelector('img');
const heroSlides = [
    { src: 'assets/images/hero.jpeg', alt: 'Rotaract UoN Afya members together at a club event', caption: 'Rotaract UoN Afya' },
    { src: 'assets/images/Pad Drive Distribution/Pad_Drive3.jpeg', alt: 'Members taking part in the pad distribution drive', caption: 'Community in action' },
    { src: 'assets/images/Financial Workshop/Finacial_Literacy2.jpeg', alt: 'Financial literacy workshop with club members', caption: 'Learning together' },
    { src: 'assets/images/Pad Drive Distribution/Pad_Drive4.jpeg', alt: 'A moment from the club pad distribution project', caption: 'Service Above Self' }
];
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let heroIndex = 0;
let heroPaused = reducedMotion.matches;
let heroBusy = false;
let heroTimer;
const heroPause = document.getElementById('hero-pause');
function updateHeroPause() {
    heroPause.textContent = heroPaused ? 'Play' : 'Pause';
    heroPause.setAttribute('aria-label', heroPaused ? 'Play slideshow' : 'Pause slideshow');
    heroPause.setAttribute('aria-pressed', String(heroPaused));
}
async function changeHero(direction) {
    if (heroBusy) return;
    heroBusy = true;
    const nextIndex = (heroIndex + direction + heroSlides.length) % heroSlides.length;
    const slide = heroSlides[nextIndex];
    const preload = new Image();
    preload.src = slide.src;
    try { await preload.decode(); } catch (_) { heroBusy = false; return; }
    heroPhoto.classList.add('is-flipping');
    setTimeout(() => {
        heroIndex = nextIndex;
        heroImage.src = slide.src;
        heroImage.alt = slide.alt;
        document.getElementById('hero-photo-caption').textContent = slide.caption;
        document.getElementById('hero-photo-count').textContent = String(heroIndex + 1).padStart(2, '0') + ' / 04';
        heroPhoto.classList.remove('is-flipping');
        setTimeout(() => { heroBusy = false; }, reducedMotion.matches ? 0 : 380);
    }, reducedMotion.matches ? 0 : 380);
}
function scheduleHero() {
    clearInterval(heroTimer);
    if (!heroPaused && !document.hidden) heroTimer = setInterval(() => {
        changeHero(1);
    }, 5500);
}
document.getElementById('hero-prev').addEventListener('click', () => { changeHero(-1); scheduleHero(); });
document.getElementById('hero-next').addEventListener('click', () => { changeHero(1); scheduleHero(); });
heroPause.addEventListener('click', () => { heroPaused = !heroPaused; updateHeroPause(); scheduleHero(); });
document.addEventListener('visibilitychange', scheduleHero);
reducedMotion.addEventListener('change', e => { if (e.matches) { heroPaused = true; updateHeroPause(); scheduleHero(); } });
updateHeroPause();
scheduleHero();
