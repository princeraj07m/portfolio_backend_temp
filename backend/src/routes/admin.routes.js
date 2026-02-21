import { Router } from 'express';
import { requireAuthOrDefault } from '../middleware/auth.js';
import Project from '../models/Project.js';
import Skill from '../models/Skill.js';
import Blog from '../models/Blog.js';
import Testimonial from '../models/Testimonial.js';
import Contact from '../models/Contact.js';
import Setting from '../models/Setting.js';
import UserProfile from '../models/UserProfile.js';
import PersonalBrand from '../models/PersonalBrand.js';
import SocialLink from '../models/SocialLink.js';
import ContactInfo from '../models/ContactInfo.js';
import PersonalSetting from '../models/PersonalSetting.js';
import Experience from '../models/Experience.js';
import Education from '../models/Education.js';
import SkillExpanded from '../models/SkillExpanded.js';
import Certification from '../models/Certification.js';
import Achievement from '../models/Achievement.js';
import Award from '../models/Award.js';
import VolunteerExperience from '../models/VolunteerExperience.js';
import ProjectCategory from '../models/ProjectCategory.js';
import ProjectVersion from '../models/ProjectVersion.js';
import ProjectFeedback from '../models/ProjectFeedback.js';
import ProjectFile from '../models/ProjectFile.js';
import Collaboration from '../models/Collaboration.js';
import Client from '../models/Client.js';
import Proposal from '../models/Proposal.js';
import BlogPost from '../models/BlogPost.js';
import BlogCategory from '../models/BlogCategory.js';
import BlogComment from '../models/BlogComment.js';
import BlogTag from '../models/BlogTag.js';
import MediaAsset from '../models/MediaAsset.js';
import GalleryItem from '../models/GalleryItem.js';
import Section from '../models/Section.js';
import CustomSection from '../models/CustomSection.js';
import ThemeSetting from '../models/ThemeSetting.js';
import SEO from '../models/SEO.js';
import Internship from '../models/Internship.js';
import Hackathon from '../models/Hackathon.js';

const router = Router();
router.use(requireAuthOrDefault);

// Map of resource path to Mongoose Model to support schema introspection
const modelsMap = {
  'projects': Project,
  'skills': Skill,
  'blogs': Blog,
  'testimonials': Testimonial,
  'contacts': Contact,
  'settings': Setting,
  'user-profiles': UserProfile,
  'personal-brands': PersonalBrand,
  'social-links': SocialLink,
  'contact-infos': ContactInfo,
  'personal-settings': PersonalSetting,
  'experiences': Experience,
  'educations': Education,
  'skills-expanded': SkillExpanded,
  'certifications': Certification,
  'achievements': Achievement,
  'awards': Award,
  'volunteer-experiences': VolunteerExperience,
  'project-categories': ProjectCategory,
  'project-versions': ProjectVersion,
  'project-feedbacks': ProjectFeedback,
  'project-files': ProjectFile,
  'collaborations': Collaboration,
  'clients': Client,
  'proposals': Proposal,
  'blog-posts': BlogPost,
  'blog-categories': BlogCategory,
  'blog-comments': BlogComment,
  'blog-tags': BlogTag,
  'media-assets': MediaAsset,
  'gallery-items': GalleryItem,
  'sections': Section,
  'custom-sections': CustomSection,
  'theme-settings': ThemeSetting,
  'seo': SEO,
  'internships': Internship,
  'hackathons': Hackathon
};

