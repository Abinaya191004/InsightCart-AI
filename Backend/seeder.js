require('dotenv').config();
const connectDB = require('./config/db');
const Product = require('./models/Product');
const products = require('./data/products');

async function seed() {
  await connectDB();
  try {
    await Product.deleteMany({});
    const created = await Product.insertMany(products);
    console.log(`Inserted ${created.length} products`);
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed', err);
    process.exit(1);
  }
}

seed();
