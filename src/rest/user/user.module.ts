import { DynamicModule, Module } from '@nestjs/common'
import { SessionsModule } from 'src/domain/sessions/sessions.module'
import { UsersModule } from 'src/domain/users/users.module'
import { UserService } from './user.service'
import { UserController } from './user.controller'

@Module({})
export class RestUserModule {
	static forRoot(): DynamicModule {
		return {
			module: RestUserModule,
			imports: [UsersModule.forFeature(), SessionsModule.forFeature()],
			controllers: [UserController],
			providers: [UserService],
		}
	}
}
