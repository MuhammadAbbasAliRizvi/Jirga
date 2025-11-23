// app.js - Main JavaScript file for Jirga Restaurant website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSlider();
    initMobileMenu();
    initSmoothScrolling();
    initScrollAnimations();
    initNewsletter();
    initMenuTabs();
});

// Hero Slider Functionality
function initSlider() {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.querySelector('.slider-arrow.prev');
    const nextBtn = document.querySelector('.slider-arrow.next');
    
    if (!slider || !slides.length) return;
    
    let currentSlide = 0;
    const slideCount = slides.length;
    let slideInterval;

    // Function to update slider position
    function updateSlider() {
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update active dot
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    // Next slide function
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slideCount;
        updateSlider();
    }

    // Previous slide function
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        updateSlider();
    }

    // Auto slide every 5 seconds
    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    // Stop auto slide
    function stopAutoSlide() {
        clearInterval(slideInterval);
    }

    // Event listeners for slider controls
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            stopAutoSlide();
            nextSlide();
            startAutoSlide();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            stopAutoSlide();
            prevSlide();
            startAutoSlide();
        });
    }

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            stopAutoSlide();
            currentSlide = index;
            updateSlider();
            startAutoSlide();
        });
    });

    // Pause on hover
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopAutoSlide);
        sliderContainer.addEventListener('mouseleave', startAutoSlide);
    }

    // Start the slider
    startAutoSlide();
}

// Mobile Menu Functionality
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (!menuToggle || !mainNav) return;

    menuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        menuToggle.innerHTML = mainNav.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', function() {
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
}

// Smooth Scrolling for Anchor Links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.brand-card, .location-card, .express-card, .feed-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.brand-card, .location-card, .express-card, .feed-item');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
}

// Newsletter Form Submission
function initNewsletter() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (!newsletterForm) return;

    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        // In a real application, you would send this to a server
        alert(`Thank you for subscribing with ${email}! You'll receive our latest updates soon.`);
        this.reset();
    });
}

// Menu Tab Switching (for menu.html)
function initMenuTabs() {
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuCategories = document.querySelectorAll('.menu-category');
    
    if (!menuTabs.length || !menuCategories.length) return;

    menuTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs and categories
            menuTabs.forEach(t => t.classList.remove('active'));
            menuCategories.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding category
            const categoryId = this.getAttribute('data-category');
            document.getElementById(categoryId).classList.add('active');
            
            // Trigger animation for images in the active category
            const activeImages = document.querySelectorAll(`#${categoryId} .item-image`);
            activeImages.forEach(img => {
                img.classList.remove('animate');
                void img.offsetWidth; // Trigger reflow
                img.classList.add('animate');
            });
        });
    });

    // Initial animation for BBQ category (active by default)
    const initialImages = document.querySelectorAll('#bbq .item-image');
    initialImages.forEach(img => {
        img.classList.add('animate');
    });
}