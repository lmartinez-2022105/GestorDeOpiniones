import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { config } from 'dotenv'
import userRoutes from '../src/user/user.routes.js'
import postRoutes from '../src/post/post.routes.js'
import categoryRoutes from '../src/category/category.routes.js'
import commentRoutes from '../src/comments/comment.routes.js'

//Configuraciones 
const app = express()
config()
const port = process.env.PORT || 8000

//Configuraciones del server
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))

//Rutas
app.use('/user',userRoutes)
app.use('/post', postRoutes)
app.use('/category', categoryRoutes)
app.use('/comment', commentRoutes)


//Levantar Server
export const InitServer = ()=>{
    app.listen(port)
    console.log(`Server HTTPS is running in port ${port}`)
}