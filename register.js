
     document.addEventListener('DOMContentLoaded', async () => {
            // Check if user is logged in
            const token = localStorage.getItem('token');
            if (!token) {
                window.location.href = 'login.html';
                return;
            }
              });

        // Track current step
        let currentStep = 1;
        const totalSteps = 5;
        
        // Show/hide sections based on current step
        function updateFormDisplay() {
            // Update progress bar
            for (let i = 1; i <= totalSteps; i++) {
                const stepElement = document.getElementById(`step${i}`); 
                if (!stepElement) continue; 
                if (i < currentStep) {
                    stepElement.classList.add('completed');
                    stepElement.classList.remove('active');
                } else if (i === currentStep) {
                    stepElement.classList.add('active');
                    stepElement.classList.remove('completed');
                } else {
                    stepElement.classList.remove('active', 'completed');
                }
            }
            
            // Show current section
            document.querySelectorAll('.form-section').forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById(`section${currentStep}`).classList.add('active');
        }
        
        // Navigation functions
        function nextStep(current) {
            if (validateStep(current)) {
                currentStep = current + 1;
                updateFormDisplay();
                window.scrollTo(0, 0);
            }
        }
        
        function prevStep(current) {
            currentStep = current - 1;
            updateFormDisplay();
            window.scrollTo(0, 0);
        }
        
        // Enhanced validation function with visual feedback
function validateStep(step) {
    let isValid = true;
    
    // Clear previous errors
    clearErrors(); 


    // Age validation function
function validateAge(dateOfBirth) {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    
    // Calculate age
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    // Adjust age if birthday hasn't occurred yet this year
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    return age >= 7 && age <= 19;
}

// South African ID validation function
function validateSAID(idNumber) {
    // Basic format validation: 13 digits only
    if (!/^\d{13}$/.test(idNumber)) {
        return false;
    }
    
    // Extract date parts from ID (YYMMDD format)
    const yearPart = parseInt(idNumber.substring(0, 2));
    const month = parseInt(idNumber.substring(2, 4));
    const day = parseInt(idNumber.substring(4, 6));
    
    // Validate month (1-12)
    if (month < 1 || month > 12) {
        return false;
    }
    
    // Validate day (1-31, basic check)
    if (day < 1 || day > 31) {
        return false;
    }
    
    // Determine century and full year
    let fullYear;
    if (yearPart >= 0 && yearPart <= 21) { // 2000-2021
        fullYear = 2000 + yearPart;
    } else { // 1922-1999
        fullYear = 1900 + yearPart;
    }
    
    // Validate year is reasonable (1922-2021)
    if (fullYear < 1922 || fullYear > 2021) {
        return false;
    }
    
    // Validate date is valid (e.g., not Feb 30)
    const date = new Date(fullYear, month - 1, day);
    if (date.getFullYear() !== fullYear || date.getMonth() !== month - 1 || date.getDate() !== day) {
        return false;
    }
    
    // Luhn algorithm check (checksum validation)
    return validateLuhnChecksum(idNumber);
}

// Luhn algorithm for ID checksum validation
function validateLuhnChecksum(idNumber) {
    let sum = 0;
    let alternate = false;
    
    for (let i = idNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(idNumber.charAt(i));
        
        if (alternate) {
            digit *= 2;
            if (digit > 9) {
                digit = (digit % 10) + 1;
            }
        }
        
        sum += digit;
        alternate = !alternate;
    }
    
    return (sum % 10) === 0;
}



    // Step 1 validation
    if (step === 1) {
        const playerFullName = document.getElementById('playerFullName');
        const playerDob = document.getElementById('playerDob');
        const playerAddress = document.getElementById('playerAddress');
        const playerSchool = document.getElementById('playerSchool'); 
        const playerMobile = document.getElementById('playerMobile');
        const playerEmail = document.getElementById('playerEmail');
        
        if (!playerFullName.value.trim()) {
            showError('playerFullName', 'Please enter the player\'s full name');
            isValid = false;
        } 
        if (!playerMobile.value.trim()) {
            showError('playerMobile', 'Please enter the player\'s Phone Number');
            isValid = false;
        } 
        if (!playerEmail.value.trim()) {
            showError('playerEmail', 'Please enter the player\'s Email');
            isValid = false;
        }
        if (!playerDob.value) {
            showError('playerDob', 'Please enter the player\'s date of birth');
            isValid = false;
        } 
        else if (!validateAge(playerDob.value)) {
            showError('playerDob', 'Player must be between 7 and 19 years old');
            isValid = false;
        }
        if (!playerAddress.value.trim()) {
            showError('playerAddress', 'Please enter the player\'s physical address');
            isValid = false;
        }
        if (!playerSchool.value.trim()) {
            showError('playerSchool', 'Please enter the player\'s school');
            isValid = false;
        }
    }
    
    // Step 2 validation
    if (step === 2) {
        const motherEmail = document.getElementById('motherEmail');
        const motherMobile = document.getElementById('motherMobile');
        const fatherEmail = document.getElementById('fatherEmail');
        const fatherMobile = document.getElementById('fatherMobile');
        const feePayer = document.getElementById('feePayer');
        
        const hasMotherContact = motherEmail.value.trim() || motherMobile.value.trim();
        const hasFatherContact = fatherEmail.value.trim() || fatherMobile.value.trim();
        
        if (!hasMotherContact && !hasFatherContact) {
            if (!motherEmail.value.trim()) showError('motherEmail', 'Email or mobile number required');
            if (!motherMobile.value.trim()) showError('motherMobile', 'Email or mobile number required');
            if (fatherEmail && !fatherEmail.value.trim()) showError('fatherEmail', 'Email or mobile number required');
            if (fatherMobile && !fatherMobile.value.trim()) showError('fatherMobile', 'Email or mobile number required');
            isValid = false;
        } 


        // Validate mother's ID (required)
        const motherId = document.getElementById('motherId');
        if (!motherId.value.trim()) {
            showError('motherId', 'Mother\'s ID number is required');
            isValid = false;
        } else if (!validateSAID(motherId.value.trim())) {
            showError('motherId', 'Please enter a valid South African ID number');
            isValid = false;
        }
        
        // Validate father's ID (required)
        const fatherId = document.getElementById('fatherId');
        if (!fatherId.value.trim()) {
            showError('fatherId', 'Father\'s ID number is required');
            isValid = false;
        } else if (!validateSAID(fatherId.value.trim())) {
            showError('fatherId', 'Please enter a valid South African ID number');
            isValid = false;
        }
        
        // Validate fee payer
        if (!feePayer.value.trim()) {
            showError('feePayer', 'Please specify who will be responsible for fees');
            isValid = false;
        }
        
       
    
        
        
        if (!feePayer.value.trim()) {
            showError('feePayer', 'Please specify who will be responsible for fees');
            isValid = false;
        }
    }
    
    // Scroll to first error if validation fails
    if (!isValid) {
        const firstError = document.querySelector('.input-error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstError.focus();
        }
    }
    
    return isValid;
}

