<template>
    <!--    background: "`${#3c5b7678}`",-->
    <div class="card" :style="{background: '#3c5b7678',width: '200px',
        boxSizing: 'border-box',
        margin:'5px',
        padding: '5px',
        color: 'aliceblue',
        letterSpacing: '1px',
           borderRadius: '5px',
    boxShadow: '0 0 10px 5px #6e6b6b54',
    border: '1px solid #968c8c',
        fontFamily: 'sans-serif'}">
        <h4>{{name}}, {{country}}</h4>
        <div :style="{
        fontSize: '35px',
        display: 'flex',
        alignItems: 'center'
        }">
            <img :src="`${imgSrc}`" alt="weather"/> <span>{{Math.floor(tepm)}} °C</span>
        </div>
        <div>Feels like {{Math.floor(feelsLike)}} °C.</div>
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
			const {feelsLike, name, country, imgSrc, tepm} = props.city
			console.log(props.city.tepm)
			console.log("TEM{", tepm)
			return {
				weatherCells,
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