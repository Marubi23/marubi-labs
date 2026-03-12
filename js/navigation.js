/**
 * ============================================
 * NAVIGATION PAGE - Simple Interactions
 * Author: Felix Marubi
 * ============================================
 */

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Navigation page loaded');
    
    // Add active class to current page link (optional)
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const cards = document.querySelectorAll('.nav-card');
    
    cards.forEach(card => {
        const href = card.getAttribute('href');
        if (href === currentPage) {
            card.style.borderColor = '#cc2f01';
            card.style.boxShadow = '0 0 20px rgba(204, 47, 1, 0.3)';
        }
    });
    
    // Add click sound effect (optional - remove if not needed)
    // cards.forEach(card => {
    //     card.addEventListener('click', function(e) {
    //         // Just a visual feedback
    //         this.style.transform = 'scale(0.98)';
    //         setTimeout(() => {
    //             this.style.transform = '';
    //         }, 150);
    //     });
    // });
    
    // Terminal typing effect for header (optional)
    const commandElement = document.querySelector('.command');
    if (commandElement) {
        const originalText = commandElement.textContent;
        // Just leave it as is - simple
    }
    
    // Escape key to go back to home
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            window.location.href = 'index.html';
        }
    });
    
    // Add smooth hover effects
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
});