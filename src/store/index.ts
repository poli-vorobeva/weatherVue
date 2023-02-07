import {IState} from "../components/dto/dto.state";
import {IWeatherResponse} from "../components/dto/dto.api";
import {derectSectors} from "../components/functions";
import {createStore, createLogger} from 'vuex'
import {dragStore} from "./dragStore";

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

const plugins = []
if (process.env.NODE_ENV === 'development') {
	plugins.push(createLogger())
}
export default createStore<IState>({
	modules: {drag: dragStore},
	plugins,
	state() {
		return {
			citiesCount: 35,
			cities: [],
			//todo check if incorrect City
			citiesData: [],
		}
	},
	mutations: {
		createCityData(state: IState, respData: IWeatherResponse[]) {
			state.citiesData = respData.map(r => {
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
			})
			//console.log(state.citiesData)
		},
		addCity(state: IState, city: string) {
			state.cities.push(city)
			const oldLocalData = localStorage.getItem('weatherCities')
			localStorage.setItem('weatherCities', JSON.stringify(JSON.parse(oldLocalData).push(city)))

		},
		reOrderCities(state: IState, payload: { from: number, to: number }) {
			const copy2 = JSON.parse(JSON.stringify(state.citiesData))
			const tF = JSON.parse(JSON.stringify(copy2[payload.from]));
			const tT = JSON.parse(JSON.stringify(copy2[payload.to]));
			copy2.splice(payload.to, 1, tF)
			copy2.splice(payload.from, 1, tT)
			state.citiesData = copy2
			const c = state.citiesData.map(c => c.name)
			state.cities = c
			localStorage.setItem('weatherCities', JSON.stringify(c))
			// state.citiesData=[]
		}
	},
	actions: {
		getGeoLocation(context) {
			const apiKey = '09cc073d99f843bd93b5e025c1adf603'
			const geo = fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&lang=en`)
			geo.then(async g => {
				const geoRes = await g.json()
				localStorage.setItem('weatherCities', JSON.stringify([geoRes.city]))
				context.state.cities = [geoRes.city]
			})
		},
		getCitiesData(context) {
			const allCitiesData = Promise.all(context.state.cities.map((city: string) => {
				return fetch(
					`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a1d7b55bf627b6db7643916254c70535&units=metric`)
			}))
			allCitiesData.then(d => {
				return Promise.all(d.map(c => c.json()))
			})
				.then(r => context.commit('createCityData', r))
		},
		getFromLocalStorage(context) {
			context.state.cities = JSON.parse(localStorage.getItem('weatherCities'))
		},
		getData(context) {
			console.log("GETdata")
			context.state.citiesData = fake
			// if (localStorage.getItem('weatherCities').length > 5) {
			// 	const l = context.dispatch('getFromLocalStorage')
			// 	l.then(() => {
			// 		const t = context.dispatch('getCitiesData')
			// 	})
			// } else {
			// 	const geoCity = context.dispatch('getGeoLocation')
			// 	geoCity.then((res) => context.dispatch('getCitiesData'))
			// }
		}
	},
	getters: {
		getCount(state: IState) {
			return state.citiesCount
		},
		getCities(state: IState) {
			return state.citiesData
		}
	}
})