import {IState} from "../components/dto/dto.state";
import {IWeatherResponse} from "../components/dto/dto.api";
import {derectSectors} from "../components/functions";
import {createStore, createLogger} from 'vuex'

export default createStore<IState>({
	state() {
		return {
			cities: ['London', 'Moscow'],
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
			console.log(state.citiesData,'--%%^%%^')
		}
	},
	actions: {
		getGeoLocation(context) {
			const apiKey = '09cc073d99f843bd93b5e025c1adf603'
			const geo = fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&lang=en`)
			geo.then(async g => {
				const geoRes = await g.json()
				localStorage.setItem('weatherCities',JSON.stringify([geoRes.city]))
				context.state.cities=[geoRes.city]
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
		getFromLocalStorage(context){
				context.state.cities=JSON.parse(localStorage.getItem('weatherCities'))
			},
		getData(context) {
			//заходим, смотрим локал
			if( localStorage.getItem('weatherCities')){
				console.log("HAS")
				const l = context.dispatch('getFromLocalStorage')
				l.then(()=>{
					const t = context.dispatch('getCitiesData')
					t.then(()=>console.log(t,'T'))
				})
			}else{
				const geoCity= context.dispatch('getGeoLocation')
				console.log(geoCity,'geo')
				const t = context.dispatch('getCitiesData')

				console.log(t,'t')
			}
		}
	},
	getters: {
		getCities(state: IState) {
			return state.citiesData
		}
	}
})