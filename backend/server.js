import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/lib/db.js';
import userRoutes from './src/routes/users.js';
import authRoutes from './src/routes/auth.js';
import auth from './src/middleware/auth.js';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);          // for login/register
app.use('/api/users', auth, userRoutes);  // protected user routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
