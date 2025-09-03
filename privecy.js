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
});