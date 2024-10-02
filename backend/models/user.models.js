import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
     name:{
          type:String,
          required:true
     },
     email:{
          type:String,
          unique:true
     },
     phoneNumber:{
          type:Number,
          required:true
     },
     password:{
          type:String,
          required:true
     },
    /* Extra part
    role:{
          type:String,
          enum:['student','recruiter'],
          required:true
     }

     */
    profile:{
     bio:{type:String},
    /* Extra Part
    skills:[{type:String}],
     resume:{type:String}
     */
    }

},{timestamps:true});

export const User=mongoose.model('User',userSchema)