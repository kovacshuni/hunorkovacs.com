// JavaScript-generated diamond background with true randomization
'use strict';

class DiamondBackground {
    constructor() {
        this.colors = {
            blueGray: ['#6e829b', '#5a6e82', '#788ca0', '#64788c', '#5f7387', '#697d91', '#73879b', '#55697d'],
            pink: ['#b4648c', '#a05a78', '#aa5f82', '#b96991'],
            neon: ['#39ff14', '#00ff41', '#32ff00']
        };
        
        this.container = null;
        this.diamonds = [];
        
        this.init();
    }
    
    init() {
        this.createContainer();
        this.generateDiamonds();
        this.handleResize();
    }
    
    createContainer() {
        // Remove any existing diamond container
        const existing = document.getElementById('diamond-background');
        if (existing) {
            existing.remove();
        }
        
        // Create new container
        this.container = document.createElement('div');
        this.container.id = 'diamond-background';
        this.container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            overflow: hidden;
        `;
        
        document.body.appendChild(this.container);
    }
    
    generateDiamonds() {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        // Generate blue-gray diamonds (25x original density)
        for (let i = 0; i < 17500; i++) {
            this.createDiamond({
                x: Math.random() * viewportWidth,
                y: Math.random() * viewportHeight,
                size: 8 + Math.random() * 15, // 8-23px
                color: this.colors.blueGray[Math.floor(Math.random() * this.colors.blueGray.length)]
            });
        }
        
        // Generate pink diamonds
        for (let i = 0; i < 5000; i++) {
            this.createDiamond({
                x: Math.random() * viewportWidth,
                y: Math.random() * viewportHeight,
                size: 6 + Math.random() * 12, // 6-18px
                color: this.colors.pink[Math.floor(Math.random() * this.colors.pink.length)]
            });
        }
        
        // Generate neon diamonds (reduced)
        for (let i = 0; i < 100; i++) {
            this.createDiamond({
                x: Math.random() * viewportWidth,
                y: Math.random() * viewportHeight,
                size: 5 + Math.random() * 10, // 5-15px
                color: this.colors.neon[Math.floor(Math.random() * this.colors.neon.length)]
            });
        }
    }
    
    createDiamond({ x, y, size, color }) {
        const diamond = document.createElement('div');
        diamond.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            transform: rotate(45deg) translate(-50%, -50%);
            image-rendering: pixelated;
            image-rendering: -moz-crisp-edges;
            image-rendering: crisp-edges;
        `;
        
        this.container.appendChild(diamond);
        this.diamonds.push({ element: diamond, x, y, size, color });
    }
    
    handleResize() {
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.regenerateDiamonds();
            }, 250);
        });
    }
    
    regenerateDiamonds() {
        // Clear existing diamonds
        this.container.innerHTML = '';
        this.diamonds = [];
        
        // Generate new diamonds for new viewport size
        this.generateDiamonds();
    }
    
    // Method to regenerate diamonds manually
    regenerate() {
        this.regenerateDiamonds();
    }
    
    destroy() {
        if (this.container) {
            this.container.remove();
        }
        this.diamonds = [];
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.diamondBackground = new DiamondBackground();
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DiamondBackground;
}