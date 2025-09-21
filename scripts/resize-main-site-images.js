const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const INPUT_DIR = 'static/images';
const OUTPUT_DIR = 'static/images';

// Image size configurations for main site
const SIZES = {
  large: { height: 1920, quality: 90 },     // 1920px tall for desktop
  medium: { height: 1080, quality: 85 }     // 1080px tall for mobile
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
  
  console.log(`Processing: ${filename}`);
  
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    console.log(`  Original: ${metadata.width}x${metadata.height} (${(await fs.stat(inputPath)).size / 1024 / 1024 | 0}MB)`);
    
    // Process each size
    for (const [sizeName, config] of Object.entries(SIZES)) {
      let processedImage = sharp(inputPath);
      
      // Resize by height, maintain aspect ratio
      processedImage = processedImage
        .resize(null, config.height, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .jpeg({ quality: config.quality, progressive: true });
      
      const outputPath = path.join(OUTPUT_DIR, `${name}-${sizeName}.jpg`);
      await processedImage.toFile(outputPath);
      
      const outputStat = await fs.stat(outputPath);
      const outputSize = (outputStat.size / 1024 | 0);
      const processedMetadata = await sharp(outputPath).metadata();
      console.log(`  ${sizeName}: ${processedMetadata.width}x${processedMetadata.height} (${outputSize}KB) -> ${name}-${sizeName}.jpg`);
    }
    
  } catch (error) {
    console.error(`Error processing ${filename}:`, error);
  }
}

async function main() {
  console.log('🖼️ Starting main site image processing...\n');
  
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
    
    console.log('✅ Main site image processing complete!\n');
    console.log('Generated sizes:');
    console.log('  🖥️  large: 1920px tall (filename-large.jpg)');
    console.log('  📱 medium: 1080px tall (filename-medium.jpg)');
    
  } catch (error) {
    console.error('Error reading input directory:', error);
  }
}

main().catch(console.error);