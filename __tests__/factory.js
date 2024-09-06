import DB from '../models'
const { User } = DB

import * as faker from 'faker'

export default async function(overrides = {}){

    const defaultUser ={
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password()
    }

    const userData = { ...defaultUser, ...overrides }

    return await User.create(userData)
}
