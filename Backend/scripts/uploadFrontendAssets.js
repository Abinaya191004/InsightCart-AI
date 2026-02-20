// Simple migration script: upload images from Frontend/src/assets into GridFS
// Usage: from Backend folder run: node scripts/uploadFrontendAssets.js

const fs = require('fs');
const path = require('path');
const axios = require('axios');
const mongoose = require('mongoose');
require('dotenv').config();
const FormData = require('form-data');

const ASSETS_DIR = path.join(__dirname, '..', '..', 'Frontend', 'src', 'assets');
const UPLOAD_URL = process.env.BACKEND_UPLOAD_URL || 'http://localhost:5000/api/images/upload';

async function main() {
  if (!fs.existsSync(ASSETS_DIR)) {
    console.error('Assets dir not found:', ASSETS_DIR);
    process.exit(1);
  }

  const files = fs.readdirSync(ASSETS_DIR).filter((f) => /thumbnail|Thumbnail|\.jpg|\.png|\.webp|\.avif/.test(f));
  console.log('Found', files.length, 'assets');

  for (const file of files) {
    const filePath = path.join(ASSETS_DIR, file);
    const form = new FormData();
    form.append('file', fs.createReadStream(filePath));

    try {
      const res = await axios.post(UPLOAD_URL, form, { headers: form.getHeaders() });
      console.log(file, '=>', res.data.fileId);
    } catch (err) {
      console.error('Upload failed for', file, err.message);
    }
  }
}

main();
