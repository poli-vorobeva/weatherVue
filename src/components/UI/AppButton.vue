<template>
    <button :onclick="click" :style="styles">
       <svg-component :img="img"/>
    </button>
</template>

<script>
	import SvgComponent from './svgComponent.vue'
	export default {
		props: ['img'],
		components: {SvgComponent},
		setup(props, context) {
			const styles = {
				position: props.img === 'gear' ? 'absolute' : 'relative',
				top: (props.img === 'gear' || props.img === 'close') && '0',
				left: (props.img === 'gear' || props.img === 'close') && '165px',
				border: 'none', outline: 'none'
			}
			const click = () => {
				props.img === 'gear' && context.emit('clickGear')
				props.img === 'close' && context.emit('clickClose')
			}
			return {img: props.img, styles, click}
		}
	}
</script>

<style scoped>

</style>