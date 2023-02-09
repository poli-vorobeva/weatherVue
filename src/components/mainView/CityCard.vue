<template>
    <div class="card" :style="cardWrapper">
        <h4>{{name}}, {{country}}</h4>
        <div :style="tempStyle">
            <img :src="`${imgSrc}`" alt="weather"/> <span>{{Math.floor(tepm)}} °C</span>
        </div>
        <div>Feels like {{Math.floor(feelsLike)}} °C.</div>
        <div>
            <weather-cell v-for="cell of weatherCells"
                          :title="cell.title"
                          :text="cell.text"
                          :imgUrl="cell.url"
            />
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
			const cardWrapper = {
				background: '#3c5b7678', width: '200px',
				boxSizing: 'border-box',
				margin: '5px',
				padding: '5px',
				color: 'aliceblue',
				letterSpacing: '1px',
				borderRadius: '5px',
				boxShadow: '0 0 10px 5px #6e6b6b54',
				border: '1px solid #968c8c',
				fontFamily: 'sans-serif'
			}
			const weatherCells = [
				{url: 'wind', text: `${Math.round(props.city.wind)} m/s ${props.city.windDirection}`},
				{url: 'pressure', text: `${Math.round(props.city.pressure)} hPa`},
				{title: 'humidity', text: `${props.city.humid}%`},
				{title: 'visibility', text: `${metrToKm(props.city.visibility)} km`}
			]
			const tempStyle = {
				fontSize: '35px',
				display: 'flex',
				alignItems: 'center'
			}
			const {feelsLike, name, country, imgSrc, tepm} = props.city
			return {
				weatherCells, cardWrapper,tempStyle,
				name, country, imgSrc, tepm, feelsLike
			}
		}
	}
</script>

<style scoped>
    .card {
        border: 10px;
    }
</style>