/**
 * ============================================
 * MARUBI-LABS PREMIUM ANIMATIONS
 * Where Code Meets Art
 * Author: Felix Marubi
 * Version: 2.0.0
 * ============================================
 */

// ============================================
// FLOATING ELEMENTS FIX - Make them subtle
// ============================================
const fixFloatingElements = () => {
    const style = document.createElement('style');
    style.textContent = `
        .floating-elements {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
            overflow: hidden;
        }
        
        .floating-element {
            position: absolute;
            font-family: 'JetBrains Mono', monospace;
            font-weight: 700;
            color: rgba(14, 165, 233, 0.03) !important;
            user-select: none;
            white-space: nowrap;
            animation: float-slow 20s infinite linear;
            font-size: 4rem !important;
            opacity: 0.03 !important;
            transform-origin: center;
            will-change: transform;
        }
        
        .floating-element:nth-child(1) {
            top: 15%;
            left: 5%;
            font-size: 3rem !important;
            animation-duration: 25s;
            color: rgba(245, 158, 11, 0.03) !important;
        }
        
        .floating-element:nth-child(2) {
            bottom: 20%;
            right: 8%;
            font-size: 4rem !important;
            animation-duration: 30s;
            animation-direction: reverse;
        }
        
        .floating-element:nth-child(3) {
            top: 40%;
            right: 15%;
            font-size: 3.5rem !important;
            animation-duration: 22s;
            color: rgba(14, 165, 233, 0.02) !important;
        }
        
        .floating-element:nth-child(4) {
            bottom: 30%;
            left: 10%;
            font-size: 4.5rem !important;
            animation-duration: 28s;
            color: rgba(245, 158, 11, 0.02) !important;
        }
        
        .floating-element:nth-child(5) {
            top: 70%;
            right: 20%;
            font-size: 3rem !important;
            animation-duration: 35s;
            animation-direction: reverse;
        }
        
        @keyframes float-slow {
            0% { transform: translate(0, 0) rotate(0deg); }
            33% { transform: translate(10px, -10px) rotate(5deg); }
            66% { transform: translate(-10px, 10px) rotate(-5deg); }
            100% { transform: translate(0, 0) rotate(0deg); }
        }
        
        .hero, .section, .footer, .navbar {
            position: relative;
            z-index: 2;
        }
    `;
    document.head.appendChild(style);
};

