import { Institution, Prisma } from '@prisma/client'

export interface InstitutionRepository {
  create(data: Prisma.InstitutionCreateInput): Promise<Institution>
  findByEmail(email: string): Promise<Institution | null>
  findById(id: string): Promise<Institution | null>
}
