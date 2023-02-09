<template>
    <div :style="settingsStyle">
        <AppButton @clickClose="clickClose" img="close"/>
        <form @submit.prevent="submitCity">
            <input
                    :style="{width: '95%', padding: '3px',background: 'content-box', border: '1px solid #d6ccce',
    background: 'aliceblue'}"
                    :disabled="inCorrect"
                    type="text" placeholder="Add City ..." v-model="inputData">
            <button :style="{width: '50%', margin: '10px auto', padding: '5px', display: 'block', letterSpacing: '2px'}">
                Add
            </button>
        </form>
        <h2 v-if="inCorrect" :style="incorrectStyle">Incorrect City</h2>
        <ul :style="listStyle">
            <city-item-list @reorderCities="" :c="c" :key="cities" :indx="i"
                            v-for="(c,i) in cities"/>
        </ul>
    </div>
</template>

<script>
	import {useStore} from "vuex";
	import {computed,ref} from "vue";
	import CityItemList from './cityItemList.vue'
	import AppButton from "../UI/AppButton.vue";

	export default {
		components: {AppButton, CityItemList},
		setup(_, context) {
			const store = useStore()
			let cities = computed(() => store.getters.getCities)
			const inCorrect = computed(() => store.getters.getIncorrect)
			const inputData = ref('')
			const incorrectStyle = {
				position: 'absolute',
				background: '#7c5454', zIndex: '10', color: '#eeebe5', padding: '5px',
				borderRadius: '5px', textAlign: 'center', width: '90%', boxShadow: '0 0 5px 5px #8d838391'
			}
			const listStyle = {listStyle: 'none', width: '100%', padding: '0'}
			const settingsStyle = {
				position: 'relative', width: '200px', height: '300px', border: '1px solid red',
				border: '1px solid #564e4e', background: '#e0d8d570',
				borderRadius: '5px',
				padding: '5px'
			}
			const clickClose = () => {
				context.emit('clickClose')
			}
			const submitCity = () => {
				store.dispatch('addCity', inputData.value)
				inputData.value = ''
			}
			return {cities, inputData, incorrectStyle, listStyle,settingsStyle, inCorrect, submitCity, clickClose}
		}
	}
</script>

<style scoped>

</style>