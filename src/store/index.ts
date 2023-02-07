import {IState} from "../components/dto/dto.state";
import {IWeatherResponse} from "../components/dto/dto.api";
import {cityData, cityFetch, derectSectors, fetchData} from "../components/functions";
import {createStore, createLogger} from 'vuex'
import {dragStore} from "./dragStore";
import {tCityCardProps} from "../components/dto/dto.main";

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
			isIncorrectCity: false
		}
	},
	mutations: {
		setIncorrect(state:IState){
			state.isIncorrectCity = true
			const t = setTimeout(() => {
				state.isIncorrectCity = false
				clearTimeout(t)
			}, 2000)
		},
		createCitiesData(state: IState, respData: IWeatherResponse[]) {
			state.citiesData = respData.map(r => cityData(r)).filter(e => e)
		},
		onAddCity(state: IState, city: IWeatherResponse) {
			const d = cityData(city)
			if(!d){
				this.commit('setIncorrect')
			}else{
				state.citiesData.push(d)
				const oldLocalData = localStorage.getItem('weatherCities')
				localStorage.setItem('weatherCities', JSON.stringify([...JSON.parse(oldLocalData), d.name]))
			}
		},
		reOrderCities(state: IState, payload: { from: number, to: number }) {
			const copy2 = JSON.parse(JSON.stringify(state.citiesData))
			const tF = JSON.parse(JSON.stringify(copy2[payload.from]));
			const tT = JSON.parse(JSON.stringify(copy2[payload.to]));
			copy2.splice(payload.to, 1, tF)
			copy2.splice(payload.from, 1, tT)
			state.citiesData = copy2
			const c = state.citiesData.map(c => c.name)
			//state.cities = c
			localStorage.setItem('weatherCities', JSON.stringify(c))
		},
		deleteCity(state: IState, id: number) {
			const arrData = JSON.parse(JSON.stringify(state.citiesData))
			//	const ind= arrData.findIndex((e:tCityCardProps)=>e.name===city)
			arrData.splice(id, 1)
			state.citiesData = arrData
			const c = state.citiesData.map((c: tCityCardProps) => c.name)
			localStorage.setItem('weatherCities', JSON.stringify(c))
		}
	},
	actions: {
		addCity(context, props) {
			try {
				const data = fetch(
					`https://api.openweathermap.org/data/2.5/weather?q=${props}&appid=a1d7b55bf627b6db7643916254c70535&units=metric`,{headers: {
							'Content-Type':"application/json"
						}})
				data.then(async d => {
					const res = await d.json()
					context.commit('onAddCity', res)
				})
			} catch (e) {
			}
		},
		getGeoLocation(context) {
			const apiKey = '09cc073d99f843bd93b5e025c1adf603'
			const geo = fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&lang=en`,{
				headers: {
					'Content-Type':"application/json"
				}
			})
			geo.then(async g => {
				const geoRes = await g.json()
				localStorage.setItem('weatherCities', JSON.stringify([geoRes.city]))
				context.state.cities = [geoRes.city]
			})
		},

		getCitiesData(context) {
			// const responseData=context.state.cities.map(async city => await cityFetch(city))
			// console.log(responseData,'RESP')
			// responseData.map(el=>{
			// 	console.log(el)
			// })

			const allCitiesData = Promise.all(context.state.cities.map(async (city: string) => {
				try {
					const dd = fetchData('weather',city)
					return dd.then(d=> {
						return  d
					})
					// dd.then(r=>{
					// 	console.log("dd.then",r)
					// })
				} catch (e) {
					return null
				}

			}))
			allCitiesData.then(d => {
				context.commit('createCitiesData', d)
			})
		},
		getFromLocalStorage(context) {
			context.state.cities = JSON.parse(localStorage.getItem('weatherCities'))
		},
		getData(context) {
			console.log("GETdata")
			//todo check correct city
			//	context.state.citiesData = fake
			if (localStorage.getItem('weatherCities').length > 5) {
				const l = context.dispatch('getFromLocalStorage')
				l.then(() => {
					const t = context.dispatch('getCitiesData')
				})
			} else {
				const geoCity = context.dispatch('getGeoLocation')
				geoCity.then((res) => context.dispatch('getCitiesData'))
			}
		},
	},
	getters: {
		getCount(state: IState) {
			return state.citiesCount
		},
		getCities(state: IState) {
			return state.citiesData
		},
		getIncorrect(state:IState){
			return state.isIncorrectCity
		}
	}
})