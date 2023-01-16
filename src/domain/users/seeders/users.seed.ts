import { Injectable } from '@nestjs/common'
import { Seeder } from 'src/shared'
import { UsersService } from '../services/users.service'
import { UserRole } from '../typing'

@Injectable()
export class UsersSeed extends Seeder {
	protected name = 'Admin user'

	constructor(private readonly usersService: UsersService) {
		super()
	}
	protected async seed(): Promise<void> {
		console.log('USER SEED START')
		await this.usersService.store({
			email: 'admin@admin.com',
			username: 'admin',
			password: '123qqq',
			role: UserRole.Admin,
		})
		await this.usersService.store({
			email: 'boss@boss.com',
			username: 'boss',
			password: '123qqq',
			role: UserRole.Boss,
			subordinatesOf: 1,
		})
		await this.usersService.store({
			email: 'boss2@boss2.com',
			username: 'boss2',
			password: '123qqq',
			role: UserRole.Boss,
			subordinatesOf: 1,
		})
		await this.usersService.store({
			email: 'user@user.com',
			username: 'user',
			password: '123qqq',
			role: UserRole.User,
			subordinatesOf: 2,
		})
	}
}
