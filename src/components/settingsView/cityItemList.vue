<template>
    <li>
        <app-button :imgSrc="`./public/assets/reorder.svg`"/>
        {{city}}--{{country}}
        <app-button :imgSrc="`./public/assets/bin.svg`"/>
    </li>
</template>

<script>
    import AppButton from '../UI/AppButton.vue'
	export default {
		props: ['city', 'country'],
      components:{AppButton},
      setup(props){
		return{
			city:props.city,country:props.country
        }
      }
	}
</script>

<style scoped>

</style>