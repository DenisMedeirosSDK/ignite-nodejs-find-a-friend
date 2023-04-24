import { makeSearchPetsUseCase } from '@/use-cases/factories/make-search-pets-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const petsQuery = z.object({
    city: z.string(),
    species: z.string().optional(),
    sex: z.enum(['MALE', 'FEMALE']).optional(),
    age: z.coerce.number().optional(),
    energy: z.enum(['SMALL', 'MEDIUM', 'HIGH', 'EXTRA_HIGH']).optional(),
    size: z.enum(['SMALL', 'MEDIUM', 'HIGH', 'EXTRA_HIGH']).optional(),
    level_of_independence: z
      .enum(['SMALL', 'MEDIUM', 'HIGH', 'EXTRA_HIGH'])
      .optional(),
    ambient: z.enum(['SMALL', 'MEDIUM', 'HIGH', 'EXTRA_HIGH']).optional(),
  })

  const {
    city,
    age,
    ambient,
    energy,
    level_of_independence,
    sex,
    size,
    species,
  } = petsQuery.parse(request.query)

  const useCase = makeSearchPetsUseCase()

  const pets = await useCase.execute({
    city,
    age,
    ambient,
    energy,
    level_of_independence,
    sex,
    size,
    species,
  })

  return reply.status(200).send(pets)
}
