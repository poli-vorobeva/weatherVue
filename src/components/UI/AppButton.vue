<template>
    <button>
        <reorder-comp v-if="img==='reorder'"/>
        <bin-comp v-else/>
    </button>
</template>

<script>
    import BinComp from './binComp.vue'
    import ReorderComp from './reorderComp.vue'
	export default {
		props: ['img'],
      components:{BinComp,ReorderComp},
		setup(props) {
			return {
				img: props.img
			}
		}
	}
</script>

<style scoped>
    button {
        width: 30px;
        height: 30px;
    }

    img {
        width: 100%;
        height: 100%;
    }
</style>