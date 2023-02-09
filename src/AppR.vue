<template>
    <weather-widget v-if="isLoaded"/>
    <h2 v-else class="cc">Loadding....</h2>
</template>
<script lang="ts">
	import {useStore} from "vuex"
	import WeatherWidget from './components/WeatherWidget.vue'
	import {computed} from 'vue'

	export default {
		components: {WeatherWidget},
		setup() {
			const store = useStore()
			const isLoaded = computed(() => store.getters.getLoaded)
			store.dispatch('getData')
			return {isLoaded}
		},
	}
</script>
<style scoped>

</style>