import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await request(app.server).post('/users').send({
    name: 'john Doe',
    email: 'johndoe@example.com',
    password: '123456',
  })

  const oathResponse = await request(app.server).post('/sessions').send({
    email: 'johndoe@example.com',
    password: '123456',
  })

  const { token } = oathResponse.body

  return {
    token,
  }
}
