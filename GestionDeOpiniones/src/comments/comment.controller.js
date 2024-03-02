import Comment from './comment.model.js'
import Post from '../post/post.model.js'

export const create = async(req,res)=>{
    try {
        let {id} = req.params
        let {title, text, userCom} =  req.body
        let {_id} = req.user
        userCom = _id 
        let comment = new Comment({title, text, userCom: _id, postCom: id})
        await comment.save()
        await Post.findOneAndUpdate({_id: id}, {$push:{
            comment: comment._id
        }})
        return res.send({message: 'Comment created successfully'})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error creating comment'})
    }
}

export const update = async(req, res)=>{
    try {
        let {id} = req.params
        let {_id} = req.user
        let data = req.body
        let comment = await Comment.findOne({_id: id, userCom: _id})
        if(!comment) return res.status(401).send({message: 'You can not update comment you not created || comment do not exist'})
        let updatedComment = await Comment.findOneAndUpdate({_id: comment._id}, data, {new: true})
        if(!updatedComment) return res.status(401).send({message: 'Comment not found and not updated'})
        return res.send(updatedComment)
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error updating comment'})
    }
}

export const deleteComment = async(req, res)=>{
    try {
        let {id} = req.params
        let {_id} = req.user
        let deleteComment = await Comment.findOne({_id:id, userCom: _id})
        if(!deleteComment) return res.status(401).send({message:'You can not delete a comment you do not created'})
        let deletedComment = await Comment.findOneAndDelete({_id:id})
        if(!deletedComment) return res.status(401).send({message:'Post not found and not deleted'})
        return res.send({message:`Comment was deleted successfully`})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error deleting post'})
    }
}