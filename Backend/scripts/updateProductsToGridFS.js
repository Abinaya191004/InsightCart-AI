const fs = require('fs');
const path = require('path');
require('dotenv').config();
const connectDB = require('../config/db');
const mongoose = require('mongoose');
const Product = require('../models/Product');

async function main() {
  await connectDB();
  const mappingPath = path.join(__dirname, 'imageMapping.json');
  if (!fs.existsSync(mappingPath)) {
    console.error('imageMapping.json not found. Run dumpImageMapping first.');
    process.exit(1);
  }

  const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf-8'));
  const API = process.env.BACKEND_PUBLIC_URL || 'http://localhost:5000';

  const products = await Product.find();
  for (const p of products) {
    if (!p.image) continue;
    // try to extract filename portion
    const filename = p.image.split('/').pop();
    const id = mapping[filename];
    if (id) {
      p.image = `${API}/api/images/${id}`;
      await p.save();
      console.log('Updated', p._id, '->', p.image);
    }
  }

  console.log('Done');
  process.exit(0);
}

main().catch((err) => { console.error(err); process.exit(1); });
