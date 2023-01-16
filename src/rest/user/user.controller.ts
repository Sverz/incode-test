import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { SessionDto } from 'src/domain/sessions/typing'
import { SignUpPayloadDto } from './dtos/sign-up-payload.dto'
import { UserService } from './user.service'
import { NewBossIdDto, RefreshSessionPayloadDto, SignInPayloadDto } from './dtos'
import { AuthGuard, RoleGuard } from 'src/domain/sessions/decorators'
import { ReqUser } from 'src/shared'
import { UserRole } from 'src/domain/users/typing'

@ApiTags('User')
@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@ApiOperation({ summary: 'Sign up' })
	@ApiBody({ type: SignUpPayloadDto })
	@ApiOkResponse({
		status: 201,
		description: 'Success sign up, create user and send confirm email code',
	})
	@Post('sign-up')
	public signUp(@Body() dto: SignUpPayloadDto) {
		return this.userService.signUp(dto)
	}

	@ApiOperation({ summary: 'Sign in' })
	@ApiBody({ type: SignInPayloadDto })
	@ApiOkResponse({
		status: 201,
		description: 'Success sign in, return session object',
		type: SessionDto,
	})
	@Post('sign-in')
	public signIn(@Body() dto: SignInPayloadDto) {
		return this.userService.signIn(dto)
	}

	@ApiOperation({ summary: 'Get users list' })
	@ApiOkResponse({
		status: 201,
		description: 'Return users list',
	})
	@AuthGuard()
	@Get()
	public getList(@ReqUser() id: number) {
		return this.userService.get(id)
	}
	@ApiOperation({ summary: 'Change user Boss' })
	@ApiOkResponse({
		status: 201,
		description: 'Change user Boss',
	})
	@RoleGuard(UserRole.Boss)
	@Patch()
	public changeBoss(
		@Query() dto: NewBossIdDto,
		@ReqUser() id: number,
	) {
		return this.userService.changeBoss(id, dto)
	}
	@ApiOperation({ summary: 'Refresh session' })
	@ApiBody({ type: RefreshSessionPayloadDto })
	@ApiOkResponse({
		status: 201,
		description: 'Success refresh, return session object',
		type: SessionDto,
	})
	@Post('refresh-session')
	public refreshSession(@Body() dto: RefreshSessionPayloadDto) {
		return this.userService.refreshSession(dto)
	}
}