function crud(Model) {
  const r = Router();
  r.post('/', async (req, res) => {
    if (req.user?.role === 'public') return res.status(401).json({ message: 'Auth required' });
    // If model has userId, force ownership from JWT
    const hasUserId = !!Model.schema.path('userId');
    const body = { ...req.body };
    if (hasUserId && req.user?.profileId) body.userId = req.user.profileId;
    const created = await Model.create(body);
    res.status(201).json(created);
  });
  r.get('/', async (req, res) => {
    const hasUserId = !!Model.schema.path('userId');
    const filter = hasUserId && req.user?.profileId ? { userId: req.user.profileId } : {};
    const list = await Model.find(filter).sort({ createdAt: -1 });
    res.json(list);
  });
  r.get('/:id', async (req, res) => {
    const doc = await Model.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Not found' });
    // Ownership check
    const hasUserId = !!Model.schema.path('userId');
    if (hasUserId && doc.userId && req.user?.profileId && String(doc.userId) !== String(req.user.profileId)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    res.json(doc);
  });
  r.put('/:id', async (req, res) => {
    if (req.user?.role === 'public') return res.status(401).json({ message: 'Auth required' });
    // Ownership check
    const hasUserId = !!Model.schema.path('userId');
    if (hasUserId) {
      const current = await Model.findById(req.params.id);
      if (!current) return res.status(404).json({ message: 'Not found' });
      if (current.userId && req.user?.profileId && String(current.userId) !== String(req.user.profileId)) {
        return res.status(403).json({ message: 'Forbidden' });
      }
    }
    const body = { ...req.body };
    if (hasUserId && req.user?.profileId) body.userId = req.user.profileId;
    const doc = await Model.findByIdAndUpdate(req.params.id, body, { new: true });
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json(doc);
  });
  r.delete('/:id', async (req, res) => {
    if (req.user?.role === 'public') return res.status(401).json({ message: 'Auth required' });
    // Ownership check
    const hasUserId = !!Model.schema.path('userId');
    if (hasUserId) {
      const current = await Model.findById(req.params.id);
      if (!current) return res.status(404).json({ message: 'Not found' });
      if (current.userId && req.user?.profileId && String(current.userId) !== String(req.user.profileId)) {
        return res.status(403).json({ message: 'Forbidden' });
      }
    }
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json({ success: true });
  });
  return r;
}

// Return a simplified description of a model schema to help admin UI render all fields
router.get('/schemas/:resource', (req, res) => {
  const resource = req.params.resource;
  const Model = modelsMap[resource];
  if (!Model) return res.status(404).json({ message: 'Unknown resource' });

  const paths = Model.schema.paths || {};
  const fields = Object.keys(paths)
    .filter((key) => !['_id', '__v', 'createdAt', 'updatedAt'].includes(key))
    .map((key) => {
      const p = paths[key];
      // Determine base type
      let type = 'text';
      const instance = p.instance || (p.caster && p.caster.instance);
      if (instance === 'Number') type = 'number';
      else if (instance === 'Boolean') type = 'checkbox';
      else if (instance === 'Date') type = 'date';
      else if (instance === 'Array') {
        // Try to infer array element type
        const caster = p.caster && (p.caster.instance || (p.caster.caster && p.caster.caster.instance));
        type = caster === 'String' ? 'array:string' : 'json';
      } else if (instance === 'Mixed' || instance === 'Object') {
        type = 'json';
      } else {
        type = 'text';
      }

      return {
        key,
        label: key.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase()),
        required: !!(p.isRequired && p.validators?.some?.((v) => v.type === 'required')),
        type
      };
    });

  res.json({ resource, fields });
});

// Specialized handlers for UserProfile to support plain password hashing on create/update
import bcrypt from 'bcryptjs';
router.post('/user-profiles', async (req, res) => {
  const body = { ...req.body };
  if (body.password) {
    body.passwordHash = await bcrypt.hash(body.password, 10);
    delete body.password;
  }
  const created = await UserProfile.create(body);
  res.status(201).json(created);
});
router.put('/user-profiles/:id', async (req, res) => {
  const body = { ...req.body };
  if (body.password) {
    body.passwordHash = await bcrypt.hash(body.password, 10);
    delete body.password;
  }
  const updated = await UserProfile.findByIdAndUpdate(req.params.id, body, { new: true });
  if (!updated) return res.status(404).json({ message: 'Not found' });
  res.json(updated);
});

router.use('/projects', crud(Project));
router.use('/skills', crud(Skill));
router.use('/blogs', crud(Blog));
router.use('/testimonials', crud(Testimonial));
router.use('/contacts', crud(Contact));
router.use('/settings', crud(Setting));
router.use('/user-profiles', crud(UserProfile));
router.use('/personal-brands', crud(PersonalBrand));
router.use('/social-links', crud(SocialLink));
router.use('/contact-infos', crud(ContactInfo));
router.use('/personal-settings', crud(PersonalSetting));
router.use('/experiences', crud(Experience));
router.use('/educations', crud(Education));
router.use('/skills-expanded', crud(SkillExpanded));
router.use('/certifications', crud(Certification));
router.use('/achievements', crud(Achievement));
router.use('/awards', crud(Award));
router.use('/volunteer-experiences', crud(VolunteerExperience));
router.use('/project-categories', crud(ProjectCategory));
router.use('/project-versions', crud(ProjectVersion));
router.use('/project-feedbacks', crud(ProjectFeedback));
router.use('/project-files', crud(ProjectFile));
router.use('/collaborations', crud(Collaboration));
router.use('/clients', crud(Client));
router.use('/proposals', crud(Proposal));
router.use('/blog-posts', crud(BlogPost));
router.use('/blog-categories', crud(BlogCategory));
router.use('/blog-comments', crud(BlogComment));
router.use('/blog-tags', crud(BlogTag));
router.use('/media-assets', crud(MediaAsset));
router.use('/gallery-items', crud(GalleryItem));
router.use('/sections', crud(Section));
router.use('/custom-sections', crud(CustomSection));
router.use('/theme-settings', crud(ThemeSetting));
router.use('/seo', crud(SEO));
router.use('/internships', crud(Internship));
router.use('/hackathons', crud(Hackathon));

// Manage default public profile
router.get('/default-profile', async (req, res) => {
  const s = await Setting.findOne({ key: 'defaultProfileId' });
  res.json({ profileId: s?.value || null });
});
router.post('/default-profile', async (req, res) => {
  const { profileId } = req.body || {};
  if (!profileId) return res.status(400).json({ message: 'profileId required' });
  const s = await Setting.findOneAndUpdate({ key: 'defaultProfileId' }, { value: profileId }, { upsert: true, new: true });
  res.json({ profileId: s.value });
});
router.delete('/default-profile', async (req, res) => {
  await Setting.findOneAndDelete({ key: 'defaultProfileId' });
  res.json({ profileId: null });
});

export default router;

