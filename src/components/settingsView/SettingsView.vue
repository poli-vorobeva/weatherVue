<template>
    <ul>
        <city-item-list @reorderCities="" :c="c" :key="cities" :indx="i"
                        v-for="(c,i) in cities"/>
    </ul>
</template>

<script>
	import {useStore} from "vuex";
	import {computed} from "vue";
	import CityItemList from './cityItemList.vue'
	import {toRefs,ref,isRef} from "vue";

	export default {
		components: {CityItemList},
		setup() {
			const store = useStore()
			let cities = computed(()=>store.getters.getCities)

          const toC=toRefs(cities.value)
toC.forEach(c=>console.log(isRef(c),"toc"))
          const refsData=cities.value.map(el=>ref(el))
          console.log(refsData,'REFSDATA')
          // const rf=unref(cities)
          // console.log(rf,"settindWuiw")
          // rf.forEach(c=>{
          // 	console.log(isRef(c),')')
          // })
			// const reorderedCities = () => {}
				 // store.subscribe((mutation, state) => {
                 //   console.log(mutation)
					// 	console.log(mutation.payload)
					// })
			return {cities}
		}
	}
</script>

<style scoped>

</style>