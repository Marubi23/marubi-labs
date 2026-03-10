/**
 * ============================================
 * UTILITIES - Helper Functions
 * Author: Felix Marubi
 * ============================================
 */

// Debounce function to limit how often a function can run
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Throttle function to ensure a function runs at most once in a specified period
const throttle = (func, limit) => {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// Format numbers with commas (e.g., 1000 -> 1,000)
const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Get current theme from localStorage
const getStoredTheme = () => {
    return localStorage.getItem('marubyte-theme') || 'light';
};

// Set theme in localStorage
const setStoredTheme = (theme) => {
    localStorage.setItem('marubyte-theme', theme);
};

// Check if element is in viewport
const isInViewport = (element, offset = 0) => {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight - offset) && 
        rect.bottom >= offset
    );
};

// Smooth scroll to element
const smoothScroll = (elementId, offset = 0) => {
    const element = document.getElementById(elementId);
    if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
};

// Copy text to clipboard
const copyToClipboard = async (text) => {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        console.error('Failed to copy:', err);
        return false;
    }
};

// Get query parameter from URL
const getQueryParam = (param) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
};

// Generate random ID
const generateId = (length = 8) => {
    return Math.random().toString(36).substring(2, length + 2);
};

// Format date to readable string
const formatDate = (date, options = {}) => {
    const defaultOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    return new Date(date).toLocaleDateString('en-US', { ...defaultOptions, ...options });
};

// Validate email
const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

// Validate phone number (Kenyan format)
const isValidKenyanPhone = (phone) => {
    const re = /^(?:(?:\+254|0)[17]\d{8})$/;
    return re.test(phone.replace(/\s/g, ''));
};

// Export utilities if using modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        debounce,
        throttle,
        formatNumber,
        getStoredTheme,
        setStoredTheme,
        isInViewport,
        smoothScroll,
        copyToClipboard,
        getQueryParam,
        generateId,
        formatDate,
        isValidEmail,
        isValidKenyanPhone
    };
}