<template>
    <div className={styles.cityCard}>
        <h4>{{name}}, {{country}}</h4>
        <div><img :src="`${imgSrc}`" alt="weather"/> {{tepm}} °C
        </div>
        <div>Feels like {{feelsLike}} °C.</div>
        <div>
            <weather-cell v-for="cell of weatherCells" :title="cell.title" :text="cell.text"
                                     :imgUrl="cell.url"/>
            )}
        </div>
    </div>
</template>

<script>
	import {metrToKm} from "../functions";
	import WeatherCell from "../UI/WeatherCell.vue";

	export default {
		components: {WeatherCell},
		props: ['city'],
		setup(props) {

			const weatherCells = [
				{url: './public/assets/windDir.svg', text: `${Math.round(props.city.wind)} m/s ${props.city.windDirection}`},
				{url: './public/assets/pressure.svg', text: `${Math.round(props.city.pressure)} hPa`},
				{title: 'humidity', text: `${props.city.humid}%`},
				{title: 'visibility', text: `${metrToKm(props.city.visibility)} km`}
			]
			const {feelsLike, name, country, imgSrc, temp} = props.city
			return {
				weatherCells,
				name, country, imgSrc, temp, feelsLike
			}
		}
	}
</script>

<style scoped>

</style>