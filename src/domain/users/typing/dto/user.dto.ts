import { DtoProperty, DtoPropertyOptional } from 'src/shared'
import { UserRole } from '../enums'

export class UserDto {
	@DtoProperty()
	id: number

	@DtoProperty()
	username: string

	@DtoProperty()
	email: string

	@DtoProperty({ enum: UserRole })
	role: UserRole

	@DtoProperty()
	subordinatesOf: number

	@DtoProperty()
	createdAt: string

	@DtoProperty()
	updatedAt: string
}
