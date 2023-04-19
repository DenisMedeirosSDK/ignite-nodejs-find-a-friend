import { InstitutionRepository } from '@/repositories/institution-repository'
import { Institution, Prisma } from '@prisma/client'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface RegisterInstitutionUseCaseRequest {
  name: string
  email: string
  password: string
  phone: string
  address: Prisma.AddressUncheckedCreateInput
}

interface RegisterInstitutionUseCaseResponse {
  user: Institution
}

export class RegisterInstitutionUseCase {
  constructor(private institutionRepository: InstitutionRepository) {}

  async execute({
    name,
    email,
    password,
    phone,
    address,
  }: RegisterInstitutionUseCaseRequest): Promise<RegisterInstitutionUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.institutionRepository.findByEmail(
      email,
    )

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.institutionRepository.create({
      name,
      email,
      password_hash,
      phone,
      address: {
        create: address,
      },
    })

    return {
      user,
    }
  }
}
