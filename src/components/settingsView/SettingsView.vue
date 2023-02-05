<template>
    <ul>
        <city-item-list :city="c.name" :country="c.country" v-for="c of cities"/>
    </ul>
</template>

<script>
	import {useStore} from "vuex";
	import {computed} from "vue";
	import CityItemList from './cityItemList.vue'

	export default {
		components: {CityItemList},
		setup() {
			const store = useStore()
			const cities = computed(() => store.getters.getCities)
			return {cities}
		}
	}
</script>

<style scoped>

</style>