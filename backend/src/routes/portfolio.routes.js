import { Router } from 'express';
import Project from '../models/Project.js';
import Skill from '../models/Skill.js';
import Blog from '../models/Blog.js';
import Testimonial from '../models/Testimonial.js';
import Setting from '../models/Setting.js';
import UserProfile from '../models/UserProfile.js';
import Award from '../models/Award.js';
import Achievement from '../models/Achievement.js';
import BlogPost from '../models/BlogPost.js';

const router = Router();

async function findPublic(Model, baseQuery = {}, sort = {}) {
  const profileId = await getDefaultProfileId();
  const hasUserId = !!Model.schema?.path('userId');
  const query = { ...baseQuery };
  if (profileId && hasUserId) query.userId = profileId;
  return Model.find(query).sort(sort);
}

router.get('/projects', async (req, res) => {
  const items = await findPublic(Project, {}, { order: 1, createdAt: -1 });
  res.json(items);
});

router.get('/skills', async (req, res) => {
  const items = await findPublic(Skill, {}, { order: 1 });
  res.json(items);
});

router.get('/blogs', async (req, res) => {
  // Blog schema may not support userId; serve published only, optionally could migrate to BlogPost if needed.
  const items = await findPublic(Blog, { published: true }, { createdAt: -1 });
  res.json(items);
});

router.get('/testimonials', async (req, res) => {
  const items = await findPublic(Testimonial, {}, { createdAt: -1 });
  res.json(items);
});

router.get('/settings/:key', async (req, res) => {
  const item = await Setting.findOne({ key: req.params.key });
  if (!item) return res.status(404).json({ message: 'Not found' });
  res.json(item);
});

// Public: resolve default profile id from settings
async function getDefaultProfileId() {
  const s = await Setting.findOne({ key: 'defaultProfileId' });
  return s?.value || null;
}

// Public: default profile summary
router.get('/default/profile', async (req, res) => {
  const profileId = await getDefaultProfileId();
  if (!profileId) return res.status(404).json({ message: 'No default profile configured' });
  const profile = await UserProfile.findById(profileId);
  if (!profile) return res.status(404).json({ message: 'Profile not found' });
  res.json(profile);
});

// Public: default profile scoped resources
router.get('/default/projects', async (req, res) => {
  const profileId = await getDefaultProfileId();
  if (!profileId) return res.json([]);
  const items = await Project.find({ userId: profileId }).sort({ order: 1, createdAt: -1 });
  res.json(items);
});

router.get('/default/awards', async (req, res) => {
  const profileId = await getDefaultProfileId();
  if (!profileId) return res.json([]);
  const items = await Award.find({ userId: profileId }).sort({ dateReceived: -1, createdAt: -1 });
  res.json(items);
});

router.get('/default/achievements', async (req, res) => {
  const profileId = await getDefaultProfileId();
  if (!profileId) return res.json([]);
  const items = await Achievement.find({ userId: profileId }).sort({ awardDate: -1, createdAt: -1 });
  res.json(items);
});

router.get('/default/blog-posts', async (req, res) => {
  const profileId = await getDefaultProfileId();
  if (!profileId) return res.json([]);
  const items = await BlogPost.find({ userId: profileId, status: { $in: ['published', 'live'] } }).sort({ publishedAt: -1, createdAt: -1 });
  res.json(items);
});

export default router;

