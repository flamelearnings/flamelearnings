document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('navbarToggler');
    const navLinks = document.getElementById('navbarMenu');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking on a link
        navLinks.addEventListener('click', function(e) {
            if (window.innerWidth <= 768 && e.target.tagName === 'A') {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }
    
    
    // Sticky header
    const header = document.querySelector('.main-header');
    if (header) {
        window.addEventListener('scroll', function() {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
    }
});



// Carousel
document.addEventListener('DOMContentLoaded', function() {
    const feedbacks = document.querySelectorAll('.feedback');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const counter = document.querySelector('.counter');
    const container = document.querySelector('.carousel-container');
    
    // Custom durations for each testimonial in milliseconds
    const testimonialDurations = [
        8000, // Hana NS (8s)
        5000, // Wesam Saud (5s - shorter)
        8000, // Mohammed Yusuf (8s)
        5000, // Mohammed Anas (5s - shorter)
        7000, // Rayan Ahmed (7s)
        6000, // Ashil Razak (6s)
        5000, // Rena Fathima (5s - shorter)
        8000, // Ali Soudugar (8s)
        6000, // Milan Manoj (6s)
        7000, // Al Thouseef (7s)
        6000, // Azbeen Fathima (6s)
        5000, // Farha Fathima (5s - shorter)
        8000  // Mohammed Sinan (8s)
    ];
    
    let currentIndex = 0;
    let autoPlayTimeout;
    let isPaused = false;

    function showFeedback(index) {
        // Update display
        feedbacks.forEach(feedback => feedback.classList.remove('active'));
        feedbacks[index].classList.add('active');
        counter.textContent = `${index + 1}/${feedbacks.length}`;
        
        // Clear any existing timeout
        clearTimeout(autoPlayTimeout);
        
        // Only auto-advance if not paused
        if (!isPaused) {
            autoPlayTimeout = setTimeout(() => {
                nextFeedback();
            }, testimonialDurations[index]);
        }
    }

    function nextFeedback() {
        currentIndex = (currentIndex + 1) % feedbacks.length;
        showFeedback(currentIndex);
    }

    function prevFeedback() {
        currentIndex = (currentIndex - 1 + feedbacks.length) % feedbacks.length;
        showFeedback(currentIndex);
    }

    // Initialize
    showFeedback(currentIndex);

    // Event listeners
    prevBtn.addEventListener('click', function() {
        prevFeedback();
    });
    
    nextBtn.addEventListener('click', function() {
        nextFeedback();
    });

    // Pause on hover
    container.addEventListener('mouseenter', function() {
        isPaused = true;
        clearTimeout(autoPlayTimeout);
    });
    
    container.addEventListener('mouseleave', function() {
        isPaused = false;
        showFeedback(currentIndex); // Restarts the timer
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') prevFeedback();
        if (e.key === 'ArrowRight') nextFeedback();
    });
});



// maps
function initMap() {
    const location = { lat: YOUR_LATITUDE, lng: YOUR_LONGITUDE }; // Replace with your coordinates
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 15,
      center: location,
    });
    new google.maps.Marker({ position: location, map: map });
  }