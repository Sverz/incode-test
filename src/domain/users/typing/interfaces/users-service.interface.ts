import { UserRole } from '../enums'
import { IUser } from './user.interface'

export interface IUserStorePayload {
	username: string
	email: string
	password: string
	role: UserRole
	subordinatesOf?: number
}

export interface IUserUpdatePayload {
	username?: string
	email?: string
	subordinatesOf?: number
}

export interface IUsersService {
	store(payload: IUserStorePayload): Promise<IUser>
	update(userId: number, payload: IUserUpdatePayload): Promise<IUser>
	validateUser(data: Partial<IUserStorePayload>, userId?: number): Promise<void>
}
