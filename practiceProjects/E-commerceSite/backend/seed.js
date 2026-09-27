const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
const connectDB = require('./config/db');
const User = require('./models/User');
const Product = require('./models/Product');

const sampleProducts = [
  {
    name: 'Wireless Noise-Canceling Headphones',
    description: 'Immersive sound with industry-leading noise cancellation and 30-hour battery life.',
    price: 299.99,
    stock: 25,
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
  },
  {
    name: 'Minimalist Mechanical Keyboard',
    description: 'Compact 75% wireless mechanical keyboard with hot-swappable tactile switches.',
    price: 129.50,
    stock: 14,
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
  },
  {
    name: 'Ergonomic Leather Desk Chair',
    description: 'Premium breathable leather chair with lumbal support and adjustable armrests.',
    price: 349.00,
    stock: 8,
    category: 'Furniture',
    imageUrl: 'https://images.unsplash.com/photo-1580481072645-022f9a6d1269?w=800&auto=format&fit=crop&q=80',
  },
  {
    name: 'Smart Fitness Watch Series X',
    description: 'Track your heart rate, sleep quality, workout metrics, and GPS routing with crisp OLED display.',
    price: 199.99,
    stock: 42,
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
  },
  {
    name: 'Stainless Steel Insulated Water Bottle',
    description: 'Keeps drinks cold for 24 hours or hot for 12 hours. Leak-proof BPA free design.',
    price: 34.99,
    stock: 60,
    category: 'Lifestyle',
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop&q=80',
  },
  {
    name: 'Ultra-Slim Aluminum Laptop Stand',
    description: 'Elevate your workspace with an ergonomic stand designed for optimal cooling and posture.',
    price: 49.99,
    stock: 30,
    category: 'Accessories',
    imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop&q=80',
  },
];

const seedDB = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});

    console.log('Database cleared.');

    // Create demo user
    const demoUser = new User({
      name: 'Sheryians Admin',
      email: 'admin@sheryians.com',
      password: 'Password123!',
    });

    await demoUser.save();
    console.log(`Demo User Created: email="admin@sheryians.com", password="Password123!"`);

    // Add createdBy reference to products
    const productsWithUser = sampleProducts.map((p) => ({
      ...p,
      createdBy: demoUser._id,
    }));

    await Product.insertMany(productsWithUser);
    console.log(`Seeded ${sampleProducts.length} sample products into database.`);

    process.exit(0);
  } catch (error) {
    console.error('Seeding Error:', error);
    process.exit(1);
  }
};

seedDB();
