export const derectSectors: string[] = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N"];

export const metrToKm = (metres: number) => {
	const ms = `${metres}`.split('')
	ms.splice(ms.length - 3, 0, '.')
	return ms.join('')
}