// Shared diamond animation system with configurable parameters
'use strict';

class DiamondAnimationBase {
    constructor(config = {}) {
        // Default configuration - can be overridden
        this.config = {
            // Colors configuration
            colors: {
                blueGray: ['#6e829b', '#5a6e82', '#788ca0', '#64788c', '#5f7387', '#697d91', '#73879b', '#55697d'],
                pink: ['#b4648c', '#a05a78', '#aa5f82', '#b96991'],
                neon: ['#39ff14', '#00ff41', '#32ff00'],
                white: ['#ffffff', '#f0f0f0', '#e8e8e8', '#dddddd']
            },
            
            // Color mix configuration - how many of each color type to include
            colorMix: {
                blueGray: 1,  // 1x blue-gray colors
                pink: 1,      // 1x pink colors  
                neon: 1,      // 1x neon colors
                white: 0      // 0x white colors (none by default)
            },
            
            // Static background diamonds
            staticDiamonds: {
                count: 17500,
                sizeMin: 8,
                sizeMax: 23,
                // Separate color distribution for static background
                colorDistribution: {
                    blueGray: 17500,  // Most diamonds are blue-gray
                    pink: 2500,       // Some pink diamonds
                    neon: 100,        // Few neon diamonds
                    white: 0          // No white by default
                }
            },
            
            // Frame spawning configuration
            frameSpawning: {
                initialFrameCount: { min: 2, max: 4 },  // 2-3 initial frames
                frameSpawnInterval: { min: 1500, max: 4000 },  // 1.5-4 seconds between frames
                tilesPerFrame: { min: 3, max: 11 },  // 3-10 tiles per frame
                frameLifetime: { min: 3000, max: 9000 },  // 3-9 seconds per frame
                fadeTime: 3000  // 3 second fade duration
            },
            
            // Tile properties
            tiles: {
                sizeMin: 12,
                sizeMax: 32
            },
            
            // Canvas properties
            canvas: {
                imageSmoothingEnabled: false,
                zIndex: -1
            }
        };
        
        // Merge user config with defaults
        this.mergeConfig(config);
        
        // Initialize properties
        this.canvas = null;
        this.ctx = null;
        this.diamonds = [];
        this.frames = [];
        this.frameId = 0;
        this.staticBackground = null;
    }
    
    mergeConfig(userConfig) {
        // Deep merge user config with defaults
        for (const key in userConfig) {
            if (typeof userConfig[key] === 'object' && userConfig[key] !== null && !Array.isArray(userConfig[key])) {
                this.config[key] = { ...this.config[key], ...userConfig[key] };
            } else {
                this.config[key] = userConfig[key];
            }
        }
    }
    
    init() {
        this.createCanvas();
        this.generateStaticDiamonds();
        this.renderStaticBackground();
        this.handleResize();
        this.startAnimation();
    }
    
