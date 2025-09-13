import express from 'express';
import User from '../models/User.js';
import auth from '../middleware/auth.js';
import permit from '../middleware/permit.js';

const router = express.Router();

// Admin: list users
router.get('/', auth, permit('admin'), async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

// Admin: update role (promote/demote)
router.patch('/:id/role', auth, permit('admin'), async (req, res) => {
  const { role } = req.body;
  if (!['user','astrologer','admin'].includes(role)) return res.status(400).json({ message: 'Invalid role' });
  const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select('-password');
  res.json(user);
});

export default router;
