import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'
import { FastifyInstance } from 'fastify'
import { find } from './find'
import { register } from './register'
import { search } from './search'

export async function petsRoutes(app: FastifyInstance) {
  app.post(
    '/pets/:institution_id',
    { onRequest: [verifyJWT, verifyUserRole('ADMIN')] },
    register,
  )

  app.get('/pets', search)
  app.get('/pets/:id', find)
}
