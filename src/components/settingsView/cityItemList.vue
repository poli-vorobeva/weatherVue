<template>
    <li draggable="true" @dragstart="strtDrg"
        @drop="onDrop"
        @dragover.prevent
        @dragenter="dragEnter"
    >
        <app-button :imgSrc="`./public/assets/reorder.svg`"/>
        {{city}}--{{country}}
        <app-button :imgSrc="`./public/assets/bin.svg`"/>
    </li>
</template>

<script>
	import AppButton from '../UI/AppButton.vue'
	import {useStore} from 'vuex'
	import {computed, ref,toRefs,isRef} from "vue";

	export default {
		props: ['c', 'indx'],
		components: {AppButton},
		setup(props) {
			const {indx} = props

          // const y =ref(props.c)
          // const yy=toRefs(y.value)
          // console.log(yy,'--Y')
		//	const r = toRefs(props.c)
		//console.log(r.name,r.country)
          const store = useStore()
          const data = computed(()=>store.getters.getCities[indx])
          const toR=toRefs(data.value)
          console.log(toR.name.value)
			const dragEnter = () => store.commit('drag/setEnteredElement', indx)
			const strtDrg = (e) => {
				e.dataTransfer.setData('Text', props.indx);
				e.dataTransfer.dropEffect = 'move'
			}
			const onDrop = (e) => {
				store.dispatch('drag/onDrop', e.dataTransfer.getData('Text'))

				//	context.emit('reorderCities')
			}
			return {
				city:toR.name.value, country:toR.country.value, dragEnter, strtDrg, onDrop
			}
		}
	}
</script>

<style scoped>

</style>