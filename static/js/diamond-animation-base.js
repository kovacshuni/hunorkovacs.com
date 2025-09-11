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
        // Remove any existing canvases
        const existingStatic = document.getElementById('diamond-canvas-static');
        const existingAnimated = document.getElementById('diamond-canvas-animated');
        if (existingStatic) existingStatic.remove();
        if (existingAnimated) existingAnimated.remove();
        
        // Create static background canvas (behind content)
        this.staticCanvas = document.createElement('canvas');
        this.staticCanvas.id = 'diamond-canvas-static';
        this.staticCanvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            image-rendering: pixelated;
            image-rendering: -moz-crisp-edges;
            image-rendering: crisp-edges;
        `;
        
        // Create animated frames canvas (above content)
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'diamond-canvas-animated';
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
        
        // Set canvas sizes
        this.staticCanvas.width = this.canvas.width = window.innerWidth;
        this.staticCanvas.height = this.canvas.height = window.innerHeight;
        
        // Get contexts
        this.staticCtx = this.staticCanvas.getContext('2d');
        this.staticCtx.imageSmoothingEnabled = this.config.canvas.imageSmoothingEnabled;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.imageSmoothingEnabled = this.config.canvas.imageSmoothingEnabled;
        
        document.body.appendChild(this.staticCanvas);
        document.body.appendChild(this.canvas);
    }
    
    calculateViewportScale() {
        // Calculate scaling factor based on viewport size
        const viewportArea = window.innerWidth * window.innerHeight;
        const baseArea = 1920 * 1080; // Full HD as baseline
        
        // Scale factor with limits to prevent too sparse or too dense
        let scaleFactor = viewportArea / baseArea;
        
        // Mobile detection (viewport width < 768px)
        if (window.innerWidth < 768) {
            // More aggressive scaling for mobile
            scaleFactor = scaleFactor * 0.3; // 30% density on mobile
        } else if (window.innerWidth < 1024) {
            // Tablet scaling
            scaleFactor = scaleFactor * 0.5;
        }
        
        // Clamp scale factor to reasonable range
        const finalScale = Math.max(0.15, Math.min(scaleFactor, 2.0));
        
        return finalScale;
    }
    
    generateStaticDiamonds() {
        this.diamonds = [];
        const { sizeMin, sizeMax, colorDistribution } = this.config.staticDiamonds;
        
        // Calculate viewport-based scaling
        const scaleFactor = this.calculateViewportScale();
        
        // Scale the counts based on viewport
        const scaledDistribution = {
            blueGray: Math.floor(colorDistribution.blueGray * scaleFactor),
            pink: Math.floor(colorDistribution.pink * scaleFactor),
            neon: Math.floor(colorDistribution.neon * scaleFactor),
            white: Math.floor(colorDistribution.white * scaleFactor)
        };
        
        // Generate diamonds with sophisticated color distribution
        // Blue-gray diamonds
        for (let i = 0; i < scaledDistribution.blueGray; i++) {
            this.diamonds.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: sizeMin + Math.random() * (sizeMax - sizeMin),
                color: this.config.colors.blueGray[Math.floor(Math.random() * this.config.colors.blueGray.length)]
            });
        }
        
        // Pink diamonds
        for (let i = 0; i < scaledDistribution.pink; i++) {
            this.diamonds.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: (sizeMin - 2) + Math.random() * (sizeMax - 5), // Slightly smaller
                color: this.config.colors.pink[Math.floor(Math.random() * this.config.colors.pink.length)]
            });
        }
        
        // Neon diamonds
        for (let i = 0; i < scaledDistribution.neon; i++) {
            this.diamonds.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: (sizeMin - 3) + Math.random() * (sizeMax - 8), // Even smaller
                color: this.config.colors.neon[Math.floor(Math.random() * this.config.colors.neon.length)]
            });
        }
        
        // White diamonds
        for (let i = 0; i < scaledDistribution.white; i++) {
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
    
    drawDiamond(x, y, size, color, context = null) {
        const ctx = context || this.ctx;
        const halfSize = size / 2;
        
        ctx.fillStyle = color;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(Math.PI / 4); // 45 degrees
        ctx.fillRect(-halfSize, -halfSize, size, size);
        ctx.restore();
    }
    
    renderStaticBackground() {
        // Clear static canvas
        this.staticCtx.clearRect(0, 0, this.staticCanvas.width, this.staticCanvas.height);
        
        // Shuffle diamonds for random draw order
        const shuffledDiamonds = [...this.diamonds].sort(() => Math.random() - 0.5);
        
        // Draw all static diamonds to the static canvas
        for (const diamond of shuffledDiamonds) {
            this.drawDiamond(diamond.x, diamond.y, diamond.size, diamond.color, this.staticCtx);
        }
    }
    
    render() {
        // Clear only the animated canvas (static background stays on its own canvas)
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
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
        
        // Get scale factor for tile counts
        const scaleFactor = this.calculateViewportScale();
        
        for (let i = 0; i < frameCount; i++) {
            const colorArray = this.buildColorArray();
            // Scale tile count based on viewport
            const baseTileCount = this.randomIntInRange(tilesPerFrame.min, tilesPerFrame.max + 1);
            const tileCount = Math.max(1, Math.floor(baseTileCount * scaleFactor));
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
            
            // Scale tile count based on viewport
            const scaleFactor = this.calculateViewportScale();
            const baseTileCount = this.randomIntInRange(frameSpawning.tilesPerFrame.min, frameSpawning.tilesPerFrame.max + 1);
            const tileCount = Math.max(1, Math.floor(baseTileCount * scaleFactor));
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
                // Resize both canvases
                this.staticCanvas.width = this.canvas.width = window.innerWidth;
                this.staticCanvas.height = this.canvas.height = window.innerHeight;
                this.staticCtx.imageSmoothingEnabled = this.config.canvas.imageSmoothingEnabled;
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
        if (this.staticCanvas) {
            this.staticCanvas.remove();
        }
        this.diamonds = [];
        this.frames = [];
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DiamondAnimationBase;
}