const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = require('./config/db');
const Property = require('./models/Property');
const Mess = require('./models/Mess');

// Realistic reference photos
const samplePgPhotos = [
  [
    'https://img.staticmb.com/mbphoto/pg/grd2/cropped_images/2024/Feb/22/Photo_h400_w540/GR2-425095-2051509_400_540.jpg',
    'https://cozystays.co.in/wp-content/uploads/2025/07/feature-pic-7-768x1024.jpg',
    'https://cofynd-staging.s3.ap-south-1.amazonaws.com/images/latest_images_2024/902a49813e53142314220fdd72bdfb2b769c086e.webp'
  ],
  [
    'https://cozystays.co.in/wp-content/uploads/2025/07/feature-pic-7-768x1024.jpg',
    'https://img.staticmb.com/mbphoto/pg/grd2/cropped_images/2024/Feb/22/Photo_h400_w540/GR2-425095-2051509_400_540.jpg',
    'https://cofynd-staging.s3.ap-south-1.amazonaws.com/images/latest_images_2024/902a49813e53142314220fdd72bdfb2b769c086e.webp'
  ],
  [
    'https://cofynd-staging.s3.ap-south-1.amazonaws.com/images/latest_images_2024/902a49813e53142314220fdd72bdfb2b769c086e.webp',
    'https://img.staticmb.com/mbphoto/pg/grd2/cropped_images/2024/Feb/22/Photo_h400_w540/GR2-425095-2051509_400_540.jpg',
    'https://cozystays.co.in/wp-content/uploads/2025/07/feature-pic-7-768x1024.jpg'
  ]
];

// Cleaned PCCOER / Ravet PG listings (Exclusively Boys and Girls; no "co-living" or "mixed" categories)
const pgSeedData = [
  {
    name: 'IntelliHOST — Premium Boys PG / Hostel',
    type: 'boys',
    tag: 'OPPOSITE CAMPUS',
    rating: 5.0,
    reviewsCount: '3 reviews',
    area: 'Swastik Villa Society · opposite PCCOER',
    note: 'Premium boys PG/hostel listing directly described as opposite Pimpri Chinchwad College of Engineering & Research.',
    price: 'Contact property',
    search: 'IntelliHOST Premium Boys PG Hostel Ravet',
    photos: samplePgPhotos[0]
  },
  {
    name: 'IntelliHOST — Boys Hostel / PG',
    type: 'boys',
    tag: 'RAVET CENTRAL',
    rating: 4.9,
    reviewsCount: '80 reviews',
    area: 'Ravet Central Street · S.B. Patil School Road',
    note: 'Boys hostel / PG listing near the Ravet campus area.',
    price: 'Contact property',
    search: 'IntelliHOST Boys Hostel PG Ravet',
    photos: samplePgPhotos[1]
  },
  {
    name: 'Soham Hostel, Ravet',
    type: 'boys',
    tag: 'NEAR PCCOER',
    rating: 3.3,
    reviewsCount: '3 reviews',
    area: 'S.B. Patil College Road · near PCCOER',
    note: 'Boys hostel listing on College Road near Pimpri Chinchwad College of Engineering & Research.',
    price: 'Contact property',
    search: 'Soham Hostel Ravet',
    photos: samplePgPhotos[2]
  },
  {
    name: "Gaud’s5 Girl’s PG",
    type: 'girls',
    tag: 'GIRLS',
    rating: 5.0,
    reviewsCount: '19 reviews',
    area: 'D-Mart Road · Shinde Vasti, Ravet',
    note: 'Student housing centre for girls in Ravet.',
    price: 'Contact property',
    search: "Gaud's5 girl's PG Ravet",
    photos: samplePgPhotos[0]
  },
  {
    name: 'Pari’s Girls Hostel',
    type: 'girls',
    tag: 'DHARAMRAJ CHOWK',
    rating: 4.7,
    reviewsCount: '23 reviews',
    area: 'Navashakti Society · Dharamraj Chowk, Ravet',
    note: 'Student dormitory / girls hostel listing around Dharamraj Chowk.',
    price: 'Contact property',
    search: "Pari's Girls Hostel Dharamraj Chowk Ravet",
    photos: samplePgPhotos[1]
  },
  {
    name: 'Gurbaani Living PG / Hostel',
    type: 'boys',
    tag: 'AKURDI SIDE',
    rating: 4.5,
    reviewsCount: '130 reviews',
    area: 'Gurudwara Colony, Akurdi',
    note: 'Boys hostel/PG listing on the Akurdi side of the PCCOER catchment.',
    price: 'Contact property',
    search: 'Gurbaani Living PG Hostel Akurdi',
    photos: samplePgPhotos[2]
  }
];