// Show error function
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(`${fieldId}-error`);
    
    if (field) {
        field.classList.add('input-error');
    }
    
    if (errorElement) {
        errorElement.textContent = message;
    }
}

// Clear errors function
function clearErrors() {
    // Remove error styles
    document.querySelectorAll('.input-error').forEach(element => {
        element.classList.remove('input-error');
    });
    
    // Clear error messages
    document.querySelectorAll('.error-message').forEach(element => {
        element.textContent = '';
    });
}

// Add real-time validation for better UX
function setupRealTimeValidation() {
    // Add input event listeners to clear errors when user starts typing
    const requiredInputs = document.querySelectorAll('input[required], textarea[required]');
    requiredInputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.value.trim()) {
                this.classList.remove('input-error');
                const errorElement = document.getElementById(`${this.id}-error`);
                if (errorElement) {
                    errorElement.textContent = '';
                }
            }
        });
    });
}

// Update your submitForm function for terms validation
async function submitForm() {
    // First validate the current step (terms acceptance)
    clearErrors();
    let termsValid = true;
    
    if (!document.getElementById('agreeTerms').checked) {
        showError('agreeTerms', 'You must agree to the terms and conditions');
        termsValid = false;
    }
    if (!document.getElementById('medicalConsent').checked) {
        showError('medicalConsent', 'You must provide medical consent');
        termsValid = false;
    }
    
    if (!termsValid) {
        // Scroll to terms section
        document.querySelector('.terms-container').scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
    }


    // Show loading modal
    const loadingModal = document.getElementById('loadingModal');
    const loadingStage = document.getElementById('loadingStage');
    const submitBtn = document.getElementById('submitBtn');
    
    if (loadingModal) loadingModal.style.display = 'flex';
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Processing...';
    }

    try {
        // Update loading stage
        if (loadingStage) loadingStage.textContent = 'Validating information...';
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Collect form data
        const formData = {
            // Player Information (Step 1)
            full_name: document.getElementById('playerFullName').value,
            date_of_birth: document.getElementById('playerDob').value,
            physical_address: document.getElementById('playerAddress').value,
            email: document.getElementById('playerEmail').value,
            mobile_number: document.getElementById('playerMobile').value,
            school_attending: document.getElementById('playerSchool').value,

            // Parent/Guardian Information (Step 2)
            parents: [
                {
                    relationship: 'mother',
                    full_name: document.getElementById('motherName').value,
                    email: document.getElementById('motherEmail').value,
                    mobile_number: document.getElementById('motherMobile').value,
                    id_number: document.getElementById('motherId').value,
                    address: document.getElementById('motherAddress').value,
                    work_number: document.getElementById('motherWork').value,
                    is_fee_payer: document.getElementById('feePayer').value.includes(document.getElementById('motherName').value)
                },
                {
                    relationship: 'father',
                    full_name: document.getElementById('fatherName').value,
                    email: document.getElementById('fatherEmail').value,
                    mobile_number: document.getElementById('fatherMobile').value,
                    id_number: document.getElementById('fatherId').value,
                    address: document.getElementById('fatherAddress').value,
                    work_number: document.getElementById('fatherWork').value,
                    is_fee_payer: document.getElementById('feePayer').value.includes(document.getElementById('fatherName').value)
                }
            ],

            // Medical Information (Step 3)
            medical_info: {
                has_chest_condition: document.querySelector('input[name="medicalConditions"][value="chest"]')?.checked || false,
                has_ear_condition: document.querySelector('input[name="medicalConditions"][value="ear"]')?.checked || false,
                has_heart_condition: document.querySelector('input[name="medicalConditions"][value="heart"]')?.checked || false,
                has_lung_condition: document.querySelector('input[name="medicalConditions"][value="lung"]')?.checked || false,
                has_low_muscle_tone: document.querySelector('input[name="medicalConditions"][value="muscle"]')?.checked || false,
                has_physical_injures: document.querySelector('input[name="medicalConditions"][value="injuries"]')?.checked || false,
                has_allergies: document.querySelector('input[name="medicalConditions"][value="allergies"]')?.checked || false,
                on_medication: document.querySelector('input[name="medicalConditions"][value="medication"]')?.checked || false,
                medical_details: document.getElementById('medicalDetails').value,
                medical_aid_info: {
                    main_member: document.getElementById('medicalAidMember').value,
                    dependant: document.getElementById('medicalAidDependant').value,
                    medical_aid_name: document.getElementById('medicalAidName').value,
                    plan_option: document.getElementById('medicalAidPlan').value,
                    medical_aid_number: document.getElementById('medicalAidNumber').value
                }
            },

            // Football Information (Step 4)
            football_experience: {
                has_previous_training: document.getElementById('previousTraining').checked,
                training_details: document.getElementById('trainingDetails').value,
                bad_experiences: document.getElementById('badExperiences').value,
                additional_info: document.getElementById('additionalInfo').value
            },

            // Terms Acceptance
            terms_acceptance: {
                agreed_to_terms: document.getElementById('agreeTerms').checked,
                medical_consent: document.getElementById('medicalConsent').checked
            }
        };

        // Update loading stage
        if (loadingStage) loadingStage.textContent = 'Preparing submission...';
        await new Promise(resolve => setTimeout(resolve, 600));
        
        // Update loading stage
        if (loadingStage) loadingStage.textContent = 'Processing your Info...';
        
        const token = localStorage.getItem('token');
        const response = await fetch('https://leopards-backend.onrender.com/api/players', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        });

        // Update loading stage
        if (loadingStage) loadingStage.textContent = 'Finalizing...';
        await new Promise(resolve => setTimeout(resolve, 400));

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to submit form');
        }

        // Hide loading and show success
        if (loadingModal) loadingModal.style.display = 'none';
        document.getElementById('section5').style.display = 'none';
        document.getElementById('confirmationSection').style.display = 'block';
        window.scrollTo(0, 0);

    } catch (error) {
        console.error('Submission error:', error);
        
        // Hide loading modal on error
        if (loadingModal) loadingModal.style.display = 'none';
        
        // Re-enable submit button
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit Application';
        }
        
        alert(`Submission failed: ${error.message}`);
    }
}
        
        // Initialize form
        updateFormDisplay();  
        
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
// Initialize real-time validation when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setupRealTimeValidation();
    
    // Add validation for checkbox terms
    const agreeTerms = document.getElementById('agreeTerms');
    const medicalConsent = document.getElementById('medicalConsent');
    
    if (agreeTerms) {
        agreeTerms.addEventListener('change', function() {
            if (this.checked) {
                this.classList.remove('input-error');
                const errorElement = document.getElementById('agreeTerms-error');
                if (errorElement) errorElement.textContent = '';
            }
        });
    }
    
    if (medicalConsent) {
        medicalConsent.addEventListener('change', function() {
            if (this.checked) {
                this.classList.remove('input-error');
                const errorElement = document.getElementById('medicalConsent-error');
                if (errorElement) errorElement.textContent = '';
            }
        });
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


    