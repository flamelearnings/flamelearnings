document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const menuToggle = document.getElementById('navbarToggler');
    const navLinks = document.getElementById('navbarMenu');
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    const header = document.querySelector('.main-header');

    // Mobile Menu Toggle
    function setupMobileMenu() {
        if (!menuToggle || !navLinks) return;

        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }

    // Dropdown Handling
    function setupDropdowns() {
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                if (window.innerWidth > 768) return;
                
                e.preventDefault();
                const dropdown = this.closest('.dropdown');
                const isActive = dropdown.classList.contains('active');

                // Close all dropdowns first
                closeAllDropdowns();

                // Toggle current dropdown if it wasn't active
                if (!isActive) {
                    dropdown.classList.add('active');
                    scrollDropdownIntoView(dropdown);
                }
            });
        });

        // Close menu when clicking regular links
        navLinks?.addEventListener('click', function(e) {
            if (window.innerWidth <= 768 && e.target.tagName === 'A' && !e.target.classList.contains('dropdown-toggle')) {
                closeAllDropdowns();
                closeMobileMenu();
            }
        });
    }

    // Helper Functions
    function closeAllDropdowns() {
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }

    function closeMobileMenu() {
        menuToggle?.classList.remove('active');
        navLinks?.classList.remove('active');
        document.body.classList.remove('menu-open');
    }

    function scrollDropdownIntoView(dropdown) {
        setTimeout(() => {
            const dropdownMenu = dropdown.querySelector('.dropdown-menu');
            dropdownMenu?.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            });
        }, 50);
    }

    // Sticky Header
    function setupStickyHeader() {
        if (!header) return;
        
        window.addEventListener('scroll', function() {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // Initialize all functions
    setupMobileMenu();
    setupDropdowns();
    setupStickyHeader();
});

// Carousel Initialization (using jQuery)
jQuery(document).ready(function($) {
    $('#customers-testimonials').owlCarousel({
        loop: true,
        center: true,
        items: 3,
        margin: 0,
        autoplay: true,
        dots: true,
        autoplayTimeout: 8500,
        smartSpeed: 450,
        responsive: {
            0: { items: 1 },
            768: { items: 2 },
            1170: { items: 3 }
        }
    });
});