// Mess & Meal service listings around Ravet & PCCOER
const messSeedData = [
  {
    name: 'Shree Mahalaxmi Mess',
    tag: 'DHARAMRAJ CHOWK',
    rating: 4.8,
    reviewsCount: '23 reviews',
    area: 'Navashakti Society, Ravet',
    note: 'Mess/restaurant listing near Dharamraj Chowk.',
    search: 'Shree Mahalaxmi Mess Ravet'
  },
  {
    name: 'Shree Ganesh Dining Hall & Mess',
    tag: 'SECTOR 29',
    rating: 4.8,
    reviewsCount: '77 reviews',
    area: 'Agrawal Heights, Sector 29, Ravet',
    note: 'Dining hall and mess listing in Ravet.',
    search: 'Shree Ganesh Dining Hall and Mess Ravet'
  },
  {
    name: 'Amji’s Sustainable Meals',
    tag: 'MEALS / TIFFIN',
    rating: 4.8,
    reviewsCount: '37 reviews',
    area: 'Ravet',
    note: 'Meal/box-lunch service listing in Ravet.',
    search: "Amji's Sustainable Meals Ravet"
  },
  {
    name: 'Patil Mess',
    tag: 'PRADHIKARAN',
    rating: 4.4,
    reviewsCount: '129 reviews',
    area: 'Sector 27, Pradhikaran, Nigdi',
    note: 'Mess listing on the wider PCCOER/Ravet catchment.',
    search: 'Patil Mess Nigdi'
  },
  {
    name: 'Vaishnavi Mess',
    tag: 'GURUDWARA COLONY',
    rating: 4.1,
    reviewsCount: '93 reviews',
    area: 'Gawade Wada, Gurudwara Colony',
    note: 'Mess listing on the Akurdi/Nigdi side.',
    search: 'Vaishnavi Mess Gurudwara Colony Nigdi'
  }
];

async function seedDatabase() {
  console.log('🔄 Initializing database seeding for Roomify...');
  const conn = await connectDB();

  if (!conn) {
    console.error('\n❌ Could not connect to MongoDB. Please check backend/.env MONGO_URI.');
    console.error('   Replace <db_username> with your actual database user, then re-run: node seed.js\n');
    process.exit(1);
  }

  try {
    // 1. Clear existing Property & Mess collections
    console.log('[Seed] Clearing existing Property and Mess collections...');
    await Property.deleteMany({});
    await Mess.deleteMany({});

    // 2. Insert PG properties
    console.log(`[Seed] Inserting ${pgSeedData.length} curated PG properties (Boys & Girls)...`);
    const insertedProperties = await Property.insertMany(pgSeedData);
    console.log(`[Seed] Successfully inserted ${insertedProperties.length} Properties.`);

    // 3. Insert Mess services
    console.log(`[Seed] Inserting ${messSeedData.length} Mess dining services...`);
    const insertedMess = await Mess.insertMany(messSeedData);
    console.log(`[Seed] Successfully inserted ${insertedMess.length} Mess services.`);

    console.log('\n====================================================');
    console.log('✅ DATABASE SEEDING COMPLETED SUCCESSFULLY!');
    console.log('====================================================\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database Seeding Error:', error);
    process.exit(1);
  }
}

seedDatabase();
