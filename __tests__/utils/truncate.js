import { sequelize } from '../../src/app/models'

export default () => {

    return Promise.all(
        Object.keys(sequelize.models).map(key =>{
            return sequelize.models[key].destroy({ truncate: true, force: true })
        })
    )

}