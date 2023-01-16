const regular = /[^\d]/g
export const formateString = (str: string) => {
	if (!str) return null
	return str.replace(regular, '')
}
