// JavaScript for automatic particle creation

/**
 * Creates and animates particles within a specified container.
 * @param {string} containerSelector - The CSS selector for the container element.
 * @param {number} [count=25] - The number of particles to create.
 */
function createParticles(containerSelector, count = 25) {
    const container = document.querySelector(containerSelector);
    if (!container) {
        console.warn('Particle container not found:', containerSelector);
        return;
    }

    // A document fragment is used to minimize DOM manipulations
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Randomly decide if this particle should have the alternative animation
        if (Math.random() > 0.5) {
            particle.classList.add('alt');
        }

        // Random positioning (focused on the bottom part of the screen)
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = (60 + Math.random() * 40) + '%'; // From 60% to 100%

        // Random size (1-4px)
        const size = Math.floor(1 + Math.random() * 3);
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';

        // Random animation properties
        const duration = (15 + Math.random() * 15); // Duration between 15 and 30 seconds
        const delay = Math.random() * 5;      // Delay up to 5 seconds

        // Apply animation using CSS variables for speed, if available
        const animationSpeed = getComputedStyle(container).getPropertyValue('--animation-speed') || 1;
        particle.style.animationDuration = (duration / parseFloat(animationSpeed)) + 's';
        particle.style.animationDelay = delay + 's';

        fragment.appendChild(particle);
    }

    // Clear existing particles before adding new ones
    container.querySelectorAll('.particle').forEach(p => p.remove());
    container.appendChild(fragment);
}

/**
 * Adjusts the number of particles based on the window width.
 */
function adaptiveParticles() {
    const containerSelector = '.modern-minimal-bloom';
    const width = window.innerWidth;
    let particleCount;

    if (width < 768) {
        particleCount = 20; // Fewer particles for small (mobile) screens
    } else if (width < 1200) {
        particleCount = 35; // A moderate amount for medium (tablet) screens
    } else {
        particleCount = 50; // More particles for large (desktop) screens
    }

    createParticles(containerSelector, particleCount);
}

// --- Initialization ---

// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {
    // Initial particle creation
    adaptiveParticles();

    // Re-calculate particles on window resize, but debounced for performance
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(adaptiveParticles, 250); // Debounce resize event
    });
});
