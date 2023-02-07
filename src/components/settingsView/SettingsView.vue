<template>
    <ul>
        <city-item-list @reorderCities="" :c="c" :key="cities" :indx="i"
                        v-for="(c,i) in cities"/>
    </ul>
    <form @submit.prevent="submitCity">
        <input type="text" placeholder="Add City ..." v-model="inputData">
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
			const inputData = ref('')
			const store = useStore()
			let cities = computed(() => store.getters.getCities)
			const submitCity =()=> {
              store.dispatch('addCity',inputData.value)
              inputData.value = ''
			}
			return {cities, inputData,submitCity}
		}
	}
</script>

<style scoped>

</style>