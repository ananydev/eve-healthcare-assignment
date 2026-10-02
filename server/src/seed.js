import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import Centre from './models/Centre.js';

const centres = [
  {
    name: 'Apollo Diagnostics',
    location: 'Connaught Place, New Delhi',
    tests: [
      {
        name: 'Complete Blood Count (CBC)',
        price: 500
      },
      {
        name: 'Thyroid Profile',
        price: 800
      },
      {
        name: 'Liver Function Test',
        price: 700
      },
      {
        name: 'Kidney Function Test',
        price: 650
      }
    ]
  },
  {
    name: 'Dr Lal PathLabs',
    location: 'Rohini, New Delhi',
    tests: [
      {
        name: 'Complete Blood Count (CBC)',
        price: 450
      },
      {
        name: 'Diabetes Profile',
        price: 400
      },
      {
        name: 'Vitamin D Test',
        price: 900
      },
      {
        name: 'Lipid Profile',
        price: 600
      }
    ]
  },
  {
    name: 'Max Lab',
    location: 'Shalimar Bagh, New Delhi',
    tests: [
      {
        name: 'Thyroid Profile',
        price: 750
      },
      {
        name: 'HbA1c',
        price: 450
      },
      {
        name: 'Liver Function Test',
        price: 650
      },
      {
        name: 'Vitamin B12',
        price: 850
      }
    ]
  },
  {
    name: 'Metropolis Healthcare',
    location: 'Pitampura, New Delhi',
    tests: [
      {
        name: 'Complete Blood Count (CBC)',
        price: 480
      },
      {
        name: 'Iron Profile',
        price: 700
      },
      {
        name: 'Diabetes Profile',
        price: 350
      },
      {
        name: 'Vitamin D Test',
        price: 850
      }
    ]
  }
];

async function seed() {
  try {
    await connectDB();

    await Centre.deleteMany({});

    await Centre.insertMany(centres);

    console.log('✅ Diagnostic centres seeded successfully');

    const count = await Centre.countDocuments();
    console.log(`✅ ${count} centres inserted`);

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
}

seed();