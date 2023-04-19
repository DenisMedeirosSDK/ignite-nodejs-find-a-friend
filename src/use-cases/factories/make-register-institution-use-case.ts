import { PrismaInstitutionRepository } from '@/repositories/prisma/prisma-institution-repository'
import { RegisterInstitutionUseCase } from '../register-institution'

export function makeRegisterInstitutionUseCase() {
  const institutionRepository = new PrismaInstitutionRepository()
  const useCase = new RegisterInstitutionUseCase(institutionRepository)

  return useCase
}
