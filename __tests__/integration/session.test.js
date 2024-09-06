import request from 'supertest'

import app from '../../src/app'
import truncate from '../utils/truncate'
import factory from '../factory'

import { describe, it, beforeEach } from 'node:test'
import { strict, deepEqual, equal, deepStrictEqual, ok } from 'node:assert'

describe('Authentication', () =>{

    beforeEach( async ()=>{
        await truncate()
    })

    it('should authenticate with valid credentials', async() =>{
        const user = await factory({
            password: '123456'
        })

        const response = await request(app)
            .post('/sessions')
            .send({
                email: user.email,
                password: '123456'
            })

        equal(response.status, 200)
    })

    it('should not authenticate with valid credentials', async() =>{
        const user = await factory({
            password: '123456'
        })

        const response = await request(app)
            .post('/sessions')
            .send({
                email: user.email,
                password: '131313'
            })

        equal(response.status, 401)
    })

    it('should return jwt token when authenticated', async() =>{
        const user = await factory({
            password: '123456'
        })

        const response = await request(app)
            .post('/sessions')
            .send({
                email: user.email,
                password: '123456'
            })

        ok(response.body.hasOwnProperty('token'), 'Response body should have a token property')
    })

    it('should be able to access private routes when authenticated', async() =>{

        const user = await factory({
            password: '123456'
        })

        const response = await request(app)
            .get('/dashboard')
            .set('Authorization', `Bearer ${user.generateToken()}`)

        equal(response.status, 200)

    })

    it('should not be able to access private routes without jwt token', async() =>{

        const user = await factory({
            password: '123456'
        })

        const response = await request(app)
            .get('/dashboard')

        equal(response.status, 401)

    })

    it('should not be able to access private routes with invalid jwt token', async() =>{

        const user = await factory({
            password: '123456'
        })

        const response = await request(app)
            .get('/dashboard')
            .set('Authorization', `Bearer 123123`)

        equal(response.status, 401)

    })


})