    createCanvas() {
        // Remove any existing canvas
        const existingCanvas = document.getElementById('diamond-canvas') || 
                              document.getElementById('snow-canvas');
        if (existingCanvas) existingCanvas.remove();
        
        // Create canvas
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'diamond-canvas';
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: ${this.config.canvas.zIndex};
            image-rendering: pixelated;
            image-rendering: -moz-crisp-edges;
            image-rendering: crisp-edges;
        `;
        
        // Set canvas size
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        // Get context
        this.ctx = this.canvas.getContext('2d');
        this.ctx.imageSmoothingEnabled = this.config.canvas.imageSmoothingEnabled;
        
        document.body.appendChild(this.canvas);
    }
    
    generateStaticDiamonds() {
        this.diamonds = [];
        const { sizeMin, sizeMax, colorDistribution } = this.config.staticDiamonds;
        
        // Generate diamonds with sophisticated color distribution
        // Blue-gray diamonds
        for (let i = 0; i < colorDistribution.blueGray; i++) {
            this.diamonds.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: sizeMin + Math.random() * (sizeMax - sizeMin),
                color: this.config.colors.blueGray[Math.floor(Math.random() * this.config.colors.blueGray.length)]
            });
        }
        
        // Pink diamonds
        for (let i = 0; i < colorDistribution.pink; i++) {
            this.diamonds.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: (sizeMin - 2) + Math.random() * (sizeMax - 5), // Slightly smaller
                color: this.config.colors.pink[Math.floor(Math.random() * this.config.colors.pink.length)]
            });
        }
        
        // Neon diamonds
        for (let i = 0; i < colorDistribution.neon; i++) {
            this.diamonds.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: (sizeMin - 3) + Math.random() * (sizeMax - 8), // Even smaller
                color: this.config.colors.neon[Math.floor(Math.random() * this.config.colors.neon.length)]
            });
        }
        
        // White diamonds
        for (let i = 0; i < colorDistribution.white; i++) {
            this.diamonds.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: sizeMin + Math.random() * (sizeMax - sizeMin),
                color: this.config.colors.white[Math.floor(Math.random() * this.config.colors.white.length)]
            });
        }
    }
    
    buildColorArray() {
        const colorArray = [];
        const { colorMix } = this.config;
        
        // Add colors based on mix configuration
        for (let i = 0; i < colorMix.blueGray; i++) {
            colorArray.push(...this.config.colors.blueGray);
        }
        for (let i = 0; i < colorMix.pink; i++) {
            colorArray.push(...this.config.colors.pink);
        }
        for (let i = 0; i < colorMix.neon; i++) {
            colorArray.push(...this.config.colors.neon);
        }
        for (let i = 0; i < colorMix.white; i++) {
            colorArray.push(...this.config.colors.white);
        }
        
        return colorArray;
    }
    
    randomInRange(min, max) {
        return min + Math.random() * (max - min);
    }
    
    randomIntInRange(min, max) {
        return Math.floor(this.randomInRange(min, max));
    }
    
    drawDiamond(x, y, size, color) {
        const halfSize = size / 2;
        
        this.ctx.fillStyle = color;
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.rotate(Math.PI / 4); // 45 degrees
        this.ctx.fillRect(-halfSize, -halfSize, size, size);
        this.ctx.restore();
    }
    
    renderStaticBackground() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Shuffle diamonds for random draw order
        const shuffledDiamonds = [...this.diamonds].sort(() => Math.random() - 0.5);
        
        // Draw all static diamonds
        for (const diamond of shuffledDiamonds) {
            this.drawDiamond(diamond.x, diamond.y, diamond.size, diamond.color);
        }
        
        // Save the static background
        this.staticBackground = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    }
    
    render() {
        // Restore static background
        if (this.staticBackground) {
            this.ctx.putImageData(this.staticBackground, 0, 0);
        }
    }
    
    startAnimation() {
        this.createInitialFrames();
        this.spawnFrames();
        this.animate();
    }
    
    createInitialFrames() {
        const now = Date.now();
        const { initialFrameCount, frameLifetime, tilesPerFrame } = this.config.frameSpawning;
        const frameCount = this.randomIntInRange(initialFrameCount.min, initialFrameCount.max + 1);
        
        for (let i = 0; i < frameCount; i++) {
            const colorArray = this.buildColorArray();
            const tileCount = this.randomIntInRange(tilesPerFrame.min, tilesPerFrame.max + 1);
            const lifetime = this.randomInRange(frameLifetime.min, frameLifetime.max);
            const randomAge = Math.random() * lifetime * 0.7;
            
            const frame = {
                id: this.frameId++,
                tiles: [],
                lifetime: lifetime,
                created: now - randomAge,
                fadeStart: lifetime - this.config.frameSpawning.fadeTime
            };
            
            // Generate tiles for this initial frame
            for (let j = 0; j < tileCount; j++) {
                frame.tiles.push({
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * this.canvas.height,
                    size: this.randomInRange(this.config.tiles.sizeMin, this.config.tiles.sizeMax),
                    color: colorArray[Math.floor(Math.random() * colorArray.length)]
                });
            }
            
            this.frames.push(frame);
        }
    }
    
    spawnFrames() {
        const spawnFrame = () => {
            const colorArray = this.buildColorArray();
            const { frameSpawning, tiles } = this.config;
            
            const tileCount = this.randomIntInRange(frameSpawning.tilesPerFrame.min, frameSpawning.tilesPerFrame.max + 1);
            const frameLifetime = this.randomInRange(frameSpawning.frameLifetime.min, frameSpawning.frameLifetime.max);
            
            const frame = {
                id: this.frameId++,
                tiles: [],
                lifetime: frameLifetime,
                created: Date.now(),
                fadeStart: frameLifetime - frameSpawning.fadeTime
            };
            
            // Generate tiles for this frame
            for (let i = 0; i < tileCount; i++) {
                frame.tiles.push({
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * this.canvas.height,
                    size: this.randomInRange(tiles.sizeMin, tiles.sizeMax),
                    color: colorArray[Math.floor(Math.random() * colorArray.length)]
                });
            }
            
            this.frames.push(frame);
            
            // Schedule next frame spawn
            const nextSpawnTime = this.randomInRange(
                frameSpawning.frameSpawnInterval.min, 
                frameSpawning.frameSpawnInterval.max
            );
            setTimeout(spawnFrame, nextSpawnTime);
        };
        
        // Start spawning frames
        spawnFrame();
    }
    
    animate() {
        const now = Date.now();
        
        // Process and clean up frames
        this.frames = this.frames.filter(frame => {
            const age = now - frame.created;
            return age < frame.lifetime;
        });
        
        // Redraw static background
        this.render();
        
        // Draw all active frames with their effects
        for (const frame of this.frames) {
            const age = now - frame.created;
            
            // Draw each tile in the frame
            for (const tile of frame.tiles) {
                let opacity = 1;
                
                // Apply fading effect
                const fadeStartTime = frame.lifetime - this.config.frameSpawning.fadeTime;
                if (age > fadeStartTime && fadeStartTime > 0) {
                    const fadeProgress = (age - fadeStartTime) / this.config.frameSpawning.fadeTime;
                    opacity = 1 - fadeProgress;
                    
                    // Don't draw if too transparent
                    if (opacity <= 0.05) continue;
                }
                
                // Apply opacity to color
                let color = tile.color;
                if (opacity < 1) {
                    // Convert hex to rgba with opacity
                    if (color.startsWith('#')) {
                        const r = parseInt(color.slice(1, 3), 16);
                        const g = parseInt(color.slice(3, 5), 16);
                        const b = parseInt(color.slice(5, 7), 16);
                        color = `rgba(${r}, ${g}, ${b}, ${opacity})`;
                    } else {
                        // For already named colors, use globalAlpha
                        this.ctx.globalAlpha = opacity;
                    }
                }
                
                this.drawDiamond(tile.x, tile.y, tile.size, color);
                
                // Reset alpha if we modified it
                if (this.ctx.globalAlpha !== 1) {
                    this.ctx.globalAlpha = 1;
                }
            }
        }
        
        // Continue animation
        requestAnimationFrame(() => this.animate());
    }
    
    handleResize() {
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.canvas.width = window.innerWidth;
                this.canvas.height = window.innerHeight;
                this.ctx.imageSmoothingEnabled = this.config.canvas.imageSmoothingEnabled;
                this.generateStaticDiamonds();
                this.renderStaticBackground();
            }, 250);
        });
    }
    
    destroy() {
        if (this.canvas) {
            this.canvas.remove();
        }
        this.diamonds = [];
        this.frames = [];
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DiamondAnimationBase;
}