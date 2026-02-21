import dotenv from 'dotenv';
dotenv.config();
import bcrypt from 'bcryptjs';
import { connectMongo } from '../config/mongo.js';
import User from '../models/User.js';
import Skill from '../models/Skill.js';
import Project from '../models/Project.js';

await connectMongo();

const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

const existing = await User.findOne({ email: adminEmail });
if (!existing) {
  const passwordHash = await bcrypt.hash(adminPassword, 10);
  await User.create({ email: adminEmail, passwordHash, name: 'Admin' });
  console.log('Seeded admin user:', adminEmail);
} else {
  console.log('Admin user already exists');
}

if ((await Skill.countDocuments()) === 0) {
  await Skill.insertMany([
    { name: 'JavaScript', level: 90, category: 'Language' },
    { name: 'Node.js', level: 85, category: 'Backend' }
  ]);
  console.log('Seeded skills');
}

if ((await Project.countDocuments()) === 0) {
  await Project.insertMany([
    { title: 'Sample Project', slug: 'sample-project', description: 'Demo project', tech: ['Node', 'Express'], featured: true }
  ]);
  console.log('Seeded projects');
}

process.exit(0);

