import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeRegisterInstitutionUseCase } from '@/use-cases/factories/make-register-institution-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    phone: z.string(),
    address: z.object({
      zipcode: z.string(),
      street: z.string(),
      streetNumber: z.string(),
      state: z.string().max(2).toUpperCase(),
      city: z.string(),
      latitude: z.number(),
      longitude: z.number(),
    }),
  })

  const { name, email, password, phone, address } = registerBodySchema.parse(
    request.body,
  )

  try {
    const registerUseCase = makeRegisterInstitutionUseCase()

    await registerUseCase.execute({
      name,
      email,
      password,
      phone,
      address,
    })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message,
      })
    }

    throw error
  }

  return reply.status(201).send()
}