// ============================================
// LIVE REVIEWS DATA
// ============================================
const reviews = [
    // Real clients you've worked with
    {
        text: "Mzuri Organics was built   comprehensively as an  e-commerce platform that transformed how we sell our organic fertilizers. Farmers can now easily order VermiFrass and BioVeg Plus online. Our online sales have increased by 180% in just 3 months. The integration with M-Pesa was seamless!",
        rating: 5,
        client: "James Mwangi",
        company: "Mzuri Organics",
        role: "Operations Director"
    },
    {
        text: "Marubi-Labs created an intuitive learning platform that's genuinely changing children's lives. The UI is so simple that kids as young as 7 can navigate it independently. We've reached over 5,000 students in underprivileged areas through this platform.",
        rating: 5,
        client: "Sarah Wanjiku",
        company: "Mind-Bridge Foundation",
        role: "Program Director"
    },
    {
        text: "They built us a custom e-commerce site with M-Pesa integration that increased our conversion rate by 200%. The dashboard gives us real-time analytics and inventory management. Best investment we've made this year.",
        rating: 5,
        client: "David Omondi",
        company: "GreenHarvest Kenya",
        role: "Founder"
    },
    {
        text: "I needed a professional portfolio that would stand out to international clients. Marubi-Labs delivered a stunning, fast-loading site that perfectly captures my brand. I've gotten three client inquiries in the first week!",
        rating: 5,
        client: "Akinyi Odhiambo",
        company: "Creative Studio",
        role: "Photographer"
    },
    {
        text: "The team rebuilt our entire corporate website with modern Angular framework. Page load times dropped from 5 seconds to under 1 second. Our SEO rankings have improved dramatically.",
        rating: 5,
        client: "Peter Kipchoge",
        company: "East African Logistics",
        role: "Marketing Manager"
    },
    {
        text: "Marubi-Labs developed a property listing platform with advanced search filters, virtual tour integration, and automated inquiry system. It's transformed how we showcase properties to potential buyers.",
        rating: 5,
        client: "Lucy Njeri",
        company: "Prime Properties KE",
        role: "Director"
    },
    {
        text: "They built us a complete school management system with parent portals, grade tracking, and fee payment integration. Our administrative workload has reduced by 60%.",
        rating: 5,
        client: "Dr. Otieno",
        company: "Kisumu International School",
        role: "Principal"
    },
    {
        text: "Marubi-Labs conducted a thorough security audit of our banking systems and discovered critical vulnerabilities we hadn't identified. Their detailed report and remediation guidance were invaluable.",
        rating: 5,
        client: "Michael Njoroge",
        company: "Safaricom",
        role: "Security Engineer"
    },
    {
        text: "The cybersecurity workshop Marubi-Labs facilitated for our team was eye-opening. They covered real-world attack vectors and practical defense strategies. Our employees now recognize phishing attempts.",
        rating: 5,
        client: "Grace Mumbi",
        company: "KCB Bank",
        role: "IT Manager"
    },
    {
        text: "After experiencing a breach, we hired Marubi-Labs to harden our network infrastructure. They implemented proper firewall rules, intrusion detection systems, and conducted employee security awareness training. No incidents since.",
        rating: 5,
        client: "John Kariuki",
        company: "Nairobi Hospital",
        role: "Head of IT"
    },
    {
        text: "Marubi-Labs performed a comprehensive security assessment of our e-commerce platform and found multiple OWASP Top 10 vulnerabilities. Their fixes were implemented quickly and our payment gateway is now PCI compliant.",
        rating: 5,
        client: "Faith Akinyi",
        company: "ShopKE Online",
        role: "CTO"
    },
    {
        text: "The hands-on cybersecurity workshop at Marubi-Labs gave me practical experience in ethical hacking and penetration testing. I went from theory to actually exploiting vulnerabilities in a controlled environment. Landed my first security job because of this experience.",
        rating: 5,
        client: "Brian Otieno",
        company: "Cybersecurity Student",
        role: "Former Intern"
    },
    {
        text: "Marubi-Labs delivered our project two weeks ahead of schedule and under budget. The code is clean, well-documented, and scalable. Their communication throughout the process was excellent.",
        rating: 5,
        client: "Anne Wairimu",
        company: "TechStart Africa",
        role: "Project Manager"
    },
    {
        text: "We needed to integrate multiple third-party APIs including M-Pesa, PayPal, and various payment gateways. Marubi-Labs handled it flawlessly. The integration is robust and handles edge cases we hadn't even considered.",
        rating: 5,
        client: "Samuel Muthui",
        company: "FinTech Solutions",
        role: "Lead Developer"
    },
    {
        text: "Our database queries were taking 30+ seconds and our application was slowing down. Marubi-Labs optimized our indexes, restructured inefficient queries, and implemented caching. Now the same queries run in under 3 seconds.",
        rating: 5,
        client: "Catherine Mwende",
        company: "DataFlow Analytics",
        role: "Data Architect"
    },
    {
        text: "The user experience on our platform was confusing and users were dropping off. Marubi-Labs completely redesigned the interface with user testing and modern design principles. User engagement increased by 150% after the redesign.",
        rating: 5,
        client: "Francis Kamau",
        company: "EduTech Kenya",
        role: "Product Manager"
    },
    {
        text: "Marubi-Labs built our cross-platform mobile app using Flutter. It runs smoothly on both Android and iOS, and users love the intuitive design. We've had 10,000+ downloads in the first month.",
        rating: 5,
        client: "Esther Mueni",
        company: "AgriConnect",
        role: "Founder"
    }
];

// Make reviews globally available
window.reviews = reviews;

// ============================================
// LIVE REVIEWS TERMINAL ANIMATION
// ============================================
let currentIndex = 0;
let isAnimating = false;
let typingTimer = null;
let deleteTimer = null;

const typingElement = document.getElementById('typingReview');
const starsElement = document.getElementById('ratingStars');

function startReviewsTerminal() {
    if (!typingElement || !starsElement) return;
    
    // Clear any existing timers
    if (typingTimer) clearTimeout(typingTimer);
    if (deleteTimer) clearTimeout(deleteTimer);
    
    currentIndex = 0;
    typeReview(reviews[0], () => {
        // Wait 3 seconds then start the cycle
        setTimeout(() => {
            nextReview();
        }, 3000);
    });
}

