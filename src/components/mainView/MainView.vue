<template>
        <city-card @click="cl" :key ="cities" :city="city" v-for="city of cities"/>
</template>

<script>
	import {useStore} from "vuex";
	import CityCard from "./CityCard.vue";
	import {computed} from "vue";

	export default {
		components: {CityCard},
		setup(_,context) {
			const store = useStore()
			const cities = computed(()=>store.getters.getCities)
                const cl=(e)=>context.emit('cll')
                console.log(cities.value)
			return {cities,cl}
		}
	}
</script>

<style scoped>

</style>