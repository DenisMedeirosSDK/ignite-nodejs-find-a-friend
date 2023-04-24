import { makeFindPetPetsUseCase } from '@/use-cases/factories/make-find-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function find(request: FastifyRequest, reply: FastifyReply) {
  const petsQuery = z.object({
    id: z.string(),
  })

  const { id } = petsQuery.parse(request.params)

  const useCase = makeFindPetPetsUseCase()

  const pet = await useCase.execute(id)

  return reply.status(200).send(pet)
}
