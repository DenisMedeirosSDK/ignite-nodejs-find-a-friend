import { PrismaInstitutionRepository } from '@/repositories/prisma/prisma-institution-repository'
import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'
import { RegisterPetUseCase } from '../register-pet'

export function makeRegisterPetsUseCase() {
  const institutionRepository = new PrismaInstitutionRepository()
  const petRepository = new PrismaPetRepository()
  const useCase = new RegisterPetUseCase(petRepository, institutionRepository)

  return useCase
}
