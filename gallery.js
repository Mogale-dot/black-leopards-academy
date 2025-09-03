
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


    
      


    
        const galleryImages = [ 
          { src: "images/image53.jpg", category: "team",  caption: "" },
            { src: "images/image54.jpg", category: "tournaments",  caption: "" },
            { src: "images/image56.jpg", category: "tournaments",  caption: "" },
            { src: "images/image57.jpg", category: "tournaments",  caption: "" },
            { src: "images/image13.jpg", category: "matches", caption: "Morning drills session" },
            { src: "images/image14.jpg", category: "matches", caption: "matches" },
            { src: "images/image15.jpg", category: "tournaments", caption: "2025 Mayors Cup game" },
            { src: "images/image10.jpg", category: "facilities", caption: "Main training pitch" },
           
            { src: "images/image11.jpg", category: "team", caption: "" },
            { src: "images/image16.jpg", category: "tournaments", caption: "2025 Mayors Cup Champions" },
            { src: "images/image17.jpg", category: "matches", caption: "" },
            { src: "images/image18.jpg", category: "tournaments", caption: "" },
            { src: "images/image7.jpg", category: "team", caption: "" },
           
            { src: "images/image20.jpg", category: "tournaments", caption: "" },
            { src: "images/image21.jpg", category: "team", caption: "" },
            { src: "images/image22.jpg", category: "matches", caption: "" },
            { src: "images/image23.jpg", category: "tournaments", caption: "" },
            { src: "images/image24.jpg", category: "matches", caption: "" },
            { src: "images/image25.jpg", category: "team", caption: "" },
            { src: "images/image26.jpg", category: "team",  caption: "" },
            { src: "images/image27.jpg", category: "tournaments", caption: "" },
            { src: "images/image28.jpg", category: "tournaments",  caption: "" },
            { src: "images/image6.jpg", category: "tournaments",  caption: "" },
            { src: "images/image30.jpg", category: "team",  caption: "" },
            { src: "images/image31.jpg", category: "junior",  caption: "" },
            { src: "images/image32.jpg", category: "junior",  caption: "" },
            { src: "images/image33.jpg", category: "junior",  caption: "" },
           
            { src: "images/image35.jpg", category: "junior",  caption: "" },
            { src: "images/image36.jpg", category: "junior",  caption: "" },
            { src: "images/image37.jpg", category: "team",  caption: "" },
            { src: "images/image38.jpg", category: "team",  caption: "" },
           
            { src: "images/image40.jpg", category: "junior", caption: "" },
            { src: "images/image41.jpg", category: "junior",  caption: "" },
            { src: "images/image42.jpg", category: "junior",  caption: "" },
            { src: "images/image43.jpg", category: "team",  caption: "" },
            
           
            { src: "images/image46.jpg", category: "team",  caption: "" },
            { src: "images/image47.jpg", category: "facilities",  caption: "" },
            { src: "images/image48.jpg", category: "facilities",  caption: "" },
            { src: "images/image49.jpg", category: "junior",  caption: "" },
            { src: "images/image51.jpg", category: "team",  caption: "" },

            { src: "images/image52.jpg", category: "matches",  caption: "" },
            
            { src: "images/image58.jpg", category: "matches",  caption: "" },
            { src: "images/image59.jpg", category: "tournaments",  caption: "" },
            { src: "images/image60.jpg", category: "tournaments",  caption: "" },
            { src: "images/image61.jpg", category: "team",  caption: "" },
             
            { src: "images/image62.jpg", category: "team",  caption: "" },
            { src: "images/image63.jpg", category: "facilities",  caption: "" },
            { src: "images/image64.jpg", category: "tournaments",  caption: "" },
            { src: "images/image65.jpg", category: "tournaments",  caption: "" },
            { src: "images/image77.jpg", category: "team", caption: "" },
           

            // Continue adding more images...
        ];
        
        // Initialize Gallery
        document.addEventListener('DOMContentLoaded', function() {
            const galleryGrid = document.getElementById('galleryGrid');
            const loader = document.getElementById('loader');
            const filterBtns = document.querySelectorAll('.filter-btn1');
            
            // Load images with lazy loading
            function loadImages(filter = 'all') {
                galleryGrid.innerHTML = '';
                loader.style.display = 'flex';
                
                // Simulate loading delay (remove in production)
                setTimeout(() => {
                    const filteredImages = filter === 'all' 
                        ? galleryImages 
                        : galleryImages.filter(img => img.category === filter);
                    
                    filteredImages.forEach((img, index) => {
                        const item = document.createElement('div');
                        item.className = 'gallery-item1';
                        item.dataset.category = img.category;
                        item.dataset.index = index;
                        
                        item.innerHTML = `
                            <img src="${img.src}" alt="${img.caption}" class="gallery1-img" loading="lazy">
                            <div class="img-caption">${img.caption}</div>
                        `;
                        
                        galleryGrid.appendChild(item);
                    });
                    
                    loader.style.display = 'none';
                    initLightbox();
                }, 800);
            }
            
            // Filter images
            filterBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    filterBtns.forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    loadImages(this.dataset.filter);
                });
            });
            
            // Lightbox functionality
            function initLightbox() {
                const lightbox = document.getElementById('lightbox');
                const lightboxImg = document.getElementById('lightboxImg');
                const lightboxCaption = document.getElementById('lightboxCaption');
                const closeBtn = document.getElementById('closeBtn');
                const prevBtn = document.getElementById('prevBtn');
                const nextBtn = document.getElementById('nextBtn');
                const items = document.querySelectorAll('.gallery-item1');
                
                let currentIndex = 0;
                let filteredItems = [];
                
                // Open lightbox
                items.forEach(item => {
                    item.addEventListener('click', function() {
                        const filter = document.querySelector('.filter-btn1.active').dataset.filter;
                        filteredItems = filter === 'all' 
                            ? Array.from(items) 
                            : Array.from(items).filter(i => i.dataset.category === filter);
                        
                        currentIndex = filteredItems.indexOf(this);
                        updateLightbox();
                        lightbox.classList.add('active');
                        document.body.style.overflow = 'hidden';
                    });
                });
                
                // Update lightbox content
                function updateLightbox() {
                    const activeItem = filteredItems[currentIndex];
                    const imgSrc = activeItem.querySelector('img').src;
                    const caption = activeItem.querySelector('.img-caption').textContent;
                    lightboxImg.src = imgSrc;
                    lightboxCaption.textContent = caption;
                 
                }
                
                // Navigation
                function navigate(direction) {
                    currentIndex += direction;
                    
                    if (currentIndex < 0) {
                        currentIndex = filteredItems.length - 1;
                    } else if (currentIndex >= filteredItems.length) {
                        currentIndex = 0;
                    }
                    
                    updateLightbox();
                }
                
                // Event listeners
                closeBtn.addEventListener('click', () => {
                    lightbox.classList.remove('active');
                    document.body.style.overflow = 'auto';
                });
                
                prevBtn.addEventListener('click', () => navigate(-1));
                nextBtn.addEventListener('click', () => navigate(1));
                
                // Keyboard navigation
                document.addEventListener('keydown', (e) => {
                    if (!lightbox.classList.contains('active')) return;
                    
                    if (e.key === 'Escape') {
                        lightbox.classList.remove('active');
                        document.body.style.overflow = 'auto';
                    } else if (e.key === 'ArrowLeft') {
                        navigate(-1);
                    } else if (e.key === 'ArrowRight') {
                        navigate(1);
                    }
                });
                
                // Close when clicking outside image
                lightbox.addEventListener('click', (e) => {
                    if (e.target === lightbox) {
                        lightbox.classList.remove('active');
                        document.body.style.overflow = 'auto';
                    }
                });
            }
            
            // Initial load
            loadImages();
            
            // Infinite scroll (optional)
            window.addEventListener('scroll', function() {
                if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
                    // In a real implementation, you would load more images here
                    // For now, we're using a fixed set of images
                }
            });
        });
   




        