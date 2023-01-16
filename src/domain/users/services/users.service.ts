import { Inject, Injectable } from '@nestjs/common'
import { USERS_PASSWORD_SERVICE } from './../consts/index'
import { USERS_REPOSITORY } from '../consts'
import {
	IUser,
	IUsersPasswordService,
	IUsersRepository,
	IUsersService,
	IUserStorePayload,
} from '../typing'
import { DuplicateUserEmailException, DuplicateUserNameException } from '../exeptions'
import * as _ from 'lodash'

@Injectable()
export class UsersService implements IUsersService {
	@Inject(USERS_REPOSITORY) private readonly usersRepository: IUsersRepository
	@Inject(USERS_PASSWORD_SERVICE)
	private readonly passwordService: IUsersPasswordService

	constructor() {}

	public async store(payload: IUserStorePayload): Promise<IUser> {
		await this.validateUser(payload)

		const passwordSalt = this.passwordService.createSalt()
		payload.password = await this.passwordService.hashPassword(payload.password, passwordSalt)

		const user = await this.usersRepository.save({
			username: payload.username,
			email: payload.email,
			password: payload.password,
			passwordSalt: passwordSalt,
			role: payload.role,
			subordinatesOf: payload.subordinatesOf,
		})

		return user
	}

	public async update(id: number, payload): Promise<IUser> {
		const user = await this.usersRepository.findOne(id)

		await this.validateUser(
			{
				email: payload.email,
				username: payload.username,
			},
			user.id,
		)

		const toSave = {
			...payload,
		}

		await this.usersRepository.update(id, _.omitBy(toSave, _.isNil))
		return user
	}

	public async validateUser(data: Partial<IUserStorePayload>, userId?: number): Promise<void> {
		if (data.email) await this.validateEmail(data.email, userId)
		if (data.username) await this.validateUserName(data.username, userId)
	}

	private async validateEmail(email: string, userId?: number): Promise<void> {
		const user = await this.usersRepository.findOne({ email })
		if (user && user.id !== userId) throw new DuplicateUserEmailException()
	}
	private async validateUserName(username: string, userId?: number): Promise<void> {
		const user = await this.usersRepository.findOne({ username })
		if (user && user.id !== userId) throw new DuplicateUserNameException()
	}

	public async confirmEmail(userId: number): Promise<void> {
		await this.usersRepository.update({ id: userId }, {})
	}
}
