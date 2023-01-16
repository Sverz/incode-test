import { UserRole } from '../enums'

export interface IUser {
	id: number

	email: string
	username: string

	password: string
	passwordSalt: string

	role: UserRole

	createdAt: string
	updatedAt: string
}
