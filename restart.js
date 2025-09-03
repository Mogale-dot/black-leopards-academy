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
 


 
 
 // reset-password.js
document.addEventListener('DOMContentLoaded', () => {
    // Extract token from URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    document.getElementById('resetToken').value = token;
});

document.getElementById('resetPasswordForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const token = document.getElementById('resetToken').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const button = document.getElementById('submitReset');
    const messageEl = document.getElementById('resetMessage');

    // Clear previous messages
    messageEl.textContent = '';
    messageEl.className = 'message';

    // Validate passwords
    if (newPassword !== confirmPassword) {
        showMessage(messageEl, 'Passwords do not match', 'error');
        return;
    }

    if (newPassword.length < 8) {
        showMessage(messageEl, 'Password must be at least 8 characters', 'error');
        return;
    }

    try {
        button.disabled = true;
        button.textContent = 'Processing...';

        const response = await fetch(`http://localhost:5000/api/auth/reset-password/${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ newPassword })
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.error || 'Failed to reset password');

        showMessage(messageEl, 'Password updated successfully! Redirecting to login...', 'success');
        
        // Redirect to login after 3 seconds
        setTimeout(() => {
            window.location.href = '/login.html';
        }, 3000);
    } catch (error) {
        showMessage(messageEl, error.message, 'error');
    } finally {
        button.disabled = false;
        button.textContent = 'Update Password';
    }
});

function showMessage(element, message, type) {
    element.textContent = message;
    element.className = `message ${type}`;
}