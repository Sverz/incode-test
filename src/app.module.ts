import { Module } from '@nestjs/common'

import { getDatabaseConfig, getJwtConfig } from './config'
import { DOMAIN_MODULES } from './domain'
import { DatabaseModule } from './libs/database'
import { JwtModule } from './libs/jwt'
import { CommandModule } from 'nestjs-command'
import { REST_MODULES } from './rest'
import { EventEmitterModule } from '@nestjs/event-emitter'
@Module({
	imports: [
		CommandModule,
		EventEmitterModule.forRoot(),
		JwtModule.forRoot(getJwtConfig()),
		DatabaseModule.forRoot(...getDatabaseConfig()),
		...DOMAIN_MODULES(),
		...REST_MODULES(),
	],
})
export class AppModule {}
