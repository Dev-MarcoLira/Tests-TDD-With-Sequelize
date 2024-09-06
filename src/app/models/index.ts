'use strict'

import fs from 'fs'
import path from 'path'
import { Sequelize } from 'sequelize'
import config from '../../config/database'

const db: any = {}
const basename = path.basename(__filename)

const sequelize = new Sequelize(
    config.database as string,
    config.username as string,
    config.password as string,
    config as {}
)

fs.readdirSync(__dirname)
    .filter(file => {
        return (
            file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.ts'
        )
    })
    .forEach(file => {
        const model = sequelize['import'](path.join(__dirname, file))

        db[model.name] = model
    })

Object.keys(db).forEach(modelName => {

    if(db[modelName].associate){
        db[modelName].associate(db)
    }

})

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db