import jwt from 'jsonwebtoken';
import User from '../models/User.js';
export async function auth(req,res,next){try{const h=req.headers.authorization||'';if(!h.startsWith('Bearer ')) return res.status(401).json({message:'Authentication required'});const token=h.slice(7);const payload=jwt.verify(token,process.env.JWT_SECRET);const user=await User.findById(payload.id).select('-password');if(!user)return res.status(401).json({message:'Invalid token'});req.user=user;next()}catch(e){return res.status(401).json({message:'Invalid or expired token'})}}
export function adminOnly(req,res,next){if(req.user?.role!=='ADMIN')return res.status(403).json({message:'Admin access required'});next()}
