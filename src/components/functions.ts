import {IWeatherResponse} from "./dto/dto.api";
import {tCityCardProps} from "./dto/dto.main";
// export const rts=fetch('https://weatherserver.onrender.com/')
// rts.then(d=>  d.text()).then(c=>{
// 	const script = document.createElement('script')
// 	script.type = "text/javascript";
// 	script.text=JSON.parse(c);
// 	document.body.appendChild(script)
// })

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


// 	try{
// 		const f =fetch('http://localhost:3001/'//'https://weatherserver.onrender.com/'
// 			,{
// 			method: 'post',
// 			body: JSON.stringify({data,city}),
// 		})
// 		return f.then(d=> d.text()).then(g=> {
// 			const data = JSON.parse(g)
// 			return data
// 		})
// 	}catch (e) {
// return null
// 	}

//	return
}
export const fetchWeather=(city:string)=>{
	return fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a1d7b55bf627b6db7643916254c70535&units=metric`)
}
export const fetchGeo=(city:string)=>{
	const apiKey = '09cc073d99f843bd93b5e025c1adf603'
	return fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&lang=en`)
}