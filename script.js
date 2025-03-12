document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle with Accessibility
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            // Toggle aria-expanded for accessibility
            const expanded = nav.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', expanded);
            // Change button text for screen readers
            menuToggle.setAttribute('aria-label', expanded ? 'Close menu' : 'Open menu');
        });
    }
    
    // Experience Card Dropdowns with Animation
    const experienceCards = document.querySelectorAll('.experience-card');
    
    if (experienceCards.length > 0) {
        experienceCards.forEach((card, index) => {
            const toggleButton = card.querySelector('.dropdown-toggle');
            const dropdown = card.querySelector('.experience-details-dropdown');
            
            if (toggleButton && dropdown) {
                // Set unique IDs for better accessibility
                const dropdownId = `dropdown-content-${index}`;
                dropdown.id = dropdownId;
                toggleButton.setAttribute('aria-controls', dropdownId);
                toggleButton.setAttribute('aria-expanded', 'false');
                
                // Ensure initial state is collapsed
                dropdown.style.maxHeight = '0';
                
                toggleButton.addEventListener('click', function(event) {
                    // Prevent event bubbling
                    event.stopPropagation();
                    
                    // Close all other cards
                    experienceCards.forEach(otherCard => {
                        if (otherCard !== card && otherCard.classList.contains('active')) {
                            otherCard.classList.remove('active');
                            
                            // Reset other dropdowns
                            const otherDropdown = otherCard.querySelector('.experience-details-dropdown');
                            const otherButton = otherCard.querySelector('.dropdown-toggle');
                            
                            if (otherDropdown) otherDropdown.style.maxHeight = '0';
                            if (otherButton) otherButton.setAttribute('aria-expanded', 'false');
                        }
                    });
                    
                    // Toggle current card
                    const isExpanded = card.classList.toggle('active');
                    toggleButton.setAttribute('aria-expanded', isExpanded);
                    
                    // Smooth animation using max-height
                    if (isExpanded) {
                        // Set a specific max-height based on content
                        const contentHeight = dropdown.scrollHeight;
                        dropdown.style.maxHeight = contentHeight + 'px';
                    } else {
                        dropdown.style.maxHeight = '0';
                    }
                    
                    // Log activity for debugging if needed
                    console.log(`Dropdown ${index} ${isExpanded ? 'expanded' : 'collapsed'}`);
                });
            }
        });
    }
    
    // Close dropdown and mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        // Close mobile menu when clicking outside
        if (nav && nav.classList.contains('active') && 
            !event.target.closest('nav') && 
            event.target !== menuToggle) {
            nav.classList.remove('active');
            if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Add visual feedback for active navigation links
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('section[id]');
    
    if (navLinks.length > 0 && sections.length > 0) {
        function updateActiveNav() {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= (sectionTop - sectionHeight / 3)) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }
        
        window.addEventListener('scroll', updateActiveNav);
        // Initial call to set active nav on page load
        updateActiveNav();
    }
    
    // Form submission handling
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('name')?.value.trim() || '';
            const email = document.getElementById('email')?.value.trim() || '';
            const message = document.getElementById('message')?.value.trim() || '';
            
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Simple email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Here you would typically send the form data to a server
            // For now, we'll just show an alert
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
    
    // Helper function for viewport size during development
    function logViewportSize() {
        console.log(`Viewport: ${window.innerWidth}px × ${window.innerHeight}px`);
    }
    
    // Uncomment for development/testing
    // window.addEventListener('resize', logViewportSize);
    // logViewportSize();
});