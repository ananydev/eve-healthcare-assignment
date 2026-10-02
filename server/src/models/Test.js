import mongoose from 'mongoose';
const schema=new mongoose.Schema({name:{type:String,required:true,trim:true},description:String,durationMinutes:{type:Number,default:30,min:1},centre:{type:mongoose.Schema.Types.ObjectId,ref:'Centre',required:true},price:{type:Number,required:true,min:0},active:{type:Boolean,default:true}},{timestamps:true});
schema.index({centre:1,name:1},{unique:true});
export default mongoose.model('DiagnosticTest',schema);
