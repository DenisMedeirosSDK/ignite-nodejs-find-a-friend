import { prisma } from '@/lib/prisma'
import { Pet } from '@prisma/client'
import {
  CreatePetRepository,
  PetRepository,
  SearchPetRepository,
} from '../pet-repository'

export class PrismaPetRepository implements PetRepository {
  async findById(id: string): Promise<Pet | null> {
    const pet = await prisma.pet.findFirst({
      where: {
        id,
      },
    })

    return pet
  }

  async search(filters: SearchPetRepository): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: {
        institution: {
          address: {
            city: filters.city,
          },
        },
        age: filters.age ?? undefined,
        species: filters.species ?? undefined,
        sex: filters.sex ?? undefined,
        energy: filters.energy ?? undefined,
        size: filters.size ?? undefined,
        level_of_independence: filters.level_of_independence ?? undefined,
        ambient: filters.ambient ?? undefined,
      },
    })

    return pets
  }

  async create(data: CreatePetRepository): Promise<Pet | null> {
    const pet = await prisma.pet.create({
      data: {
        name: data.name,
        history: data.history,
        species: data.species,
        size: data.size,
        sex: data.sex,
        age: data.age,
        ambient: data.ambient,
        energy: data.energy,
        level_of_independence: data.level_of_independence,
        institution_id: data.institution_id,
      },
    })

    data.photos.map(async (photo) => {
      await prisma.petGallery.create({
        data: {
          pet_id: pet.id,
          photo,
        },
      })
    })

    return pet
  }
}
