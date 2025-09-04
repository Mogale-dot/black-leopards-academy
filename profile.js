  document.addEventListener('DOMContentLoaded', function() { 
 const token = localStorage.getItem('token');
            if (!token) {
                window.location.href = 'login.html';
                return;
            }
        

  // Get all view buttons
  const viewButtons = document.querySelectorAll('.view-btn');
  const popup = document.getElementById('player-popup');
  const closeBtn = document.querySelector('.close-btn');
  
  // Sample player data (you would replace this with real data)
  const players = {
    1: {
      name: "Thato Masipa",
      img: "images/thato10.jpg",
      goals: 0,
      assists: 0,
      matches: 0,
      position: "CDM",
      age : 18 ,
      num : 5

     
    }, 
    2: {
       name: "Prosper Letsoalo",
      img: "images/prosper11.jpg",
      goals: 0,
      assists: 0,
      matches: 0,
      position: "Attacking Midfielder",
      age : 17, 
      num:11 
      
    }, 
    3: {
      name: "Tau kgotsofalo",
      img: "images/tlou20.jpg",
      goals: 0,
      assists: 0,
      matches: 0,
      position: "Center  Back",
      age : 19, 
      num:2
    }, 
    4: {
      name: "Sepadi Thobejane",
      img: "images/tshiamo0.jpg",
      goals: 0,
      assists: 0,
      matches: 0,
      position: "Attacking Midfielder",
      age : 17 ,
      num:2
    },
    5: {
      name: "Nuraz Tayob",
      img: "images/nurez80.jpg",
      goals: 0,
      assists: 0,
      matches: 0,
      position: "Attacking Midfielder",
      age : 16 ,
      num:80
    }, 
    6: {
      name: "Mpumelelo lamani",
      img: "images/mpumi26.jpg",
      goals: 0,
      assists: 0,
      matches: 0,
      position: "Attacking Midfielder",
      age : 0 ,
      num:26
    }, 
    7: {
      name: "Reatlegile  Sekulane",
      img: "images/long28.jpg",
      goals: 0,
      assists: 0,
      matches: 0,
      position: "CDM",
      age : 18 ,
      num:28
    }, 
    8: {
      name: "SubhanDB",
      img: "images/subhan13.jpg",
      goals: 0,
      assists: 0,
      matches: 0,
      position: "Center back",
      age : 14 ,
      num:13
    }, 
    9: {
      name: "Khenso Ndabambi",
      img: "images/khenso83.jpg",
      goals: 0,
      assists: 0,
      matches: 0,
      position: "Center back",
      age : 17 ,
      num:83
    }, 
     
     10: {
      name: "Maeyane Dion",
      img: "images/diona10.jpg",
      goals: 0,
      assists: 0,
      matches: 0,
      position: "Right Back",
      age : 17 ,
      num:10
    }, 
    11: {
      name: "Anass  Moudjahed",
      img: "images/annas.jpg",
      goals: 0,
      assists: 0,
      matches: 0,
      position: "RW",  
      age : 15 ,
      num:20
    },
    // Add data for other players
  };
  
    // Add data for other players
  
  
  // Add click event to each button
  viewButtons.forEach(button => {
    button.addEventListener('click', function() {
      const playerId = this.getAttribute('data-player');
      const player = players[playerId];
      
      // Update popup content
      document.getElementById('popup-player-img').src = player.img;
      document.getElementById('popup-player-name').textContent = player.name;
      document.getElementById('goals').textContent = player.goals;
      document.getElementById('assists').textContent = player.assists;
      document.getElementById('matches').textContent = player.matches;
      document.getElementById('position').textContent = player.position;
      document.getElementById('age').textContent = player.age; 
      document.getElementById('num').textContent = player.num;
     
      
      // Show popup
      popup.style.display = 'flex';
    });
  });
  
  // Close popup when X is clicked
  closeBtn.addEventListener('click', function() {
    popup.style.display = 'none';
  });
  
  // Close popup when clicking outside content
  popup.addEventListener('click', function(e) {
    if (e.target === popup) {
      popup.style.display = 'none';
    }
  });
}); document.addEventListener('DOMContentLoaded', function() {
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
});