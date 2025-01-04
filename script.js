// Check if an element is visible in the viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Handle scroll event to apply fade-in effects
function handleScroll() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(element => {
        if (isElementInViewport(element)) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Adjust main content padding based on header height
function adjustPadding() {
    const header = document.querySelector('header');
    const mainContent = document.querySelector('.main-content');
    mainContent.style.paddingTop = `${header.offsetHeight}px`;
}

// Smooth scrolling for anchor links
// Smooth scrolling for anchor links with header offset
function enableSmoothScrolling() {
    const header = document.querySelector('header');
    const headerHeight = header.offsetHeight;

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;

            window.scrollTo({
                top: targetPosition - headerHeight, // ヘッダーの高さを考慮
                behavior: 'smooth'
            });
        });
    });
}


// Event listeners
window.addEventListener('scroll', handleScroll);
window.addEventListener('load', () => {
    handleScroll();
    adjustPadding();
    enableSmoothScrolling();
});
window.addEventListener('resize', adjustPadding);


