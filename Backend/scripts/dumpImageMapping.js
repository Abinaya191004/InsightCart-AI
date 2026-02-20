const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const connectDB = require('../config/db');
require('dotenv').config();

const OUT = path.join(__dirname, 'imageMapping.json');

async function main() {
  await connectDB();
  const db = mongoose.connection.db;
  const files = await db.collection('images.files').find().toArray();
  const mapping = {};
  files.forEach((f) => {
    mapping[f.filename] = f._id.toString();
  });

  fs.writeFileSync(OUT, JSON.stringify(mapping, null, 2));
  console.log('Wrote mapping to', OUT);
  process.exit(0);
}

main().catch((err) => { console.error(err); process.exit(1); });
