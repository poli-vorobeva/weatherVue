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
			`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a1d7b55bf627b6db7643916254c70535&units=metric`,{headers: {
					'Content-Type':"application/json"
				}})
		f.then(r => r.json())
			.then(d => res(d))
	})
}
export const fetchData=async (data:'geo'|"weather",city:string)=>{
	 if(data==='geo') return await fetchGeo(city)
	 else return await fetchWeather(city)

}
export const fetchWeather=(city:string)=>{
	return fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a1d7b55bf627b6db7643916254c70535&units=metric`)
}
export const fetchGeo=(city:string)=>{
	const apiKey = '09cc073d99f843bd93b5e025c1adf603'
	return fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&lang=en`)
}
const fake = [
	{
		"clouds": 94,
		"feelsLike": -1.54,
		"description": "overcast clouds",
		"humid": 77,
		"visibility": 10000,
		"pressure": 1017,
		"windDirection": "NNE",
		"name": "Yalta",
		"country": "UA",
		"tepm": 3.28,
		"wind": 6.61,
		"imgSrc": "http://openweathermap.org/img/wn/04d@2x.png"
	},
	{
		"clouds": 904,
		"feelsLike": -1.54,
		"description": "overcast clouds",
		"humid": 77,
		"visibility": 10000,
		"pressure": 1017,
		"windDirection": "NNE",
		"name": "SomeCity",
		"country": "UA",
		"tepm": 3.28,
		"wind": 6.61,
		"imgSrc": "http://openweathermap.org/img/wn/04d@2x.png"
	},
	{
		"clouds": 90,
		"feelsLike": -7.67,
		"description": "overcast clouds",
		"humid": 99,
		"visibility": 4302,
		"pressure": 1032,
		"windDirection": "NNW",
		"name": "Moscow",
		"country": "RU",
		"tepm": -5.43,
		"wind": 1.36,
		"imgSrc": "http://openweathermap.org/img/wn/04d@2x.png"
	}
]