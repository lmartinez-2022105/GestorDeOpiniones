import { Schema, model } from "mongoose";

 const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true,
        minLegth: [8, 'Password must be have 8 characters']
    },
    name:{
        type:String,
        required: true
    }

 },
 { versionKey: false}
 )

export default model('user', userSchema)