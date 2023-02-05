<template>
    <div>
        <img :style="{width: '20px',height:'20px'}" v-if="imgUrl" :src="`${imgUrl}`" alt="">
        <span v-if="title">{{title}}</span>
        <span>{{text}}</span>
    </div>
</template>

<script>
	export default {
		props: ['text', 'title', 'imgUrl'],
		setup(props) {
			console.log(props.title, props.text, props.imgUrl)
			return {
				imgUrl: props.imgUrl, title: props.title, text: props.text
			}
		}
	}
</script>

<style scoped>

</style>