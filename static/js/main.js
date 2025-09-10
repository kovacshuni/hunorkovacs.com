// Modern JavaScript for email popup functionality
'use strict';

class EmailPopup {
    constructor() {
        this.popup = document.getElementById('email-popup');
        this.isVisible = false;
        
        // Bind methods to maintain correct 'this' context
        this.toggle = this.toggle.bind(this);
        this.hide = this.hide.bind(this);
        this.handleKeydown = this.handleKeydown.bind(this);
        
        this.init();
    }
    
    init() {
        // Add event listeners
        document.addEventListener('keydown', this.handleKeydown);
        
        // Prevent popup from closing when clicking on the email content
        const emailContent = this.popup?.querySelector('.email-content');
        if (emailContent) {
            emailContent.addEventListener('click', (event) => {
                event.stopPropagation();
            });
        }
    }
    
    toggle() {
        if (this.isVisible) {
            this.hide();
        } else {
            this.show();
        }
    }
    
    show() {
        if (!this.popup) return;
        
        this.popup.classList.add('visible');
        this.isVisible = true;
        
        // Focus management for accessibility
        this.popup.focus();
        
        // Prevent body scroll when popup is open
        document.body.style.overflow = 'hidden';
    }
    
    hide() {
        if (!this.popup) return;
        
        this.popup.classList.remove('visible');
        this.isVisible = false;
        
        // Restore body scroll
        document.body.style.overflow = '';
        
        // Return focus to the email toggle button
        const emailToggle = document.querySelector('.email-toggle');
        if (emailToggle) {
            emailToggle.focus();
        }
    }
    
    handleKeydown(event) {
        // Close popup on Escape key
        if (event.key === 'Escape' && this.isVisible) {
            event.preventDefault();
            this.hide();
        }
    }
    
    destroy() {
        document.removeEventListener('keydown', this.handleKeydown);
    }
}

// Global function for HTML onclick attribute (maintaining backward compatibility)
let emailPopupInstance;

function toggleEmail() {
    if (emailPopupInstance) {
        emailPopupInstance.toggle();
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    emailPopupInstance = new EmailPopup();
    
    // Optional: Add smooth scroll behavior for better UX
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add loading state management
    document.body.classList.add('loaded');
});

// Handle page visibility changes (optional enhancement)
document.addEventListener('visibilitychange', () => {
    if (document.hidden && emailPopupInstance?.isVisible) {
        emailPopupInstance.hide();
    }
});

// Export for potential future module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { EmailPopup, toggleEmail };
}