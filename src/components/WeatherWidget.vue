<template>
    <main-view v-if="mainView" @clickGear="click('gear')"/>
    <settings-view @clickClose="click('close')" v-else/>
</template>

<script>
    import MainView from "./mainView/MainView.vue";
    import SettingsView from "./settingsView/SettingsView.vue";
    import {ref} from 'vue';
	export default {
		setup(){
			const mainView=ref(true)
			const click=(i)=>{
				mainView.value=i!=='gear'
            }
			return{
				click,mainView
            }
        },
		components: {MainView, SettingsView}
	}
</script>

<style scoped>

</style>