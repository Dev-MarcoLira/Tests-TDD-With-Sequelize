import { NextFunction, Request, Response } from 'express'
import jwt, { SigningKeyCallback } from 'jsonwebtoken'

interface JwtPayload extends SigningKeyCallback {
    id: String,
}

export default async (req: any, res: Response, next: NextFunction) => {

    const authHeader = req.headers.authorization
    const appSecret = process.env.APP_SECRET ?? ''

    if(!authHeader){
        return res.status(401).json({ error: 'Token not provided' })
    }

    const [, token] = authHeader.split(' ')

    try{
        const decoded = await new Promise<JwtPayload>((resolve, reject) =>
            jwt.verify(token, process.env.APP_SECRET as string, (err, decoded) => {
              if (err) {
                reject(err);
              } else {
                resolve(decoded as JwtPayload);
              }
            })
          );
      
          req.userId = decoded.id;

          return next()

    }catch(error){
        return res.status(401).json({ error: 'Invalid token.' })
    }

}