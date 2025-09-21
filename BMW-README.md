# BMW X3 Sales Page

This directory contains the BMW X3 car sales page and related image processing tools.

## Image Processing

### 1. Process Images
```bash
node scripts/resize-images.js
```

### 2. Upload to Google Cloud Storage
```bash
gsutil -m rsync -d -r static/images/bmw-x3-processed/ gs://bmw-x3-images/
```

## Image URLs
- Thumbnails: `https://storage.googleapis.com/bmw-x3-images/thumbnail/[filename].jpg`
- Medium: `https://storage.googleapis.com/bmw-x3-images/medium/[filename].jpg`
- Large: `https://storage.googleapis.com/bmw-x3-images/large/[filename].jpg`