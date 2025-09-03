// DOM Elements


const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
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




// Signup Form Submission

  
 document.getElementById('signupForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Clear previous errors
  const errorContainer = document.getElementById('signupErrors');
  errorContainer.innerHTML = '';
  
  // Get form values
  const name = document.getElementById('signupName').value;
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  
  // Validate password
  const passwordErrors = [];
  
  // Check password length
  if (password.length < 8) {
    passwordErrors.push("Password must be at least 8 characters");
  }
  
  // Check for at least one number
  if (!/\d/.test(password)) {
    passwordErrors.push("Password must contain at least one number");
  }
  
  // Check for at least one special character
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    passwordErrors.push("Password must contain at least one special character (@, #, $, etc.)");
  }
  
  // Check for at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    passwordErrors.push("Password must contain at least one uppercase letter");
  }
  
  // Check password match
  if (password !== confirmPassword) {
    passwordErrors.push("Passwords do not match");
  }
  
  // If there are errors, display them and return
  if (passwordErrors.length > 0) {
    errorContainer.innerHTML = passwordErrors.map(error => 
      `<div>• ${error}</div>`
    ).join('');
    return;
  }
  
  // Show loader
  showLoader();
  
  try {
    const response = await fetch('http://localhost:5000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      localStorage.setItem('token', data.token);
      const userData = parseJwt(data.token);
      window.location.href = 'index.html';
    } else {
      errorContainer.innerHTML = `<div>• ${data.error || 'Signup failed'}</div>`;
    }
  } catch (err) {
    console.error('Signup error:', err);
    errorContainer.innerHTML = '<div>• Server error. Please try again.</div>';
  } finally {
    hideLoader();
  }
});

// Add real-time password validation feedback
document.getElementById('signupPassword')?.addEventListener('input', function() {
  const password = this.value;
  const errorContainer = document.getElementById('signupErrors');
  
  // Clear previous styling
  this.classList.remove('invalid');
  
  // Validate in real-time (optional)
  if (password.length > 0 && password.length < 8) {
    this.classList.add('invalid');
    errorContainer.innerHTML = '<div>• Password must be at least 8 characters</div>';
  } else {
    errorContainer.innerHTML = '';
  }
});

document.getElementById('confirmPassword')?.addEventListener('input', function() {
  const password = document.getElementById('signupPassword').value;
  const confirmPassword = this.value;
  
  // Clear previous styling
  this.classList.remove('invalid');
  
  if (confirmPassword.length > 0 && password !== confirmPassword) {
    this.classList.add('invalid');
    document.getElementById('signupErrors').innerHTML = '<div>• Passwords do not match</div>';
  } else if (password === confirmPassword && confirmPassword.length > 0) {
    document.getElementById('signupErrors').innerHTML = '';
  }
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