function typeReview(review, callback) {
    if (isAnimating) return;
    isAnimating = true;
    
    let i = 0;
    typingElement.textContent = '';
    starsElement.textContent = '';
    
    function type() {
        if (i < review.text.length) {
            typingElement.textContent += review.text.charAt(i);
            i++;
            typingTimer = setTimeout(type, 30); // Typing speed
        } else {
            // Show stars after typing
            starsElement.textContent = '★'.repeat(review.rating);
            isAnimating = false;
            if (callback) callback();
        }
    }
    
    type();
}

function deleteReview(callback) {
    if (isAnimating) return;
    isAnimating = true;
    
    let text = typingElement.textContent;
    let i = text.length;
    
    function del() {
        if (i > 0) {
            typingElement.textContent = text.substring(0, i - 1);
            i--;
            deleteTimer = setTimeout(del, 15); // Deleting speed
        } else {
            starsElement.textContent = '';
            isAnimating = false;
            if (callback) callback();
        }
    }
    
    del();
}

function nextReview() {
    if (isAnimating) return;
    
    deleteReview(() => {
        currentIndex = (currentIndex + 1) % reviews.length;
        typeReview(reviews[currentIndex], () => {
            // Wait 3 seconds before next review
            setTimeout(() => {
                nextReview();
            }, 3000);
        });
    });
}

// ============================================
// ANIMATION MANAGER CLASS
// ============================================

class AnimationManager {
    constructor() {
        this.revealElements = document.querySelectorAll('.reveal, .animate-on-scroll, [data-animate]');
        this.counters = document.querySelectorAll('.stat-number[data-target], .counter');
        this.animatedElements = new Set();
        this.scrollTimeout = null;
        
        this.init();
    }
    
    init() {
        this.setupRevealAnimations();
        this.setupCounters();
        this.setupParallax();
        this.setupTypingEffect();
        this.setupHoverAnimations();
        this.setupScrollSpy();
        this.setupMagneticButtons();
        this.setupTextReveal();
        this.setupGlowEffects();
        this.setupInitialAnimations();
    }
    
