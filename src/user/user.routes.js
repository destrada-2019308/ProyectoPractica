import { Router } from "express";
import { getUser, login, saveUser, test } from "./user.controller.js";

const api = Router()

api.get('/test', test)
api.post('/saveUser', saveUser)
api.post('/login', login)
api.get('/getUser', getUser)

export default api