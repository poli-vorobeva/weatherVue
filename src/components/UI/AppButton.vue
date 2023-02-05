<template>
    <button>
        <img :src="imgSrc" alt="">
    </button>
</template>

<script>
	export default {
		props: ['imgSrc'],
		setup(props) {
			return {
				imgSrc: props.imgSrc
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