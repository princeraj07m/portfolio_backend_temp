import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import UserProfile from '../models/UserProfile.js';

const router = Router();

router.post('/register', async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ message: 'User already exists' });
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, passwordHash, name });
  // Ensure a matching UserProfile exists and is linked by email
  let profile = await UserProfile.findOne({ email });
  if (!profile) {
    const base = (email.split('@')[0] || 'user').toLowerCase();
    let username = base;
    let counter = 0;
    while (await UserProfile.findOne({ username })) {
      counter += 1;
      username = `${base}${counter}`;
      if (counter > 50) break;
    }
    profile = await UserProfile.create({
      username,
      email,
      passwordHash: user.passwordHash
    });
  }
  return res.status(201).json({ id: user.id, email: user.email });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  // Fallback: allow env-based admin login when DB is unavailable or user not found
  const envEmail = process.env.ADMIN_EMAIL;
  const envPassword = process.env.ADMIN_PASSWORD;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const ok = await bcrypt.compare(password, user.passwordHash);
      if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
      // Ensure profile exists
      let profile = await UserProfile.findOne({ email: user.email });
      if (!profile) {
        const base = (user.email.split('@')[0] || 'user').toLowerCase();
        let username = base;
        let counter = 0;
        while (await UserProfile.findOne({ username })) {
          counter += 1;
          username = `${base}${counter}`;
          if (counter > 50) break;
        }
        profile = await UserProfile.create({
          username,
          email: user.email,
          passwordHash: user.passwordHash
        });
      }
      const token = jwt.sign({ sub: user.id, email: user.email, role: user.role, profileId: profile.id }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '7d' });
      return res.json({ token });
    }
  } catch (e) {
    // proceed to env fallback
  }
  if (envEmail && envPassword && email === envEmail && password === envPassword) {
    const token = jwt.sign({ sub: 'env-admin', email: envEmail, role: 'admin', profileId: 'env-admin' }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '7d' });
    return res.json({ token });
  }
  return res.status(401).json({ message: 'Invalid credentials' });
});

export default router;