    setupInitialAnimations() {
        // Animate hero elements on load
        const heroElements = document.querySelectorAll('.hero-left > *, .hero-image');
        heroElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s forwards`;
        });
    }
    
    setupRevealAnimations() {
        if (!this.revealElements.length) return;
        
        // Set initial state
        this.revealElements.forEach(el => {
            if (!el.classList.contains('animated')) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.8s cubic-bezier(0.65, 0, 0.35, 1), transform 0.8s cubic-bezier(0.65, 0, 0.35, 1)';
            }
        });
        
        // Check on load
        this.checkReveal();
        
        // Check on scroll with throttling
        window.addEventListener('scroll', this.throttle(() => {
            this.checkReveal();
        }, 100));
    }
    
    checkReveal() {
        this.revealElements.forEach(el => {
            if (this.isElementInViewport(el, 100) && !el.classList.contains('animated')) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
                el.classList.add('animated');
                
                el.dispatchEvent(new CustomEvent('revealed'));
            }
        });
    }
    
    isElementInViewport(el, offset = 0) {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        return (
            rect.top <= (windowHeight - offset) && 
            rect.bottom >= offset
        );
    }
    
    setupCounters() {
        if (!this.counters.length) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    this.animateCounter(entry.target);
                    entry.target.classList.add('counted');
                }
            });
        }, { threshold: 0.5, rootMargin: '0px' });
        
        this.counters.forEach(counter => observer.observe(counter));
    }
    
    animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target') || counter.textContent);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const formatNumber = (num) => {
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        };
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = formatNumber(Math.round(current));
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = formatNumber(target);
                
                counter.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    counter.style.transform = '';
                }, 200);
            }
        };
        
        requestAnimationFrame(updateCounter);
    }
    
    setupParallax() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        if (!parallaxElements.length) return;
        
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;
                    
                    parallaxElements.forEach(el => {
                        const speed = parseFloat(el.dataset.parallax) || 0.5;
                        const yPos = -(scrolled * speed);
                        el.style.transform = `translateY(${yPos}px)`;
                    });
                    
                    ticking = false;
                });
                
                ticking = true;
            }
        });
    }
    
    setupTypingEffect() {
        const typingElements = document.querySelectorAll('[data-typing]');
        
        typingElements.forEach(el => {
            const text = el.textContent;
            const speed = parseInt(el.dataset.speed) || 100;
            let i = 0;
            
            el.textContent = '';
            el.classList.add('typing-active');
            
            const type = () => {
                if (i < text.length) {
                    el.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                } else {
                    el.classList.remove('typing-active');
                }
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !entry.target.hasAttribute('data-typed')) {
                        type();
                        entry.target.setAttribute('data-typed', 'true');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(el);
        });
    }
    
    setupHoverAnimations() {
        const cards = document.querySelectorAll('.work-card, .about-card, .project-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
        
        const buttons = document.querySelectorAll('.btn-primary, .btn-outline');
        
        buttons.forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                button.style.setProperty('--mouse-x', `${x}px`);
                button.style.setProperty('--mouse-y', `${y}px`);
            });
        });
    }
    
    setupMagneticButtons() {
        const magneticButtons = document.querySelectorAll('.social-link, .back-to-top');
        
        magneticButtons.forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = '';
            });
        });
    }
    
    setupTextReveal() {
        const textElements = document.querySelectorAll('.hero-title, .section-title');
        
        textElements.forEach(el => {
            const text = el.textContent;
            const words = text.split(' ');
            
            if (words.length > 1 && !el.querySelector('.word-wrapper')) {
                const wrapped = words.map(word => `<span class="word-wrapper"><span class="word">${word}</span></span>`).join(' ');
                el.innerHTML = wrapped;
                
                const wordSpans = el.querySelectorAll('.word');
                wordSpans.forEach(word => {
                    word.style.opacity = '0';
                    word.style.transform = 'translateY(20px)';
                    word.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                });
                
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            wordSpans.forEach((word, index) => {
                                setTimeout(() => {
                                    word.style.opacity = '1';
                                    word.style.transform = 'translateY(0)';
                                }, index * 50);
                            });
                            observer.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.5 });
                
                observer.observe(el);
            }
        });
    }
    
    setupGlowEffects() {
        const profileFrame = document.querySelector('.profile-frame');
        if (profileFrame) {
            profileFrame.addEventListener('mousemove', (e) => {
                const rect = profileFrame.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                
                profileFrame.style.setProperty('--glow-x', `${x}%`);
                profileFrame.style.setProperty('--glow-y', `${y}%`);
            });
        }
    }
    
    setupScrollSpy() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        if (!sections.length || !navLinks.length) return;
        
        window.addEventListener('scroll', this.throttle(() => {
            let current = '';
            const scrollY = window.pageYOffset + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href')?.replace('#', '');
                if (href === current) {
                    link.classList.add('active');
                }
            });
        }, 100));
    }
    
    addFloatAnimation(elements, duration = 3) {
        elements.forEach(el => {
            el.style.animation = `float ${duration}s ease-in-out infinite`;
        });
    }
    
    addPulseAnimation(elements) {
        elements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                el.style.animation = 'pulse 0.5s ease';
            });
            
            el.addEventListener('mouseleave', () => {
                el.style.animation = '';
            });
        });
    }
    
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// ============================================
// ADD ANIMATION STYLES
// ============================================

const addAnimationStyles = () => {
    if (document.getElementById('animation-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'animation-styles';
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }
        
        .animate-float {
            animation: float 3s ease-in-out infinite;
        }
        
        .animate-pulse {
            animation: pulse 2s infinite;
        }
        
        .animate-fade-in {
            animation: fadeIn 0.8s ease forwards;
        }
        
        .animate-fade-in-up {
            animation: fadeInUp 0.8s ease forwards;
        }
        
        .word-wrapper {
            display: inline-block;
            overflow: hidden;
        }
        
        .word {
            display: inline-block;
        }
        
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.2s; }
        .delay-3 { animation-delay: 0.3s; }
        .delay-4 { animation-delay: 0.4s; }
        .delay-5 { animation-delay: 0.5s; }
    `;
    
    document.head.appendChild(style);
};

// ============================================
// INITIALIZE EVERYTHING
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Fix floating elements
    fixFloatingElements();
    
    // Add animation styles
    addAnimationStyles();
    
    // Initialize animation manager
    window.animationManager = new AnimationManager();
    
    // Start reviews terminal
    startReviewsTerminal();
    
    // Add float animation to profile image
    const profileFrame = document.querySelector('.profile-frame');
    if (profileFrame) {
        profileFrame.classList.add('animate-float');
    }
    
    console.log(' Marubi-Labs animations initialized successfully');
    console.log(` Loaded ${reviews.length} client testimonials`);
});