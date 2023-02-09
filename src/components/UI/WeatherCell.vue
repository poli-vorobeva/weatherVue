<template>
    <div :style="{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',paddingTop:'5px'}">
        <svg-component v-if="imgUrl" :img="imgUrl"/>
        <span v-if="title">{{title}}</span>
        <span>{{text}}</span>
    </div>
</template>

<script>
	import SvgComponent from "./svgComponent.vue";
		export default {
					components: {SvgComponent},
			props: ['text', 'title', 'imgUrl'],
		setup(props) {
						console.log(props,'%%')
			return {
				imgUrl: props.imgUrl, title: props.title, text: props.text
			}
		}
	}
</script>

<style scoped>

</style>