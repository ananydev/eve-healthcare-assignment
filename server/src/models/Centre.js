import mongoose from 'mongoose';
const schema=new mongoose.Schema({name:{type:String,required:true,trim:true},location:{type:String,required:true,trim:true},active:{type:Boolean,default:true}},{timestamps:true});
export default mongoose.model('Centre',schema);
