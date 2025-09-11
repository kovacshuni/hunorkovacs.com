// Extreme snow effect - digital blizzard for easter egg page
'use strict';

class SnowBlizzard extends DiamondAnimationBase {
    constructor() {
        // Configuration for snow page - intense and white-heavy
        const snowPageConfig = {
            // Color mix: lots of white for snow effect
            colorMix: {
                blueGray: 1,
                pink: 1,
                neon: 1,
                white: 3  // 3x white colors for snow effect
            },
            
            // Static background - fewer diamonds for snow page
            staticDiamonds: {
                count: 8000,
                sizeMin: 6,
                sizeMax: 18,
                // Different color distribution for snow page
                colorDistribution: {
                    blueGray: 6000,   // Still mostly blue-gray
                    pink: 1500,       // Some pink
                    neon: 50,         // Few neon
                    white: 450        // Some white for snow effect
                }
            },
            
            // Intense frame spawning
            frameSpawning: {
                initialFrameCount: { min: 3, max: 6 },  // 3-5 initial frames
                frameSpawnInterval: { min: 100, max: 500 },  // 100-500ms between frames (very fast!)
                tilesPerFrame: { min: 5, max: 26 },  // 5-25 tiles per frame
                frameLifetime: { min: 5000, max: 15000 },  // 5-15 seconds per frame
                fadeTime: 5000  // 5 second fade
            },
            
            // Canvas settings - snowflakes on top
            canvas: {
                imageSmoothingEnabled: false,
                zIndex: 100  // Above all page content for true snow effect
            }
        };
        
        super(snowPageConfig);
        this.init();
    }
    
    // Legacy method names for backwards compatibility
    startBlizzard() {
        this.startAnimation();
    }
    
    animateBlizzard() {
        this.animate();
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.snowBlizzard = new SnowBlizzard();
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SnowBlizzard;
}