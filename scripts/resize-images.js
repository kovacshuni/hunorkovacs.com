const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const INPUT_DIR = 'static/images/bmw-x3';
const OUTPUT_DIR = 'static/images/bmw-x3-processed';

// Image size configurations
const SIZES = {
  thumbnail: { width: 120, height: 90, quality: 80 },   // For thumbnail carousel
  medium: { width: 800, height: 600, quality: 85 },     // For main carousel  
  large: { width: 1920, height: 1440, quality: 90 }     // For lightbox
};

async function ensureDirectory(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
    console.log(`✓ Created directory: ${dir}`);
  } catch (error) {
    console.error(`Error creating directory ${dir}:`, error);
  }
}

async function processImage(inputPath, filename) {
  const name = path.parse(filename).name;
  const ext = path.parse(filename).ext.toLowerCase();
  
  console.log(`Processing: ${filename}`);
  
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    console.log(`  Original: ${metadata.width}x${metadata.height} (${(await fs.stat(inputPath)).size / 1024 / 1024 | 0}MB)`);
    
    // Process each size
    for (const [sizeName, config] of Object.entries(SIZES)) {
      const outputDir = path.join(OUTPUT_DIR, sizeName);
      await ensureDirectory(outputDir);
      
      let processedImage = sharp(inputPath);
      
      // Resize and compress
      processedImage = processedImage
        .resize(config.width, config.height, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .jpeg({ quality: config.quality, progressive: true });
      
      const outputPath = path.join(outputDir, `${name}.jpg`);
      await processedImage.toFile(outputPath);
      
      const outputStat = await fs.stat(outputPath);
      const outputSize = (outputStat.size / 1024 | 0);
      console.log(`  ${sizeName}: ${config.width || metadata.width}x${config.height || metadata.height} (${outputSize}KB)`);
    }
    
  } catch (error) {
    console.error(`Error processing ${filename}:`, error);
  }
}

async function main() {
  console.log('🔄 Starting BMW X3 image processing...\n');
  
  // Create output directories
  await ensureDirectory(OUTPUT_DIR);
  
  try {
    const files = await fs.readdir(INPUT_DIR);
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|webp)$/i.test(file)
    );
    
    console.log(`Found ${imageFiles.length} images to process\n`);
    
    for (const filename of imageFiles) {
      const inputPath = path.join(INPUT_DIR, filename);
      await processImage(inputPath, filename);
      console.log('');
    }
    
    console.log('✅ Image processing complete!\n');
    console.log('Generated sizes:');
    console.log('  📱 thumbnail: 120x90 (for carousel thumbnails)');
    console.log('  🖥️  medium: 800x600 (for main carousel)');
    console.log('  🔍 large: 1200x900 (for lightbox)');
    console.log('  📄 original: compressed original (for download)');
    
  } catch (error) {
    console.error('Error reading input directory:', error);
  }
}

main().catch(console.error);