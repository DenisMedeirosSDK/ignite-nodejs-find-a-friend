import { Level, Pet, Sex } from '@prisma/client'

export interface CreatePetRepository {
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

export interface SearchPetRepository {
  city: string
  species?: string | null
  sex?: Sex | null
  age?: number | null
  energy?: Level | null
  size?: Level | null
  level_of_independence?: Level | null
  ambient?: Level | null | null
}

export interface PetRepository {
  create(data: CreatePetRepository): Promise<Pet | null>
  search(filters: SearchPetRepository): Promise<Pet[]>
  findById(id: string): Promise<Pet | null>
}
