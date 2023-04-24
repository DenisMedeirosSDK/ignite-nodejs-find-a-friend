import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'
import { FindPetUseCase } from '../find-pet'

export function makeFindPetPetsUseCase() {
  const petRepository = new PrismaPetRepository()
  const useCase = new FindPetUseCase(petRepository)

  return useCase
}
