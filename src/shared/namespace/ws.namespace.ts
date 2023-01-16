export namespace WebSockets {
	export interface Service {
		/**
		 * Метод для перевірки чи є даний користувач онлайн
		 * @param {number} userId - ID користувача
		 * @returns Повертає true, якщо користувач онлайн, інакше false
		 */
		isUserOnline(userId: number): boolean

		/**
		 * Метод для отримання кількості користувачів, які зараз онлайн
		 * @returns Повертає кількість користувачів
		 */
		getUsersOnlineCount(): Promise<number>

		/**
		 * Ініціювання події в заданій "кімнаті" з заданим ключем та даними
		 * @param {string} room - назва "кімнати"
		 * @param {string} key - ключ (назва) події
		 * @param {any} data - додаткові дані
		 */
		emitToRoom(room: string, key: string, data?: any): void

		/**
		 * Метод для отримання ID користувачів, які зараз онлайн
		 * @returns Повертає масив ID користувачів
		 */
		getUsersOnlineIds(): Promise<number[]>

		/**
		 * Ініціювання події з заданим ключем і даними в "кімнаті" конкретного користувача
		 * @param {number} userId - ID користувача
		 * @param {string} key - ключ (назва) події
		 * @param {any} data - додаткові дані
		 */
		emitToUser(userId: number, key: string, data?: any): void
	}
}
