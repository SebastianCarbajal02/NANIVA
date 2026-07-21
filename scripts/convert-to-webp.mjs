import { readdir, stat } from 'fs/promises';
import { join, extname, basename } from 'path';
import sharp from 'sharp';

const IMAGE_DIR = join(process.cwd(), 'src', 'assets', 'image');
const SUPPORTED_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif'];
const QUALITY = 80;

async function convertImage(inputPath) {
  const ext = extname(inputPath).toLowerCase();
  if (!SUPPORTED_EXTENSIONS.includes(ext)) return null;

  const baseName = basename(inputPath, ext);
  const outputPath = join(IMAGE_DIR, `${baseName}.webp`);
  
  try {
    // Check if webp already exists and is newer
    try {
      const inputStat = await stat(inputPath);
      const outputStat = await stat(outputPath);
      if (outputStat.mtimeMs >= inputStat.mtimeMs) {
        console.log(`⏭️  Skip (already converted): ${basename(inputPath)}`);
        return null;
      }
    } catch {
      // output file doesn't exist, proceed
    }

    await sharp(inputPath)
      .webp({ quality: QUALITY })
      .toFile(outputPath);
    
    console.log(`✅ Converted: ${basename(inputPath)} → ${basename(outputPath)}`);
    return { input: inputPath, output: outputPath };
  } catch (err) {
    console.error(`❌ Error converting ${basename(inputPath)}:`, err.message);
    return null;
  }
}

async function main() {
  console.log('🖼️  Converting images to WebP...\n');
  
  const files = await readdir(IMAGE_DIR);
  const imageFiles = files.filter(f => SUPPORTED_EXTENSIONS.includes(extname(f).toLowerCase()));
  
  console.log(`Found ${imageFiles.length} images to process\n`);
  
  let converted = 0;
  let skipped = 0;
  let errors = 0;
  
  for (const file of imageFiles) {
    const inputPath = join(IMAGE_DIR, file);
    const result = await convertImage(inputPath);
    
    if (result === null) {
      // Check if it was skipped or error
      const ext = extname(file).toLowerCase();
      if (SUPPORTED_EXTENSIONS.includes(ext)) {
        // Could be skipped or error, check by seeing if output exists
        const baseName = basename(file, ext);
        const outputPath = join(IMAGE_DIR, `${baseName}.webp`);
        try {
          await stat(outputPath);
          skipped++;
        } catch {
          errors++;
        }
      }
    } else {
      converted++;
    }
  }
  
  console.log(`\n📊 Summary:`);
  console.log(`   Converted: ${converted}`);
  console.log(`   Skipped:   ${skipped}`);
  console.log(`   Errors:    ${errors}`);
}

main().catch(console.error);