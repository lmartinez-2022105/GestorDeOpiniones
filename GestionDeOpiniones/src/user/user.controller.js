import { checkPassword, encrypt } from '../utils/validator.js'
import { generateJwt } from '../utils/jwt.js'
import User from './user.model.js'

export const test = (req, res)=>{
    return res.send('all running')
}

export const register = async(req, res)=>{
    try {
        let data = req.body
        data.password = await encrypt(data.password)
        let user = new User(data)
        await user.save()
        return res.send({message: 'You have successfully resgistered'})
    } catch (error) {
        return res.status(500).send({message:'Error registering user', error})        
    }
}

export const login = async(req, res)=>{
    try {
        let {username, email, password} = req.body
        let user = await User.findOne({
            $or:[{username},{email}]
        })
        if(user&&await checkPassword(password, user.password)){
            let loggedUser = {
                uid: user._id,
                username: user.username,
                email: user.email,
                name: user.name
            }
            let token = await generateJwt(loggedUser)
            return res.send({message:`Welcome ${user.name}`,loggedUser,token})}
        return res.status(404).send({message: 'Invalid credentials'})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Failed to login'})
    }
}

export const update = async (req, res) => {
    try {
        let { id } = req.user
        let data = req.body
        let {oldPassword, newPassword} = req.body
        //Si existe data.password entonce
        if(data.newPassword){
            //Buscamos el usuario
            let user = await User.findOne({_id: id})
            //Comparamos las contraseñas
            let passwordCompare = await checkPassword(oldPassword, user.password)
            if(!passwordCompare) return res.status(500).send({message: 'Passwords do not match'})
            data.password = await encrypt(newPassword)
            let updateUser = await User.findOneAndUpdate( 
                {_id:id},
                data, 
                {new:true}
            )
            if (!updateUser) return res.status(401).send({ message: 'User not found and not updated' })
            return res.send({ message: 'Updated user', updateUser })
        }
        let updateUser = await User.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        )
        if (!updateUser) return res.status(401).send({ message: 'User not found and not updated' })
        return res.send({ message: 'Updated user', updateUser })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error updating user', error })
    }
}