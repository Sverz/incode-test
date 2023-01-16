import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'
import { IUser, UserRole } from '../typing'

@Entity('users')
export class User implements IUser {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ nullable: false, unique: true })
	email: string

	@Column({ nullable: false })
	username: string

	@Column({ nullable: false, select: false })
	password: string

	@Column({ nullable: false, select: false })
	passwordSalt: string

	@Column({ type: 'varchar', nullable: false })
	role: UserRole

	@Column({ nullable: true })
	subordinatesOf: number

	@CreateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
	createdAt: string

	@UpdateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
	updatedAt: string
}
