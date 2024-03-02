import { Router } from "express"
import { validateJwt } from "../middlewares/validate-jwt.js"
import { create, deleteComment, update } from "./comment.controller.js"

const api = Router()

api.post('/create/:id',[validateJwt],create)
api.put('/update/:id',[validateJwt], update)
api.delete('/delete/:id',[validateJwt], deleteComment)

export default api