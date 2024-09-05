import * as dotenv from 'dotenv'
import express, { Express } from 'express'
import routes from './routes'

dotenv.config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})

class AppController{

    express: Express

    constructor(){
        this.express = express()
        this.middlewares()
        this.routes()
    }

    middlewares(): void {
        this.express.use(express.json())

    }

    routes(): void{
        this.express.use(routes)
    }

}

export default new AppController().express