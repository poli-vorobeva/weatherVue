import {IWeatherResponse} from "./dto/dto.api";

export const derectSectors: string[] = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N"];

export const metrToKm = (metres: number) => {
	const ms = `${metres}`.split('')
	ms.splice(ms.length - 3, 0, '.')
	return ms.join('')
}
export const cityData = (r: IWeatherResponse) => {
	if(r.cod!=200)return
	return {
		clouds: r.clouds.all,
		feelsLike: r.main.feels_like,
		description: r.weather[0].description,
		humid: r.main.humidity,
		visibility: r.visibility,
		pressure: r.main.pressure,
		windDirection: derectSectors[Math.floor(r.wind.deg / 22.5)],
		name: r.name, country: r.sys.country,
		tepm: r.main.temp, wind: r.wind.speed,
		imgSrc: `http://openweathermap.org/img/wn/${r.weather[0].icon}@2x.png`
	}

}
export const cityFetch = (city: string) => {
	return new Promise((res, rej) => {
		const f = fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a1d7b55bf627b6db7643916254c70535&units=metric`)
		f.then(r => r.json())
			.then(d => res(d))
	})
}