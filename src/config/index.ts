import { DatabaseModule } from 'src/libs/database'
import { getEnv } from 'src/shared'
import { ENTITIES } from './entities.config'

export const getDatabaseConfig = (): Parameters<typeof DatabaseModule['forRoot']> => {
	return [
		{
			type: 'postgres',
			host: process.env.DATABASE_HOST,
			port: Number(process.env.DATABASE_PORT),
			username: process.env.DATABASE_USER,
			password: process.env.DATABASE_PASS,
			database: process.env.DATABASE_DB,
			synchronize: false,
		},
		ENTITIES,
	]
}

export const getJwtConfig = () => {
	return { jwtKey: getEnv('JWT_KEY'), paylodKey: getEnv('JWT_PAYLOAD_KEY') }
}
