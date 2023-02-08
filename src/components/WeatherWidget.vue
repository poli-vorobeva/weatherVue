<template>
    <main-view/>
    <settings-view/>
</template>

<script>
    import MainView from "./mainView/MainView.vue";
    import SettingsView from "./settingsView/SettingsView.vue";
	export default {
		components: {MainView, SettingsView}
	}
</script>

<style scoped>

</style>