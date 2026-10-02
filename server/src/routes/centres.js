import {Router} from 'express'; import Centre from '../models/Centre.js'; import Test from '../models/Test.js'; import {auth,adminOnly} from '../middleware/auth.js'; import {centreSchema,testSchema} from '../utils/validate.js';
const r=Router();
r.get('/',async(req,res,next)=>{try{const centres=await Centre.find({active:true}).sort({name:1});const out=await Promise.all(centres.map(async c=>({id:c._id,name:c.name,location:c.location,tests:await Test.find({centre:c._id,active:true}).select('name description durationMinutes price')})));res.json(out)}catch(e){next(e)}});
r.post('/',auth,adminOnly,async(req,res,next)=>{try{const d=centreSchema.parse(req.body);res.status(201).json(await Centre.create(d))}catch(e){next(e)}});
r.post('/:id/tests',auth,adminOnly,async(req,res,next)=>{try{const c=await Centre.findById(req.params.id);if(!c)return res.status(404).json({message:'Centre not found'});const d=testSchema.parse({...req.body,centre:req.params.id});res.status(201).json(await Test.create(d))}catch(e){next(e)}});
r.get('/:id',async(req,res,next)=>{try{const c=await Centre.findById(req.params.id);if(!c)return res.status(404).json({message:'Centre not found'});const tests=await Test.find({centre:c._id,active:true});res.json({...c.toObject(),tests})}catch(e){next(e)}});
export default r;
