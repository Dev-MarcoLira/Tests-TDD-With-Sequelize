import { Request, Response } from 'express'
import DB from '../models'
const { User } = DB

class SessionController{

    async store(req: Request, res: Response){

        const { email, password } = req.body

        const user = await User.findOne({ where: { email } })

        if(!user){
            return res.status(401).json({ error: 'User not found' })
        }

        if(!(await user.checkPassword(password))){
            return res.status(401).json({ error: 'Login or Password Incorrect' })
        }

        return res.json({
            user,
            token: user.generateToken()
        })

    }

}

export default new SessionController()