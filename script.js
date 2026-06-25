document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. Dynamic Sticky Navbar Shadow & Blur
    // ==========================================
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.05)';
            navbar.style.background = 'rgba(255, 255, 255, 0.85)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.padding = '12px 8%'; // Slightly shrink navbar height
        } else {
            navbar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.02)';
            navbar.style.background = '#ffffff';
            navbar.style.backdropFilter = 'none';
            navbar.style.padding = '20px 8%'; // Reset to original size
        }
    });

    // ==========================================
    // 2. Smooth Scrolling for Navigation Links
    // ==========================================
    const links = document.querySelectorAll('.nav-links a, .hero-buttons a, .btn-nav');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            
            // Only handle internal anchor links
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Offset calculating the fixed navbar height
                    const navbarHeight = navbar.offsetHeight;
                    const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - navbarHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ==========================================
    // 3. Scroll-Reveal Animation using Intersection Observer
    // ==========================================
    const revealTargets = document.querySelectorAll('.service-card, .pricing-card');

    // First, set the initial CSS states dynamically via JS so non-JS users still see content
    revealTargets.forEach(target => {
        target.style.opacity = '0';
        target.style.transform = 'translateY(40px)';
        target.style.transition = 'opacity 0.6s ease-out, transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
    });

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Apply the revealed styling state
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15, // Triggers when 15% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Slightly delays the triggers for a better aesthetic feel
    });

    revealTargets.forEach(target => {
        revealOnScroll.observe(target);
    });
});