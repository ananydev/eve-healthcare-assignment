import mongoose from 'mongoose';
const schema=new mongoose.Schema({user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},test:{type:mongoose.Schema.Types.ObjectId,ref:'DiagnosticTest',required:true},centre:{type:mongoose.Schema.Types.ObjectId,ref:'Centre',required:true},appointmentAt:{type:Date,required:true},amount:{type:Number,required:true,min:0},status:{type:String,enum:['PENDING','CONFIRMED','FAILED','CANCELLED'],default:'PENDING'},paymentId:{type:mongoose.Schema.Types.ObjectId,ref:'Payment',default:null}},{timestamps:true});
schema.index({user:1,appointmentAt:1});
export default mongoose.model('Booking',schema);
