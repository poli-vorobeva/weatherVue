<template>
    <h2 v-if="inCorrect">Incorrect City</h2>
    <ul>
        <city-item-list @reorderCities="" :c="c" :key="cities" :indx="i"
                        v-for="(c,i) in cities"/>
    </ul>
    <form @submit.prevent="submitCity">
        <input v-if="!inCorrect" type="text" placeholder="Add City ..." v-model="inputData">
        <button>Add</button>
    </form>

</template>

<script>
	import {useStore} from "vuex";
	import {computed} from "vue";
	import CityItemList from './cityItemList.vue'
	import {toRefs, ref, isRef} from "vue";

	export default {
		components: {CityItemList},
		setup() {
			const store = useStore()
			let cities = computed(() => store.getters.getCities)
			const inCorrect = computed(() => store.getters.getIncorrect)
			const inputData = ref('')
			const submitCity = () => {
				store.dispatch('addCity', inputData.value)
				inputData.value = ''
			}
			return {cities, inputData, submitCity, inCorrect}
			return {cities, inputData, submitCity, inCorrect}
		}
	}
</script>

<style scoped>

</style>