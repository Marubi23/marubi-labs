/**
 * ============================================
 * NAVIGATION - Navbar and Mobile Menu
 * Author: Felix Marubi
 * ============================================
 */

class NavigationManager {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.menuToggle = document.getElementById('menuToggle');
        this.mobileMenu = document.getElementById('mobileMenu');
        this.scrollProgress = document.getElementById('scrollProgress');
        this.lastScroll = 0;
        this.isMenuOpen = false;
        
        this.init();
    }
    
    init() {
        this.setupScrollEffects();
        this.setupMobileMenu();
        this.setupActiveLinks();
        this.setupSmoothScroll();
        this.setupBackToTop();
    }
    
    setupScrollEffects() {
        if (!this.navbar) return;
        
        window.addEventListener('scroll', throttle(() => {
            const currentScroll = window.pageYOffset;
            
            // Update scroll progress bar
            this.updateScrollProgress();
            
            // Add scrolled class
            if (currentScroll > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
            
            // Hide/show navbar on scroll
            if (currentScroll > this.lastScroll && currentScroll > 200) {
                // Scrolling down
                this.navbar.classList.add('hide');
            } else {
                // Scrolling up
                this.navbar.classList.remove('hide');
            }
            
            this.lastScroll = currentScroll;
        }, 100));
    }
    
    updateScrollProgress() {
        if (!this.scrollProgress) return;
        
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        this.scrollProgress.style.width = scrolled + '%';
    }
    
    setupMobileMenu() {
        if (!this.menuToggle || !this.mobileMenu) return;
        
        this.menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleMobileMenu();
        });
        
        // Close menu when clicking on a link
        this.mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isMenuOpen && 
                !this.mobileMenu.contains(e.target) && 
                !this.menuToggle.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.closeMobileMenu();
            }
        });
    }
    
    toggleMobileMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        this.mobileMenu.classList.toggle('active', this.isMenuOpen);
        this.menuToggle.classList.toggle('active', this.isMenuOpen);
        
        // Toggle body scroll
        document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
    }
    
    closeMobileMenu() {
        this.isMenuOpen = false;
        this.mobileMenu.classList.remove('active');
        this.menuToggle.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    setupActiveLinks() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
        
        if (!sections.length || !navLinks.length) return;
        
        window.addEventListener('scroll', throttle(() => {
            let current = '';
            const scrollPosition = window.pageYOffset + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href');
                if (href && href.includes(current)) {
                    link.classList.add('active');
                }
            });
        }, 100));
    }
    
    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    setupBackToTop() {
        const backToTop = document.getElementById('backToTop');
        
        if (!backToTop) return;
        
        window.addEventListener('scroll', throttle(() => {
            if (window.pageYOffset > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }, 100));
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.navigationManager = new NavigationManager();
});