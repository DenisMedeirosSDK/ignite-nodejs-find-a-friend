import { PetRepository } from '@/repositories/pet-repository'
import { Pet } from '@prisma/client'

export class FindPetUseCase {
  constructor(private readonly petRepository: PetRepository) {}

  async execute(id: string): Promise<Pet> {
    const pet = await this.petRepository.findById(id)
    if (!pet) {
      throw new Error('Pet not found')
    }

    return pet
  }
}
