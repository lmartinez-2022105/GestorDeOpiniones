import Category from './category.model.js'

export const create = async(req, res)=>{
    try {
        let data = req.body
        let category = new Category(data)
        category.save()
        return res.send({message: 'Category creating successfully'})
    } catch (error) {
        console.error(error)
        return res.status(444).send({message: 'Error creating a category'})
    }
}

export const displayCategory = async(req, res)=>{
    try {
        let category = await Category.find()
        if(!category) res.status(404).send({message: 'Without categorys'})
        return res.send(category)
    } catch(error) {
        console.error(error)
        return res.status(444).send({message: 'Error desplaying all categorys'})
    }
}

export const update = async(req,res)=>{
    try {
        let {id} = req.params
        let data = req.body
        let updateCategory = await Category.findOneAndUpdate({_id: id}, data, {new: true})
        if(!updateCategory) return res.status(401).send({message: 'Category not foun and not updating'})
        return res.send(updateCategory)
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error updating category'})
    }
}

export const deleteCategory = async(req, res)=>{
    try {
        let {id} = req.params
        let deletedCategory = await Category.findOneAndDelete({_id: id})
        if(!deletedCategory) return res.status(401).send({message: 'Category not found and not deleted'})
        return res.send({message: 'Category deleted successfully'})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error deleting category'})
    }
}