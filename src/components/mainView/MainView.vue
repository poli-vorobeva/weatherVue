<template>
    <div class="divm" :style="{position:'relative'}">
        <AppButton @clickGear="clickGear" img="gear"/>
        <city-card @click="cl" :key="cities" :city="city" v-for="city of cities"/>
    </div>
</template>

<script>
	import {useStore} from "vuex";
	import CityCard from "./CityCard.vue";
	import {computed} from "vue";
	import AppButton from "../UI/AppButton.vue";

	export default {
		components: {AppButton, CityCard},
		setup(_, context) {
			const store = useStore()
			const cities = computed(() => store.getters.getCities)
			const cl = () => context.emit('cll')
			const clickGear = () => context.emit('clickGear')
			return {cities, cl, clickGear}
		}
	}
</script>

<style scoped lang="css">
.divm {
    border: 10px solid rebeccapurple;
}
</style>