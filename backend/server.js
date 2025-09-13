import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/lib/db.js';
import userRoutes from './src/routes/users.js';
import authRoutes from './src/routes/auth.js';
import auth from './src/middleware/auth.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/users', authRoutes);
app.use('/api/user', auth);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
