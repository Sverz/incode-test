import { IsEmail } from 'class-validator'
import { UserRole } from 'src/domain/users/typing'
import { DtoProperty, DtoPropertyOptional } from 'src/shared'

export class SignUpPayloadDto {
	@DtoProperty()
	username: string

	@DtoProperty()
	@IsEmail()
	email: string

	@DtoProperty()
	password: string

	@DtoProperty()
	role: UserRole

	@DtoPropertyOptional()
	subordinatesOf: number
}
