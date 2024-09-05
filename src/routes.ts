import { Router } from "express"
import authMiddleware from './app/middlewares/auth'
import SessionController from './app/controllers/SessionController'

const routes = Router()

routes.post('/sessions', SessionController.store)

routes.use(authMiddleware)

routes.get('/dashboard', (req, res)=> {
    return res.status(200).send()
})

export default routes