/**
 * resume-mobile.js
 * Handles mobile dropdown accordion functionality for resume page
 * Creates collapsible sections for better mobile experience
 */

(function() {
    'use strict';

    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        initMobileDropdowns();
    });

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            initMobileDropdowns();
        }, 250);
    });

    // Also run on orientation change
    window.addEventListener('orientationchange', function() {
        setTimeout(initMobileDropdowns, 100);
    });

    function initMobileDropdowns() {
        const isMobile = window.innerWidth <= 768;
        
        if (!isMobile) {
            resetDesktopView();
            return;
        }

        console.log('Mobile dropdowns activated'); // For debugging

        const blockTitles = document.querySelectorAll('.block-title');
        
        blockTitles.forEach((title) => {
            // Remove existing click listener and add new one
            title.removeEventListener('click', handleTitleClick);
            title.addEventListener('click', handleTitleClick);

            const block = title.closest('.resume-block');
            if (!block) return;

            // Find content within this block
            const contentSelectors = [
                '.contact-list', 
                '.cert-list', 
                '.skills-mini', 
                '.summary-text', 
                '.exp-item', 
                '.project-row', 
                '.achievement-list', 
                '.skills-grid', 
                '.language-bars',
                '.edu-item'
            ];
            
            let content = null;
            for (let selector of contentSelectors) {
                content = block.querySelector(selector);
                if (content) break;
            }
            
            if (!content) return;

            // Wrap content if not already wrapped
            if (!content.parentElement.classList.contains('block-content')) {
                const wrapper = document.createElement('div');
                wrapper.className = 'block-content';
                wrapper.style.maxHeight = '0';
                wrapper.style.overflow = 'hidden';
                wrapper.style.transition = 'max-height 0.4s ease-out';
                
                content.parentNode.insertBefore(wrapper, content);
                wrapper.appendChild(content);
            }

            // Set initial state - all closed
            const contentWrapper = title.nextElementSibling;
            if (contentWrapper && contentWrapper.classList.contains('block-content')) {
                contentWrapper.classList.remove('show');
                title.classList.remove('active');
            }
        });

        // Open first block by default
        setTimeout(() => {
            const firstTitle = document.querySelector('.block-title');
            if (firstTitle) {
                const firstContent = firstTitle.nextElementSibling;
                if (firstContent && firstContent.classList.contains('block-content')) {
                    firstTitle.classList.add('active');
                    firstContent.classList.add('show');
                    firstContent.style.maxHeight = firstContent.scrollHeight + 'px';
                }
            }
        }, 150);
    }

    function handleTitleClick(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const title = this;
        const contentWrapper = title.nextElementSibling;

        if (!contentWrapper || !contentWrapper.classList.contains('block-content')) {
            return;
        }

        const isActive = title.classList.contains('active');

        // Close all other blocks
        const allTitles = document.querySelectorAll('.block-title');
        allTitles.forEach(t => {
            if (t !== title) {
                t.classList.remove('active');
                const otherContent = t.nextElementSibling;
                if (otherContent && otherContent.classList.contains('block-content')) {
                    otherContent.classList.remove('show');
                    otherContent.style.maxHeight = '0';
                }
            }
        });

        // Toggle current block
        if (!isActive) {
            title.classList.add('active');
            contentWrapper.classList.add('show');
            contentWrapper.style.maxHeight = contentWrapper.scrollHeight + 'px';
            
            // Smooth scroll to this section
            setTimeout(() => {
                title.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        } else {
            title.classList.remove('active');
            contentWrapper.classList.remove('show');
            contentWrapper.style.maxHeight = '0';
        }
    }

    function resetDesktopView() {
        // Remove mobile-specific classes and structures
        const blockContents = document.querySelectorAll('.block-content');
        blockContents.forEach(wrapper => {
            const parent = wrapper.parentNode;
            while (wrapper.firstChild) {
                parent.insertBefore(wrapper.firstChild, wrapper);
            }
            wrapper.remove();
        });

        // Remove active classes
        document.querySelectorAll('.block-title').forEach(title => {
            title.classList.remove('active');
        });
    }
})();