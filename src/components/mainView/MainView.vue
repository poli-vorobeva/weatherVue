<template>
        <city-card :city="city" v-for="city of cities"/>
</template>

<script>
	import {useStore} from "vuex";
	import CityCard from "./CityCard.vue";
	import {ref,reactive,computed} from "vue";

	export default {
		components: {CityCard},
		setup() {
			const store = useStore()
			const cities = computed(()=>store.getters.getCities)
			return {cities}
		}
	}
</script>

<style scoped>

</style>