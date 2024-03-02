import { Router } from "express";
import { allPost, create, deletePost, test, update } from "./post.controller.js";
import { validateJwt } from "../middlewares/validate-jwt.js";

const api = Router()

api.get('/test', test)
api.post('/create',[validateJwt], create)
api.put('/update/:id',[validateJwt], update)
api.delete('/delete/:id',[validateJwt], deletePost)
api.get('/display',[validateJwt], allPost)


export default api