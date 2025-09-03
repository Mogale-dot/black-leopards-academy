
 
const loginModal = document.getElementById('loginModal');

const loginForm = document.getElementById('loginForm');

const closeBtns = document.querySelectorAll('.close-btn');


// Header scroll functionality
    const header = document.querySelector('.header');
    const mobileBtn = document.querySelector('.mobile-menu-btn');
 
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
             
                stickyBg.classList.add('active');
            } else {
                // Scrolling up or at top
                if (currentScroll <= headerHeight) {
                    if (mobileBtn) mobileBtn.classList.remove('sticky');
                
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
 




function showLoader() {
      document.getElementById("load").classList.add("show"); 
      load.style.display = 'flex';
      }
    function hideLoader() {
    document.getElementById("load").classList.remove("show"); 
    load.style.display = 'none';
    }


// Login Form Submission
loginForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
   const errorContainerr = document.getElementById('loginErrors');
   errorContainerr.innerHTML = '';
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value; 

  showLoader();
  try { 
    
    const response = await fetch('https://leopards-backend.onrender.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
  
    if (response.ok) {
      localStorage.setItem('token', data.token);
      const userData = parseJwt(data.token); 
     hideLoader();
       window.location.href = 'index.html';
      // Redirect admin to dashboard.html
      if (userData.role === 'admin') {
        window.location.href = 'dashboard.html';
      } 
    } 
   
    else {
      errorContainerr.innerHTML = `<div>• ${data.error || 'Signup failed'}</div>`;
      hideLoader();
    }
  }  

  catch (err) {
    console.error('Login error:', err);
    errorContainerr.innerHTML = `<div>• ${data.error || 'Signup failed'}</div>`;
    hideLoader();
  }
  hideLoader();
});


   
       
     
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

    