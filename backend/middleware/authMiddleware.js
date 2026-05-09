import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
const getTokenFromHeader = (req) => {
  const header = req.headers.authorization || req.headers.Authorization;
  if (!header || typeof header !== 'string') return null;
  if (!header.startsWith('Bearer ')) return null;
  return header.slice(7);
};

export const requireAuth = (req, res, next) => {
  const token = getTokenFromHeader(req);
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const secret = env.JWT_SECRET;
  if (!secret) {
    return res.status(500).json({ error: 'JWT secret is not configured' });
  }

  try {
    const payload = jwt.verify(token, secret);
    req.auth = {
      userId: payload.userId,
      email: payload.email,
      name: payload.name,
    };
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};