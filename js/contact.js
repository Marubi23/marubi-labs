/**
 * ============================================
 * CONTACT FORM HANDLER
 * Author: Felix Marubi
 * ============================================
 */

class ContactManager {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.init();
    }
    
    init() {
        if (!this.form) return;
        
        this.setupFormValidation();
        this.setupFormSubmission();
        this.setupPhoneFormatting();
    }
    
    setupFormValidation() {
        const inputs = this.form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            // Validate on blur
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
            
            // Clear error on input
            input.addEventListener('input', () => {
                this.clearFieldError(input);
            });
        });
    }
    
    validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        const name = field.name;
        
        let isValid = true;
        let errorMessage = '';
        
        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }
        
        // Email validation
        else if (type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }
        
        // Phone validation
        else if (name === 'phone' && value) {
            const phoneRegex = /^(?:(?:\+254|0)[17]\d{8})$/;
            if (!phoneRegex.test(value.replace(/\s/g, ''))) {
                isValid = false;
                errorMessage = 'Please enter a valid Kenyan phone number';
            }
        }
        
        // Min length validation
        else if (field.hasAttribute('minlength') && value.length < parseInt(field.getAttribute('minlength'))) {
            isValid = false;
            errorMessage = `Minimum ${field.getAttribute('minlength')} characters required`;
        }
        
        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }
        
        return isValid;
    }
    
    showFieldError(field, message) {
        const formGroup = field.closest('.form-group');
        
        // Remove existing error
        this.clearFieldError(field);
        
        // Add error class
        formGroup.classList.add('error');
        
        // Add error message
        const error = document.createElement('span');
        error.className = 'error-message';
        error.textContent = message;
        formGroup.appendChild(error);
    }
    
    clearFieldError(field) {
        const formGroup = field.closest('.form-group');
        formGroup.classList.remove('error');
        
        const error = formGroup.querySelector('.error-message');
        if (error) {
            error.remove();
        }
    }
    
    setupFormSubmission() {
        this.form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Validate all fields
            let isValid = true;
            const inputs = this.form.querySelectorAll('input, textarea, select');
            
            inputs.forEach(input => {
                if (!this.validateField(input)) {
                    isValid = false;
                }
            });
            
            if (!isValid) return;
            
            // Show loading state
            const submitBtn = this.form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            
            try {
                // Collect form data
                const formData = new FormData(this.form);
                const data = Object.fromEntries(formData.entries());
                
                // Send to server (simulated for now)
                await this.sendMessage(data);
                
                // Show success message
                this.showSuccessMessage();
                
                // Reset form
                this.form.reset();
                
            } catch (error) {
                console.error('Error sending message:', error);
                this.showErrorMessage('Failed to send message. Please try again.');
                
            } finally {
                // Reset button
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            }
        });
    }
    
    async sendMessage(data) {
        // Simulate API call - replace with actual endpoint
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Message sent:', data);
                resolve({ success: true });
            }, 1500);
        });
        
        // Actual fetch implementation:
        /*
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        return response.json();
        */
    }
    
    showSuccessMessage() {
        const message = document.createElement('div');
        message.className = 'success-message';
        message.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <div>
                <strong>Message Sent!</strong>
                <p>Thank you for reaching out. I'll get back to you soon.</p>
            </div>
        `;
        
        this.form.insertBefore(message, this.form.firstChild);
        
        // Remove after 5 seconds
        setTimeout(() => {
            message.remove();
        }, 5000);
    }
    
    showErrorMessage(text) {
        const message = document.createElement('div');
        message.className = 'error-message';
        message.textContent = text;
        message.style.marginBottom = '1rem';
        
        this.form.insertBefore(message, this.form.firstChild);
        
        // Remove after 5 seconds
        setTimeout(() => {
            message.remove();
        }, 5000);
    }
    
    setupPhoneFormatting() {
        const phoneInput = this.form.querySelector('input[name="phone"]');
        
        if (!phoneInput) return;
        
        phoneInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            
            // Format as Kenyan phone number
            if (value.startsWith('0')) {
                value = '254' + value.substring(1);
            }
            
            if (value.length > 12) {
                value = value.substring(0, 12);
            }
            
            // Format: +254 XXX XXX XXX
            if (value.length > 0) {
                if (value.length > 6) {
                    value = `+${value.substring(0, 3)} ${value.substring(3, 6)} ${value.substring(6, 9)} ${value.substring(9, 12)}`;
                } else if (value.length > 3) {
                    value = `+${value.substring(0, 3)} ${value.substring(3)}`;
                } else {
                    value = `+${value}`;
                }
            }
            
            e.target.value = value.trim();
        });
    }
}

// Initialize contact manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.contactManager = new ContactManager();
});