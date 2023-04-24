import { PetRepository } from '@/repositories/pet-repository'
import { Level, Pet, Sex } from '@prisma/client'

interface SearchPetsUseCaseRequest {
  city: string
  species?: string | null
  sex?: Sex | null
  age?: number | null
  energy?: Level | null
  size?: Level | null
  level_of_independence?: Level | null
  ambient?: Level | null
}

export class SearchPetsUseCase {
  constructor(private readonly petRepository: PetRepository) {}

  async execute(filters: SearchPetsUseCaseRequest): Promise<Pet[]> {
    const pets = await this.petRepository.search(filters)
    return pets
  }
}
