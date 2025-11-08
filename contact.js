// Contact Form - Only execute if on contact page
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault(); // Prevent default form submission
        
        // Get form elements
        const submitBtn = document.getElementById('responseMessage');
        const firstName = document.getElementById('Name').value;
        const lastName = document.getElementById('secondName').value;
        const email = document.getElementById('user-email').value;
        const contactNumber = document.getElementById('contactNumber').value;
        const message = document.getElementById('message').value;
        
        // Change button text to indicate processing
        submitBtn.querySelector('.text').textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            // Send data to your backend
            const response = await fetch('https://leopards-backend.onrender.com/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    contactNumber,
                    message
                })
            });
            
            if (!response.ok) {
                throw new Error('Failed to submit form');
            }
            
            // Show success message
            submitBtn.querySelector('.text').textContent = 'Message Sent !';
            
            // Clear form fields
            document.getElementById('contactForm').reset();
            
            // Reset button after 3 seconds
          
            
        } catch (error) {
            console.error('Form submission error:', error);
            
            // Show error message
            submitBtn.querySelector('.text').textContent = 'Error - Try Again';
            
            // Reset button after 3 seconds
          
        }
    });
}

// Common functionality for all pages
document.addEventListener('DOMContentLoaded', function() {
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
 
    // User greeting functionality
    const token = localStorage.getItem('token');
    const userGreeting = document.getElementById('userGreeting');
    const welcomeMessage = document.getElementById('welcomeMessage');
    const logoutBtn = document.getElementById('logoutBtn');
    const openLoginBtn = document.getElementById('openLogin');
    const openSignupBtn = document.getElementById('opensignup');
    const openLoginBtn1 = document.getElementById('openLogin1');
    const openSignupBtn1 = document.getElementById('opensignup1');

    if (token && userGreeting && welcomeMessage) {
        const userData = parseJwt(token);
        if (userData) {
            showUserGreeting(userData.name);
        }
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('token');
            hideUserGreeting();
        });
    }

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

    // FAQ Accordion Functionality - Only execute if on FAQ page
    const faqQuestions = document.querySelectorAll('.faq-question');
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const item = question.parentNode;
                item.classList.toggle('active');
                
                // Close other open items
                document.querySelectorAll('.faq-item').forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
            });
        });
        
        // Category Filtering
        const categoryBtns = document.querySelectorAll('.category-btn');
        if (categoryBtns.length > 0) {
            categoryBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    // Update active category button
                    document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    
                    const category = btn.dataset.category;
                    const allItems = document.querySelectorAll('.faq-item');
                    
                    if (category === 'all') {
                        allItems.forEach(item => item.style.display = 'block');
                    } else {
                        allItems.forEach(item => {
                            if (item.dataset.category === category) {
                                item.style.display = 'block';
                            } else {
                                item.style.display = 'none';
                            }
                        });
                    }
                });
            });
            
            // Open first item by default if items exist
            const firstFaqItem = document.querySelector('.faq-item');
            if (firstFaqItem) {
                firstFaqItem.classList.add('active');
            }
        }
    }
});