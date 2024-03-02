import { Schema, model } from "mongoose"

const postShema = Schema({
    title:{
        type: String,
        required: true
    },
    category:{
        type:Schema.ObjectId,
        ref: 'Category',
        required: true
    },
    text:{
        type:String,
        required: true
    },
    userPost:{
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    comment:[{
        type: Schema.ObjectId,
        ref: 'comment',
        required: false
    }]

 },
 {  versionKey: false}
 )

export default model('post', postShema)