/**
 * ============================================
 * MAIN INITIALIZATION FILE
 * Author: Felix Marubi
 * ============================================
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 marubyte portfolio initializing...');
    
    // Initialize all managers
    initializeManagers();
    
    // Setup global event listeners
    setupGlobalEvents();
    
    // Check initial load
    handleInitialLoad();
    
    console.log('✅ marubyte portfolio ready!');
});

// Initialize all managers
function initializeManagers() {
    // Order matters - dependencies should load later
    // Theme manager (independent)
    if (typeof ThemeManager !== 'undefined') {
        window.themeManager = new ThemeManager();
    }
    
    // Navigation manager (depends on theme)
    if (typeof NavigationManager !== 'undefined') {
        window.navigationManager = new NavigationManager();
    }
    
    // Animation manager (independent)
    if (typeof AnimationManager !== 'undefined') {
        window.animationManager = new AnimationManager();
    }
    
    // Contact manager (depends on form existing)
    if (typeof ContactManager !== 'undefined') {
        window.contactManager = new ContactManager();
    }
}

// Setup global event listeners
function setupGlobalEvents() {
    // Handle resize events
    window.addEventListener('resize', debounce(() => {
        handleResize();
    }, 250));
    
    // Handle orientation change on mobile
    window.addEventListener('orientationchange', () => {
        handleOrientationChange();
    });
    
    // Handle online/offline status
    window.addEventListener('online', () => {
        showNotification('You are back online!', 'success');
    });
    
    window.addEventListener('offline', () => {
        showNotification('You are offline. Some features may be unavailable.', 'warning');
    });
}

// Handle initial page load
function handleInitialLoad() {
    // Remove any loading classes
    document.body.classList.remove('loading');
    
    // Check for hash in URL
    if (window.location.hash) {
        setTimeout(() => {
            const target = document.querySelector(window.location.hash);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }, 500);
    }
    
    // Preload images
    preloadImages();
}

// Handle window resize
function handleResize() {
    // Close mobile menu if open and on desktop
    if (window.innerWidth > 768 && typeof window.closeMobileMenu === 'function') {
        window.closeMobileMenu();
    }
    
    // Refresh any layout-dependent calculations
    if (window.animationManager) {
        window.animationManager.checkReveal();
    }
}

// Handle orientation change
function handleOrientationChange() {
    // Wait for orientation change to complete
    setTimeout(() => {
        handleResize();
    }, 200);
}

// Preload important images
function preloadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    images.forEach(img => {
        const src = img.getAttribute('data-src');
        if (src) {
            const preloadLink = document.createElement('link');
            preloadLink.rel = 'preload';
            preloadLink.as = 'image';
            preloadLink.href = src;
            document.head.appendChild(preloadLink);
            
            // Load the image
            img.src = src;
            img.removeAttribute('data-src');
        }
    });
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'warning' ? 'fa-exclamation-triangle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification styles if not present
if (!document.getElementById('notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: white;
            color: var(--dark);
            padding: 1rem 1.5rem;
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-xl);
            display: flex;
            align-items: center;
            gap: 1rem;
            transform: translateX(120%);
            transition: transform 0.3s ease;
            z-index: var(--z-toast);
            border-left: 4px solid var(--primary);
        }
        
        [data-theme="dark"] .notification {
            background: var(--dark-soft);
            color: var(--light);
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification-success {
            border-left-color: var(--success);
        }
        
        .notification-warning {
            border-left-color: var(--warning);
        }
        
        .notification i {
            font-size: 1.2rem;
        }
        
        .notification-success i {
            color: var(--success);
        }
        
        .notification-warning i {
            color: var(--warning);
        }
        
        .notification-info i {
            color: var(--primary);
        }
        
        @media (max-width: 480px) {
            .notification {
                left: 20px;
                right: 20px;
                transform: translateY(120%);
            }
            
            .notification.show {
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
});

// Unhandled promise rejection
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});

// Debounce helper (if not already defined)
if (typeof debounce === 'undefined') {
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Throttle helper (if not already defined)
if (typeof throttle === 'undefined') {
    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeManagers,
        setupGlobalEvents,
        handleInitialLoad,
        showNotification
    };
}
