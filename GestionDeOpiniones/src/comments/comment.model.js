import {
    Schema,
    model
} from "mongoose"

const commentSchema = Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    postCom: {
        type: Schema.ObjectId,
        ref: 'Post',
        required: true
    },
    userCom: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    }
 
}, {
    versionKey: false
})

export default model('comment', commentSchema)