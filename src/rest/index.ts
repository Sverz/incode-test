import { RestUserModule } from './user/user.module'

export const REST_MODULES = () => [
	RestUserModule.forRoot(),
]
