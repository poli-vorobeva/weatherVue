<template>
    <weather-widget/>
</template>
<script lang="ts">
	import {useStore} from "vuex"
	import WeatherWidget from './components/WeatherWidget.vue'
	import {computed} from 'vue'

	export default {
		components: {WeatherWidget},
		setup() {
			const store = useStore()
			store.dispatch('getData')
			const count = computed(() => store.getters.getCount)
			return {count}
		},
	}
</script>
<style scoped>
</style>