/**
 * ============================================
 * THEME TOGGLE - Dark/Light Mode
 * Author: Felix Marubi
 * ============================================
 */

class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('marubyte-theme') || 'light';
        this.themeToggle = document.getElementById('themeToggle');
        this.mobileThemeToggle = document.getElementById('mobileThemeToggle');
        this.init();
    }
    
    init() {
        // Apply saved theme
        this.applyTheme(this.theme);
        
        // Add event listeners
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }
        
        if (this.mobileThemeToggle) {
            this.mobileThemeToggle.addEventListener('click', () => this.toggleTheme());
        }
        
        // Listen for system theme changes
        this.watchSystemTheme();
    }
    
    applyTheme(theme) {
        if (theme === 'dark') {
            document.body.setAttribute('data-theme', 'dark');
            this.updateToggleIcons('dark');
        } else {
            document.body.removeAttribute('data-theme');
            this.updateToggleIcons('light');
        }
        
        localStorage.setItem('marubyte-theme', theme);
        this.theme = theme;
    }
    
    toggleTheme() {
        const newTheme = this.theme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
        
        // Add animation class
        document.body.classList.add('theme-transition');
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 300);
    }
    
    updateToggleIcons(theme) {
        const icons = [
            this.themeToggle?.querySelector('i'),
            this.mobileThemeToggle?.querySelector('i')
        ];
        
        icons.forEach(icon => {
            if (icon) {
                icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
            }
        });
    }
    
    watchSystemTheme() {
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            
            mediaQuery.addEventListener('change', (e) => {
                // Only change if user hasn't set a preference
                if (!localStorage.getItem('marubyte-theme')) {
                    this.applyTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
    }
}

// Initialize theme manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.themeManager = new ThemeManager();
});