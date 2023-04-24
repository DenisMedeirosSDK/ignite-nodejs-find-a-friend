import { prisma } from '@/lib/prisma'
import { Institution, Prisma } from '@prisma/client'
import { InstitutionRepository } from '../institution-repository'

export class PrismaInstitutionRepository implements InstitutionRepository {
  async findById(id: string): Promise<Institution | null> {
    const user = await prisma.institution.findUnique({
      where: {
        id,
      },
    })

    return user
  }

  async findByEmail(email: string): Promise<Institution | null> {
    const user = await prisma.institution.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async create(data: Prisma.InstitutionCreateInput) {
    const user = await prisma.institution.create({
      data,
    })

    return user
  }
}
