<template>
    <li :style="listStyle"
        :draggable="act" @dragstart="strtDrg"
        @drop="onDrop"
        @dragover.prevent
        @dragenter="dragEnter">
        <app-button
                @mousedown="onReorderActive(true)"
                @mouseup="onReorderActive(false)"
                img="reorder"/>
        {{city}}--{{country}}
        <app-button :onclick="deleteItem"
                    img='bin'/>
    </li>
</template>

<script>
	import AppButton from '../UI/AppButton.vue'
	import {useStore} from 'vuex'
	import {computed, toRefs, ref} from "vue";

	export default {
		props: ['c', 'indx'],
		components: {AppButton},
		setup(props) {
			const {indx} = props
			const store = useStore()
			const reorderActive = ref(false)
			const act = computed(() => reorderActive.value)
			const data = computed(() => store.getters.getCities[indx])
			const toR = toRefs(data.value)
			const listStyle = {
				display: 'flex', justifyContent: 'space-between', alignItems: 'center',
				marginBottom: '10px', borderBottom: '1px solid #ac9c9c59'
			}
			const dragEnter = () => store.commit('drag/setEnteredElement', indx)
			const strtDrg = (e) => {
				e.dataTransfer.setData('Text', props.indx);
				e.dataTransfer.dropEffect = 'move'
			}
			const onDrop = (e) => {
				store.dispatch('drag/onDrop', e.dataTransfer.getData('Text'))
			}
			const deleteItem = () => store.commit('deleteCity', indx)
			const onReorderActive = (val) => reorderActive.value = val

			return {
				act, onReorderActive, listStyle,
				city: toR.name.value, country: toR.country.value, dragEnter, strtDrg, onDrop, deleteItem
			}
		}
	}
</script>

<style scoped>

</style>