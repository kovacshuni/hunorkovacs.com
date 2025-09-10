// Canvas-based diamond background - high performance rendering
'use strict';

class CanvasDiamondBackground extends DiamondAnimationBase {
    constructor() {
        // Configuration for main pages - calm and subtle
        const mainPageConfig = {
            // Color mix: original colors only (no white)
            colorMix: {
                blueGray: 1,
                pink: 1, 
                neon: 1,
                white: 0  // No white on main pages
            },
            
            // Calm frame spawning
            frameSpawning: {
                initialFrameCount: { min: 2, max: 4 },  // 2-3 initial frames
                frameSpawnInterval: { min: 1500, max: 4000 },  // 1.5-4 seconds between frames
                tilesPerFrame: { min: 3, max: 11 },  // 3-10 tiles per frame
                frameLifetime: { min: 3000, max: 9000 },  // 3-9 seconds per frame
                fadeTime: 3000  // 3 second fade
            }
        };
        
        super(mainPageConfig);
        this.init();
    }
    
    // Legacy method names for backwards compatibility
    generateDiamonds() {
        this.generateStaticDiamonds();
    }
    
    startTileAnimation() {
        this.startAnimation();
    }
    
    // Method to regenerate diamonds manually
    regenerate() {
        this.generateStaticDiamonds();
        this.renderStaticBackground();
    }
    
    // Legacy animation methods (now handled by base class)
    animateTiles() {
        this.animate();
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Destroy existing DOM diamond background if it exists
    if (window.diamondBackground) {
        window.diamondBackground.destroy();
    }
    
    window.canvasDiamondBackground = new CanvasDiamondBackground();
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CanvasDiamondBackground;
}