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
            
            // Heavier rain - more frequent and denser frames
            frameSpawning: {
                initialFrameCount: { min: 3, max: 6 },  // 3-5 initial frames
                frameSpawnInterval: { min: 800, max: 2500 },  // 0.8-2.5 seconds between frames (faster spawning)
                tilesPerFrame: { min: 5, max: 18 },  // 5-17 tiles per frame (more tiles)
                frameLifetime: { min: 3000, max: 9000 },  // 3-9 seconds per frame
                fadeTime: 3000  // 3 second fade
            },
            
            // Canvas on top of everything including images
            canvas: {
                imageSmoothingEnabled: false,
                zIndex: 100  // Above all page content
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