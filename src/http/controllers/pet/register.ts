import { makeRegisterPetsUseCase } from '@/use-cases/factories/make-register-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const petsRegisterBody = z.object({
    name: z.string(),
    history: z.string(),
    species: z.string(),
    sex: z.enum(['MALE', 'FEMALE']),
    age: z.number(),
    energy: z.enum(['SMALL', 'MEDIUM', 'HIGH', 'EXTRA_HIGH']),
    size: z.enum(['SMALL', 'MEDIUM', 'HIGH', 'EXTRA_HIGH']),
    level_of_independence: z.enum(['SMALL', 'MEDIUM', 'HIGH', 'EXTRA_HIGH']),
    ambient: z.enum(['SMALL', 'MEDIUM', 'HIGH', 'EXTRA_HIGH']),
    photos: z.array(z.string()).max(5).min(1),
  })

  const petsRegisterParams = z.object({
    institution_id: z.string().uuid(),
  })

  const dataBody = petsRegisterBody.parse(request.body)
  const { institution_id } = petsRegisterParams.parse(request.params)

  const data = {
    ...dataBody,
    institution_id,
  }

  const petsRegisterUseCase = makeRegisterPetsUseCase()

  await petsRegisterUseCase.execute(data)

  return reply.status(201).send()
}
