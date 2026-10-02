import {Router} from 'express'; import bcrypt from 'bcryptjs'; import jwt from 'jsonwebtoken'; import User from '../models/User.js'; import {signupSchema,loginSchema} from '../utils/validate.js';
const r=Router();
function token(u){return jwt.sign({id:u._id,role:u.role},process.env.JWT_SECRET,{expiresIn:'7d'})}
r.post('/signup',async(req,res,next)=>{try{const d=signupSchema.parse(req.body);const exists=await User.findOne({email:d.email});if(exists)return res.status(409).json({message:'Email already registered'});const password=await bcrypt.hash(d.password,12);const u=await User.create({...d,password});res.status(201).json({token:token(u),user:{id:u._id,name:u.name,email:u.email,role:u.role}})}catch(e){next(e)}});
r.post('/login',async(req,res,next)=>{try{const d=loginSchema.parse(req.body);const u=await User.findOne({email:d.email});if(!u||!(await bcrypt.compare(d.password,u.password)))return res.status(401).json({message:'Invalid email or password'});res.json({token:token(u),user:{id:u._id,name:u.name,email:u.email,role:u.role}})}catch(e){next(e)}});
export default r;
