import Post from './post.model.js'
import Comment from '../comments/comment.model.js'

export const test = (req, res) => {
    return res.send('all post are showing')
}

export const create = async (req, res) => {
    try {
        let data = req.body
        let { id } = req.user
        data.userPost = id
        let post = new Post(data)
        await post.save()
        return res.send({ message: 'Post created successfully' })
    } catch (error) {
        return res.status(500).send({ message: 'Error creating post' })
    }
}

export const update = async (req, res) => {
   try {
    //Obtengo el id del post que actualizare
    let { id } = req.params
    //Obtengo el id del usuario logeado
    let { _id } = req.user
    //Obtengo los datos que actualizare
    let data = req.body
    //Busco el post que actualizare
    let posting = await Post.findOne({ _id: id, userPost: _id })
    //Actualizo
    if(!posting) return res.status(401).send({message:'You can not update a post you do not created'})
    let updatedPost = await Post.findOneAndUpdate(
        { _id: posting._id },
        data, 
        { new: true }
    ).populate('category',['name'])
    if(!updatedPost) return res.status(401).send({message: 'Post not found and not updated' })
    return res.send(updatedPost)
    } catch (error) {
    console.error(error)
    return res.status(500).send({message: 'Error updating post'})
   }
}

export const deletePost = async(req, res)=>{
    try {
        let {id} = req.params
        let {_id} = req.user
        let deletePosting = await Post.findOne({_id:id, userPost: _id})
        if(!deletePosting) return res.status(401).send({message:'You can not delete a post you do not created'})
        let deletedPosting = await Post.findOneAndDelete({_id:id})
        if(!deletedPosting) return res.status(401).send({message:'Post not found and not deleted'})
        await Comment.deleteMany({postCom: id})
        return res.send({message:`Post with title ${deletedPosting.title} was deleted successfully`})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error deleting post'})
    }
}

export const allPost = async(req, res)=>{
    try {
        let post = await Post.find()
        .populate({
            path: 'category',
            select: ['name', 'description'],
        }).populate({
            path: 'comment',
            select: ['title', 'text']
        })
        .exec();
        return res.send(post)
    } catch (error) {
        console.error(error)
        return res.status(404).send({message: 'Error displaying all post'})
    }
}
