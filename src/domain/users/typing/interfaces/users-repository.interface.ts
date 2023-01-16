import { Repository } from 'typeorm'
import { IUser } from './user.interface'

export type IUsersRepository = Repository<IUser>
