import { InstitutionRepository } from '@/repositories/institution-repository'
import { Institution } from '@prisma/client'
import { compare } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  institution: Institution
}

export class AuthenticateUseCase {
  constructor(private institutionRepository: InstitutionRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const institution = await this.institutionRepository.findByEmail(email)

    if (!institution) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(
      password,
      institution.password_hash,
    )

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      institution,
    }
  }
}
