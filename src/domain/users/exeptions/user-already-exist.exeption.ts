import { Exeption } from 'src/shared'
import { ExceptionKeys } from 'src/shared/enums'

export class UserAlreadyExistExeption extends Exeption {
	protected key = ExceptionKeys.UserAlreadyExist

	constructor() {
		super('User already exist')
	}
}

export class DuplicateUserEmailException extends Exeption {
	protected key = ExceptionKeys.EmailExist

	constructor() {
		super('Email already exist')
	}
}

export class DuplicateUserNameException extends Exeption {
	protected key = ExceptionKeys.UserNameExist

	constructor() {
		super('UserName already exist')
	}
}

export class DuplicateUserPhoneException extends Exeption {
	protected key = ExceptionKeys.PhoneNumberExist

	constructor() {
		super('Phone Number already exist')
	}
}
