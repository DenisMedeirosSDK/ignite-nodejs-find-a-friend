import { PrismaInstitutionRepository } from '@/repositories/prisma/prisma-institution-repository'
import { AuthenticateUseCase } from '../authenticate-institution'

export function makeAuthenticateUseCase() {
  const institutionRepository = new PrismaInstitutionRepository()
  const useCase = new AuthenticateUseCase(institutionRepository)

  return useCase
}
