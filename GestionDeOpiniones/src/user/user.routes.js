import { Router } from "express"
import { login, register, test, update } from "./user.controller.js"
import { validateJwt } from "../middlewares/validate-jwt.js"

const api = Router()

//Public Routes
api.post('/register', register)
api.post('/login',login)

//Private Routes
api.get('/test', test)
api.put('/update',[validateJwt], update)

export default api