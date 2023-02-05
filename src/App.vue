<template>
    <weather-widget/>
</template>
<script lang="ts">
	import {useStore} from "vuex"
	import WeatherWidget from './components/WeatherWidget.vue'

	export default {
		components: {WeatherWidget},
		setup():void {
			const store = useStore()
			store.dispatch('getData')
		},
	}
</script>
<style scoped>
</style>