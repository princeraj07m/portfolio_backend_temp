import jwt from 'jsonwebtoken';
import Setting from '../models/Setting.js';

export function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Missing token' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret');
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

// Allows read-only access using defaultProfileId when no token is provided.
export async function requireAuthOrDefault(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (token) {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret');
      req.user = payload;
      return next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  }
  // No token - allow GET requests using default profile, otherwise require auth
  if (req.method.toUpperCase() === 'GET') {
    const setting = await Setting.findOne({ key: 'defaultProfileId' });
    const profileId = setting?.value;
    if (profileId) {
      req.user = { role: 'public', profileId };
      return next();
    }
  }
  return res.status(401).json({ message: 'Missing token' });
}

