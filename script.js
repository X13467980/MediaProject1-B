document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('main-header');
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const backToTopButton = document.getElementById('back-to-top');
    const floatingIcon = document.getElementById('floating-icon');
    const loadingScreen = document.getElementById('loading-screen');

    // Loading screen
    window.addEventListener('load', () => {
        loadingScreen.style.display = 'none';
    });

    // Scroll event listener
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            backToTopButton.style.display = 'block';
        } else {
            header.classList.remove('scrolled');
            backToTopButton.style.display = 'none';
        }
    });

    // Sidebar toggle
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Back to top button
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Floating icon interaction
    floatingIcon.addEventListener('click', () => {
        alert('ラインアレイスピーカーの音を体験してみましょう！');
    });

    // GSAP animations
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.fade-in').forEach((element) => {
        gsap.from(element, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    gsap.from('.feature', {
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
        stagger: 0.2,
        scrollTrigger: {
            trigger: '.feature',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
});

