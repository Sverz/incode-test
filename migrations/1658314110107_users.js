/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = pgm => {
	pgm.createTable('users', {
		id: 'id',
		username: { type: 'varchar(100)', notNull: true, unique: true },
		email: { type: 'varchar(100)', notNull: true, unique: true },
		password: { type: 'varchar(100)', notNull: true },
		passwordSalt: { type: 'varchar(100)', notNull: true },
		role: { type: 'varchar(100)', notNull: true },
		subordinatesOf: { type: 'integer', notNull: false },
		createdAt: {
			type: 'timestamp',
			notNull: true,
			default: pgm.func('current_timestamp'),
		},
		updatedAt: {
			type: 'timestamp',
			notNull: true,
			default: pgm.func('current_timestamp'),
		},
	})
}

exports.down = pgm => {
	pgm.dropTable('users')
}
