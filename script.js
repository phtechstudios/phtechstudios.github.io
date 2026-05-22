document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(20, 20, 30, 0.8)';
            navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
            navbar.style.padding = '10px 30px';
        } else {
            navbar.style.background = 'var(--glass-bg)';
            navbar.style.boxShadow = 'var(--glass-shadow)';
            navbar.style.padding = '15px 30px';
        }
    });

    // 2. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // 3. Scroll Animations (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // If it's a stat number, animate it
                if (entry.target.classList.contains('stats-grid')) {
                    animateNumbers();
                }

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up, .fade-left, .fade-right, .stats-grid').forEach(el => {
        observer.observe(el);
    });

    // 4. Number Counter Animation
    let animated = false;
    function animateNumbers() {
        if (animated) return;
        animated = true;

        const counters = document.querySelectorAll('.stat-number');
        const speed = 200; // lower is slower

        counters.forEach(counter => {
            const animate = () => {
                const value = +counter.getAttribute('data-target');
                const data = +counter.innerText;
                const time = value / speed;

                if (data < value) {
                    counter.innerText = Math.ceil(data + time);
                    setTimeout(animate, 20);
                } else {
                    counter.innerText = value + (value % 1 !== 0 ? '' : ''); // keep decimal if exists
                    if (value === 4.8) counter.innerText = '4.8'; // hardcode for rating
                }
            };
            animate();
        });
    }

    // 5. Floating Particles Background
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        for (let i = 0; i < 30; i++) {
            createParticle();
        }
    }

    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Random properties
        const size = Math.random() * 5 + 2;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;

        // Set styles
        particle.style.position = 'absolute';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.background = 'rgba(0, 240, 255, 0.5)';
        particle.style.borderRadius = '50%';
        particle.style.left = `${posX}vw`;
        particle.style.top = `${posY}vh`;
        particle.style.boxShadow = '0 0 10px rgba(0, 240, 255, 0.8)';
        particle.style.animation = `float-particle ${duration}s linear ${delay}s infinite`;

        particlesContainer.appendChild(particle);
    }
});
