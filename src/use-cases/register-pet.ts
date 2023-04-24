import { InstitutionRepository } from '@/repositories/institution-repository'
import { PetRepository } from '@/repositories/pet-repository'
import { Level, Pet, Sex } from '@prisma/client'

export interface Request {
  name: string
  history: string
  species: string
  sex: Sex
  age: number
  energy: Level
  size: Level
  level_of_independence: Level
  ambient: Level
  institution_id: string
  photos: string[]
}
export interface Response {
  data: Pet | null
}

export class RegisterPetUseCase {
  constructor(
    private petRepository: PetRepository,
    private institutionRepository: InstitutionRepository,
  ) {}

  async execute(data: Request): Promise<Response> {
    const institution = await this.institutionRepository.findById(
      data.institution_id,
    )

    if (!institution) {
      throw new Error('Institution not found')
    }

    if (data.photos.length > 5) {
      throw new Error('Maximum 5 photos')
    }

    if (data.photos.length < 1) {
      throw new Error('Minimum 1 photo')
    }

    const pet = await this.petRepository.create(data)

    return { data: pet }
  }
}
