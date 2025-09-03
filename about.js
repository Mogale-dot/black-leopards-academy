
// DOM Elements
const openLoginBtn = document.getElementById('openLogin');
const openSignupBtn = document.getElementById('opensignup');
const openLoginBtn1 = document.getElementById('openLogin1');
const openSignupBtn1 = document.getElementById('opensignup1');


const closeBtns = document.querySelectorAll('.close-btn');
const userGreeting = document.getElementById('userGreeting');
const welcomeMessage = document.getElementById('welcomeMessage');
const logoutBtn = document.getElementById('logoutBtn');

// Check if user is already logged in
document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  if (token) {
    const userData = parseJwt(token);
    showUserGreeting(userData.name );
  }
});  




// Header scroll functionality
    const header = document.querySelector('.header');
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const socials = document.querySelector('.socials');
    const socials1 = document.querySelector('.socials1');
    const logo = document.querySelector('.logo');
    
    if (header) {
        const stickyBg = document.createElement('div');
        stickyBg.className = 'sticky-background';
        header.appendChild(stickyBg);
        
        let lastScroll = 0;
        const headerHeight = header.offsetHeight;
        
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            if (currentScroll > lastScroll && currentScroll > headerHeight) {
                // Scrolling down
                if (mobileBtn) mobileBtn.classList.add('sticky');
                if (socials) socials.classList.add('sticky');
                if (socials1) socials1.classList.add('sticky');
                stickyBg.classList.add('active');
            } else {
                // Scrolling up or at top
                if (currentScroll <= headerHeight) {
                    if (mobileBtn) mobileBtn.classList.remove('sticky');
                    if (socials) socials.classList.remove('sticky');
                    if (socials1) socials1.classList.add('sticky');
                    stickyBg.classList.remove('active');
                }
            }
            lastScroll = currentScroll;
        });
    }

    // Mobile Menu Functionality
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu && mobileBtn) {
        const closeBtn = document.createElement('div');
        closeBtn.className = 'menu-close-btn';
        mobileMenu.prepend(closeBtn);

        function toggleMenu() {
            mobileBtn.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        }

        mobileBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu();
        });

        closeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu();
        });

        document.addEventListener('click', function(e) {
            if (mobileMenu.classList.contains('active') && 
                !e.target.closest('.mobile-menu') && 
                !e.target.closest('.mobile-menu-btn')) {
                toggleMenu();
            }
        });

        const menuLinks = document.querySelectorAll('.mobile-menu a');
        menuLinks.forEach(link => {
            link.addEventListener('click', toggleMenu);
        });
    }
 








    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token && userGreeting && welcomeMessage) {
        const userData = parseJwt(token);
        if (userData) {
            showUserGreeting(userData.name);
        }
    }

    // Logout Functionality
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('token');
            hideUserGreeting();
        });
    }

    // Helper Functions
    function showUserGreeting(name) {
        if (openLoginBtn && openSignupBtn) {
            openLoginBtn.style.display = 'none';
            openSignupBtn.style.display = 'none'; 
           
            
        }  
         if (openLoginBtn1 && openSignupBtn1) {
            openLoginBtn1.style.display = 'none';
            openSignupBtn1.style.display = 'none'; 
           
            
        } 
       
        if (welcomeMessage) welcomeMessage.textContent = `Hello ${name}`;
        if (userGreeting) userGreeting.style.display = 'flex';
    }

    function hideUserGreeting() {
        if (openLoginBtn && openSignupBtn) {
            openLoginBtn.style.display = 'inline-block';
            openSignupBtn.style.display = 'inline-block';
        }  
        if (openLoginBtn1 && openSignupBtn1) {
            openLoginBtn1.style.display = 'inline-block';
            openSignupBtn1.style.display = 'inline-block';
        } 
        if (userGreeting) userGreeting.style.display = 'none';
    }

    function parseJwt(token) {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            return JSON.parse(atob(base64));
        } catch (e) {
            return null;
        }
    }


// Testimonials Slider
    const testimonials = document.querySelectorAll('.testimonial-card');
    if (testimonials.length > 0) {
        let currentSlide = 0;
        
        function showNextTestimonial() {
            testimonials[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % testimonials.length;
            testimonials[currentSlide].classList.add('active');
        }
        
        setInterval(showNextTestimonial, 4000);
    } 


    document.addEventListener('DOMContentLoaded', function() { 
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.mv-card, .coach-card, .facility-card');
        
        // Only proceed if elements exist
        if (elements.length === 0) return;
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Only set initial state if elements exist
    const animatedElements = document.querySelectorAll('.mv-card, .coach-card, .facility-card');
    if (animatedElements.length > 0) {
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        
        // Only add event listeners if elements exist
        window.addEventListener('load', animateOnScroll);
        window.addEventListener('scroll', animateOnScroll);
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    function animateCounters() {
        const counterElements = document.querySelectorAll('.achievement-item');
        if (counterElements.length === 0) return;
        
        let animationDone = false;
        
        return function() {
            if (animationDone) return;
            
            const triggerBottom = window.innerHeight / 5 * 4;
            const section = document.querySelector('.achievements');
            if (!section) return;
            
            const sectionTop = section.getBoundingClientRect().top;
            
            if (sectionTop < triggerBottom) {
                animationDone = true;
                
                counterElements.forEach(item => {
                    const target = +item.getAttribute('data-target');
                    const suffix = item.getAttribute('data-suffix') || '';
                    const duration = 2000; // 2 seconds
                    const start = 0;
                    const increment = target / (duration / 16); // 60fps
                    
                    let current = start;
                    const counter = item.querySelector('.achievement-number');
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            clearInterval(timer);
                            current = target;
                        }
                        
                        counter.textContent = Math.floor(current) + suffix;
                    }, 16);
                    
                    // Add animation class
                    item.classList.add('animated');
                });
            }
        };
    }
    
    // Initialize counter animation only if elements exist
    const counterElements = document.querySelectorAll('.achievement-item');
    if (counterElements.length > 0) {
        const checkCounters = animateCounters();
        window.addEventListener('load', checkCounters);
        window.addEventListener('scroll', checkCounters);
    }
});
      