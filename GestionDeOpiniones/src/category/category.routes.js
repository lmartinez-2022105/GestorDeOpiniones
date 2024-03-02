import { Router } from "express"
import { create, deleteCategory, displayCategory, update } from "./category.controller.js"
import { validateJwt } from "../middlewares/validate-jwt.js"

const api = Router()

api.post('/create',[validateJwt], create)
api.get('/display',[validateJwt], displayCategory)
api.put('/update/:id', [validateJwt], update)
api.delete('/delete/:id',[validateJwt], deleteCategory)

export default api