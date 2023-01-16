import { SignInPayloadDto } from './dtos/sign-in-payload.dto'
import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { SESSIONS_SERVICE } from 'src/domain/sessions/consts'
import { ISession, ISessionsService } from 'src/domain/sessions/typing'
import { USERS_PASSWORD_SERVICE, USERS_REPOSITORY, USERS_SERVICE } from 'src/domain/users/consts'
import {
	IUser,
	IUsersPasswordService,
	IUsersRepository,
	IUsersService,
	UserRole,
} from 'src/domain/users/typing'
import { NewBossIdDto, RefreshSessionPayloadDto, SignUpPayloadDto } from './dtos'
import * as _ from 'lodash'

@Injectable()
export class UserService {
	@Inject(USERS_SERVICE) private usersService: IUsersService
	@Inject(USERS_REPOSITORY) private usersRepository: IUsersRepository
	@Inject(USERS_PASSWORD_SERVICE) private usersPasswordService: IUsersPasswordService
	@Inject(SESSIONS_SERVICE) private sessionsService: ISessionsService

	public async signUp(dto: SignUpPayloadDto): Promise<IUser> {
		if (dto.subordinatesOf == null && dto.role != UserRole.Admin)
			throw new BadRequestException('Take id of your BOSS!')

		if (dto.subordinatesOf) {
			const boss = await this.usersRepository.findOne({ id: dto.subordinatesOf })
			if (!boss) throw new BadRequestException('Boss by given id Not Found')
		}

		await this.usersService.validateUser({ email: dto.email, username: dto.username })
		return await this.usersService.store({
			email: dto.email,
			password: dto.password,
			username: dto.username,
			role: dto.role,
			subordinatesOf: dto.subordinatesOf,
		})
	}

	public async signIn(dto: SignInPayloadDto): Promise<ISession> {
		const user = await this.usersRepository.findOne({ email: dto.email })
		if (!user) throw new BadRequestException('Username or password incorrect')

		const passwordsCompare = await this.usersPasswordService.comparePassword(
			user.id,
			dto.password,
		)
		if (!passwordsCompare) throw new BadRequestException('Username or password incorrect')

		const session = await this.sessionsService.start({
			userId: user.id,
			role: user.role,
		})

		return session
	}
	public async get(id: number) {
		const user = await this.usersRepository.findOne({ id })
		let res
		if (user.role == UserRole.User) res = user
		else if (user.role == UserRole.Boss) {
			const subordinates = await this.usersRepository
				.createQueryBuilder('it')
				.where('it.subordinatesOf = :id', { id })
				.getMany()
			res = { ...user, subordinates }
		} else res = await this.usersRepository.createQueryBuilder('it').getMany()

		return res
	}
	public async changeBoss(id: number, dto: NewBossIdDto) {
		console.log(id, dto.subordinateId, dto.newBossId)
		const subordinate = await this.usersRepository
			.createQueryBuilder('it')
			.where('it.id = :subordinateId', { subordinateId: dto.subordinateId })
			.andWhere('it.subordinatesOf = :id', { id })
			.getOne()
		if (!subordinate) throw new BadRequestException('Subordinate by given id Not Found')
		if (subordinate.role != UserRole.User)
			throw new BadRequestException('You not allowed to change boss of this user')
		const newBoss = await this.usersRepository.findOne({ id: dto.newBossId })
		if (!newBoss) throw new BadRequestException('Boss by given id Not Found')

		const toUpdate = {
			subordinatesOf: _.defaultTo(dto.newBossId, null),
		}
		await this.usersService.update(dto.subordinateId, _.omitBy(toUpdate, _.isNil))
		return await this.usersRepository.findOne({ id: dto.subordinateId })
	}
	public async refreshSession({ refreshToken }: RefreshSessionPayloadDto): Promise<ISession> {
		return await this.sessionsService.refresh(refreshToken)
	}
}
