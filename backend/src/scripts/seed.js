// import dotenv from 'dotenv';
// import connectDB from '../lib/db.js';
// import User from '../models/User.js';

// dotenv.config();

// async function run() {
//   try {
//     await connectDB(process.env.MONGO_URI);
//     await User.deleteMany({});

//     const admin = new User({
//       name: 'Super Admin',
//       email: 'admin@example.com',
//       password: 'AdminPass123!',
//       role: 'admin',
//       verified: true
//     });
//     await admin.save();

//     const astro = new User({
//       name: 'Sri Astrologer',
//       email: 'astro@example.com',
//       password: 'AstroPass123!',
//       role: 'astrologer',
//       specialties: ['Vedic Astrology', 'Muhurat'],
//       experienceYears: 8,
//       feesPerSession: 500,
//       verified: true,
//       location: { type: 'Point', coordinates: [77.2, 28.6] } // lon, lat (Delhi)
//     });
//     await astro.save();

//     console.log('✅ Seeded admin and astrologer accounts:');
//     console.log('  admin@example.com / AdminPass123!');
//     console.log('  astro@example.com / AstroPass123!');

//     process.exit(0);
//   } catch (err) {
//     console.error('❌ Error seeding database:', err);
//     process.exit(1);
//   }
// }

// run();
