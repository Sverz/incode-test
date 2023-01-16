import { DtoProperty } from 'src/shared'

export class NewBossIdDto {
	@DtoProperty()
	newBossId: number
	@DtoProperty()
	subordinateId: number
}
