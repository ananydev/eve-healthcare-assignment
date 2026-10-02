import mongoose from 'mongoose';
const schema=new mongoose.Schema({booking:{type:mongoose.Schema.Types.ObjectId,ref:'Booking',required:true,unique:true},providerPaymentId:{type:String,unique:true,sparse:true},eventId:{type:String,unique:true,sparse:true},amount:{type:Number,required:true,min:0},status:{type:String,enum:['SUCCESS','FAILED'],required:true}},{timestamps:true});
export default mongoose.model('Payment',schema);
