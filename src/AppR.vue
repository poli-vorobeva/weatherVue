<template>
    <weather-widget/>
    <h3>{{count}}, tratatat</h3>
    <button>EMIT</button>
    <div>App{{$store.state.count}}</div>
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
			//const emit = defineEmits<{(e: 'something',num:number): void}>()

          //something emit()
			const count = computed(() => store.getters.getCount)
			return {count}
		},
	}
</script>
<style scoped>
</style>