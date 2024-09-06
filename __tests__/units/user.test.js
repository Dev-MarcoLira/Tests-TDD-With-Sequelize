import bcrypt from 'bcryptjs'
import DB from '../../src/app/models'

import truncate from '../utils/truncate'

const {User} = DB

import { describe, it, beforeEach } from 'node:test'
import { strict, deepEqual, equal, deepStrictEqual } from 'node:assert'

describe('User', ()=>{

    beforeEach(async () =>{
        await truncate()
    })

    it('should encrypt user password', async() =>{

        const user = await User.create({
            name: 'Diego',
            email: 'diego@rocketseat.com.br',
            password: '123456'
        })

        const compareHash = await bcrypt.compare('123456', user.password_hash)

        equal(compareHash, true)
    })

})